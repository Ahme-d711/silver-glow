"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Category } from "@/features/dashboard/categories/services/category.service"; // Correct import
import { CategoryCard } from "../cards/CategoryCard";
import { useLocale, useTranslations } from "next-intl";

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {t.rich("shop_by_category", {
            category: (chunks) => <span className="text-primary-500">{chunks}</span>,
          })}
        </h2>
        <Link
          href="/categories"
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 transition-colors"
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
