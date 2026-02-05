"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { useHomeAds, useHomeCategories, useHomeProducts } from "../hooks/useHome";
import { HeroSection } from "../components/sections/HeroSection";
import CategorySection from "@/features/main/home/components/sections/CategorySection";
import { BestSellerSection } from "../components/sections/BestSellerSection";
import { ProductTabsSection } from "../components/sections/ProductTabsSection";
import { TestimonialSection } from "../components/sections/TestimonialSection";

export default function HomeTemplate() {
  const { data: ads = [] } = useHomeAds();
  const { data: categories = [] } = useHomeCategories();
  const { data: products = [] } = useHomeProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />

      {/* Hero Section */}
      <HeroSection ads={ads} />

      <div className="container mx-auto max-w-7xl">
        {/* Categories Section */}
        <CategorySection categories={categories} />

        {/* Best Seller Section */}
        <BestSellerSection products={products} />

        {/* Our Products Tabs Section */}
        <ProductTabsSection />

        {/* Testimonial Section */}
        <TestimonialSection />
      </div>
    </div>
  );
}
