"use client"

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import type { Ad } from "../types"
import { getAllAds, getAdById, createAd, updateAd, deleteAd, GetAdsParams } from "../services/ads.services"
import { getErrorMessage } from "@/utils/api.utils"

// Query keys
export const adsKeys = {
  all: ["ads"] as const,
  lists: (params?: GetAdsParams) => [...adsKeys.all, "list", params] as const,
  details: () => [...adsKeys.all, "detail"] as const,
  detail: (id: string) => [...adsKeys.details(), id] as const,
}

// Get Ads Query
export function useAds(params?: GetAdsParams) {
  return useQuery({
    queryKey: adsKeys.lists(params),
    queryFn: () => getAllAds(params),
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
  const t = useTranslations("Ads")

  return useMutation({
    mutationFn: (data: FormData) => createAd(data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: adsKeys.all })
        toast.success(t("success_create"))
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
  const t = useTranslations("Ads")

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateAd(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: adsKeys.all })
        queryClient.invalidateQueries({ queryKey: adsKeys.detail(variables.id) })
        toast.success(t("success_update"))
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
  const t = useTranslations("Ads")

  return useMutation({
    mutationFn: (id: string) => deleteAd(id),
    onSuccess: (response, deletedId) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: adsKeys.all })
        queryClient.removeQueries({ queryKey: adsKeys.detail(deletedId) })
        toast.success(t("success_delete"))
      } else {
        toast.error(response.message || "Failed to delete ad")
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error))
    },
  })
}
