"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ShopCategorySection } from "../components/sections/ShopCategorySection";
import { ShopProductSection } from "../components/sections/ShopProductSection";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const ShopTemplate = () => {
  const t = useTranslations("Shop");

  return (
    <div className="min-h-screen bg-background py-10 md:py-40">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <SectionHeader
              title={t("title")} 
              className="mb-2"
            /> 
            <nav className="flex items-center gap-2 text-sm text-content-tertiary">
              <Link href="/" className="hover:text-primary transition-colors">
                {t("home")}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary font-bold">{t("title")}</span>
            </nav>
          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-20">
          <ShopCategorySection />
        </section>

        {/* Products Section */}
        <section>
          <ShopProductSection />
        </section>
      </div>
    </div>
  );
};
