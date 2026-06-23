"use client";

import { useTranslations } from "next-intl";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { PrivacyContent } from "../components/privacy-template/PrivacyContent";

export function PrivacyTemplate() {
  const t = useTranslations("Privacy");

  return (
    <StaticPageTemplate title={t("title")} description={t("description")}>
      <PrivacyContent />
    </StaticPageTemplate>
  );
}
