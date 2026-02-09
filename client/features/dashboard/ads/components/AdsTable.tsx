import UniTable, { ActionCell, ActionButton, Trash2, Pencil, UniTableColumn, SelectionCell, SelectionHeader } from "@/components/shared/UniTable"
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";
import { HeaderContext, CellContext } from "@tanstack/react-table"
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch"
import { useTranslations, useLocale } from "next-intl"
import { getImageUrl } from "@/utils/image.utils"
import type { Ad } from "../types"
import { ConfirmationModal } from "@/components/shared/ConfirmationModal";

interface AdsTableProps {
  ads: Ad[]
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleStatus: (id: string, isShown: boolean) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onSelectionChange?: (selectedRows: Ad[]) => void
  isLoading: boolean
}

export function AdsTable({ 
  ads, 
  selectedIds, 
  onToggleSelect, 
  onToggleStatus,
  onDelete, 
  onEdit, 
  onSelectionChange,
  isLoading 
}: AdsTableProps) {
  const tCommon = useTranslations("Common")
  const tAds = useTranslations("Ads")
  const tProducts = useTranslations("Products")
  const locale = useLocale()

  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    adId: string;
    adName: string;
  }>({
    open: false,
    adId: "",
    adName: "",
  });

  const handleDeleteClick = (ad: Ad) => {
    setModalConfig({
      open: true,
      adId: ad.id || ad._id || "",
      adName: locale === "ar" ? ad.nameAr : ad.nameEn,
    });
  };

  const handleConfirmDelete = async () => {
    if (modalConfig.adId) {
      onDelete(modalConfig.adId);
      setModalConfig({ open: false, adId: "", adName: "" });
    }
  };
  
  const columns: UniTableColumn<Ad>[] = [
    {
      id: "select_id",
      header: (props: HeaderContext<Ad, unknown>) => (
        <SelectionHeader 
          label={tAds("adId")} 
          checked={props.table.getIsAllPageRowsSelected()}
          indeterminate={props.table.getIsSomePageRowsSelected()}
          onChange={(val) => props.table.toggleAllPageRowsSelected(val)}
        />
      ),
      cell: (_: unknown, row: Ad, props: CellContext<Ad, unknown>) => (
        <SelectionCell 
          checked={props.row.getIsSelected()} 
          onChange={(val) => props.row.toggleSelected(val)}
          id={row.id?.substring(0, 6) || "..."} 
        />
      ),
    },
    {
      id: "image",
      header: tCommon("image"),
      cell: (_: unknown, row: Ad) => (
        <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
             <img src={getImageUrl(row.photo) || "/ads-1.svg"} alt={row.nameEn} className="h-full w-full object-cover" />
        </div>
      ),
    },
    {
      id: "title",
      header: tAds("title"),
      cell: (_: unknown, row: Ad) => (
        <span className="text-gray-600 font-medium">{locale === "ar" ? row.nameAr : row.nameEn}</span>
      ),
    },
    {
      id: "description",
      header: tCommon("description"),
      cell: (_: unknown, row: Ad) => (
        <span className="text-gray-500 text-sm truncate max-w-[150px] block">
            {row.link || tCommon("none")}
        </span>
      ),
    },
    {
      id: "product",
      header: tProducts("product"),
      cell: (_: unknown, row: Ad) => {
        const product = row.productId;
        // Handle if product is populated (object) or just an ID (string)
        // Based on controller it is populated with nameAr and nameEn
        if (typeof product === 'object' && product !== null) {
             return <span className="text-gray-600 text-sm">{(product as { nameAr?: string; nameEn?: string })[locale === 'ar' ? 'nameAr' : 'nameEn']}</span>
        }
        return <span className="text-gray-400 text-sm">-</span>
      },
    },
    {
      id: "priority",
      header: tCommon("priority"),
      cell: (_: unknown, row: Ad) => (
        <span className="text-gray-600 font-medium text-sm">
            {row.priority}
        </span>
      ),
    },
    {
      id: "date",
      header: tCommon("date"),
      cell: (_: unknown, row: Ad) => (
        <span className="text-gray-600 font-medium text-sm">
            {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "status",
      header: tCommon("status"),
      cell: (_: unknown, row: Ad) => (
        <Switch
          checked={row.isShown}
          onCheckedChange={(checked) => onToggleStatus(row.id || row._id || "", checked)}
          className="data-[state=checked]:bg-primary"
        />
      ),
    },
    {
      id: "action",
      header: tCommon("action"),
      cell: (_: unknown, row: Ad) => (
        <ActionCell>
           <ActionButton 
              icon={Trash2} 
              variant="danger" 
              onClick={() => handleDeleteClick(row)} 
            />
           <ActionButton icon={Pencil} onClick={() => onEdit(row.id || row._id || "")} />
        </ActionCell>
      ),
    },
  ]

  if (isLoading) {
    return <UniTableSkeleton columnCount={7} rowCount={10} />;
  }

  return (
    <>
       <UniTable<Ad>
        data={ads}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        itemLabel={tAds("title")}
        onSelectionChange={React.useCallback((rows: Ad[]) => {
          onSelectionChange?.(rows)
        }, [onSelectionChange])}
        getRowId={(row: Ad) => row.id || row._id || ""}
        showSelection={true}
      />

      <ConfirmationModal
        open={modalConfig.open}
        onOpenChange={(open) => setModalConfig((prev) => ({ ...prev, open }))}
        title={tAds("confirm_delete_title") || tCommon("confirm_delete_title")}
        description={tAds("confirm_delete_desc", { name: modalConfig.adName }) || tCommon("confirm_delete_desc", { name: modalConfig.adName })}
        onConfirm={handleConfirmDelete}
        variant="destructive"
        confirmText={tCommon("delete")}
        cancelText={tCommon("cancel")}
      />
    </>
  )
}
