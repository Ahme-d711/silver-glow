"use client";

import { History, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TransactionCard } from "../TransactionCard";
import type { WalletTransactionsSectionProps } from "../../types/wallet-template.types";

export function WalletTransactionsLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-5 bg-white border border-divider rounded-[48px]">
      <div className="relative">
        <div className="absolute inset-0 animate-ping h-8 w-8 bg-primary/20 rounded-full" />
        <Loader2 className="w-8 h-8 animate-spin text-primary relative z-10" />
      </div>
      <p className="text-content-tertiary font-bold tracking-tight">Updating your Ledger...</p>
    </div>
  );
}

export function WalletTransactionsEmpty({ message }: { message: string }) {
  return (
    <div className="text-center py-32 border border-divider bg-white rounded-[48px] shadow-sm">
      <div className="bg-neutral-50 p-8 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <History className="h-10 w-10 text-neutral-300" />
      </div>
      <h3 className="text-lg font-bold text-primary mb-2">Clean Ledger</h3>
      <p className="text-content-tertiary max-w-[200px] mx-auto text-sm leading-relaxed">
        {message}
      </p>
    </div>
  );
}

export function WalletTransactionsSection({
  title,
  transactions,
  isLoading,
  emptyMessage,
}: WalletTransactionsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <SectionHeader className="mb-0" titleClassName="text-2xl font-black flex items-center gap-3">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          {title}
        </SectionHeader>
        <div className="h-10 w-10 rounded-full border border-divider flex items-center justify-center hover:bg-white cursor-pointer transition-colors shadow-sm">
          <History className="w-4 h-4 text-content-tertiary" />
        </div>
      </div>

      {isLoading ? (
        <WalletTransactionsLoading />
      ) : transactions.length === 0 ? (
        <WalletTransactionsEmpty message={emptyMessage} />
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}
