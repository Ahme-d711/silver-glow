"use client";

import { useTranslations } from "next-intl";
import { ABOUT_VALUE_ITEMS } from "../../constants/about.constants";
import { AboutValueCard } from "./AboutValueCard";

export function AboutValuesSection() {
  const t = useTranslations("About");

  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("values_title")}
        </h2>
        <p className="text-content-secondary leading-relaxed">{t("values_desc")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {ABOUT_VALUE_ITEMS.map((item) => (
          <AboutValueCard
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
