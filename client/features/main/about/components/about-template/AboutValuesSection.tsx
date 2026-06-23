"use client";

import { useTranslations } from "next-intl";
import { ABOUT_VALUE_ITEMS } from "../../constants/about.constants";
import { AboutValueCard } from "./AboutValueCard";

export function AboutValuesSection() {
  const t = useTranslations("About");

  return (
    <section className="grid md:grid-cols-2 gap-8">
      {ABOUT_VALUE_ITEMS.map((item) => (
        <AboutValueCard
          key={item.id}
          title={t(item.titleKey)}
          description={t(item.descriptionKey)}
        />
      ))}
    </section>
  );
}
