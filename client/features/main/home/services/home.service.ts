import clientAxios from "@/lib/axios/clientAxios";
import { Ad } from "@/features/dashboard/ads/types";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { Product } from "@/features/dashboard/products/types";
import { Section } from "@/features/dashboard/sections/types";
import { HomeReview } from "../types/review.types";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Fetch ads shown on home
 */
export async function getPublicAds(): Promise<Ad[]> {
  try {
    const response = await clientAxios.get<ApiResponse<{ ads: Ad[] }>>("/ads", {
      params: { isShown: true }
    });
    return response.data?.data?.ads || [];
  } catch (error) {
    console.error("Failed to fetch ads:", error);
    return [];
  }
}

/**
 * Fetch active categories
 */
export async function getPublicCategories(): Promise<Category[]> {
  try {
    const response = await clientAxios.get<ApiResponse<{ categories: Category[] }>>("/categories", {
      params: { isShow: true }
    });
    return response.data?.data?.categories || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

/**
 * Fetch featured products, optionally filtered by sectionId
 */
export async function getPublicProducts(sectionId?: string): Promise<Product[]> {
  try {
    const response = await clientAxios.get<ApiResponse<{ products: Product[] }>>("/products", {
      params: { 
        limit: 12,
        isShow: true,
        isDeleted: false,
        sectionIds: sectionId ? [sectionId] : undefined 
      }
    });
    return response.data?.data?.products || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

/**
 * Fetch active sections
 */
export async function getPublicSections(): Promise<Section[]> {
  try {
    const response = await clientAxios.get<ApiResponse<{ sections: Section[] }>>("/sections", {
      params: { isShow: true }
    });
    return response.data?.data?.sections || [];
  } catch (error) {
    console.error("Failed to fetch sections:", error);
    return [];
  }
}

/**
 * Fetch top rated reviews for testimonials
 */
export async function getTopReviews(): Promise<HomeReview[]> {
  try {
    const response = await clientAxios.get<ApiResponse<{ reviews: HomeReview[] }>>("/reviews/top");
    return response.data?.data?.reviews || [];
  } catch (error) {
    console.error("Failed to fetch top reviews:", error);
    return [];
  }
}
