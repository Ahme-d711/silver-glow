"use client";

import { useTranslations } from "next-intl";
import { SUPPORT_FAQ_ITEMS } from "../../constants/support.constants";
import { SupportFaqItem } from "./SupportFaqItem";

export function SupportFaqSection() {
  const t = useTranslations("Support");

  return (
    <section className="bg-background p-10 rounded-3xl border border-divider">
      <h2 className="text-2xl font-bold text-primary mb-6 text-start">
        {t("faq_title")}
      </h2>
      <div className="space-y-6">
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
