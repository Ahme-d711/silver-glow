"use client";

import { Control } from "react-hook-form";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { OTPInput } from "./OTPInput";
import type { ResetPasswordValues } from "../schemas/authSchemas";

const submitButtonClassName =
  "w-full h-14 cursor-pointer rounded-2xl text-base font-bold bg-[#1B254B] hover:bg-[#1B254B]/90 text-white";

interface ResetCodeStepProps {
  control: Control<ResetPasswordValues>;
  loading: boolean;
  codeLength: number;
  onContinue: () => void;
  onResend: () => void;
  resendLoading: boolean;
  canResend: boolean;
  countdown: number;
}

export function ResetCodeStep({
  control,
  loading,
  codeLength,
  onContinue,
  onResend,
  resendLoading,
  canResend,
  countdown,
}: ResetCodeStepProps) {
  const t = useTranslations("Auth");

  return (
    <motion.form
      key="code-step"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.25 }}
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
      className="space-y-6"
    >
      <FormField
        control={control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <OTPInput value={field.value} onChange={field.onChange} disabled={loading} />
            </FormControl>
            <FormMessage className="text-center" />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        className={submitButtonClassName}
        disabled={loading || codeLength !== 6}
      >
        {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
        {t("verify")}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onResend}
          disabled={!canResend || resendLoading}
          className="text-sm font-bold text-primary hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer"
        >
          {resendLoading ? <Loader className="h-4 w-4 animate-spin inline mr-2" /> : null}
          {canResend ? t("resend_code") : t("resend_in", { seconds: countdown })}
        </button>
      </div>

      <div className="text-center pt-2">
        <Link href="/login" className="text-sm font-medium text-primary hover:underline">
          {t("back")}
        </Link>
      </div>
    </motion.form>
  );
}
