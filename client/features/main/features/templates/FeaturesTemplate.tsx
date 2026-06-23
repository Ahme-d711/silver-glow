"use client";

import { useTranslations } from "next-intl";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { FeaturesGrid } from "../components/features-template/FeaturesGrid";

export function FeaturesTemplate() {
  const t = useTranslations("Features");

  return (
    <StaticPageTemplate title={t("title")} description={t("description")}>
      <FeaturesGrid />
    </StaticPageTemplate>
  );
}
