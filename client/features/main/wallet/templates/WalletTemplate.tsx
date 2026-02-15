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
import { StorefrontPageHeader } from "@/components/shared/StorefrontPageHeader";

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
      <div className="container mx-auto px-4 max-w-7xl">
        <StorefrontPageHeader
          title={t("title")}
          breadcrumbs={[
            { label: tShop("home"), href: "/" },
            { label: t("title") },
          ]}
          className="mb-10"
        />

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
                      <span className="text-5xl md:text-4xl font-black tracking-tightest">
                        {balance.toFixed(2)}
                      </span>
                      <span className="text-lg font-bold opacity-40 font-sans tracking-tight">
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
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-black text-primary">
                      {t("topup")}
                    </h3>
                    <div className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
                      {t("coming_soon")}
                    </div>
                  </div>
                  <p className="text-sm text-content-tertiary leading-relaxed mb-8">
                    {t("topup_unavailable")}
                  </p>
                </div>

                <div className="space-y-4 opacity-50 pointer-events-none grayscale-[0.5]">
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      disabled
                      className="h-16 rounded-2xl bg-neutral-50 border-divider ps-6 pe-16 font-bold text-lg"
                      value={topupAmount}
                      readOnly
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-primary opacity-30 text-xs">
                      {tShop("currency")}
                    </span>
                  </div>
                  <Button
                    disabled
                    className="h-16 w-full rounded-2xl bg-primary/20 text-primary/40 font-black"
                  >
                    {t("coming_soon")}
                  </Button>
                </div>
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
