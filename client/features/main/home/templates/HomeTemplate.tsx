"use client";

import { useHomeProducts, useHomeData } from "../hooks/useHome";
import { HeroSection } from "../components/sections/HeroSection";
import CategorySection from "@/features/main/home/components/sections/CategorySection";
import { BestSellerSection } from "../components/sections/BestSellerSection";
import { ProductTabsSection } from "../components/sections/ProductTabsSection";
import { StorefrontError } from "@/components/shared/StorefrontError";

export default function HomeTemplate() {
  const { 
    ads: { data: ads = [], isLoading: adsLoading }, 
    categories: { data: categories = [], isLoading: categoriesLoading }, 
    isError: isGlobalError
  } = useHomeData();

  const { data: bestSellerData, isLoading: bestSellerLoading } = useHomeProducts({ 
    sort: "-soldCount" 
  });
  
  const bestSellers = bestSellerData?.products || [];

  if (isGlobalError) {
    return <StorefrontError onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection ads={ads} isLoading={adsLoading} />

      <div className="container mx-auto max-w-7xl">
        <CategorySection categories={categories} isLoading={categoriesLoading} />

        <BestSellerSection 
          products={bestSellers} 
          isLoading={bestSellerLoading}
        />

        <ProductTabsSection />
      </div>
    </div>
  );
}
