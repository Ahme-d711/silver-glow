"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  toggleBrandStatus,
  getBrandBySlug,
  restoreBrand,
} from "../services/brand.service";
import {
  Brand,
  CreateBrandPayload,
  GetBrandsParams,
  ServiceResponse,
  UpdateBrandPayload,
} from "../types";
import { toast } from "sonner";

export const brandKeys = {
  all: ["brands"] as const,
  lists: () => [...brandKeys.all, "list"] as const,
  list: (params: GetBrandsParams = {}) => [...brandKeys.lists(), params] as const,
  details: () => [...brandKeys.all, "detail"] as const,
  detail: (id: string) => [...brandKeys.details(), id] as const,
  slug: (slug: string) => [...brandKeys.details(), "slug", slug] as const,
};

export function useBrands(params: GetBrandsParams = {}) {
  return useQuery({
    queryKey: brandKeys.list(params),
    queryFn: async () => {
      const response = await getAllBrands(params);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch brands");
      }
      return response.data.brands;
    },
  });
}

export function useBrand(id: string) {
  return useQuery({
    queryKey: brandKeys.detail(id),
    queryFn: async () => {
      const response = await getBrandById(id);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch brand");
      }
      return response.data.brand;
    },
    enabled: !!id,
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBrandPayload | FormData) => createBrand(payload),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: brandKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Brand created successfully");
      } else {
        toast.error(response.message || "Failed to create brand");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create brand");
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateBrandPayload | FormData }) =>
      updateBrand(id, payload),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: brandKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Brand updated successfully");
      } else {
        toast.error(response.message || "Failed to update brand");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update brand");
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBrand(id) as Promise<ServiceResponse<null>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: brandKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Brand deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete brand");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete brand");
    },
  });
}

export function useToggleBrandStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleBrandStatus(id) as Promise<ServiceResponse<{ brand: Brand }>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: brandKeys.all,
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

export function useBrandBySlug(slug: string) {
  return useQuery({
    queryKey: brandKeys.slug(slug),
    queryFn: async () => {
      const response = await getBrandBySlug(slug);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch brand");
      }
      return response.data.brand;
    },
    enabled: !!slug,
  });
}

export function useRestoreBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restoreBrand(id) as Promise<ServiceResponse<{ brand: Brand }>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: brandKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Brand restored successfully");
      } else {
        toast.error(response.message || "Failed to restore brand");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to restore brand");
    },
  });
}
