"use client";

import { WalletBalanceCard } from "./WalletBalanceCard";
import { WalletTopupCard } from "./WalletTopupCard";
import type { WalletBalanceCardProps } from "../../types/wallet-template.types";
import type { WalletTopupCardProps } from "../../types/wallet-template.types";

type WalletHeroSectionProps = WalletBalanceCardProps & WalletTopupCardProps;

export function WalletHeroSection(props: WalletHeroSectionProps) {
  const { balance, currencyLabel, balanceLabel, ...topupProps } = props;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <WalletBalanceCard
          balance={balance}
          currencyLabel={currencyLabel}
          balanceLabel={balanceLabel}
        />
        <WalletTopupCard {...topupProps} />
      </div>
    </div>
  );
}
