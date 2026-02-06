"use client";

import { useState } from "react";
import { Product } from "@/features/dashboard/products/types";
import { DescriptionTab } from "./DescriptionTab";
import { ReviewsTab } from "./ReviewsTab";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ProductTabsProps {
  product: Product;
}

type TabType = "description" | "reviews";

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const t = useTranslations("Shop");
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabs: { id: TabType; label: string }[] = [
    { id: "description", label: t("Description") || "Description" },
    { id: "reviews", label: `${t("Reviews")} (${product.numReviews || 0})` },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-divider">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-4 px-1 text-lg font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-content-tertiary hover:text-content-secondary"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === "description" && <DescriptionTab product={product} />}
        {activeTab === "reviews" && <ReviewsTab productId={product._id} />}
      </div>
    </div>
  );
};
