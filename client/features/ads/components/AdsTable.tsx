import UniTable, { ActionCell, ActionButton, Check, Trash2, Pencil, UniTableColumn } from "@/components/shared/UniTable"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from "next-intl"

interface AdsTableProps {
  ads: any[]
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

export function AdsTable({ ads, selectedIds, onToggleSelect, onDelete, onEdit }: AdsTableProps) {
  const t = useTranslations("Common")
  const tAds = useTranslations("Ads")
  
  const columns: UniTableColumn<any>[] = [
    {
      id: "select_id",
      header: (
        <div className="flex items-center gap-2">
            <div className="bg-[#192C56] rounded-full p-[2px]">
                <div className="h-4 w-4 bg-[#192C56] rounded-full flex items-center justify-center text-white font-bold text-xs">-</div>
            </div>
          <span>{tAds("title")}</span>
        </div>
      ),
      cell: (_: unknown, row: any) => (
        <div className="flex items-center gap-3">
          <Checkbox 
            checked={selectedIds.includes(row.id)}
            onCheckedChange={() => onToggleSelect(row.id)}
            className="rounded bg-[#192C56] border-[#192C56] data-[state=checked]:bg-[#192C56] data-[state=checked]:text-white data-[state=unchecked]:bg-transparent data-[state=unchecked]:border-gray-400"
          />
          <span className="font-semibold text-primary">{row.id?.substring(0, 6) || "..."}</span>
        </div>
      ),
    },
    {
      id: "image",
      header: t("image"),
      cell: (_: unknown, row: any) => (
        <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
             <img src={row.photo ? (row.photo.startsWith('http') || row.photo.startsWith('/') ? row.photo : `/${row.photo}`) : "/ads-1.svg"} alt={row.nameEn} className="h-full w-full object-cover" />
        </div>
      ),
    },
    {
      id: "title",
      header: t("title"),
      cell: (_: unknown, row: any) => (
        <span className="text-gray-600 font-medium">{row.nameAr} | {row.nameEn}</span>
      ),
    },
    {
      id: "description",
      header: t("description"),
      cell: (_: unknown, row: any) => (
        <span className="text-gray-500 text-sm truncate max-w-[150px] block">
            {row.link || t("none")}
        </span>
      ),
    },
    {
      id: "date",
      header: t("date"),
      cell: (_: unknown, row: any) => (
        <span className="text-gray-500 text-sm">
            {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "action",
      header: t("action"),
      cell: (_: unknown, row: any) => (
        <ActionCell>
           <ActionButton icon={Trash2} variant="danger" onClick={() => onDelete(row.id)} />
           <ActionButton icon={Pencil} onClick={() => onEdit(row.id)} />
        </ActionCell>
      ),
    },
  ]

  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-divider p-6">
       <UniTable<any>
        data={ads}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        itemLabel={tAds("title")}
      />
    </div>
  )
}
