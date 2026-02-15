"use client"

import React from "react"
import { useRouter, useParams } from "next/navigation"
import { PageHeader } from "@/components/shared/PageHeader"
import { AdForm } from "../components/AdForm"
import { useAd, useUpdateAd } from "../hooks/useAds"
import UniLoading from "@/components/shared/UniLoading"
import NoDataMsg from "@/components/shared/NoDataMsg"
import { FormPageSkeleton } from "@/components/shared/FormPageSkeleton"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

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
                toast.success(t("success_update"))
                router.push("/dashboard/ads")
            }
        }
    })
  }

  const handleCancel = () => {
    router.back()
  }

  const t = useTranslations("Ads")
  const tNav = useTranslations("Navigation")
  const tCommon = useTranslations("Common")

  if (isLoadingAd) return <FormPageSkeleton />;
  if (error || !ad) return <NoDataMsg title={t("error_loading_ad") || "Error loading ad"} />

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit_ad")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/dashboard" },
          { label: t("title"), href: "/dashboard/ads" },
          { label: t("edit_ad") },
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
