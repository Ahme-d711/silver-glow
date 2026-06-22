"use client";

import { useState } from "react";
import { toast } from "sonner";
import { verifyResetPasswordCode } from "../actions/auth.service";
import { toApiPhone } from "@/utils/phone";

interface UseVerifyResetCodeReturn {
  verifyCode: (phone: string, code: string) => Promise<{ success: boolean; message?: string }>;
  loading: boolean;
  error: string | null;
}

export function useVerifyResetCode(): UseVerifyResetCodeReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyCode = async (
    phone: string,
    code: string
  ): Promise<{ success: boolean; message?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await verifyResetPasswordCode({ phone: toApiPhone(phone), code });

      if (!response.success) {
        throw new Error(response.message || "Invalid or expired verification code");
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { verifyCode, loading, error };
}
