"use client";

import { useTranslations } from "next-intl";
import { SUPPORT_FAQ_ITEMS } from "../../constants/support.constants";
import { SupportFaqItem } from "./SupportFaqItem";

export function SupportFaqSection() {
  const t = useTranslations("Support");

  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("faq_title")}
        </h2>
        <p className="text-content-secondary leading-relaxed">{t("faq_desc")}</p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {SUPPORT_FAQ_ITEMS.map((item) => (
          <SupportFaqItem
            key={item.id}
            question={t(item.questionKey)}
            answer={t(item.answerKey)}
          />
        ))}
      </div>
    </section>
  );
}
