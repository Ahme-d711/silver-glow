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

export interface Subcategory {
  _id: string;
  id?: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  categoryId: string;
  categoryNameAr?: string;
  categoryNameEn?: string;
  image: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all subcategories
 */
export async function getAllSubcategories(params?: { search?: string; isDeleted?: boolean }): Promise<ServiceResponse<{ subcategories: Subcategory[] }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ subcategories: Subcategory[] }>>("/subcategories", { params });

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch subcategories",
      error: err.message,
    };
  }
}

/**
 * Get single subcategory by ID
 */
export async function getSubcategoryById(id: string): Promise<ServiceResponse<{ subcategory: Subcategory }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ subcategory: Subcategory }>>(`/subcategories/${id}`);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch subcategory",
      error: err.message,
    };
  }
}

/**
 * Create new subcategory
 */
export async function createSubcategory(
  payload: any | FormData
): Promise<ServiceResponse<{ subcategory: Subcategory }>> {
  try {
    const response = await clientAxios.post<ApiResponse<{ subcategory: Subcategory }>>("/subcategories", payload);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to create subcategory",
      error: err.message,
    };
  }
}

/**
 * Update subcategory
 */
export async function updateSubcategory(
  id: string,
  payload: any | FormData
): Promise<ServiceResponse<{ subcategory: Subcategory }>> {
  try {
    const response = await clientAxios.put<ApiResponse<{ subcategory: Subcategory }>>(`/subcategories/${id}`, payload);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update subcategory",
      error: err.message,
    };
  }
}

/**
 * Delete subcategory
 */
export async function deleteSubcategory(id: string): Promise<ServiceResponse<null>> {
  try {
    const response = await clientAxios.delete<ApiResponse<null>>(`/subcategories/${id}`);

    return {
      success: true,
      message: response.data.message || "Subcategory deleted successfully",
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to delete subcategory",
      error: err.message,
    };
  }
}
/**
 * Toggle subcategory status
 */
export async function toggleSubcategoryStatus(id: string): Promise<ServiceResponse<{ subcategory: Subcategory }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ subcategory: Subcategory }>>(`/subcategories/${id}/toggle-status`);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to toggle subcategory status",
      error: err.message,
    };
  }
}

/**
 * Get single subcategory by Slug
 */
export async function getSubcategoryBySlug(
  slug: string
): Promise<ServiceResponse<{ subcategory: Subcategory }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ subcategory: Subcategory }>>(
      `/subcategories/slug/${slug}`
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
      message: err.response?.data?.message || "Failed to fetch subcategory",
      error: err.message,
    };
  }
}

/**
 * Restore a deleted subcategory
 */
export async function restoreSubcategory(id: string): Promise<ServiceResponse<{ subcategory: Subcategory }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ subcategory: Subcategory }>>(`/subcategories/${id}/restore`);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to restore subcategory",
      error: err.message,
    };
  }
}

