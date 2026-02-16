"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPublicAds, getPublicCategories, getPublicSubcategories, getPublicProducts, getPublicSections, getTopReviews, getPublicProductBySlug } from "../services/home.service";
import { Ad } from "@/features/dashboard/ads/types";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { Subcategory } from "@/features/dashboard/subcategories/services/subcategory.service";
import { Product, GetProductsParams, Pagination } from "@/features/dashboard/products/types";
import { Section } from "@/features/dashboard/sections/types";
import { HomeReview } from "../types/review.types";

/**
 * Professional Query Key Factory for Home feature
 */
export const homeKeys = {
  all: ["home"] as const,
  ads: () => [...homeKeys.all, "ads"] as const,
  categories: () => [...homeKeys.all, "categories"] as const,
  subcategories: (categoryId: string) => [...homeKeys.all, "subcategories", categoryId] as const,
  sections: () => [...homeKeys.all, "sections"] as const,
  products: (filters?: GetProductsParams) => [...homeKeys.all, "products", { ...filters }] as const,
  product: (id: string) => [...homeKeys.all, "product", id] as const,
  reviews: () => [...homeKeys.all, "reviews"] as const,
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
 * Hook to fetch home subcategories for a category
 */
export function useHomeSubcategories(categoryId: string, options?: Partial<UseQueryOptions<Subcategory[]>>) {
  return useQuery({
    queryKey: homeKeys.subcategories(categoryId),
    queryFn: () => getPublicSubcategories(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 30, // 30 minutes
    ...options,
  });
}

/**
 * Hook to fetch home sections
 */
export function useHomeSections(options?: Partial<UseQueryOptions<Section[]>>) {
  return useQuery({
    queryKey: homeKeys.sections(),
    queryFn: getPublicSections,
    staleTime: 1000 * 60 * 60, // 1 hour
    ...options,
  });
}

/**
 * Hook to fetch home/featured products with optional section filtering
 */
export function useHomeProducts(params: GetProductsParams = {}, options?: Partial<UseQueryOptions<{ products: Product[], pagination?: Pagination }>>) {
  return useQuery({
    queryKey: homeKeys.products(params),
    queryFn: () => getPublicProducts({ limit: 12, isShow: true, isDeleted: false, ...params }),
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}

/**
 * Hook to fetch single product details
 */
export function useProduct(slug: string, options?: Partial<UseQueryOptions<Product | null>>) {
  return useQuery({
    queryKey: homeKeys.product(slug),
    queryFn: () => getPublicProductBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch shop products with full filtering
 */
export function useShopProducts(params: GetProductsParams = {}, options?: Partial<UseQueryOptions<{ products: Product[], pagination?: Pagination }>>) {
  return useQuery({
    queryKey: homeKeys.products(params),
    queryFn: () => getPublicProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

/**
 * Combined hook for initial home data pre-loading if needed
 */
export function useHomeData() {
  const ads = useHomeAds();
  const categories = useHomeCategories();
  const products = useHomeProducts({});

  return {
    ads,
    categories,
    products,
    isLoading: ads.isLoading || categories.isLoading || products.isLoading,
    isError: ads.isError || categories.isError || products.isError,
  };
}

/**
 * Hook to fetch top rated reviews for testimonials
 */
export function useHomeReviews(options?: Partial<UseQueryOptions<HomeReview[]>>) {
  return useQuery({
    queryKey: homeKeys.reviews(),
    queryFn: getTopReviews,
    staleTime: 1000 * 60 * 60, // 1 hour
    ...options,
  });
}
