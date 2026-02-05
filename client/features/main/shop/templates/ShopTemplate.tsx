"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ShopCategorySection } from "../components/sections/ShopCategorySection";
import { ChevronRight } from "lucide-react";

export const ShopTemplate = () => {
  const t = useTranslations("Shop");

  return (
    <div className="min-h-screen bg-background py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-content-primary mb-2">
              {t("title")}
            </h1>
            <nav className="flex items-center gap-2 text-sm text-content-tertiary">
              <Link href="/" className="hover:text-primary transition-colors">
                {t("home")}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-content-primary font-medium">{t("title")}</span>
            </nav>
          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-20">
          <ShopCategorySection />
        </section>

        {/* Second Section Placeholder (as requested "shop page فيها اتنين section") */}
        <section>
          <div className="bg-secondary/30 rounded-[32px] p-12 text-center border border-divider dashed">
            <h3 className="text-xl font-medium text-content-tertiary">
              {t("productsSectionPlaceholder")}
            </h3>
          </div>
        </section>
      </div>
    </div>
  );
};
