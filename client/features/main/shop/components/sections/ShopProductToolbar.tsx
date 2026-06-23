"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ShopProductToolbarProps } from "../../types/shop-product-toolbar.types";

export function ShopProductToolbar({
  sections,
  sectionSlug,
  sortValue,
  totalResults,
  onSectionChange,
  onSortChange,
}: ShopProductToolbarProps) {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-divider">
      <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <Select value={sectionSlug || "all"} onValueChange={onSectionChange}>
            <SelectTrigger className="h-11 min-w-[180px] border-2 border-primary/15 bg-primary/6 font-bold text-primary hover:border-primary/40 hover:bg-primary/10">
              <SelectValue placeholder={t("sectionsTitle")} />
            </SelectTrigger>
            <SelectContent align="end" position="popper" className="max-h-[320px]">
              <SelectItem value="all">{t("all")}</SelectItem>
              {sections.map((section) => (
                <SelectItem key={section._id} value={section.slug}>
                  {isRtl ? section.nameAr : section.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortValue} onValueChange={onSortChange}>
            <SelectTrigger className="h-11 min-w-[170px] font-semibold">
              <SelectValue placeholder={t("popularity")} />
            </SelectTrigger>
            <SelectContent align="end" position="popper">
              <SelectItem value="popularity">{t("popularity")}</SelectItem>
              <SelectItem value="newest">{t("newest")}</SelectItem>
              <SelectItem value="priceLowHigh">{t("priceLowHigh")}</SelectItem>
              <SelectItem value="priceHighLow">{t("priceHighLow")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-8">
        <div className="text-content-tertiary font-medium whitespace-nowrap">
          {t("showingResults", { count: totalResults })}
        </div>
      </div>
    </div>
  );
}
