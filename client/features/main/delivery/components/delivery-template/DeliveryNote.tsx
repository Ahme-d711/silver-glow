"use client";

import { useTranslations } from "next-intl";

export function DeliveryNote() {
  const t = useTranslations("Delivery");

  return (
    <p className="text-center italic text-content-secondary">{t("note")}</p>
  );
}
