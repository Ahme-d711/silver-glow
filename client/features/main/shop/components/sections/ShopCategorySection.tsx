"use client";

import { useTranslations } from "next-intl";
import { useHomeCategories } from "@/features/main/home/hooks/useHome";
import { SectionHeader } from "@/components/shared/SectionHeader";
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
      {/* <SectionHeader 
        title={t("categoriesTitle")} 
        className="mb-0"
      /> */}

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {categories.map((category) => (
          <ShopCategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};
