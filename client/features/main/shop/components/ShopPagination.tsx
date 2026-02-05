"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ShopPagination: React.FC<ShopPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const t = useTranslations("Shop");

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="flex items-center bg-white border border-divider rounded-2xl overflow-hidden shadow-sm">
        {/* First Button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-6 py-4 text-primary font-bold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-r border-divider"
        >
          {t("first")}
        </button>

        {/* Page Numbers */}
        <div className="flex items-center">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-12 h-14 flex items-center justify-center text-lg font-bold transition-all border-r border-divider last:border-r-0",
                currentPage === page
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-secondary"
              )}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-4 text-primary font-bold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-l border-divider"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};
