"use client";

import { Control, UseFormHandleSubmit } from "react-hook-form";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import type { ResetPasswordValues } from "../schemas/authSchemas";

const submitButtonClassName =
  "w-full h-14 cursor-pointer rounded-2xl text-base font-bold bg-[#1B254B] hover:bg-[#1B254B]/90 text-white";

interface ResetNewPasswordStepProps {
  control: Control<ResetPasswordValues>;
  loading: boolean;
  onSubmit: ReturnType<UseFormHandleSubmit<ResetPasswordValues>>;
  onBack: () => void;
}

export function ResetNewPasswordStep({
  control,
  loading,
  onSubmit,
  onBack,
}: ResetNewPasswordStepProps) {
  const t = useTranslations("Auth");

  return (
    <motion.form
      key="password-step"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <UniInput
        control={control}
        name="password"
        label={t("new_password")}
        placeholder=""
        type="password"
        autoComplete="new-password"
      />

      <UniInput
        control={control}
        name="confirmPassword"
        label={t("confirm_password")}
        placeholder=""
        type="password"
        autoComplete="new-password"
      />

      <Button type="submit" className={submitButtonClassName} disabled={loading}>
        {t("reset_password")}
        {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      </Button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-primary hover:underline cursor-pointer"
        >
          {t("back")}
        </button>
      </div>
    </motion.form>
  );
}
