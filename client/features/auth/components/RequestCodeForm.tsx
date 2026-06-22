"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../schemas/authSchemas";
import { useForgotPassword } from "../hooks/useForgotPassword";

const submitButtonClassName =
  "w-full h-14 cursor-pointer rounded-2xl text-base font-bold bg-[#1B254B] hover:bg-[#1B254B]/90 text-white";

export function RequestCodeForm() {
  const t = useTranslations("Auth");
  const { submitForgotPassword, loading } = useForgotPassword();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phone: "" },
  });

  async function onSubmit(data: ForgotPasswordValues) {
    try {
      await submitForgotPassword(data.phone);
      toast.success("Verification code sent via WhatsApp!");
    } catch {
      // Error handled in hook
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-8">
      <div>
        <h2 className="text-[40px] font-bold text-primary">{t("reset_password")}</h2>
        <p className="font-medium text-primary/60">
          Enter your phone number to receive a verification code.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <UniInput
            control={form.control}
            name="phone"
            label={t("phone")}
            placeholder=""
            type="tel"
            autoComplete="tel"
          />

          <Button type="submit" className={submitButtonClassName} disabled={loading}>
            Send Code
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
