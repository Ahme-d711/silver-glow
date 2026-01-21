"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  toggleSubcategoryStatus,
  Subcategory,
} from "../services/subcategory.service";
import { toast } from "sonner";

export const subcategoryKeys = {
  all: ["subcategories"] as const,
  lists: () => [...subcategoryKeys.all, "list"] as const,
  details: () => [...subcategoryKeys.all, "detail"] as const,
  detail: (id: string) => [...subcategoryKeys.details(), id] as const,
};

export function useSubcategories() {
  return useQuery({
    queryKey: subcategoryKeys.lists(),
    queryFn: async () => {
      const response = await getAllSubcategories();
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
    mutationFn: (payload: any | FormData) => createSubcategory(payload),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.resetQueries({ queryKey: subcategoryKeys.lists() });
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
    mutationFn: ({ id, payload }: { id: string; payload: any | FormData }) =>
      updateSubcategory(id, payload),
    onSuccess: async (response, variables) => {
      if (response.success) {
        await Promise.all([
          queryClient.resetQueries({ queryKey: subcategoryKeys.lists() }),
          queryClient.resetQueries({ queryKey: subcategoryKeys.detail(variables.id) })
        ]);
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
    mutationFn: (id: string) => deleteSubcategory(id) as Promise<any>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.resetQueries({ queryKey: subcategoryKeys.lists() });
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
    mutationFn: (id: string) => toggleSubcategoryStatus(id),
    onSuccess: async (response, id) => {
      if (response.success) {
        await Promise.all([
          queryClient.resetQueries({ queryKey: subcategoryKeys.lists() }),
          queryClient.resetQueries({ queryKey: subcategoryKeys.detail(id) })
        ]);
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
