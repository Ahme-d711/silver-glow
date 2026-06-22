"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resendVerification } from "../actions/auth.service";
import { toApiPhone } from "@/utils/phone";

interface UseRequestPhoneVerificationReturn {
  requestVerification: (phone: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useRequestPhoneVerification(): UseRequestPhoneVerificationReturn {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestVerification = async (phone: string) => {
    setLoading(true);
    setError(null);

    try {
      const normalizedPhone = toApiPhone(phone);
      const response = await resendVerification({ phone: normalizedPhone });

      if (!response.success) {
        throw new Error(response.message || "Failed to send verification code");
      }

      router.push(`/verify?phone=${encodeURIComponent(normalizedPhone)}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { requestVerification, loading, error };
}
