"use client";

import { useLocale } from "next-intl";
import { PageLoadingState } from "@/components/shared/PageLoadingState";
import { useSettings } from "@/features/dashboard/settings/hooks/useSettings";
import { PrivacyHeader } from "../components/privacy-template/PrivacyHeader";
import { PrivacyContent } from "../components/privacy-template/PrivacyContent";

export function PrivacyTemplate() {
  const locale = useLocale();
  const { settings, isLoading } = useSettings();

  const customContent =
    locale === "ar"
      ? settings?.privacyPolicyAr?.trim()
      : settings?.privacyPolicyEn?.trim();

  return (
    <div className="min-h-screen bg-background">
      <PrivacyHeader />
      <div className="container max-w-5xl mx-auto px-4 py-12 md:py-16">
        {isLoading ? (
          <PageLoadingState minHeight="min-h-[280px]" />
        ) : (
          <PrivacyContent customContent={customContent || undefined} />
        )}
      </div>
    </div>
  );
}
