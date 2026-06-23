"use client";

import { useTranslations } from "next-intl";

import { PageHeader } from "@/components/shared/PageHeader";
import { PageTransition } from "@/components/shared/PageTransition";
import { SettingsForm } from "../components/SettingsForm";

export default function SettingsTemplate() {
  const t = useTranslations("Dashboard");

  return (
    <PageTransition>
      <div className="space-y-8">
        <PageHeader
          title={t("settings")}
          description={t("settings_desc")}
        />

        <SettingsForm />
      </div>
    </PageTransition>
  );
}
