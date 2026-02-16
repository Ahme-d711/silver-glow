"use client";

import { useState } from "react";
import { loginUser } from "../actions/auth.service";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "next/navigation";

interface UseLoginReturn {
  login: (phone: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useLogin(): UseLoginReturn {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore((state) => state);

  const login = async (phone: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({ phone, password });

      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }

      // Update store with user and token
      if (response.data?.user) {
        setUser(response.data.user);
      }
      if (response.data?.accessToken || response.accessToken) {
        setToken(response.data?.accessToken || response.accessToken || "");
      }

      // Role-based redirection logic
      if (response.data?.user) {
        const user = response.data.user;
        const isAdmin = user.role === "admin";

        if (isAdmin) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during login";
      setError(errorMessage);

      // If error is about verification, redirect to verify page
      if (errorMessage.toLowerCase().includes("verify") && phone) {
        router.push(`/verify?phone=${phone}`);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

