"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { verifyPhone, resendVerification } from "../actions/auth.service";
import { useAuthStore } from "../stores/authStore";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface UseVerifyReturn {
  verify: (phone: string, code: string) => Promise<void>;
  resend: (phone: string) => Promise<void>;
  loading: boolean;
  resendLoading: boolean;
  countdown: number;
  canResend: boolean;
}

export function useVerify(): UseVerifyReturn {
  const router = useRouter();
  const t = useTranslations("Auth");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { setUser, setToken } = useAuthStore();

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

  const verify = async (phone: string, code: string) => {
    setLoading(true);
    try {
      const response = await verifyPhone({ phone, code });
      
      if (!response.success) {
        throw new Error(response.message || "Verification failed");
      }

      toast.success(t("verify_success") || "Phone verified successfully!");
      
      // Redirect to login page after successful verification
      router.push("/login");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid verification code";
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resend = async (phone: string) => {
    if (countdown > 0 || resendLoading) return;

    setResendLoading(true);
    try {
      const response = await resendVerification({ phone });
      
      if (!response.success) {
        throw new Error(response.message || "Failed to resend code");
      }

      toast.success(t("code_resent") || "Verification code sent again!");
      startCountdown(60);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error resending code";
      toast.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return {
    verify,
    resend,
    loading,
    resendLoading,
    countdown,
    canResend: countdown === 0 && !resendLoading,
  };
}
