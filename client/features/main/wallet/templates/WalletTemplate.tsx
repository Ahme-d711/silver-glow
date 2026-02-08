"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useMyTransactions, useTopup } from "../hooks/useWallet";
import { TransactionCard } from "../components/TransactionCard";
import { Wallet, History, CreditCard, ChevronRight, Loader2, Plus, ArrowUpRight, ShieldCheck, Wallet2, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { SectionHeader } from "@/components/shared/SectionHeader";

export const WalletTemplate: React.FC = () => {
  const t = useTranslations("Wallet");
  const tShop = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { user } = useAuthStore();
  
  const [isTopupOpen, setIsTopupOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");
  
  const { data, isLoading } = useMyTransactions({ limit: 20 });
  const topupMutation = useTopup();
  
  const transactions = data?.data?.transactions || [];
  const balance = user?.totalBalance || 0;

  const handleTopup = async () => {
    const amount = parseFloat(topupAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    topupMutation.mutate({ amount, description: "Wallet recharge (Demo)" }, {
      onSuccess: () => {
        setIsTopupOpen(false);
        setTopupAmount("");
        toast.success(t("topup_success"));
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-content-tertiary mb-10">
          <Link href="/" className="hover:text-primary text-lg transition-colors">
            {tShop("home")}
          </Link>
          <ChevronRight className={cn("w-4 h-4 opacity-30", isRtl && "rotate-180")} />
          <span className="text-primary font-bold text-lg">
            {t("title")}
          </span>
        </nav>

        <div className="space-y-12">
          {/* Main Hero Section / Balance Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Premium Balance Card */}
              <div className="relative bg-primary p-8 md:p-10 rounded-[48px] text-white shadow-2xl shadow-primary/30 overflow-hidden group min-h-[280px] flex flex-col justify-between">
                {/* Abstract Background Patterns */}
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
                          {t("balance")}
                        </p>
                        <p className="text-sm font-bold">Silver Glow Wallet</p>
                      </div>
                    </div>
                    <Sparkles className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="mt-8">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl md:text-6xl font-black tracking-tightest">
                        {balance.toFixed(2)}
                      </span>
                      <span className="text-xl font-bold opacity-40 font-sans tracking-tight">
                        {tShop("currency")}
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

              {/* Action Side Card */}
              <div className="bg-white p-8 md:p-10 rounded-[48px] border border-divider/50 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-primary mb-3">
                    {t("topup")}
                  </h3>
                  <p className="text-sm text-content-tertiary leading-relaxed mb-8">
                    {t("topup_desc")} You can use your wallet balance for instantaneous, one-click checkout experience.
                  </p>
                </div>

                {!isTopupOpen ? (
                  <Button 
                    onClick={() => setIsTopupOpen(true)}
                    className="h-16 w-full rounded-2xl bg-primary text-white font-black hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 group active:scale-[0.98]"
                  >
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Add Funds Now
                  </Button>
                ) : (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="h-16 rounded-2xl bg-neutral-50 border-divider ps-6 pe-16 font-bold text-lg focus:ring-primary/10"
                        value={topupAmount}
                        onChange={(e) => setTopupAmount(e.target.value)}
                        autoFocus
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-primary opacity-30 text-xs">
                        {tShop("currency")}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        onClick={() => setIsTopupOpen(false)}
                        className="h-16 flex-1 rounded-2xl font-bold text-primary hover:bg-neutral-100"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleTopup}
                        disabled={topupMutation.isPending}
                        className="h-16 flex-[2] rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20"
                      >
                        {topupMutation.isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Confirm Top Up"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction History Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <SectionHeader className="mb-0" titleClassName="text-2xl font-black flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                {t("transactions")}
              </SectionHeader>
              <div className="h-10 w-10 rounded-full border border-divider flex items-center justify-center hover:bg-white cursor-pointer transition-colors shadow-sm">
                <History className="w-4 h-4 text-content-tertiary" />
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-5 bg-white border border-divider rounded-[48px]">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping h-8 w-8 bg-primary/20 rounded-full" />
                  <Loader2 className="w-8 h-8 animate-spin text-primary relative z-10" />
                </div>
                <p className="text-content-tertiary font-bold tracking-tight">Updating your Ledger...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-32 border border-divider bg-white rounded-[48px] shadow-sm">
                <div className="bg-neutral-50 p-8 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <History className="h-10 w-10 text-neutral-300" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Clean Ledger</h3>
                <p className="text-content-tertiary max-w-[200px] mx-auto text-sm leading-relaxed">
                  {t("no_transactions")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {transactions.map((transaction) => (
                  <TransactionCard key={transaction._id} transaction={transaction} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
