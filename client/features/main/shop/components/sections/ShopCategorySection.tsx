"use client";

import { useTranslations } from "next-intl";
import { useHomeCategories } from "@/features/main/home/hooks/useHome";
import { ShopCategoryCard } from "../cards/ShopCategoryCard";

export const ShopCategorySection = () => {
  const t = useTranslations("Shop");
  const { data: categories = [], isLoading } = useHomeCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="aspect-4/5 bg-secondary rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-content-primary">
          {t("categoriesTitle")}
        </h2>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {categories.map((category) => (
          <ShopCategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};
