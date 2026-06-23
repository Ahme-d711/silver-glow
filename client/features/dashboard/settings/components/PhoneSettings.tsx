"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Loader2, Save } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UniPhoneInput } from "@/components/shared/uni-form/UniPhoneInput";
import { OTPInput } from "@/features/auth/components/OTPInput";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { toApiPhone } from "@/utils/phone";
import { cn } from "@/lib/utils";
import {
  phoneChangeConfirmSchema,
  type PhoneChangeConfirmValues,
} from "../schemas/phoneChangeSchema";
import { useChangePhone } from "../hooks/useChangePhone";

export function PhoneSettings() {
  const t = useTranslations("Dashboard");
  const tAuth = useTranslations("Auth");
  const tValidation = useTranslations("Validation");
  const isRtl = useLocale() === "ar";
  const { user } = useAuthStore();
  const {
    requestCode,
    confirmChange,
    resendCode,
    resetFlow,
    isRequesting,
    isConfirming,
    codeSent,
    pendingPhone,
    countdown,
    canResend,
  } = useChangePhone();

  const currentPhone = user?.phone ? `+${user.phone.replace(/^\+/, "")}` : "—";

  const form = useForm<PhoneChangeConfirmValues>({
    resolver: zodResolver(phoneChangeConfirmSchema),
    defaultValues: {
      newPhone: "",
      code: "",
    },
  });

  useEffect(() => {
    if (codeSent && pendingPhone) {
      form.setValue("newPhone", `+${pendingPhone}`);
    }
  }, [codeSent, pendingPhone, form]);

  const handleRequestCode = async () => {
    const newPhone = form.getValues("newPhone");
    if (!newPhone.trim()) {
      form.setError("newPhone", { message: tValidation("phone_required") });
      return;
    }

    const normalized = toApiPhone(newPhone);
    if (user?.phone && normalized === toApiPhone(user.phone)) {
      form.setError("newPhone", { message: t("phone_change_same_number") });
      return;
    }

    await requestCode(newPhone);
  };

  const onSubmit = async (data: PhoneChangeConfirmValues) => {
    await confirmChange(data.newPhone, data.code);
    form.reset({ newPhone: "", code: "" });
  };

  const handleChangeNumber = () => {
    resetFlow();
    form.reset({ newPhone: "", code: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white p-8 rounded-[24px] border border-divider shadow-sm">
          <div className={cn("mb-6 flex w-full", isRtl ? "justify-end" : "justify-start")}>
            <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse text-right")}>
              <div className="p-3 bg-primary/5 rounded-2xl">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">{t("phone_settings_title")}</h3>
                <p className="text-sm text-content-secondary">{t("phone_settings_desc")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={cn("space-y-2", isRtl && "text-right")}>
              <FormLabel className="text-slate-600 font-medium ms-1 block w-full">
                {t("current_phone")}
              </FormLabel>
              <Input
                value={currentPhone}
                readOnly
                dir="ltr"
                className={cn(
                  "h-12 bg-slate-100/50 border-slate-200 cursor-not-allowed rounded-xl",
                  isRtl && "text-right",
                )}
              />
            </div>

            <UniPhoneInput
              control={form.control}
              name="newPhone"
              label={t("new_phone")}
              placeholder={tAuth("phone_placeholder")}
              required
              disabled={codeSent}
            />

            {codeSent && (
              <div className={cn("space-y-4 pt-2 border-t border-divider", isRtl && "text-right")}>
                <p className="text-sm text-content-secondary">
                  {t("phone_change_code_hint", {
                    phone: `+${pendingPhone}`,
                  })}
                </p>

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel
                        className={cn(
                          "text-slate-600 font-medium ms-1 w-full",
                          isRtl ? "self-end text-right" : "self-start",
                        )}
                      >
                        {tAuth("verification_code")}
                      </FormLabel>
                      <FormControl>
                        <OTPInput value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div
                  className={cn(
                    "flex items-center justify-between gap-3",
                    isRtl && "flex-row-reverse",
                  )}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleChangeNumber}
                    className="text-content-secondary"
                  >
                    {t("change_phone_number")}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={resendCode}
                    disabled={!canResend}
                    className="text-primary"
                  >
                    {countdown > 0
                      ? tAuth("resend_in", { seconds: countdown })
                      : tAuth("resend_code")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={cn("flex mt-6 w-full", isRtl ? "justify-start" : "justify-end")}
          dir="ltr"
        >
          {!codeSent ? (
            <Button
              type="button"
              onClick={handleRequestCode}
              disabled={isRequesting}
              className="h-12 px-8 min-w-[140px] rounded-xl font-bold bg-[#1B254B] hover:bg-[#1B254B]/90"
            >
              {isRequesting ? (
                <Loader2 className="me-2 h-4 w-4 animate-spin" />
              ) : null}
              {t("send_verification_code")}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isConfirming}
              className="h-12 px-8 min-w-[140px] rounded-xl font-bold bg-[#1B254B] hover:bg-[#1B254B]/90"
            >
              {isConfirming ? (
                <Loader2 className="me-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="me-2 h-4 w-4" />
              )}
              {t("confirm_phone_change")}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
