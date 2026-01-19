"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/shared/PageHeader"
import { AdForm } from "../components/AdForm"
import { useCreateAd } from "../hooks/useAds"

export default function AddAdsTemplate() {
  const router = useRouter()
  const { mutate: createAd, isPending } = useCreateAd()

  const handleSubmit = (data: import("../schemas/adSchemas").AdFormValues) => {
    createAd(data)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ads"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Ads", href: "/ads" },
          { label: "Add Ad" },
        ]}
      />

      <AdForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isPending} />
    </div>
  )
}

