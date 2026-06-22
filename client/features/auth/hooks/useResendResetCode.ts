"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { forgotPassword } from "../actions/auth.service";
import { toApiPhone } from "@/utils/phone";

interface UseResendResetCodeReturn {
  resend: (phone: string) => Promise<void>;
  resendLoading: boolean;
  countdown: number;
  canResend: boolean;
}

export function useResendResetCode(): UseResendResetCodeReturn {
  const t = useTranslations("Auth");
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = useCallback((seconds: number = 60) => {
    setCountdown(seconds);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const resend = async (phone: string) => {
    if (countdown > 0 || resendLoading || !phone) return;

    setResendLoading(true);
    try {
      const response = await forgotPassword({ phone: toApiPhone(phone) });

      if (!response.success) {
        throw new Error(response.message || "Failed to resend code");
      }

      toast.success(t("code_resent"));
      startCountdown(60);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error resending code";
      toast.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return {
    resend,
    resendLoading,
    countdown,
    canResend: countdown === 0 && !resendLoading,
  };
}
