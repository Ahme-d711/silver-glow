"use client";

import { useTranslations } from "next-intl";
import { ShopCategorySection } from "../components/sections/ShopCategorySection";
import { ShopProductSection } from "../components/sections/ShopProductSection";
import { StorefrontPageHeader } from "@/components/shared/StorefrontPageHeader";

export const ShopTemplate = () => {
  const t = useTranslations("Shop");

  return (
    <div className="min-h-screen bg-background py-10 md:py-40">
      <div className="container max-w-7xl mx-auto px-4">
        <StorefrontPageHeader
          title={t("title")}
          breadcrumbs={[
            { label: t("home"), href: "/" },
            { label: t("title") },
          ]}
        />

        {/* Categories Section */}
        <section className="mb-20">
          <ShopCategorySection />
        </section>

        {/* Products Section */}
        <section>
          <ShopProductSection />
        </section>
      </div>
    </div>
  );
};
