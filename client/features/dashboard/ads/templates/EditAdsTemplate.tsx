"use client"

import React from "react"
import { useRouter, useParams } from "next/navigation"
import { PageHeader } from "@/components/shared/PageHeader"
import { AdForm } from "../components/AdForm"
import { useAd, useUpdateAd } from "../hooks/useAds"
import UniLoading from "@/components/shared/UniLoading"
import NoDataMsg from "@/components/shared/NoDataMsg"

export default function EditAdsTemplate() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { data: ad, isLoading: isLoadingAd, error } = useAd(id)
  const { mutate: updateAd, isPending: isUpdating } = useUpdateAd()

  const handleSubmit = (data: FormData) => {
    updateAd({ id, data }, {
        onSuccess: (response) => {
            if (response.success) {
                router.push("/dashboard/ads")
            }
        }
    })
  }

  const handleCancel = () => {
    router.back()
  }

  if (isLoadingAd) return <UniLoading />
  if (error || !ad) return <NoDataMsg title="Error loading ad" />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Advertisement"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Advertisements", href: "/dashboard/ads" },
          { label: "Edit Ad" },
        ]}
      />

      <AdForm 
        initialData={ad} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        isLoading={isUpdating} 
      />
    </div>
  )
}
