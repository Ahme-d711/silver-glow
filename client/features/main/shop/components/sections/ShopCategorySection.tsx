"use client";

import { useMemo } from "react";
import { useHomeCategories } from "@/features/main/home/hooks/useHome";
import { ShopCategoryCard } from "../cards/ShopCategoryCard";
import { ShopAllCategoryCard } from "../cards/ShopAllCategoryCard";

export const ShopCategorySection = () => {
  const { data: categories = [], isLoading } = useHomeCategories();

  const totalProducts = useMemo(
    () => categories.reduce((sum, category) => sum + (category.productsCount || 0), 0),
    [categories]
  );

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      <ShopAllCategoryCard productCount={totalProducts} />
      {categories.map((category) => (
        <ShopCategoryCard key={category._id} category={category} />
      ))}
    </div>
  );
};
