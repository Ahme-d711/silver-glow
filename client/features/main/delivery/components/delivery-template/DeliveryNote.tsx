"use client";

import { useTranslations } from "next-intl";
import { Info } from "lucide-react";

export function DeliveryNote() {
  const t = useTranslations("Delivery");

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-divider bg-primary/5 px-5 py-4 text-start">
      <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" />
      <p className="text-sm md:text-base text-content-secondary leading-relaxed">
        {t("note")}
      </p>
    </div>
  );
}
