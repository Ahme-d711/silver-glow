"use client";

import { useTranslations } from "next-intl";
import { WORKS_SHOWCASE_ITEMS } from "../../constants/works.constants";
import { WorksShowcaseItem } from "./WorksShowcaseItem";

export function WorksShowcaseSection() {
  const t = useTranslations("Works");

  return (
    <div className="space-y-12">
      {WORKS_SHOWCASE_ITEMS.map((item) => (
        <WorksShowcaseItem
          key={item.id}
          label={t(item.labelKey)}
          title={t(item.titleKey)}
          description={t(item.descriptionKey)}
          imagePlaceholder={t(item.imageKey)}
          reverse={item.reverse}
        />
      ))}
    </div>
  );
}
