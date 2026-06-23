"use client";

import { useTranslations } from "next-intl";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useMyTransactions } from "../hooks/useWallet";
import { StorefrontPageHeader } from "@/components/shared/StorefrontPageHeader";
import { WalletHeroSection } from "../components/wallet-template/WalletHeroSection";
import { WalletTransactionsSection } from "../components/wallet-template/WalletTransactionsSection";

export const WalletTemplate = () => {
  const t = useTranslations("Wallet");
  const tShop = useTranslations("Shop");
  const { user } = useAuthStore();

  const { data, isLoading } = useMyTransactions({ limit: 20 });

  const transactions = data?.data?.transactions || [];
  const balance = user?.totalBalance || 0;

  return (
    <div className="min-h-screen pt-40 pb-24">
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
          <WalletHeroSection
            balance={balance}
            currencyLabel={tShop("currency")}
            balanceLabel={t("balance")}
            title={t("topup")}
            comingSoonLabel={t("coming_soon")}
            unavailableMessage={t("topup_unavailable")}
          />

          <WalletTransactionsSection
            title={t("transactions")}
            transactions={transactions}
            isLoading={isLoading}
            emptyMessage={t("no_transactions")}
          />
        </div>
      </div>
    </div>
  );
};
