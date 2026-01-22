"use client";

import  clientAxios from "@/lib/axios/clientAxios";
import { ApiResponse } from "@/types";

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export interface Brand {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  logo?: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBrandPayload {
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority?: number;
  logo?: string;
  isShow?: boolean;
}

export interface UpdateBrandPayload extends Partial<CreateBrandPayload> {}

export interface GetBrandsParams {
  search?: string;
  isDeleted?: boolean;
}

/**
 * Get all brands
 */
export async function getAllBrands(params?: GetBrandsParams): Promise<ServiceResponse<{ brands: Brand[] }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ brands: Brand[] }>>("/brands", { params });

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to fetch brands" };
    }

    return {
      success: true,
      message: response.data.message || "Brands fetched successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch brands";
    return { success: false, message, error };
  }
}

/**
 * Get brand by ID
 */
export async function getBrandById(id: string): Promise<ServiceResponse<{ brand: Brand }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ brand: Brand }>>(`/brands/${id}`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to fetch brand" };
    }

    return {
      success: true,
      message: response.data.message || "Brand fetched successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch brand";
    return { success: false, message, error };
  }
}

/**
 * Get brand by slug
 */
export async function getBrandBySlug(slug: string): Promise<ServiceResponse<{ brand: Brand }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ brand: Brand }>>(`/brands/slug/${slug}`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to fetch brand" };
    }

    return {
      success: true,
      message: response.data.message || "Brand fetched successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch brand";
    return { success: false, message, error };
  }
}

/**
 * Create new brand
 */
export async function createBrand(
  payload: CreateBrandPayload | FormData
): Promise<ServiceResponse<{ brand: Brand }>> {
  try {
    const response = await clientAxios.post<ApiResponse<{ brand: Brand }>>("/brands", payload);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to create brand" };
    }

    return {
      success: true,
      message: response.data.message || "Brand created successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create brand";
    return { success: false, message, error };
  }
}

/**
 * Update brand
 */
export async function updateBrand(
  id: string,
  payload: UpdateBrandPayload | FormData
): Promise<ServiceResponse<{ brand: Brand }>> {
  try {
    const response = await clientAxios.put<ApiResponse<{ brand: Brand }>>(`/brands/${id}`, payload);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to update brand" };
    }

    return {
      success: true,
      message: response.data.message || "Brand updated successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update brand";
    return { success: false, message, error };
  }
}

/**
 * Delete brand (soft delete)
 */
export async function deleteBrand(id: string): Promise<ServiceResponse<null>> {
  try {
    const response = await clientAxios.delete<ApiResponse<null>>(`/brands/${id}`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to delete brand" };
    }

    return {
      success: true,
      message: response.data.message || "Brand deleted successfully",
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete brand";
    return { success: false, message, error };
  }
}

/**
 * Toggle brand status
 */
export async function toggleBrandStatus(id: string): Promise<ServiceResponse<{ brand: Brand }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ brand: Brand }>>(`/brands/${id}/toggle-status`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to toggle status" };
    }

    return {
      success: true,
      message: response.data.message || "Status updated successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle status";
    return { success: false, message, error };
  }
}

/**
 * Restore deleted brand
 */
export async function restoreBrand(id: string): Promise<ServiceResponse<{ brand: Brand }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ brand: Brand }>>(`/brands/${id}/restore`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to restore brand" };
    }

    return {
      success: true,
      message: response.data.message || "Brand restored successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to restore brand";
    return { success: false, message, error };
  }
}
