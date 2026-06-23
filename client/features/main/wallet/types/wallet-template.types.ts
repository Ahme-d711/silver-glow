import type { Transaction } from "./index";

export interface WalletBalanceCardProps {
  balance: number;
  currencyLabel: string;
  balanceLabel: string;
}

export interface WalletTopupCardProps {
  title: string;
  comingSoonLabel: string;
  unavailableMessage: string;
  currencyLabel: string;
}

export interface WalletTransactionsSectionProps {
  title: string;
  transactions: Transaction[];
  isLoading: boolean;
  emptyMessage: string;
}
