import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { authApi } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';
import { AuthResponse } from '../types/auth.types';

export const useLoginMutation = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data: AuthResponse) => {
      await setAuth(data.user, data.accessToken);
      router.replace('/(main)');
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (data: AuthResponse) => {
      await setAuth(data.user, data.accessToken);
      router.replace('/(main)');
    },
  });
};
