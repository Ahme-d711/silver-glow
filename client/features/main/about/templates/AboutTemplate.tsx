"use client";

import { useTranslations } from "next-intl";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { AboutContent } from "../components/about-template/AboutContent";

export function AboutTemplate() {
  const t = useTranslations("About");

  return (
    <StaticPageTemplate title={t("title")} description={t("description")}>
      <AboutContent />
    </StaticPageTemplate>
  );
}
