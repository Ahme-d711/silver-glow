"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/shared/PageHeader"
import { AdForm } from "../components/AdForm"
import { useCreateAd } from "../hooks/useAds"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export default function AddAdsTemplate() {
  const router = useRouter()
  const { mutate: createAd, isPending } = useCreateAd()

  const handleSubmit = (data: FormData) => {
    createAd(data, {
        onSuccess: (response) => {
            if (response.success) {
                toast.success(t("success_create"))
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

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/dashboard" },
          { label: t("title"), href: "/dashboard/ads" },
          { label: t("add_ad") },
        ]}
      />

      <AdForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isPending} />
    </div>
  )
}
