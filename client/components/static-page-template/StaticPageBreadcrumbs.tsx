"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StaticPageBreadcrumbsProps } from "../StaticPageTemplate";

export function StaticPageBreadcrumbs({ title }: StaticPageBreadcrumbsProps) {
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const isRtl = locale === "ar";

  return (
    <div className="pb-6 mb-6 border-b border-white/10">
      <div className="container max-w-[1440px] mx-auto flex items-center gap-2 text-sm text-white/70">
        <Link
          href="/"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          <Home size={16} />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
        <span className="text-white font-medium">{title}</span>
      </div>
    </div>
  );
}
