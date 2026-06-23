"use client";

import { useTranslations } from "next-intl";
import { DELIVERY_INFO_ITEMS } from "../../constants/delivery.constants";
import { DeliveryInfoCard } from "./DeliveryInfoCard";

export function DeliveryInfoSection() {
  const t = useTranslations("Delivery");

  return (
    <section className="grid md:grid-cols-2 gap-8">
      {DELIVERY_INFO_ITEMS.map((item) => (
        <DeliveryInfoCard
          key={item.id}
          item={item}
          title={t(item.titleKey)}
          description={t(item.descriptionKey)}
        />
      ))}
    </section>
  );
}
