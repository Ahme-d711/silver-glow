"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus, Download, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/shared/PageHeader"
import { AdsTable } from "../components/AdsTable"
import { AdsMobileMockup } from "../components/AdsMobileMockup"
import UniLoading from "@/components/shared/UniLoading"
import NoDataMsg from "@/components/shared/NoDataMsg"
import { ConfirmationModal } from "@/components/shared/ConfirmationModal"
import { useAds, useUpdateAd, useDeleteAd } from "../hooks/useAds"
import { useTranslations, useLocale } from "next-intl"

// Convert Ad to AdCard format (for mockup)
function convertAdToCardFormat(ad: any, locale: string): any {
  let imageUrl = "/ads-1.svg" 
  if (ad.photo) {
    imageUrl = ad.photo.startsWith('http') || ad.photo.startsWith('/') ? ad.photo : `/${ad.photo}`
  }

  return {
    id: ad._id || ad.id,
    title: locale === 'ar' ? ad.nameAr : ad.nameEn,
    image: imageUrl,
    isActive: ad.isShown,
    showOnHome: ad.isShown,
  }
}

export default function AdsTemplate() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const locale = useLocale()
  const t = useTranslations("Ads")
  const tCommon = useTranslations("Common")
  const tNav = useTranslations("Navigation")

  const { data: adsData, isLoading, error } = useAds()
  const { mutate: updateAd } = useUpdateAd()
  const { mutate: deleteAd } = useDeleteAd()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [adToDelete, setAdToDelete] = useState<string | null>(null)

  // Filter ads based on search
  const filteredAds = useMemo(() => {
    if (!adsData) return []
    return adsData.filter(ad => 
        ad.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [adsData, searchQuery])

  // Get active ads for preview
  const previewAds = useMemo(() => {
    const cards = (adsData || []).map(ad => convertAdToCardFormat(ad, locale))
    const active = cards.filter(ad => ad.showOnHome)
    return active.length > 0 ? active : cards.slice(0, 5)
  }, [adsData, locale])

  const handleToggleSelect = (id: string) => {
    const originalAd = adsData?.find((a) => (a._id || a.id) === id)
    if (!originalAd) return

    // Limit check for home screen
    const currentlyShownCount = adsData?.filter(a => a.isShown).length || 0
    if (!originalAd.isShown && currentlyShownCount >= 3) {
      toast.error(tCommon("max_3_ads") || "Maximum 3 ads allowed on home screen")
      return
    }

    const formData = new FormData()
    formData.append("isShown", String(!originalAd.isShown))
    
    updateAd({
      id: originalAd._id || originalAd.id,
      data: formData,
    })
  }

  const handleDeleteClick = (id: string) => {
    setAdToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (adToDelete) {
      deleteAd(adToDelete)
      setAdToDelete(null)
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/dashboard/ads/edit/${id}`)
  }

  if (isLoading) return <UniLoading />
  if (error) return <NoDataMsg title={tCommon("error_loading_ads") || "Error loading ads"} />

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/dashboard" },
          { label: t("title") },
        ]}
        actionButtons={[
          {
            label: tCommon("export"),
            icon: Download,
            onClick: () => console.log("Exporting"),
            variant: "secondary",
          },
          {
            label: t("add_ad"),
            icon: Plus,
            href: "/dashboard/ads/add",
          }
        ]}
      />

        <div className="flex flex-col xl:flex-row gap-8 items-start">
            {/* Left: Table */}
            <div className="flex-1 w-full">
                <AdsTable 
                    ads={filteredAds}
                    selectedIds={filteredAds.filter((a) => a.isShown).map((a) => a._id || a.id)}
                    onToggleSelect={handleToggleSelect}
                    onDelete={handleDeleteClick}
                    onEdit={handleEdit}
                />
            </div>

            {/* Right: Mobile Preview */}
            <div className="hidden xl:block shrink-0">
                 <AdsMobileMockup ads={previewAds} />
            </div>
        </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title={t("delete_ad")}
        description={tCommon("confirm_delete_desc")?.replace("{name}", "") || "Are you sure you want to delete this ad?"}
        confirmText={tCommon("delete")}
        cancelText={tCommon("cancel")}
        variant="destructive"
        itemType="delete"
        itemName={t("title").toLowerCase()}
        icon={<Trash2 className="h-8 w-8" />}
        onConfirm={handleConfirmDelete}
        onSuccess={() => {
          toast.success(tCommon("success_delete") || "Ad deleted successfully")
        }}
      />
    </div>
  )
}
