"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WalletTopupCardProps } from "../../types/wallet-template.types";

export function WalletTopupCard({
  title,
  comingSoonLabel,
  unavailableMessage,
  currencyLabel,
}: WalletTopupCardProps) {
  return (
    <div className="bg-white p-8 md:p-10 rounded-[48px] border border-divider/50 shadow-sm flex flex-col justify-between">
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-black text-primary">{title}</h3>
          <div className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
            {comingSoonLabel}
          </div>
        </div>
        <p className="text-sm text-content-tertiary leading-relaxed mb-8">
          {unavailableMessage}
        </p>
      </div>

      <div className="space-y-4 opacity-50 pointer-events-none grayscale-[0.5]">
        <div className="relative">
          <Input
            type="number"
            placeholder="0.00"
            disabled
            className="h-16 rounded-2xl bg-neutral-50 border-divider ps-6 pe-16 font-bold text-lg"
            value=""
            readOnly
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-primary opacity-30 text-xs">
            {currencyLabel}
          </span>
        </div>
        <Button
          disabled
          className="h-16 w-full rounded-2xl bg-primary/20 text-primary/40 font-black"
        >
          {comingSoonLabel}
        </Button>
      </div>
    </div>
  );
}
