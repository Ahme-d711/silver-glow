"use client";

import { useTranslations } from "next-intl";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { DeliveryRatesTable } from "../components/delivery-template/DeliveryRatesTable";
import { DeliveryInfoSection } from "../components/delivery-template/DeliveryInfoSection";
import { DeliveryNote } from "../components/delivery-template/DeliveryNote";

export function DeliveryTemplate() {
  const t = useTranslations("Delivery");

  return (
    <StaticPageTemplate title={t("title")} description={t("description")}>
      <div className="space-y-12">
        <DeliveryRatesTable />
        <DeliveryInfoSection />
        <DeliveryNote />
      </div>
    </StaticPageTemplate>
  );
}
