"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { HeroSection } from "../components/HeroSection";
import { useHomeAds } from "../hooks/useHome";

export default function HomeTemplate() {
  const { data: ads = [] } = useHomeAds();

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      
        {/* Hero Section */}
        <HeroSection ads={ads} />
    </div>
  );
}
