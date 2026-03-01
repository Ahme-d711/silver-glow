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
    // Fetch products sorted by soldCount descending
    products: { data, isLoading: productsLoading, isError, refetch: refetchProducts },
    isError: isGlobalError
  } = useHomeData();

  // We need to fetch best sellers specifically here if useHomeData returns generic products
  // But wait, useHomeData uses useHomeProducts which we just updated to accept params.
  // However, useHomeData calls it with {}, so it returns default sort.
  // We should probably fetch best sellers separately OR update useHomeData.
  // Let's check useHomeData again. It returns `products`.
  
  // Actually, we should call useHomeProducts directly here for best sellers
  // to avoid messing up other parts that might rely on useHomeData default behavior.
  
  const { data: bestSellerData, isLoading: bestSellerLoading } = useHomeProducts({ 
    sort: "-soldCount" 
  });
  
  const bestSellers = bestSellerData?.products || [];

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
          products={bestSellers} 
          isLoading={bestSellerLoading}
          onToggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* Our Products Tabs Section */}
        <ProductTabsSection 
          onToggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* Testimonial Section */}
        {/*<TestimonialSection />*/}
      </div>
    </div>
  );
}
