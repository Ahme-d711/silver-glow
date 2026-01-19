"use client";

import { useState } from "react";
import { loginUser } from "../actions/auth.service";
import { useAuthStore } from "../stores/authStore";

interface UseLoginReturn {
  login: (phone: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useLogin(): UseLoginReturn {
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

      // Use window.location for full page redirect to ensure middleware sees the cookie
      window.location.href = "/dashboard";
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during login";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

