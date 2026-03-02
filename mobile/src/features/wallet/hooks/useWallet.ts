import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletApi, GetTransactionsParams } from '../services/wallet.service';
import { useAuthStore } from '../../auth/store/authStore';
import { useModalStore } from '../../../store/modalStore';
import { authApi } from '../../auth/services/auth.service';

export const useMyTransactions = (params?: GetTransactionsParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => walletApi.getMyTransactions(params),
  });
};

export const useTopup = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();
  const { openStatusModal } = useModalStore();

  return useMutation({
    mutationFn: ({ amount, description }: { amount: number; description?: string }) =>
      walletApi.topup(amount, description),
    onSuccess: async () => {
      // Refresh transactions list
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      
      try {
        // Fetch latest user profile to get updated balance
        const updatedUser = await authApi.getProfile();
        updateUser(updatedUser);
      } catch (error) {
        console.error('Failed to refresh user profile after topup', error);
      }

      openStatusModal({
        type: 'success',
        title: 'Success',
        message: 'Your balance has been updated successfully.',
      });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to top up balance. Please try again.';
      openStatusModal({
        type: 'error',
        title: 'Error',
        message,
      });
    },
  });
};
