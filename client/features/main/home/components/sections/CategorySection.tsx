"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Category } from "@/features/dashboard/categories/services/category.service"; // Correct import
import { useLocale, useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CategoryCard } from "../cards/CategoryCard";

interface CategorySectionProps {
  categories: Category[];
  isLoading?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories, isLoading }) => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (isLoading) {
    return (
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-secondary/30 rounded-lg animate-pulse" />
          <div className="h-6 w-24 bg-secondary/30 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-square bg-secondary/20 rounded-3xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <SectionHeader className="mb-0">
          {t.rich("shop_by_category", {
            category: (chunks) => <span className="text-content-primary">{chunks}</span>,
          })}
        </SectionHeader>
        <Link
          href="/categories"
          className="text-primary hover:opacity-80 font-medium flex items-center gap-2 transition-all"
        >
          {t("view_all")} {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
