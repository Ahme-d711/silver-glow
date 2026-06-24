"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

interface PrivacyBreadcrumbsProps {
  title: string;
}

export function PrivacyBreadcrumbs({ title }: PrivacyBreadcrumbsProps) {
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const isRtl = locale === "ar";

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-content-secondary"
    >
      <Link
        href="/"
        className="hover:text-primary transition-colors flex items-center gap-1"
      >
        <Home size={16} />
        <span>{t("home")}</span>
      </Link>
      <ChevronRight size={14} className={isRtl ? "rotate-180" : ""} />
      <span className="text-content-primary font-medium">{title}</span>
    </nav>
  );
}
