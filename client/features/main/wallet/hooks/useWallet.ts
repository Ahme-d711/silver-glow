import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { walletService, GetTransactionsParams } from "../services/wallet.service";
import { toast } from "sonner";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] }); // Invalidating user to refresh balance
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "Failed to top up balance");
    },
  });
};
