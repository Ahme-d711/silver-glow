import React from "react";

interface SummarySectionProps {
  t: (key: string) => string;
  tCommon: (key: string) => string;
  itemCount: number;
  totalAmount: string;
}

export function SummarySection({
  t,
  tCommon,
  itemCount,
  totalAmount,
}: SummarySectionProps) {
  return (
    <div className="p-4 bg-primary/5 border border-primary/10 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-lg text-content-secondary font-medium">
        {t("total_items")}: <span className="text-primary font-bold text-xl ml-2">{itemCount}</span>
      </div>
      <div className="text-lg font-bold text-primary">
        {t("total_amount")}: {totalAmount} {tCommon("currency")}
      </div>
    </div>
  );
}
