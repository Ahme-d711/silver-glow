"use client";

import { useState } from "react";
import { resetPassword } from "../actions/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { ResetPasswordValues } from "../schemas/authSchemas";

interface UseResetPasswordReturn {
  submitResetPassword: (data: ResetPasswordValues) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useResetPassword(): UseResetPasswordReturn {
  const t = useTranslations("Auth");
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

      toast.success(t("reset_password_success"));
      // Redirect to login page
      router.push("/login");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { submitResetPassword, loading, error };
}
