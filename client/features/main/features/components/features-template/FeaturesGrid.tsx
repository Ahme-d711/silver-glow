"use client";

import { useTranslations } from "next-intl";
import { FEATURE_ITEMS } from "../../constants/features.constants";
import { FeatureCard } from "./FeatureCard";

export function FeaturesGrid() {
  const t = useTranslations("Features");

  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("grid_title")}
        </h2>
        <p className="text-content-secondary leading-relaxed">{t("grid_desc")}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {FEATURE_ITEMS.map((item) => (
          <FeatureCard
            key={item.id}
            icon={item.icon}
            title={t(item.titleKey)}
            description={t(item.descriptionKey)}
          />
        ))}
      </div>
    </section>
  );
}
