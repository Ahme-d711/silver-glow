"use client";

import { useTranslations } from "next-intl";
import { Shield } from "lucide-react";
import { PRIVACY_LAST_UPDATED } from "../../constants/privacy.constants";

export function PrivacyHeader() {
  const t = useTranslations("Privacy");

  return (
    <header className="border-b border-border bg-muted/50 pt-34 pb-10 md:pb-12">
      <div className="container max-w-5xl mx-auto px-4 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-content-secondary">
              <Shield className="h-3.5 w-3.5" />
              {t("document_label")}
            </span>
            <time
              dateTime={PRIVACY_LAST_UPDATED}
              className="text-sm text-content-secondary"
            >
              {t("last_updated", { date: t("last_updated_date") })}
            </time>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-content-primary tracking-tight text-start">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-content-secondary leading-relaxed text-start">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-content-secondary leading-relaxed text-start">
          {t("legal_notice")}
        </div>
      </div>
    </header>
  );
}
