"use client";

import  clientAxios from "@/lib/axios/clientAxios";
import { ApiResponse } from "@/types";

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export interface Section {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  image?: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSectionPayload {
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority?: number;
  image?: string;
  isShow?: boolean;
}

export interface UpdateSectionPayload extends Partial<CreateSectionPayload> {}

export interface GetSectionsParams {
  search?: string;
  isDeleted?: boolean;
}

/**
 * Get all sections
 */
export async function getAllSections(params?: GetSectionsParams): Promise<ServiceResponse<{ sections: Section[] }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ sections: Section[] }>>("/sections", { params });

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to fetch sections" };
    }

    return {
      success: true,
      message: response.data.message || "Sections fetched successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch sections";
    return { success: false, message, error };
  }
}

/**
 * Get section by ID
 */
export async function getSectionById(id: string): Promise<ServiceResponse<{ section: Section }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ section: Section }>>(`/sections/${id}`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to fetch section" };
    }

    return {
      success: true,
      message: response.data.message || "Section fetched successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch section";
    return { success: false, message, error };
  }
}

/**
 * Get section by slug
 */
export async function getSectionBySlug(slug: string): Promise<ServiceResponse<{ section: Section }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ section: Section }>>(`/sections/slug/${slug}`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to fetch section" };
    }

    return {
      success: true,
      message: response.data.message || "Section fetched successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch section";
    return { success: false, message, error };
  }
}

/**
 * Create new section
 */
export async function createSection(
  payload: CreateSectionPayload | FormData
): Promise<ServiceResponse<{ section: Section }>> {
  try {
    const response = await clientAxios.post<ApiResponse<{ section: Section }>>("/sections", payload);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to create section" };
    }

    return {
      success: true,
      message: response.data.message || "Section created successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create section";
    return { success: false, message, error };
  }
}

/**
 * Update section
 */
export async function updateSection(
  id: string,
  payload: UpdateSectionPayload | FormData
): Promise<ServiceResponse<{ section: Section }>> {
  try {
    const response = await clientAxios.put<ApiResponse<{ section: Section }>>(`/sections/${id}`, payload);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to update section" };
    }

    return {
      success: true,
      message: response.data.message || "Section updated successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update section";
    return { success: false, message, error };
  }
}

/**
 * Delete section (soft delete)
 */
export async function deleteSection(id: string): Promise<ServiceResponse<null>> {
  try {
    const response = await clientAxios.delete<ApiResponse<null>>(`/sections/${id}`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to delete section" };
    }

    return {
      success: true,
      message: response.data.message || "Section deleted successfully",
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete section";
    return { success: false, message, error };
  }
}

/**
 * Toggle section status
 */
export async function toggleSectionStatus(id: string): Promise<ServiceResponse<{ section: Section }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ section: Section }>>(`/sections/${id}/toggle-status`);

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
 * Restore deleted section
 */
export async function restoreSection(id: string): Promise<ServiceResponse<{ section: Section }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ section: Section }>>(`/sections/${id}/restore`);

    if (!response.data.success) {
      return { success: false, message: response.data.message || "Failed to restore section" };
    }

    return {
      success: true,
      message: response.data.message || "Section restored successfully",
      data: response.data.data,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to restore section";
    return { success: false, message, error };
  }
}
