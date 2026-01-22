"use client";

import { AxiosError } from "axios";
import clientAxios from "@/lib/axios/clientAxios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export interface Category {
  _id: string;
  id?: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  subcategoriesCount?: number;
  image: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<ServiceResponse<{ categories: Category[] }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ categories: Category[] }>>("/categories");

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch categories",
      error: err.message,
    };
  }
}

/**
 * Get single category by ID
 */
export async function getCategoryById(id: string): Promise<ServiceResponse<{ category: Category }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ category: Category }>>(`/categories/${id}`);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch category",
      error: err.message,
    };
  }
}

/**
 * Create new category
 */
export async function createCategory(
  payload: any | FormData
): Promise<ServiceResponse<{ category: Category }>> {
  try {
    const response = await clientAxios.post<ApiResponse<{ category: Category }>>("/categories", payload);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to create category",
      error: err.message,
    };
  }
}

/**
 * Update category
 */
export async function updateCategory(
  id: string,
  payload: any | FormData
): Promise<ServiceResponse<{ category: Category }>> {
  try {
    const response = await clientAxios.put<ApiResponse<{ category: Category }>>(`/categories/${id}`, payload);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update category",
      error: err.message,
    };
  }
}

/**
 * Delete category
 */
export async function deleteCategory(id: string): Promise<ServiceResponse<null>> {
  try {
    const response = await clientAxios.delete<ApiResponse<null>>(`/categories/${id}`);

    return {
      success: true,
      message: response.data.message || "Category deleted successfully",
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to delete category",
      error: err.message,
    };
  }
}
/**
 * Toggle category status
 */
export async function toggleCategoryStatus(id: string): Promise<ServiceResponse<{ category: Category }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ category: Category }>>(`/categories/${id}/toggle-status`);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to toggle category status",
      error: err.message,
    };
  }
}

/**
 * Get single category by Slug
 */
export async function getCategoryBySlug(
  slug: string
): Promise<ServiceResponse<{ category: Category }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ category: Category }>>(
      `/categories/slug/${slug}`
    );

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch category",
      error: err.message,
    };
  }
}
