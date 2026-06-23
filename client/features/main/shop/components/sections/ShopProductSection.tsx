"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useShopProducts, useHomeSections } from "@/features/main/home/hooks/useHome";
import { ShopProductCard } from "../cards/ShopProductCard";
import { ShopPagination } from "../ShopPagination";
import { ShopProductToolbar } from "./ShopProductToolbar";
import { Product } from "@/features/dashboard/products/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { StorefrontError } from "@/components/shared/StorefrontError";

export const ShopProductSection = () => {
  const t = useTranslations("Shop");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State
  const categorySlug = searchParams.get("category");
  const sectionSlug = searchParams.get("section");
  const searchQuery = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "popularity";
  const initialPage = Number(searchParams.get("page")) || 1;

  // Data Fetching
  const { data: sections = [] } = useHomeSections();
  const activeSection = sectionSlug
    ? sections.find((section) => section.slug === sectionSlug)
    : undefined;
  const sectionIds = activeSection ? [activeSection._id] : undefined;

  // Local State
  const [sortValue, setSortValue] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const filterKey = `${searchQuery}|${sortValue}|${categorySlug ?? ""}|${sectionSlug ?? ""}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);

  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

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

  const handleSectionChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("section");
    } else {
      params.set("section", slug);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { data, isLoading, isError, refetch } = useShopProducts({
    search: searchQuery,
    sort: sortValue,
    page: currentPage,
    limit: 12,
    categorySlug: categorySlug || undefined,
    sectionIds,
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
      <ShopProductToolbar
        sections={sections}
        sectionSlug={sectionSlug}
        sortValue={sortValue}
        totalResults={pagination?.total || 0}
        onSectionChange={handleSectionChange}
        onSortChange={setSortValue}
      />

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
