"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FEATURES_IMAGES } from "../../constants/features.images";

export function FeaturesExperienceBanner() {
  const t = useTranslations("Features");

  return (
    <section className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="space-y-5 text-start md:order-2">
        <div className="h-1 w-12 rounded-full bg-primary/80" />
        <h2 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
          {t("experience_title")}
        </h2>
        <p className="text-content-secondary text-base md:text-lg leading-relaxed">
          {t("experience_desc")}
        </p>
      </div>

      <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-divider shadow-lg group md:order-1">
        <Image
          src={FEATURES_IMAGES.experience}
          alt={t("experience_image_alt")}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-primary/15 via-transparent to-transparent" />
      </div>
    </section>
  );
}
