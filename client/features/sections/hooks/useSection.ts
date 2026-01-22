"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  toggleSectionStatus,
  getSectionBySlug,
  restoreSection,
  CreateSectionPayload,
  UpdateSectionPayload,
  GetSectionsParams,
  Section,
  ServiceResponse,
} from "../services/section.service";
import { toast } from "sonner";

export const sectionKeys = {
  all: ["sections"] as const,
  lists: () => [...sectionKeys.all, "list"] as const,
  list: (params: GetSectionsParams = {}) => [...sectionKeys.lists(), params] as const,
  details: () => [...sectionKeys.all, "detail"] as const,
  detail: (id: string) => [...sectionKeys.details(), id] as const,
  slug: (slug: string) => [...sectionKeys.details(), "slug", slug] as const,
};

export function useSections(params: GetSectionsParams = {}) {
  return useQuery({
    queryKey: sectionKeys.list(params),
    queryFn: async () => {
      const response = await getAllSections(params);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch sections");
      }
      return response.data.sections;
    },
  });
}

export function useSection(id: string) {
  return useQuery({
    queryKey: sectionKeys.detail(id),
    queryFn: async () => {
      const response = await getSectionById(id);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch section");
      }
      return response.data.section;
    },
    enabled: !!id,
  });
}

export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSectionPayload | FormData) => createSection(payload),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: sectionKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Section created successfully");
      } else {
        toast.error(response.message || "Failed to create section");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create section");
    },
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSectionPayload | FormData }) =>
      updateSection(id, payload),
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: sectionKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Section updated successfully");
      } else {
        toast.error(response.message || "Failed to update section");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update section");
    },
  });
}

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSection(id) as Promise<ServiceResponse<null>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: sectionKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Section deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete section");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete section");
    },
  });
}

export function useToggleSectionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleSectionStatus(id) as Promise<ServiceResponse<{ section: Section }>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: sectionKeys.all,
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

export function useSectionBySlug(slug: string) {
  return useQuery({
    queryKey: sectionKeys.slug(slug),
    queryFn: async () => {
      const response = await getSectionBySlug(slug);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch section");
      }
      return response.data.section;
    },
    enabled: !!slug,
  });
}

export function useRestoreSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restoreSection(id) as Promise<ServiceResponse<{ section: Section }>>,
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: sectionKeys.all,
          exact: false,
          refetchType: 'all'
        });
        toast.success(response.message || "Section restored successfully");
      } else {
        toast.error(response.message || "Failed to restore section");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to restore section");
    },
  });
}
