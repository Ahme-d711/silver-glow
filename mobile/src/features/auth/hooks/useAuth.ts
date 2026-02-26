import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { authApi } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';
import { AuthResponse } from '../types/auth.types';
import { VerifyFormData, ResendFormData } from '../schemas/verifySchema';

export const useLoginMutation = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data: AuthResponse) => {
      await setAuth(data.user, data.accessToken);
      router.replace('/(main)');
    },
    onError: (error: Error, variables) => {
      if (error.message.toLowerCase().includes('verify')) {
        router.push({
          pathname: '/(auth)/verify',
          params: { phone: variables.phone }
        });
      }
    }
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (_, variables) => {
      router.push({
        pathname: '/(auth)/verify',
        params: { phone: variables.phone }
      });
    },
  });
};

export const useVerifyMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.verifyPhone,
    onSuccess: () => {
      // After verification, the user can login or we might auto-login them
      // For now, let's redirect to login since they verified their account
      router.replace('/(auth)/login');
    },
  });
};

export const useResendVerificationMutation = () => {
  return useMutation({
    mutationFn: authApi.resendVerification,
  });
};

export const useUpdateProfileMutation = () => {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (user) => {
      updateUser(user);
      router.back();
    },
  });
};
export const useChangePasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      router.back();
    },
  });
};
