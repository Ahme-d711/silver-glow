"use client";

import { useTranslations } from "next-intl";
import { DELIVERY_INFO_ITEMS } from "../../constants/delivery.constants";
import { DeliveryInfoCard } from "./DeliveryInfoCard";

export function DeliveryInfoSection() {
  const t = useTranslations("Delivery");

  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("info_title")}
        </h2>
        <p className="text-content-secondary leading-relaxed">{t("info_desc")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {DELIVERY_INFO_ITEMS.map((item) => (
          <DeliveryInfoCard
            key={item.id}
            item={item}
            title={t(item.titleKey)}
            description={t(item.descriptionKey)}
          />
        ))}
      </div>
    </section>
  );
}
