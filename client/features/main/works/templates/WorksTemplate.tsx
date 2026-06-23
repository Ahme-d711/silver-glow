"use client";

import { useTranslations } from "next-intl";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { WorksShowcaseSection } from "../components/works-template/WorksShowcaseSection";
import { WorksCtaSection } from "../components/works-template/WorksCtaSection";

export function WorksTemplate() {
  const t = useTranslations("Works");

  return (
    <StaticPageTemplate title={t("title")} description={t("description")}>
      <div className="space-y-12">
        <WorksShowcaseSection />
        <WorksCtaSection />
      </div>
    </StaticPageTemplate>
  );
}
