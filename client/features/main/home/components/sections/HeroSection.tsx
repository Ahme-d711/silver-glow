"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { getImageUrl } from "@/utils/image.utils";
import { Ad } from "@/features/dashboard/ads/types";
import { useLocale } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export function HeroSection({ ads }: { ads: Ad[] }) {
  const locale = useLocale();
  const isAr = locale === "ar";

  // Fallback slides if no ads found
  const displayAds = ads.length > 0 ? ads : [];

  if (displayAds.length === 0) return null;

  return (
    <div className="relative w-full h-[64vh] overflow-hidden group">
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
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={getImageUrl(ad.photo) || ""}
                  alt={isAr ? ad.nameAr : ad.nameEn}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold tracking-widest animate-in fade-in slide-in-from-bottom-5 duration-700">
                  {isAr ? ad.nameAr : ad.nameEn}
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                  {isAr ? ad.descriptionAr : ad.descriptionEn}
                </p>
                <div className="pt-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                  <Button className="h-14 px-12 rounded-2xl bg-white text-primary hover:bg-white/90 text-lg font-bold shadow-xl border-none cursor-pointer">
                    Start Now
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <button className="hero-prev absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm cursor-pointer">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button className="hero-next absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm cursor-pointer">
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Container */}
      <div className="custom-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3" />
    </div>
  );
}
