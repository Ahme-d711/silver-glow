"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { StaticPageBreadcrumbsProps } from "../types/static-page-template.types";

export function StaticPageBreadcrumbs({ title }: StaticPageBreadcrumbsProps) {
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const isRtl = locale === "ar";

  return (
    <div className="border-b border-divider bg-white">
      <div className="container max-w-[1440px] mx-auto py-4 flex items-center gap-2 text-sm text-content-secondary">
        <Link
          href="/"
          className="hover:text-primary transition-colors flex items-center gap-1"
        >
          <Home size={16} />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
        <span className="text-primary font-medium">{title}</span>
      </div>
    </div>
  );
}
