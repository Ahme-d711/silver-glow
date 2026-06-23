"use client";

import StaticPageTemplate from "@/components/StaticPageTemplate";
import { useLocale, useTranslations } from "next-intl";
import { useSettings } from "@/features/dashboard/settings/hooks/useSettings";
import {
  DEFAULT_TERMS_AR,
  DEFAULT_TERMS_EN,
} from "@/features/main/legal/constants/defaultTerms";
import { PageLoadingState } from "@/components/shared/PageLoadingState";

function formatTermsContent(content: string) {
  return content.split("\n\n").map((block, index) => {
    const lines = block.split("\n");
    const title = lines[0]?.trim();
    const body = lines.slice(1).join("\n").trim();

    if (!title) return null;

    const isNumberedHeading = /^\d+\.\s/.test(title);

    if (isNumberedHeading && body) {
      return (
        <section key={index}>
          <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
          <p className="whitespace-pre-wrap">{body}</p>
        </section>
      );
    }

    return (
      <p key={index} className="whitespace-pre-wrap">
        {block}
      </p>
    );
  });
}

export default function TermsPage() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const { settings, isLoading } = useSettings();

  const content =
    locale === "ar"
      ? settings?.termsConditionsAr?.trim() || DEFAULT_TERMS_AR
      : settings?.termsConditionsEn?.trim() || DEFAULT_TERMS_EN;

  return (
    <StaticPageTemplate
      title={t("terms_conditions")}
      description={t("terms_description")}
    >
      {isLoading ? (
        <PageLoadingState minHeight="min-h-[280px]" />
      ) : (
        <div className="space-y-6">{formatTermsContent(content)}</div>
      )}
    </StaticPageTemplate>
  );
}
