"use client"

import { useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { PageHeader } from "@/components/shared/PageHeader"
import { AdForm } from "../components/AdForm"
import { useAd, useUpdateAd } from "../hooks/useAds"
import UniLoading from "@/components/shared/UniLoading"
import NoDataMsg from "@/components/shared/NoDataMsg"
import { AdFormValues } from "../schemas/adSchemas"

export default function EditAdsTemplate() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { data: adData, isLoading, error } = useAd(id)
  const { mutate: updateAd, isPending } = useUpdateAd()

  // Convert API Ad to Form format
  // Construct full image URL for preview
  const initialData: Partial<AdFormValues> = useMemo(() => {
    if (!adData) return {}
    
    let imageUrl = adData.photo
    if (adData.photo && !adData.photo.startsWith('http') && !adData.photo.startsWith('/')) {
      imageUrl = `/${adData.photo}`
    }

    return {
      name: adData.name,
      isShown: adData.isShown,
      note: adData.note || "",
      photo: imageUrl, // Pass URL string for preview
    }
  }, [adData])

  const handleSubmit = (data: AdFormValues) => {
    if (id) {
      updateAd({ id, data })
    }
  }

  const handleCancel = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Ads"
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Ads", href: "/ads" },
            { label: "Edit Ad" },
          ]}
        />
        <UniLoading />
      </div>
    )
  }

  if (error || !adData) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Ads"
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Ads", href: "/ads" },
            { label: "Edit Ad" },
          ]}
        />
        <NoDataMsg 
          title="Failed to load ad" 
          description="Please try again later"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ads"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Ads", href: "/ads" },
          { label: "Edit Ad" },
        ]}
      />

      <AdForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        isLoading={isPending} 
      />
    </div>
  )
}

