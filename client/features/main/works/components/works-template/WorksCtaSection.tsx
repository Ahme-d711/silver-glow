"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function WorksCtaSection() {
  const t = useTranslations("Works");

  return (
    <section className="text-center py-12 bg-primary/5 rounded-3xl border border-divider">
      <h2 className="text-2xl font-bold text-primary mb-4">{t("cta_title")}</h2>
      <p className="max-w-xl mx-auto mb-8 text-content-secondary leading-relaxed">
        {t("cta_desc")}
      </p>
      <div className="flex justify-center gap-4">
        <Button className="px-8 py-6 rounded-full font-medium">
          {t("cta_button")}
        </Button>
      </div>
    </section>
  );
}
