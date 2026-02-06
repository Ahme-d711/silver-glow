import clientAxios from "@/lib/axios/clientAxios";
import { Ad } from "@/features/dashboard/ads/types";
import { Category } from "@/features/dashboard/categories/services/category.service";
import { Product, GetProductsParams, Pagination } from "@/features/dashboard/products/types";
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
 * Fetch products with filtering, searching, sorting and pagination
 */
export async function getPublicProducts(params: GetProductsParams = {}): Promise<{ products: Product[], pagination?: Pagination }> {
  try {
    const response = await clientAxios.get<ApiResponse<{ products: Product[]; pagination: Pagination }>>("/products", {
      params: { 
        limit: 12,
        isShow: true,
        isDeleted: false,
        ...params 
      }
    });
    return {
      products: response.data?.data?.products || [],
      pagination: response.data?.data?.pagination
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [] };
  }
}

/**
 * Fetch single product by slug
 */
export async function getPublicProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await clientAxios.get<ApiResponse<{ product: Product }>>(`/products/slug/${slug}`);
    return response.data?.data?.product || null;
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    return null;
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
