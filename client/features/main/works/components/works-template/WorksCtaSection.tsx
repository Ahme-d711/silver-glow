"use client";

import { useTranslations } from "next-intl";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorksCtaSection() {
  const t = useTranslations("Works");

  return (
    <section className="relative overflow-hidden text-center py-14 md:py-16 px-6 bg-primary rounded-3xl border border-primary shadow-xl">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 end-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 start-0 w-48 h-48 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{t("cta_title")}</h2>
        <p className="text-white/80 leading-relaxed">{t("cta_desc")}</p>
        <div className="flex justify-center">
          <Button
            variant="secondary"
            className="px-8 py-6 rounded-full font-semibold gap-2 bg-white text-primary hover:bg-white/90"
          >
            <Instagram className="h-5 w-5" />
            {t("cta_button")}
          </Button>
        </div>
      </div>
    </section>
  );
}
