"use client";

import { useState } from "react";
import { resetPassword } from "../actions/auth.service";
import { useRouter } from "next/navigation";
import { ResetPasswordValues } from "../schemas/authSchemas";

interface UseResetPasswordReturn {
  submitResetPassword: (data: ResetPasswordValues) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useResetPassword(): UseResetPasswordReturn {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitResetPassword = async (data: ResetPasswordValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await resetPassword(data);

      if (!response.success) {
        throw new Error(response.message || "Failed to reset password");
      }

      // Redirect to login page
      router.push("/login");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitResetPassword, loading, error };
}
