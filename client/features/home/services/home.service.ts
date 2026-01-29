import clientAxios from "@/lib/axios/clientAxios";
import { Ad } from "@/features/dashboard/ads/types";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { Product } from "@/features/dashboard/products/types";

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
 * Fetch featured products
 */
export async function getPublicProducts(): Promise<Product[]> {
  try {
    const response = await clientAxios.get<ApiResponse<{ products: Product[] }>>("/products", {
      params: { limit: 12 } // Example limit
    });
    return response.data?.data?.products || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
