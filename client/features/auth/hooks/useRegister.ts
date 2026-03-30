"use client";

import { useState } from "react";
import { registerUser } from "../actions/auth.service";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "next/navigation";
import { type RegisterFormValues } from "../schemas/authSchemas";

interface UseRegisterReturn {
  register: (values: RegisterFormValues) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useRegister(): UseRegisterReturn {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore((state) => state);

  const register = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);

    try {
      // Create payload for server - removing confirmPassword as it's UI only
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: "user", // Default role for public registration
      };

      const response = await registerUser(payload);
      
      if (!response.success) {
        throw new Error(response.message || "Registration failed");
      }

      // After registration, redirect to verification page
      router.push(`/verify?phone=${values.phone}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during registration";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
