"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { Form } from "@/components/ui/form";
import { resetPasswordSchema, type ResetPasswordValues } from "../schemas/authSchemas";
import { useResetPassword } from "../hooks/useResetPassword";
import { useVerifyResetCode } from "../hooks/useVerifyResetCode";
import { useResendResetCode } from "../hooks/useResendResetCode";
import { ResetCodeStep } from "./ResetCodeStep";
import { ResetNewPasswordStep } from "./ResetNewPasswordStep";
import { normalizePhoneNumber } from "@/utils/phone";

type ResetStep = "code" | "password";

export function ResetPasswordForm() {
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const phone = normalizePhoneNumber(searchParams.get("phone") || "");

  const { submitResetPassword, loading: resetting } = useResetPassword();
  const { verifyCode, loading: verifying } = useVerifyResetCode();
  const { resend, resendLoading, countdown, canResend } = useResendResetCode();
  const [step, setStep] = useState<ResetStep>("code");

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone,
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (phone) {
      form.setValue("phone", phone);
    }
  }, [phone, form]);

  const code = useWatch({ control: form.control, name: "code" });

  async function handleCodeContinue() {
    const isValid = await form.trigger("code");
    if (!isValid) return;

    const { phone: formPhone, code } = form.getValues();
    const result = await verifyCode(formPhone, code);
    if (result.success) {
      setStep("password");
      return;
    }

    if (result.message) {
      form.setError("code", { message: result.message });
    }
  }

  const handleResend = () => {
    const formPhone = form.getValues("phone") || phone;
    if (!formPhone) return;
    resend(formPhone);
  };

  async function onSubmit(data: ResetPasswordValues) {
    try {
      await submitResetPassword(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      const isCodeError = /verification code|invalid or expired/i.test(message);

      if (isCodeError) {
        setStep("code");
        form.setError("code", { message });
        return;
      }

      if (message) {
        form.setError("password", { message });
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-8">
      <div>
        <h2 className="text-[40px] font-bold text-primary">{t("reset_password")}</h2>
        <p className="font-medium text-primary/60">
          {step === "code" ? t("verification_instructions") : t("new_password_instructions")}
        </p>
      </div>

      <Form {...form}>
        <AnimatePresence mode="wait">
          {step === "code" ? (
            <ResetCodeStep
              control={form.control}
              loading={verifying}
              codeLength={code?.length ?? 0}
              onContinue={handleCodeContinue}
              onResend={handleResend}
              resendLoading={resendLoading}
              canResend={canResend}
              countdown={countdown}
            />
          ) : (
            <ResetNewPasswordStep
              control={form.control}
              loading={resetting}
              onSubmit={form.handleSubmit(onSubmit)}
              onBack={() => setStep("code")}
            />
          )}
        </AnimatePresence>
      </Form>
    </div>
  );
}
