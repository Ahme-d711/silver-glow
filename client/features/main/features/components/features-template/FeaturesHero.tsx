"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Gem } from "lucide-react";
import { FEATURES_IMAGES } from "../../constants/features.images";
import { FeaturesHeroStats } from "./FeaturesHeroStats";

export function FeaturesHero() {
  const t = useTranslations("Features");

  return (
    <section className="relative bg-primary text-white overflow-hidden pt-24 pb-16 md:pb-24">
      <div className="absolute inset-0 opacity-[0.12]">
        <div className="absolute top-0 start-0 w-72 h-72 bg-white rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl" />
        <div className="absolute bottom-0 end-0 w-md h-md bg-secondary rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-8">
          <div className="space-y-6 md:space-y-8 text-start">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-semibold text-white/90 backdrop-blur-sm">
              <Gem className="h-4 w-4" />
              {t("hero_badge")}
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]">
                {t("title")}
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                {t("description")}
              </p>
            </div>

            <FeaturesHeroStats />
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-4 bg-white/10 rounded-[2rem] blur-2xl" />
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/30">
              <Image
                src={FEATURES_IMAGES.hero}
                alt={t("hero_image_alt")}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -start-4 md:-start-6 bg-white text-primary px-5 py-3 rounded-2xl shadow-xl border border-white/50">
              <p className="text-xs font-semibold uppercase tracking-widest text-content-tertiary">
                {t("hero_tag_label")}
              </p>
              <p className="text-sm font-bold">{t("hero_tag_value")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
