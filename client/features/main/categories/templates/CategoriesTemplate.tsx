"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useHomeCategories } from "@/features/main/home/hooks/useHome";
import { ShopCategoryCard } from "@/features/main/shop/components/cards/ShopCategoryCard";

export const CategoriesTemplate: React.FC = () => {
  const t = useTranslations("Navigation");
  const tShop = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { data: categories = [], isLoading } = useHomeCategories();

  return (
    <div className="min-h-screen bg-background pt-40 pb-20">
      <div className="container mx-auto px-4">

        <SectionHeader 
            title={t("categories")} 
            className="mb-2"
        />
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-content-secondary mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            {tShop("home")}
          </Link>
          <ChevronRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
          <span className="text-primary font-bold">
            {t("categories")}
          </span>
        </nav>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-4/5 bg-secondary rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <ShopCategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
