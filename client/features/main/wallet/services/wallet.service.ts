import clientAxios from "@/lib/axios/clientAxios";
import { WalletData, Transaction } from "../types";
import { ApiResponse } from "@/types";

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
}

export const walletService = {
  getMyTransactions: async (params?: GetTransactionsParams) => {
    const response = await clientAxios.get<ApiResponse<WalletData>>("/transactions", {
      params,
    });
    return response.data;
  },

  topup: async (amount: number, description?: string) => {
    const response = await clientAxios.post<ApiResponse<{ transaction: Transaction }>>(
      "/transactions/topup",
      { amount, description }
    );
    return response.data;
  },
};
