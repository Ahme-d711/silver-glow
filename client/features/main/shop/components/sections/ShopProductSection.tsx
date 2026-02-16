"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useShopProducts, useHomeCategories } from "@/features/main/home/hooks/useHome";
import { ShopProductCard } from "../cards/ShopProductCard";
import { ShopPagination } from "../ShopPagination";
import { Product } from "@/features/dashboard/products/types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { StorefrontError } from "@/components/shared/StorefrontError";

export const ShopProductSection = () => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State
  const categorySlug = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "popularity";
  const initialPage = Number(searchParams.get("page")) || 1;

  // Data Fetching
  const { data: categories = [] } = useHomeCategories();

  // Local State
  const [sortValue, setSortValue] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Sync state with URL (excluding search as it's handled by Navbar)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;

    const updateParam = (key: string, value: string | null) => {
      const current = params.get(key);
      if (value) {
        if (current !== value) {
          params.set(key, value);
          changed = true;
        }
      } else {
        if (current !== null) {
          params.delete(key);
          changed = true;
        }
      }
    };

    updateParam("sort", sortValue !== "popularity" ? sortValue : null);
    updateParam("page", currentPage > 1 ? currentPage.toString() : null);

    if (changed) {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [sortValue, currentPage, pathname, router, searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortValue, categorySlug]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    params.delete("page"); // Reset pagination
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { data, isLoading, isError, refetch } = useShopProducts({
    search: searchQuery,
    sort: sortValue,
    page: currentPage,
    limit: 12,
    categorySlug: categorySlug || undefined,
  });

  const { products = [], pagination = undefined } = (data as { products: Product[]; pagination: { total: number; pages: number } } | undefined) || {};

  if (isError) {
    return <StorefrontError fullPage={false} onRetry={() => refetch()} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-10">
        <div className="flex items-center justify-between h-12 bg-secondary/20 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-3/5 bg-secondary/30 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-divider">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-8">
          <div className="text-content-tertiary font-medium whitespace-nowrap">
            {t("showingResults", { count: pagination?.total || 0 })}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-8">
          <div className="flex items-center gap-3">
             {/* Category Filter Select */}
             <Select 
              value={categorySlug || "all"} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="h-11 px-4 rounded-xl border-2 border-primary/10 bg-primary/5 text-primary gap-2 font-bold min-w-[180px] hover:border-primary hover:bg-primary/10 transition-all duration-300 shadow-sm">
                <SelectValue placeholder={t("categoriesTitle")} />
              </SelectTrigger>
              <SelectContent align="end" className="w-56 rounded-xl p-2 max-h-[300px]">
                <SelectItem value="all" className="rounded-lg cursor-pointer font-bold mb-1">
                  {t("all")}
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem 
                    key={category._id} 
                    value={category.slug} 
                    className="rounded-lg cursor-pointer font-medium"
                  >
                    {isRtl ? category.nameAr : category.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select value={sortValue} onValueChange={setSortValue}>
              <SelectTrigger className="h-11 px-4 rounded-xl border-2 border-divider bg-white gap-2 font-semibold min-w-[160px] hover:border-primary/50 hover:text-primary transition-all duration-300 shadow-sm">
                <SelectValue placeholder={t("popularity")} />
              </SelectTrigger>
              <SelectContent align="end" className="w-48 rounded-xl p-2">
                <SelectItem value="popularity" className="rounded-lg cursor-pointer">{t("popularity")}</SelectItem>
                <SelectItem value="newest" className="rounded-lg cursor-pointer">{t("newest")}</SelectItem>
                <SelectItem value="priceLowHigh" className="rounded-lg cursor-pointer">{t("priceLowHigh")}</SelectItem>
                <SelectItem value="priceHighLow" className="rounded-lg cursor-pointer">{t("priceHighLow")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={`grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
        {products.map((product) => (
          <ShopProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-xl text-content-tertiary font-medium">{t("noProductsFound")}</p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <ShopPagination
          currentPage={currentPage}
          totalPages={pagination.pages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
