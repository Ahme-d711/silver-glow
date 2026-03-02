export type TransactionType = "TOPUP" | "PURCHASE" | "REFUND" | "BONUS";
export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description?: string;
  referenceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletData {
  transactions: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
