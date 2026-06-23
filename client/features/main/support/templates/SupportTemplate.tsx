"use client";

import { useTranslations } from "next-intl";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { SupportContactSection } from "../components/support-template/SupportContactSection";
import { SupportFaqSection } from "../components/support-template/SupportFaqSection";

export function SupportTemplate() {
  const t = useTranslations("Support");

  return (
    <StaticPageTemplate title={t("title")} description={t("description")}>
      <div className="space-y-12">
        <SupportContactSection />
        <SupportFaqSection />
      </div>
    </StaticPageTemplate>
  );
}
