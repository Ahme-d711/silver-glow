"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  Category,
} from "../services/category.service";
import { toast } from "sonner";

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: async () => {
      const response = await getAllCategories();
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch categories");
      }
      return response.data.categories;
    },
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: async () => {
      const response = await getCategoryById(id);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch category");
      }
      return response.data.category;
    },
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any | FormData) => createCategory(payload),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.resetQueries({ queryKey: categoryKeys.lists() });
        toast.success(response.message || "Category created successfully");
      } else {
        toast.error(response.message || "Failed to create category");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create category");
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any | FormData }) =>
      updateCategory(id, payload),
    onSuccess: async (response, variables) => {
      if (response.success) {
        await Promise.all([
          queryClient.resetQueries({ queryKey: categoryKeys.lists() }),
          queryClient.resetQueries({ queryKey: categoryKeys.detail(variables.id) })
        ]);
        toast.success(response.message || "Category updated successfully");
      } else {
        toast.error(response.message || "Failed to update category");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update category");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id) as Promise<any>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.resetQueries({ queryKey: categoryKeys.lists() });
        toast.success(response.message || "Category deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete category");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
}
export function useToggleCategoryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleCategoryStatus(id),
    onSuccess: async (response, id) => {
      if (response.success) {
        await Promise.all([
          queryClient.resetQueries({ queryKey: categoryKeys.lists() }),
          queryClient.resetQueries({ queryKey: categoryKeys.detail(id) })
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
