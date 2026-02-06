"use client";

import React from "react";
import { Transaction } from "../types";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, RefreshCcw, Gift, Clock, CheckCircle2, XCircle, MoreVertical } from "lucide-react";

interface TransactionCardProps {
  transaction: Transaction;
}

const typeConfig = {
  TOPUP: { label: "type_topup", icon: ArrowUpRight, color: "text-green-600 bg-green-50 border-green-100/50" },
  PURCHASE: { label: "type_purchase", icon: ArrowDownLeft, color: "text-blue-600 bg-blue-50 border-blue-100/50" },
  REFUND: { label: "type_refund", icon: RefreshCcw, color: "text-purple-600 bg-purple-50 border-purple-100/50" },
  BONUS: { label: "type_bonus", icon: Gift, color: "text-amber-600 bg-amber-50 border-amber-100/50" },
};

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const t = useTranslations("Wallet");
  const tShop = useTranslations("Shop");
  const locale = useLocale();
  
  const config = typeConfig[transaction.type] || typeConfig.TOPUP;
  const Icon = config.icon;
  
  const isPositive = transaction.amount > 0;
  const statusColor = transaction.status === "COMPLETED" ? "text-green-600" : transaction.status === "FAILED" ? "text-red-500" : "text-amber-500";

  return (
    <div className="bg-white border border-divider/50 rounded-[32px] p-5 flex items-center justify-between gap-4 group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-center gap-5">
        <div className={cn(
          "h-14 w-14 rounded-2xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
          config.color
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-black text-primary tracking-tight">
            {t(config.label)}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-content-tertiary font-medium">
              {new Date(transaction.createdAt).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <span className="w-1 h-1 rounded-full bg-divider" />
            <div className="flex items-center gap-1">
              <span className={cn("text-[10px] font-black uppercase tracking-widest", statusColor)}>
                {t(`status_${transaction.status.toLowerCase()}` as any)}
              </span>
            </div>
          </div>
          {transaction.description && (
            <p className="text-[11px] text-content-tertiary mt-2 italic max-w-[200px] sm:max-w-md truncate opacity-60">
              {transaction.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={cn(
            "text-xl font-black tracking-tight",
            isPositive ? "text-green-600" : "text-primary"
          )}>
            {isPositive ? "+" : ""}{transaction.amount.toFixed(2)}
            <span className="text-[10px] font-bold text-content-tertiary ml-1 uppercase">{tShop("currency")}</span>
          </p>
          {transaction.referenceId && (
            <p className="text-[9px] text-content-tertiary font-mono uppercase tracking-tighter opacity-40 mt-1">
              # {transaction.referenceId.slice(-8)}
            </p>
          )}
        </div>
        <button className="h-10 w-10 rounded-xl hover:bg-neutral-50 flex items-center justify-center text-content-tertiary transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
