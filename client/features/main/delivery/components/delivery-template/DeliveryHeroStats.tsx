"use client";

import { useTranslations } from "next-intl";
import { DELIVERY_STATS } from "../../constants/delivery.stats";

export function DeliveryHeroStats() {
  const t = useTranslations("Delivery");

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8 pt-2">
      {DELIVERY_STATS.map((stat) => (
        <div key={stat.id} className="text-center md:text-start">
          <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {t(stat.valueKey)}
          </p>
          <p className="text-xs md:text-sm text-white/65 mt-1 font-medium">
            {t(stat.labelKey)}
          </p>
        </div>
      ))}
    </div>
  );
}
