"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { requestPhoneChange, confirmPhoneChange } from "@/features/auth/actions/auth.service";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { toApiPhone } from "@/utils/phone";

export function useChangePhone() {
  const t = useTranslations("Dashboard");
  const { setUser } = useAuthStore();
  const [isRequesting, setIsRequesting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [pendingPhone, setPendingPhone] = useState("");
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

  const requestCode = async (newPhone: string) => {
    setIsRequesting(true);
    try {
      const normalizedPhone = toApiPhone(newPhone);
      const response = await requestPhoneChange({ newPhone: normalizedPhone });

      if (!response.success) {
        throw new Error(response.message || "Failed to send verification code");
      }

      setPendingPhone(normalizedPhone);
      setCodeSent(true);
      startCountdown(60);
      toast.success(response.message || t("phone_change_code_sent"));
    } catch (err) {
      const message = err instanceof Error ? err.message : t("phone_change_request_failed");
      toast.error(message);
      throw err;
    } finally {
      setIsRequesting(false);
    }
  };

  const confirmChange = async (newPhone: string, code: string) => {
    setIsConfirming(true);
    try {
      const normalizedPhone = toApiPhone(newPhone);
      const response = await confirmPhoneChange({
        newPhone: normalizedPhone,
        code,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to update phone number");
      }

      if (response.data?.user) {
        setUser(response.data.user);
      }

      setCodeSent(false);
      setPendingPhone("");
      setCountdown(0);
      toast.success(response.message || t("phone_change_success"));
    } catch (err) {
      const message = err instanceof Error ? err.message : t("phone_change_confirm_failed");
      toast.error(message);
      throw err;
    } finally {
      setIsConfirming(false);
    }
  };

  const resendCode = async () => {
    if (!pendingPhone || countdown > 0 || isRequesting) return;
    await requestCode(pendingPhone);
  };

  const resetFlow = () => {
    setCodeSent(false);
    setPendingPhone("");
    setCountdown(0);
  };

  return {
    requestCode,
    confirmChange,
    resendCode,
    resetFlow,
    isRequesting,
    isConfirming,
    codeSent,
    pendingPhone,
    countdown,
    canResend: codeSent && countdown === 0 && !isRequesting,
  };
}
