"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { getImageUrl } from "@/utils/image.utils";
import { Ad } from "@/features/dashboard/ads/types";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getAdProductSlug, hasAdCtaTarget } from "../../utils/ad.utils";
import { useHomeHeroLoading } from "../../context/HomeHeroLoadingContext";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HERO_LOAD_TIMEOUT_MS = 12000;

export function HeroSection({ ads, isLoading }: { ads: Ad[]; isLoading?: boolean }) {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isAr = locale === "ar";
  const { isHome, setHomeHeroLoading } = useHomeHeroLoading();
  const [readyAdsKey, setReadyAdsKey] = useState<string | null>(null);
  const adsKey = useMemo(
    () => ads.map((ad) => ad._id).join("|"),
    [ads]
  );
  const hasAds = ads.length > 0;
  const heroMediaReady = readyAdsKey === adsKey;
  const showLoadingScreen = isLoading || (hasAds && !heroMediaReady);

  useEffect(() => {
    if (!isHome) return;
    setHomeHeroLoading(showLoadingScreen);
  }, [isHome, showLoadingScreen, setHomeHeroLoading]);

  const handleHeroMediaReady = useCallback(() => {
    setReadyAdsKey(adsKey);
  }, [adsKey]);

  useEffect(() => {
    if (isLoading || !hasAds || heroMediaReady) return;

    const timeout = window.setTimeout(() => {
      setReadyAdsKey(adsKey);
    }, HERO_LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeout);
  }, [isLoading, hasAds, heroMediaReady, adsKey]);

  if (!isLoading && !hasAds) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full bg-black" aria-hidden />
      ) : (
        <div
          className={cn(
            "relative w-full h-screen overflow-hidden group transition-opacity duration-700",
            heroMediaReady ? "opacity-100" : "opacity-0"
          )}
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass:
                "swiper-pagination-bullet !bg-white !opacity-50",
              bulletActiveClass:
                "swiper-pagination-bullet-active !opacity-100 !w-12 !rounded-full transition-all duration-300",
            }}
            navigation={{
              nextEl: ".hero-next",
              prevEl: ".hero-prev",
            }}
            loop={true}
            className="h-full w-full"
          >
            {ads.map((ad, index) => (
              <SwiperSlide key={ad._id}>
                {({ isActive }) => (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 overflow-hidden">
                      <div
                        className={`absolute inset-0 transition-transform duration-10000 ease-out ${isActive ? "scale-110" : "scale-100"}`}
                      >
                        <Image
                          src={getImageUrl(ad.photo) || ""}
                          alt={isAr ? ad.nameAr : ad.nameEn}
                          fill
                          className={cn(
                            "object-cover",
                            ad.mobilePhoto ? "hidden md:block" : "block"
                          )}
                          priority={index === 0}
                          onLoad={index === 0 ? handleHeroMediaReady : undefined}
                          onError={index === 0 ? handleHeroMediaReady : undefined}
                        />
                        {ad.mobilePhoto && (
                          <Image
                            src={getImageUrl(ad.mobilePhoto) || ""}
                            alt={isAr ? ad.nameAr : ad.nameEn}
                            fill
                            className="object-cover md:hidden"
                            priority={index === 0}
                            onLoad={index === 0 ? handleHeroMediaReady : undefined}
                            onError={index === 0 ? handleHeroMediaReady : undefined}
                          />
                        )}
                      </div>

                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-80" />
                      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-transparent opacity-40" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
                      <div className="absolute inset-0 bg-black/5 backdrop-brightness-[0.95]" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8 max-w-5xl">
                      <h1
                        className={cn(
                          "text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2] line-clamp-3",
                          "transition-all duration-1000 delay-100",
                          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        )}
                      >
                        {isAr ? ad.nameAr : ad.nameEn}
                      </h1>

                      <p
                        className={cn(
                          "text-sm sm:text-base md:text-lg lg:text-xl font-normal opacity-90 max-w-2xl mx-auto leading-relaxed line-clamp-3",
                          "transition-all duration-1000 delay-300",
                          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        )}
                      >
                        {isAr ? ad.descriptionAr : ad.descriptionEn}
                      </p>

                      {hasAdCtaTarget(ad) && (
                        <div
                          className={`pt-6 transition-all duration-1000 delay-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        >
                          {ad.link ? (
                            <Button
                              asChild
                              className="h-16 px-14 rounded-2xl bg-white text-primary hover:bg-white/90 text-xl font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-none transform hover:scale-105 transition-all active:scale-95 cursor-pointer"
                            >
                              <a
                                href={ad.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {t("start_now")}
                              </a>
                            </Button>
                          ) : (
                            <Button
                              asChild
                              className="h-16 px-14 rounded-2xl bg-white text-primary hover:bg-white/90 text-xl font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-none transform hover:scale-105 transition-all active:scale-95 cursor-pointer"
                            >
                              <Link href={`/products/${getAdProductSlug(ad)}`}>
                                {t("start_now")}
                              </Link>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="hidden md:block">
            <button className="hero-prev absolute left-10 top-1/2 -translate-y-1/2 z-20 h-16 w-16 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white text-white hover:text-primary border border-white/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md cursor-pointer">
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button className="hero-next absolute right-10 top-1/2 -translate-y-1/2 z-20 h-16 w-16 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white text-white hover:text-primary border border-white/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md cursor-pointer">
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>

          <div className="custom-pagination absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4" />
        </div>
      )}
    </>
  );
}
