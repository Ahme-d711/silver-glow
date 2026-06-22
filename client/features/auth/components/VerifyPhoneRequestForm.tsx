"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UniPhoneInput } from "@/components/shared/uni-form/UniPhoneInput";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../schemas/authSchemas";
import { useRequestPhoneVerification } from "../hooks/useRequestPhoneVerification";

const submitButtonClassName =
  "w-full h-14 cursor-pointer rounded-2xl text-base font-bold bg-[#1B254B] hover:bg-[#1B254B]/90 text-white";

export function VerifyPhoneRequestForm() {
  const t = useTranslations("Auth");
  const { requestVerification, loading } = useRequestPhoneVerification();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phone: "" },
  });

  async function onSubmit(data: ForgotPasswordValues) {
    try {
      await requestVerification(data.phone);
      toast.success(t("code_resent"));
    } catch {
      // Error handled in hook / toast from API message
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-8">
      <div>
        <h2 className="text-[40px] font-bold text-primary">{t("verify_phone")}</h2>
        <p className="font-medium text-primary/60">{t("verify_phone_request_instructions")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <UniPhoneInput
            control={form.control}
            name="phone"
            label={t("phone")}
            placeholder={t("phone_placeholder")}
          />

          <Button type="submit" className={submitButtonClassName} disabled={loading}>
            {t("send_verification_code")}
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          </Button>

          <div className="text-center pt-2">
            <Link href="/login" className="text-sm font-medium text-primary hover:underline">
              {t("back")}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
