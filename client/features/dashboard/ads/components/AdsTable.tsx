import UniTable, { ActionCell, ActionButton, Check, Trash2, Pencil, UniTableColumn, SelectionCell, SelectionHeader } from "@/components/shared/UniTable"
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";
import { HeaderContext, CellContext } from "@tanstack/react-table"
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations, useLocale } from "next-intl"
import { getImageUrl } from "@/utils/image.utils"
import type { Ad } from "../types"

interface AdsTableProps {
  ads: Ad[]
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onSelectionChange?: (selectedRows: Ad[]) => void
  isLoading: boolean
}

export function AdsTable({ 
  ads, 
  selectedIds, 
  onToggleSelect, 
  onDelete, 
  onEdit, 
  onSelectionChange,
  isLoading 
}: AdsTableProps) {
  const t = useTranslations("Common")
  const tAds = useTranslations("Ads")
  const locale = useLocale()
  
  const columns: UniTableColumn<Ad>[] = [
    {
      id: "select_id",
      header: (props: HeaderContext<Ad, any>) => (
        <SelectionHeader 
          label={tAds("title")} 
          checked={props.table.getIsAllPageRowsSelected()}
          indeterminate={props.table.getIsSomePageRowsSelected()}
          onChange={(val) => props.table.toggleAllPageRowsSelected(val)}
        />
      ),
      cell: (_: unknown, row: Ad, props: CellContext<Ad, any>) => (
        <SelectionCell 
          checked={props.row.getIsSelected()} 
          onChange={(val) => props.row.toggleSelected(val)}
          id={row.id?.substring(0, 6) || "..."} 
        />
      ),
    },
    {
      id: "image",
      header: t("image"),
      cell: (_: unknown, row: Ad) => (
        <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
             <img src={getImageUrl(row.photo) || "/ads-1.svg"} alt={row.nameEn} className="h-full w-full object-cover" />
        </div>
      ),
    },
    {
      id: "title",
      header: t("title"),
      cell: (_: unknown, row: Ad) => (
        <span className="text-gray-600 font-medium">{locale === "ar" ? row.nameAr : row.nameEn}</span>
      ),
    },
    {
      id: "description",
      header: t("description"),
      cell: (_: unknown, row: Ad) => (
        <span className="text-gray-500 text-sm truncate max-w-[150px] block">
            {row.link || t("none")}
        </span>
      ),
    },
    {
      id: "date",
      header: t("date"),
      cell: (_: unknown, row: Ad) => (
        <span className="text-gray-500 text-sm">
            {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "action",
      header: t("action"),
      cell: (_: unknown, row: Ad) => (
        <ActionCell>
           <ActionButton icon={Trash2} variant="danger" onClick={() => onDelete(row.id)} />
           <ActionButton icon={Pencil} onClick={() => onEdit(row.id)} />
        </ActionCell>
      ),
    },
  ]

  if (isLoading) {
    return <UniTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
       <UniTable<Ad>
        data={ads}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        itemLabel={tAds("title")}
        onSelectionChange={React.useCallback((rows: Ad[]) => {
          onSelectionChange?.(rows)
        }, [onSelectionChange])}
        getRowId={(row: Ad) => row.id}
        showSelection={true}
      />
  )
}
