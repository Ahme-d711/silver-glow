"use client";

import { useState } from "react";
import { forgotPassword } from "../actions/auth.service";
import { useRouter } from "next/navigation";

interface UseForgotPasswordReturn {
  submitForgotPassword: (phone: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForgotPassword = async (phone: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await forgotPassword({ phone });

      if (!response.success) {
        throw new Error(response.message || "Failed to send reset code");
      }

      // Redirect to reset password page with phone
      router.push(`/reset-password?phone=${phone}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitForgotPassword, loading, error };
}
