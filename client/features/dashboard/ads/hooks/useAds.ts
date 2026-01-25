"use client"

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import type { Ad } from "../types"
import { getAllAds, getAdById, createAd, updateAd, deleteAd } from "../services/ads.services"
import { getErrorMessage } from "@/utils/api.utils"

// Query keys
export const adsKeys = {
  all: ["ads"] as const,
  lists: () => [...adsKeys.all, "list"] as const,
  details: () => [...adsKeys.all, "detail"] as const,
  detail: (id: string) => [...adsKeys.details(), id] as const,
}

// Get Ads Query
export function useAds() {
  return useQuery({
    queryKey: adsKeys.lists(),
    queryFn: () => getAllAds(),
  })
}

// Get Ad by ID Query
export function useAd(id: string) {
  return useQuery({
    queryKey: adsKeys.detail(id),
    queryFn: () => getAdById(id),
    enabled: !!id,
  })
}

// Create Ad Mutation
export function useCreateAd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FormData) => createAd(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: adsKeys.lists() })
        toast.success(response.message || "Ad created successfully")
      } else {
        toast.error(response.message || "Failed to create ad")
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error))
    },
  })
}

// Update Ad Mutation
export function useUpdateAd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateAd(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: adsKeys.lists() })
        queryClient.invalidateQueries({ queryKey: adsKeys.detail(variables.id) })
        toast.success(response.message || "Ad updated successfully")
      } else {
        toast.error(response.message || "Failed to update ad")
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error))
    },
  })
}

// Delete Ad Mutation
export function useDeleteAd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteAd(id),
    onSuccess: (response, deletedId) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: adsKeys.lists() })
        queryClient.removeQueries({ queryKey: adsKeys.detail(deletedId) })
        toast.success(response.message || "Ad deleted successfully")
      } else {
        toast.error(response.message || "Failed to delete ad")
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error))
    },
  })
}
