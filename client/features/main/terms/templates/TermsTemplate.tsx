"use client";

import { useLocale } from "next-intl";
import { PageLoadingState } from "@/components/shared/PageLoadingState";
import { useSettings } from "@/features/dashboard/settings/hooks/useSettings";
import { TermsContent } from "../components/terms-template/TermsContent";
import { TermsHeader } from "../components/terms-template/TermsHeader";

export function TermsTemplate() {
  const locale = useLocale();
  const { settings, isLoading } = useSettings();

  const customContent =
    locale === "ar"
      ? settings?.termsConditionsAr?.trim()
      : settings?.termsConditionsEn?.trim();

  return (
    <div className="min-h-screen bg-background">
      <TermsHeader />
      <div className="container max-w-5xl mx-auto px-4 py-12 md:py-16">
        {isLoading ? (
          <PageLoadingState minHeight="min-h-[280px]" />
        ) : (
          <TermsContent customContent={customContent || undefined} />
        )}
      </div>
    </div>
  );
}
