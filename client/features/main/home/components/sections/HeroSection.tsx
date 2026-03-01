"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { getImageUrl } from "@/utils/image.utils";
import { Ad } from "@/features/dashboard/ads/types";
import { useLocale, useTranslations } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export function HeroSection({ ads, isLoading }: { ads: Ad[]; isLoading?: boolean }) {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-secondary/20 animate-pulse flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-4xl space-y-6 flex flex-col items-center">
          <div className="h-4 w-32 bg-secondary/40 rounded-full" />
          <div className="h-12 w-full md:w-3/4 bg-secondary/40 rounded-3xl" />
          <div className="h-4 w-1/2 bg-secondary/40 rounded-full" />
          <div className="h-14 w-40 bg-secondary/40 rounded-2xl mt-4" />
        </div>
      </div>
    );
  }

  // Fallback slides if no ads found
  const displayAds = ads.length > 0 ? ads : [];

  if (displayAds.length === 0) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden group">
      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "swiper-pagination-bullet !bg-white !opacity-50",
          bulletActiveClass: "swiper-pagination-bullet-active !opacity-100 !w-12 !rounded-full transition-all duration-300",
        }}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        loop={true}
        className="h-full w-full"
      >
        {displayAds.map((ad) => (
          <SwiperSlide key={ad._id}>
            {({ isActive }) => (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Background Image with Ken Burns Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className={`absolute inset-0 transition-transform duration-10000 ease-out ${isActive ? "scale-110" : "scale-100"}`}>
                    {/* Desktop Image */}
                    <Image
                      src={getImageUrl(ad.photo) || ""}
                      alt={isAr ? ad.nameAr : ad.nameEn}
                      fill
                      className={cn(
                        "object-cover",
                        ad.mobilePhoto ? "hidden md:block" : "block"
                      )}
                      priority
                    />
                    {/* Mobile Image (Conditional) */}
                    {ad.mobilePhoto && (
                      <Image
                        src={getImageUrl(ad.mobilePhoto) || ""}
                        alt={isAr ? ad.nameAr : ad.nameEn}
                        fill
                        className="object-cover md:hidden"
                        priority
                      />
                    )}
                  </div>
                  
                  {/* Visual Contrast: Layered Gradients for Depth and Readability */}
                  {/* 1. Bottom Shadow for Text Readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-90" />
                  
                  {/* 2. Top Shadow for Header Contrast */}
                  <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent opacity-60" />
                  
                  {/* 3. Subtle Vignette for Focus */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
                  
                  {/* 4. Overall Brightness Adjustment */}
                  <div className="absolute inset-0 bg-black/10 backdrop-brightness-[0.85]" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8 max-w-5xl">
                  <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter transition-all duration-1000 delay-100 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    {isAr ? ad.nameAr : ad.nameEn}
                  </h1>
                  
                  <p className={`text-lg md:text-2xl font-medium opacity-90 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    {isAr ? ad.descriptionAr : ad.descriptionEn}
                  </p>

                  <div className={`pt-6 transition-all duration-1000 delay-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <Button className="h-16 px-14 rounded-2xl bg-white text-primary hover:bg-white/90 text-xl font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-none transform hover:scale-105 transition-all active:scale-95 cursor-pointer">
                      {t("start_now")}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modern Navigation Controls */}
      <div className="hidden md:block">
        <button className="hero-prev absolute left-10 top-1/2 -translate-y-1/2 z-20 h-16 w-16 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white text-white hover:text-primary border border-white/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md cursor-pointer">
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button className="hero-next absolute right-10 top-1/2 -translate-y-1/2 z-20 h-16 w-16 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white text-white hover:text-primary border border-white/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md cursor-pointer">
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Pagination Container */}
      <div className="custom-pagination absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4" />
    </div>
  );
}
