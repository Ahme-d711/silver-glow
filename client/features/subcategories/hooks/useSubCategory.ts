"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  toggleSubcategoryStatus,
  getSubcategoryBySlug,
  restoreSubcategory,
  CreateSubcategoryPayload,
  UpdateSubcategoryPayload,
  GetSubcategoriesParams,
  Subcategory,
  ServiceResponse,
} from "../services/subcategory.service";
import { toast } from "sonner";

export const subcategoryKeys = {
  all: ["subcategories"] as const,
  lists: () => [...subcategoryKeys.all, "list"] as const,
  list: (params: GetSubcategoriesParams = {}) => [...subcategoryKeys.lists(), params] as const,
  details: () => [...subcategoryKeys.all, "detail"] as const,
  detail: (id: string) => [...subcategoryKeys.details(), id] as const,
  slug: (slug: string) => [...subcategoryKeys.details(), "slug", slug] as const,
};

export function useSubcategories(params: GetSubcategoriesParams = {}) {
  return useQuery({
    queryKey: subcategoryKeys.list(params),
    queryFn: async () => {
      const response = await getAllSubcategories(params);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch subcategories");
      }
      return response.data.subcategories;
    },
  });
}

export function useSubcategory(id: string) {
  return useQuery({
    queryKey: subcategoryKeys.detail(id),
    queryFn: async () => {
      const response = await getSubcategoryById(id);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch subcategory");
      }
      return response.data.subcategory;
    },
    enabled: !!id,
  });
}

export function useCreateSubcategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSubcategoryPayload | FormData) => createSubcategory(payload),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: subcategoryKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Subcategory created successfully");
      } else {
        toast.error(response.message || "Failed to create subcategory");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create subcategory");
    },
  });
}

export function useUpdateSubcategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSubcategoryPayload | FormData }) =>
      updateSubcategory(id, payload),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: subcategoryKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Subcategory updated successfully");
      } else {
        toast.error(response.message || "Failed to update subcategory");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update subcategory");
    },
  });
}

export function useDeleteSubcategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSubcategory(id) as Promise<ServiceResponse<null>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: subcategoryKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Subcategory deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete subcategory");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete subcategory");
    },
  });
}
export function useToggleSubcategoryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleSubcategoryStatus(id) as Promise<ServiceResponse<{ subcategory: Subcategory }>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: subcategoryKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Status updated successfully");
      } else {
        toast.error(response.message || "Failed to update status");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update status");
    },
  });
}

export function useSubcategoryBySlug(slug: string) {
  return useQuery({
    queryKey: subcategoryKeys.slug(slug),
    queryFn: async () => {
      const response = await getSubcategoryBySlug(slug);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch subcategory");
      }
      return response.data.subcategory;
    },
    enabled: !!slug,
  });
}
export function useRestoreSubcategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restoreSubcategory(id) as Promise<ServiceResponse<{ subcategory: Subcategory }>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: subcategoryKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Subcategory restored successfully");
      } else {
        toast.error(response.message || "Failed to restore subcategory");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to restore subcategory");
    },
  });
}
