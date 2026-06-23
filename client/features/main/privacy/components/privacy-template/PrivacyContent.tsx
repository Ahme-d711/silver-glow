"use client";

import { useTranslations } from "next-intl";
import { PRIVACY_SECTIONS } from "../../constants/privacy.constants";
import { PrivacySection } from "./PrivacySection";

export function PrivacyContent() {
  const t = useTranslations("Privacy");

  return (
    <div className="space-y-6">
      {PRIVACY_SECTIONS.map((section) => (
        <PrivacySection
          key={section.id}
          title={t(section.titleKey)}
          body={t(section.bodyKey)}
        />
      ))}
      <p className="pt-8 text-sm italic text-content-secondary text-start">
        {t("last_updated")}
      </p>
    </div>
  );
}
