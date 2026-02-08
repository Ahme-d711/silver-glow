"use client";

import { useHomeAds, useHomeCategories, useHomeProducts, useHomeData } from "../hooks/useHome";
import { Product } from "@/features/dashboard/products/types";
import { HeroSection } from "../components/sections/HeroSection";
import CategorySection from "@/features/main/home/components/sections/CategorySection";
import { BestSellerSection } from "../components/sections/BestSellerSection";
import { ProductTabsSection } from "../components/sections/ProductTabsSection";
import { TestimonialSection } from "../components/sections/TestimonialSection";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";
import { StorefrontError } from "@/components/shared/StorefrontError";

export default function HomeTemplate() {
  const { 
    ads: { data: ads = [], isLoading: adsLoading }, 
    categories: { data: categories = [], isLoading: categoriesLoading }, 
    products: { data, isLoading: productsLoading, isError, refetch: refetchProducts },
    isError: isGlobalError
  } = useHomeData();

  const products = (data as { products: Product[] })?.products || [];
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (isGlobalError) {
    return <StorefrontError onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection ads={ads} isLoading={adsLoading} />

      <div className="container mx-auto max-w-7xl">
        {/* Categories Section */}
        <CategorySection categories={categories} isLoading={categoriesLoading} />

        {/* Best Seller Section */}
        <BestSellerSection 
          products={products} 
          isLoading={productsLoading}
          onToggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* Our Products Tabs Section */}
        <ProductTabsSection 
          onToggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* Testimonial Section */}
        <TestimonialSection />
      </div>
    </div>
  );
}
