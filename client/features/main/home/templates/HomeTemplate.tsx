"use client";

import { useHomeAds, useHomeCategories, useHomeProducts } from "../hooks/useHome";
import { Product } from "@/features/dashboard/products/types";
import { HeroSection } from "../components/sections/HeroSection";
import CategorySection from "@/features/main/home/components/sections/CategorySection";
import { BestSellerSection } from "../components/sections/BestSellerSection";
import { ProductTabsSection } from "../components/sections/ProductTabsSection";
import { TestimonialSection } from "../components/sections/TestimonialSection";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";

export default function HomeTemplate() {
  const { data: ads = [] } = useHomeAds();
  const { data: categories = [] } = useHomeCategories();
  const { data } = useHomeProducts();
  const products = (data as { products: Product[] })?.products || [];
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection ads={ads} />

      <div className="container mx-auto max-w-7xl">
        {/* Categories Section */}
        <CategorySection categories={categories} />

        {/* Best Seller Section */}
        <BestSellerSection 
          products={products} 
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
