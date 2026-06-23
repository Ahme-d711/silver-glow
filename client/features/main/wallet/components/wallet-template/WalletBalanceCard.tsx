"use client";

import { ShieldCheck, Sparkles, Wallet2 } from "lucide-react";
import type { WalletBalanceCardProps } from "../../types/wallet-template.types";

export function WalletBalanceCard({
  balance,
  currencyLabel,
  balanceLabel,
}: WalletBalanceCardProps) {
  return (
    <div className="relative bg-primary p-8 md:p-10 rounded-[48px] text-white shadow-2xl shadow-primary/30 overflow-hidden group min-h-[280px] flex flex-col justify-between">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-125" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/10 rounded-[inherit] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <Wallet2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 leading-none mb-1">
                {balanceLabel}
              </p>
              <p className="text-sm font-bold">Silver Glow Wallet</p>
            </div>
          </div>
          <Sparkles className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="mt-8">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl md:text-4xl font-black tracking-tightest">
              {balance.toFixed(2)}
            </span>
            <span className="text-lg font-bold opacity-40 font-sans tracking-tight">
              {currencyLabel}
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 text-[10px] font-bold opacity-40 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURED GATEWAY</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-white/40" />
          <span>LIFETIME STATUS</span>
        </div>
      </div>
    </div>
  );
}
