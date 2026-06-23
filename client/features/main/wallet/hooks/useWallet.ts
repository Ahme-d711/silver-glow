import { useQuery, useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { walletService, GetTransactionsParams } from "../services/wallet.service";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { toast } from "sonner";

export async function refreshWalletState(queryClient: QueryClient) {
  await queryClient.invalidateQueries({ queryKey: ["transactions"] });
  await useAuthStore.getState().refreshUser();
}

export const useMyTransactions = (params?: GetTransactionsParams) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => walletService.getMyTransactions(params),
  });
};

export const useTopup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, description }: { amount: number; description?: string }) =>
      walletService.topup(amount, description),
    onSuccess: async () => {
      await refreshWalletState(queryClient);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "Failed to top up balance");
    },
  });
};
