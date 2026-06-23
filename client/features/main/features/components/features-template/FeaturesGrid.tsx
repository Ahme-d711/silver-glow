"use client";

import { useTranslations } from "next-intl";
import { FEATURE_ITEMS } from "../../constants/features.constants";
import { FeatureCard } from "./FeatureCard";

export function FeaturesGrid() {
  const t = useTranslations("Features");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {FEATURE_ITEMS.map((item) => (
        <FeatureCard
          key={item.id}
          icon={item.icon}
          title={t(item.titleKey)}
          description={t(item.descriptionKey)}
        />
      ))}
    </div>
  );
}
