"use client"

import { useState, useEffect } from "react"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { AdFormValues } from "../schemas/adSchemas"
import type { Ad, AdResponse } from "../types"

// Fake data storage (in-memory)
let fakeAds: Ad[] = [
  {
    id: "1",
    photo: "/ads-1.svg",
    name: "إعلان الصيف الكبير",
    isShown: true,
    note: "عرض خاص على جميع المنتجات",
  },
  {
    id: "2",
    photo: "/ads-2.svg",
    name: "تخفيضات نهاية الموسم",
    isShown: true,
    note: "خصومات تصل إلى 50%",
  },
  {
    id: "3",
    photo: "/ads-3.svg",
    name: "عرض جديد",
    isShown: false,
    note: "عرض محدود",
  },
]

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Query keys
export const adsKeys = {
  all: ["ads"] as const,
  lists: () => [...adsKeys.all, "list"] as const,
  details: () => [...adsKeys.all, "detail"] as const,
  detail: (id: string) => [...adsKeys.details(), id] as const,
}

// Fake service functions
async function getAds(): Promise<Ad[]> {
  await delay(300)
  return [...fakeAds]
}

async function getAdById(id: string): Promise<Ad> {
  await delay(300)
  const ad = fakeAds.find((ad) => ad.id === id)
  if (!ad) {
    throw new Error("الإعلان غير موجود")
  }
  return ad
}

async function createAd(data: AdFormValues): Promise<AdResponse> {
  await delay(500)
  
  const newAd: Ad = {
    id: Date.now().toString(),
    photo: data.photo instanceof File ? URL.createObjectURL(data.photo) : "/ads-1.svg",
    name: data.name,
    isShown: data.isShown,
    note: data.note || "",
  }
  
  fakeAds.push(newAd)
  
  return {
    success: true,
    message: "تم إنشاء الإعلان بنجاح",
    data: newAd,
  }
}

async function updateAd(id: string, data: AdFormValues): Promise<AdResponse> {
  await delay(500)
  
  const adIndex = fakeAds.findIndex(ad => ad.id === id)
  
  if (adIndex === -1) {
    return {
      success: false,
      message: "الإعلان غير موجود",
    }
  }
  
  const updatedAd: Ad = {
    ...fakeAds[adIndex],
    name: data.name,
    isShown: data.isShown,
    note: data.note || "",
    photo: data.photo instanceof File ? URL.createObjectURL(data.photo) : fakeAds[adIndex].photo,
  }
  
  fakeAds[adIndex] = updatedAd
  
  return {
    success: true,
    message: "تم تحديث الإعلان بنجاح",
    data: updatedAd,
  }
}

async function deleteAd(id: string): Promise<AdResponse> {
  await delay(500)
  
  const adIndex = fakeAds.findIndex(ad => ad.id === id)
  
  if (adIndex === -1) {
    return {
      success: false,
      message: "الإعلان غير موجود",
    }
  }
  
  const deletedAd = fakeAds[adIndex]
  fakeAds = fakeAds.filter(ad => ad.id !== id)

  return {
    success: true,
    message: "تم حذف الإعلان بنجاح",
    data: deletedAd,
  }
}

// Get Ads Query
export function useAds() {
  return useQuery({
    queryKey: adsKeys.lists(),
    queryFn: () => getAds(),
  })
}

// Get Ad by ID Query
export function useAd(id: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: adsKeys.detail(id),
    queryFn: async () => {
      // First, try to get from cache
      const cachedAds = queryClient.getQueryData<Ad[]>(adsKeys.lists())
      if (cachedAds) {
        const cachedAd = cachedAds.find((ad) => ad.id === id)
        if (cachedAd) {
          return cachedAd
        }
      }

      // If not in cache, fetch from fake data
      return await getAdById(id)
    },
    enabled: !!id,
  })
}

// Create Ad Mutation
export function useCreateAd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AdFormValues) => createAd(data),
    onSuccess: () => {
      // Invalidate and refetch ads list
      queryClient.invalidateQueries({ queryKey: adsKeys.lists() })
      toast.success("تم إنشاء الإعلان بنجاح")
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل إنشاء الإعلان")
    },
  })
}

// Update Ad Mutation
export function useUpdateAd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdFormValues }) => updateAd(id, data),
    onSuccess: (response, variables) => {
      // Update cache
      queryClient.setQueryData<Ad>(adsKeys.detail(variables.id), response.data)
      
      // Update list cache
      queryClient.setQueryData<Ad[]>(adsKeys.lists(), (old) => {
        if (!old) return old
        return old.map((ad) =>
          ad.id === variables.id && response.data ? response.data : ad
        )
      })

      // Mark list as stale so it refetches in the background
      queryClient.invalidateQueries({ queryKey: adsKeys.lists() })
      queryClient.invalidateQueries({ queryKey: adsKeys.detail(variables.id) })
      
      toast.success("تم تحديث الإعلان بنجاح")
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث الإعلان")
    },
  })
}

// Delete Ad Mutation
export function useDeleteAd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteAd(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.setQueryData<Ad[]>(adsKeys.lists(), (old) => {
        if (!old) return old
        return old.filter((ad) => ad.id !== deletedId)
      })
      
      // Remove detail cache
      queryClient.removeQueries({ queryKey: adsKeys.detail(deletedId) })

      // Mark list as stale so it refetches in the background
      queryClient.invalidateQueries({ queryKey: adsKeys.lists() })
      
      toast.success("تم حذف الإعلان بنجاح")
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل حذف الإعلان")
    },
  })
}

