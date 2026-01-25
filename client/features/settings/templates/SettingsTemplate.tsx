"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { PageHeader } from "@/components/shared/PageHeader"
import { ThemeSetting } from "../components/ThemeSetting"
import { LanguageSetting } from "../components/LanguageSetting"

export default function SettingsTemplate() {
  const t = useTranslations("Settings")
  const tNav = useTranslations("Navigation")

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={t("title")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/dashboard" },
          { label: t("title") },
        ]}
      />

      <ThemeSetting />
      <LanguageSetting />
    </div>
  )
}
