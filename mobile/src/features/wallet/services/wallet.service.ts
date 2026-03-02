import { axiosInstance } from '../../../services/api/axios';
import { WalletData, Transaction } from '../types/wallet.types';
import { ApiResponse } from '../../auth/types/auth.types';

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
}

export const walletApi = {
  getMyTransactions: async (params?: GetTransactionsParams): Promise<WalletData> => {
    const response = await axiosInstance.get<ApiResponse<WalletData>>('/transactions', {
      params,
    });
    return response.data.data;
  },

  topup: async (amount: number, description?: string): Promise<{ transaction: Transaction }> => {
    const response = await axiosInstance.post<ApiResponse<{ transaction: Transaction }>>(
      '/transactions/topup',
      { amount, description }
    );
    return response.data.data;
  },
};
