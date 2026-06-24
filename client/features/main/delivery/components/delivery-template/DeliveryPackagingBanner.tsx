"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { DELIVERY_IMAGES } from "../../constants/delivery.images";

export function DeliveryPackagingBanner() {
  const t = useTranslations("Delivery");

  return (
    <section className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-divider shadow-lg group">
        <Image
          src={DELIVERY_IMAGES.packaging}
          alt={t("packaging_image_alt")}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-primary/15 via-transparent to-transparent" />
      </div>

      <div className="space-y-5 text-start">
        <div className="h-1 w-12 rounded-full bg-primary/80" />
        <h2 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
          {t("packaging_title")}
        </h2>
        <p className="text-content-secondary text-base md:text-lg leading-relaxed">
          {t("packaging_desc")}
        </p>
      </div>
    </section>
  );
}
