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

// Convert Ad to AdCard format
function convertAdToCardFormat(ad: any): any {
  // Construct full image URL
  let imageUrl = "/ads-1.svg" // Default fallback image
  if (ad.photo) {
    if (ad.photo.startsWith('http') || ad.photo.startsWith('/')) {
      imageUrl = ad.photo
    } else {
      // Use photo as is for local paths
      imageUrl = ad.photo
    }
  }

  return {
    id: ad.id,
    title: ad.name,
    image: imageUrl,
    isActive: ad.isShown,
    showOnHome: ad.isShown, // Map isShown to showOnHome
  }
}

export default function AdsTemplate() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const { data: adsData, isLoading, error } = useAds()
  const { mutate: updateAd } = useUpdateAd()
  const { mutate: deleteAd } = useDeleteAd()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [adToDelete, setAdToDelete] = useState<string | null>(null)

  // Convert data to AdCard format
  const ads = useMemo(() => {
    if (!adsData) return []
    return adsData.map(convertAdToCardFormat)
  }, [adsData])

  // Filter ads based on search
  const filteredAds = useMemo(() => {
    return ads.filter(ad => 
        ad.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [ads, searchQuery])

  // Get active ads for preview
  const previewAds = useMemo(() => {
    // In the mockup logic, user might want to see specific ads, but let's show all active ones or just top ones
    // The previous logic was "showOnHome". We can keep that for the mobile mockup
    const active = ads.filter(ad => ad.showOnHome)
    // If no active ads, show some from list for preview purposes
    return active.length > 0 ? active : ads.slice(0, 5)
  }, [ads])

  const handleToggleSelect = (id: string) => {
    const targetAd = ads.find((a) => a.id === id)
    if (!targetAd) return

    // Limit check kept from previous logic
    if (!targetAd.showOnHome && previewAds.filter(a => a.showOnHome).length >= 3) {
      toast.error("Maximum 3 ads allowed on home screen")
      return
    }

    const originalAd = adsData?.find((a) => a.id === id)
    if (!originalAd) return

    updateAd({
      id: originalAd.id,
      data: {
        ...originalAd,
        isShown: !originalAd.isShown,
      },
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
    router.push(`/ads/edit/${id}`)
  }

  if (isLoading) return <UniLoading />
  if (error) return <NoDataMsg title="Error loading ads" />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Advertisements"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Advertisements" },
        ]}
        actionButtons={[
          {
            label: "Export",
            icon: Download,
            onClick: () => console.log("Exporting"),
            variant: "secondary",
          },
          {
            label: "Add ADS",
            icon: Plus,
            href: "/ads/add",
          }
        ]}
      />

        <div className="flex flex-col xl:flex-row gap-8 items-start">
            {/* Left: Table */}
            <div className="flex-1 w-full">
                <AdsTable 
                    ads={filteredAds}
                    selectedIds={ads.filter((a) => a.showOnHome).map((a) => a.id)}
                    onToggleSelect={handleToggleSelect}
                    onDelete={handleDeleteClick}
                    onEdit={handleEdit}
                />
                <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredAds.length > 0 ? 1 : 0}-{Math.min(10, filteredAds.length)} from {filteredAds.length}
                </div>
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
        title="Delete Advertisement"
        description="Are you sure you want to delete this ad? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        itemType="delete"
        itemName="advertisement"
        icon={<Trash2 className="h-8 w-8" />}
        onConfirm={handleConfirmDelete}
        onSuccess={() => {
          toast.success("Ad deleted successfully")
        }}
      />
    </div>
  )
}

