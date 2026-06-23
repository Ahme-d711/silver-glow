import { forwardRef, useImperativeHandle } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { ShieldCheck, Loader2, Save } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { securitySchema, SecurityFormValues } from "../schemas/securitySchema";
import { useChangePassword } from "@/features/auth/hooks/useChangePassword";
import { cn } from "@/lib/utils";

export interface SecuritySettingsHandle {
  submit: () => Promise<void>;
}

export const SecuritySettings = forwardRef<SecuritySettingsHandle>((_, ref) => {
  const t = useTranslations("Dashboard");
  const isRtl = useLocale() === "ar";
  const { submitChangePassword, loading } = useChangePassword();

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema) as Resolver<SecurityFormValues>,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SecurityFormValues) => {
    try {
      await submitChangePassword(data);
      form.reset();
    } catch {
      // Error handled in hook toast
    }
  };

  useImperativeHandle(ref, () => ({
    submit: form.handleSubmit(onSubmit),
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white p-8 rounded-[24px] border border-divider shadow-sm">
          <div className={cn("mb-6 flex w-full", isRtl ? "justify-end" : "justify-start")}>
            <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse text-right")}>
              <div className="p-3 bg-primary/5 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">{t("security_settings_title")}</h3>
                <p className="text-sm text-content-secondary">
                  {t("security_settings_desc")}
                </p>
              </div>
            </div>
          </div>

          <div
            dir={isRtl ? "rtl" : "ltr"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <UniInput
              control={form.control}
              name="currentPassword"
              label={t("current_password")}
              placeholder="••••••••"
              type="password"
              className="md:col-span-2"
            />

            <UniInput
              control={form.control}
              name="newPassword"
              label={t("new_password")}
              placeholder="••••••••"
              type="password"
            />

            <UniInput
              control={form.control}
              name="confirmPassword"
              label={t("confirm_new_password")}
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>

        <div
          className={cn("flex mt-6 w-full", isRtl ? "justify-start" : "justify-end")}
          dir="ltr"
        >
          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-8 min-w-[140px] rounded-xl font-bold bg-[#1B254B] hover:bg-[#1B254B]/90"
          >
            {loading ? (
              <Loader2 className="me-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="me-2 h-4 w-4" />
            )}
            {t("save_changes")}
          </Button>
        </div>
      </form>
    </Form>
  );
});

SecuritySettings.displayName = "SecuritySettings";
