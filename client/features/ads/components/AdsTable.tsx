"use client"

import UniTable, { ActionCell, ActionButton, Check, Trash2, Pencil, UniTableColumn } from "@/components/shared/UniTable"
import { Checkbox } from "@/components/ui/checkbox"

interface AdsTableProps {
  ads: any[]
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

export function AdsTable({ ads, selectedIds, onToggleSelect, onDelete, onEdit }: AdsTableProps) {
  
  const columns: UniTableColumn<any>[] = [
    {
      id: "select_id",
      header: (
        <div className="flex items-center gap-2">
            <div className="bg-[#192C56] rounded-full p-[2px]">
                <div className="h-4 w-4 bg-[#192C56] rounded-full flex items-center justify-center text-white font-bold text-xs">-</div>
            </div>
          <span>ADS</span>
        </div>
      ),
      cell: (_: unknown, row: any) => (
        <div className="flex items-center gap-3">
          <Checkbox 
            checked={selectedIds.includes(row.id)}
            onCheckedChange={() => onToggleSelect(row.id)}
            className="rounded bg-[#192C56] border-[#192C56] data-[state=checked]:bg-[#192C56] data-[state=checked]:text-white data-[state=unchecked]:bg-transparent data-[state=unchecked]:border-gray-400"
          />
          <span className="font-semibold text-primary">{row.id.substring(0, 6)}</span>
        </div>
      ),
    },
    {
      id: "image",
      header: "Image",
      cell: (_: unknown, row: any) => (
        <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
             <img src={row.image} alt={row.title} className="h-full w-full object-cover" />
        </div>
      ),
    },
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      className: "text-gray-600",
    },
    {
      id: "description",
      header: "Description",
      cell: (_: unknown, row: any) => (
        <span className="text-gray-500 text-sm truncate max-w-[150px] block">
            {/* Mock description if not present, or use title for now */}
            Des of ad
        </span>
      ),
    },
    {
      id: "date",
      header: "Date",
      cell: (_: unknown, row: any) => (
        <span className="text-gray-500 text-sm">
            {/* Mock date */}
            29 Dec 2022
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
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
        itemLabel="ADS"
      />
    </div>
  )
}
