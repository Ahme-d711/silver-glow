"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { useHomeAds, useHomeCategories } from "../hooks/useHome";
import { HeroSection } from "../components/HeroSection";
import CategorySection from "@/features/home/components/CategorySection";

export default function HomeTemplate() {
  const { data: ads = [] } = useHomeAds();
  const { data: categories = [] } = useHomeCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      
      {/* Hero Section */}
      <HeroSection ads={ads} />

      {/* Categories Section */}
      <CategorySection categories={categories} />
    </div>
  );
}
