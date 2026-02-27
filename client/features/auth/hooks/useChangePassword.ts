"use client";

import { useState } from "react";
import { changePassword } from "../actions/auth.service";
import { SecurityFormValues } from "@/features/dashboard/settings/schemas/securitySchema";
import { toast } from "sonner";

interface UseChangePasswordReturn {
  submitChangePassword: (data: SecurityFormValues) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useChangePassword(): UseChangePasswordReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitChangePassword = async (data: SecurityFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await changePassword(data);

      if (!response.success) {
        throw new Error(response.message || "Failed to change password");
      }

      toast.success(response.message || "Password changed successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitChangePassword, loading, error };
}
