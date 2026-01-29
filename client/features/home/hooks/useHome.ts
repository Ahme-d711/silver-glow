"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPublicAds, getPublicCategories, getPublicProducts } from "../services/home.service";
import { Ad } from "@/features/dashboard/ads/types";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { Product } from "@/features/dashboard/products/types";

/**
 * Professional Query Key Factory for Home feature
 */
export const homeKeys = {
  all: ["home"] as const,
  ads: () => [...homeKeys.all, "ads"] as const,
  categories: () => [...homeKeys.all, "categories"] as const,
  products: (filters?: Record<string, any>) => [...homeKeys.all, "products", { ...filters }] as const,
};

/**
 * Hook to fetch home advertisements
 */
export function useHomeAds(options?: Partial<UseQueryOptions<Ad[]>>) {
  return useQuery({
    queryKey: homeKeys.ads(),
    queryFn: getPublicAds,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch home categories
 */
export function useHomeCategories(options?: Partial<UseQueryOptions<Category[]>>) {
  return useQuery({
    queryKey: homeKeys.categories(),
    queryFn: getPublicCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes (categories change rarely)
    ...options,
  });
}

/**
 * Hook to fetch home/featured products
 */
export function useHomeProducts(options?: Partial<UseQueryOptions<Product[]>>) {
  return useQuery({
    queryKey: homeKeys.products(),
    queryFn: getPublicProducts,
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}

/**
 * Combined hook for initial home data pre-loading if needed
 */
export function useHomeData() {
  const ads = useHomeAds();
  const categories = useHomeCategories();
  const products = useHomeProducts();

  return {
    ads,
    categories,
    products,
    isLoading: ads.isLoading || categories.isLoading || products.isLoading,
    isError: ads.isError || categories.isError || products.isError,
  };
}
