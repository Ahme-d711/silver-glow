"use client";

import { useTranslations } from "next-intl";
import { WORKS_SHOWCASE_ITEMS } from "../../constants/works.constants";
import { WorksShowcaseItem } from "./WorksShowcaseItem";

export function WorksShowcaseSection() {
  const t = useTranslations("Works");

  return (
    <section className="space-y-20 md:space-y-28">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("showcase_title")}
        </h2>
        <p className="text-content-secondary leading-relaxed">{t("showcase_desc")}</p>
      </div>

      {WORKS_SHOWCASE_ITEMS.map((item) => (
        <WorksShowcaseItem
          key={item.id}
          image={item.image}
          imageAlt={t(item.imageAltKey)}
          label={t(item.labelKey)}
          title={t(item.titleKey)}
          description={t(item.descriptionKey)}
          reverse={item.reverse}
        />
      ))}
    </section>
  );
}
