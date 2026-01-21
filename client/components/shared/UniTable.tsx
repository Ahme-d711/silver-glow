"use client"

import * as React from "react"
import Image from "next/image"
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, type ColumnDef } from "@tanstack/react-table"
import { Check, Minus, Trash2, Pencil, Eye, ImageOff } from "lucide-react"
export { Check, Minus, Trash2, Pencil, Eye }

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Pagination } from "./Pagination"
import { getImageUrl } from "@/utils/image.utils"

// Types for flexible cell rendering
export type CellRenderer<TData> = (value: unknown, row: TData) => React.ReactNode

export interface UniTableColumn<TData> {
  id: string
  header: string | React.ReactNode
  accessorKey?: keyof TData | string
  cell?: CellRenderer<TData>
  enableSorting?: boolean
  className?: string
  headerClassName?: string
}

export interface UniTableProps<TData> {
  data: TData[]
  columns: UniTableColumn<TData>[]
  className?: string
  enablePagination?: boolean
  pageSize?: number
  emptyMessage?: string
  itemLabel?: string 
  showSelection?: boolean
  serverPagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
    onPageChange: (page: number) => void
  }
}

/**
 * ProductCell helper for rendering a product image with title and subtitle
 */
export function ProductCell({ 
  image, 
  title, 
  subtitle,
  imageSize = "h-12 w-12" 
}: { 
  image?: string; 
  title: string; 
  subtitle?: string;
  imageSize?: string;
}) {
  const imageUrl = getImageUrl(image)

  return (
    <div className="flex items-center gap-3">
      {imageUrl ? (
        <div className={cn("relative overflow-hidden rounded-xl bg-divider shrink-0", imageSize)}>
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            className="object-cover" 
          />
        </div>
      ) : (
        <div className={cn("rounded-xl bg-divider shrink-0 flex items-center justify-center", imageSize)}>
          <ImageOff className="h-5 w-5 text-content-tertiary" />
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-content-primary leading-tight">{title}</span>
        {subtitle && <span className="text-xs text-content-secondary mt-0.5">{subtitle}</span>}
      </div>
    </div>
  )
}

/**
 * Selection icon for the header (e.g. "Select All" state)
 */
export function SelectionHeader({ 
  isAllSelected = true, 
  label 
}: { 
  isAllSelected?: boolean; 
  label?: string 
}) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox 
        checked={isAllSelected} 
        className="rounded bg-primary border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white shrink-0" 
      />
      {label && <span className="whitespace-nowrap">{label}</span>}
    </div>
  )
}

/**
 * Selection icon for a row
 */
export function SelectionCell({ 
  isSelected = false, 
  id 
}: { 
  isSelected?: boolean; 
  id?: string | number 
}) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox 
        checked={isSelected} 
        className={cn(
          "rounded transition-colors shrink-0",
          isSelected ? "bg-primary border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white" : "border-divider bg-white"
        )} 
      />
      {id && <span className="font-semibold text-primary whitespace-nowrap">{id}</span>}
    </div>
  )
}

/**
 * ActionButton helper for rendering a single action button
 */
export function ActionButton({ 
  icon: Icon, 
  onClick, 
  variant = "default" 
}: { 
  icon: any; 
  onClick?: () => void; 
  variant?: "default" | "danger" 
}) {
  return (
    <Button 
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={cn(
        "h-8 w-8 rounded-lg shrink-0 cursor-pointer",
        variant === "danger" 
          ? "text-error hover:bg-red-50 hover:text-error" 
          : "text-content-tertiary hover:bg-gray-100"
      )}
    >
      <Icon className="h-6! w-6!" />
    </Button>
  )
}

/**
 * ActionCell helper for rendering a group of action buttons
 */
export function ActionCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      {children}
    </div>
  )
}

function UniTable<TData>({
  data,
  columns,
  className,
  enablePagination = false,
  pageSize = 10,
  emptyMessage = "No data found",
  itemLabel = "items",
  showSelection = false,
  serverPagination,
}: UniTableProps<TData>) {
  
  const tableColumns = React.useMemo<ColumnDef<TData>[]>(() => {
    return columns.map((col) => ({
      id: col.id,
      accessorKey: col.accessorKey as string,
      header: () => col.header,
      cell: ({ row, getValue }) => {
        const value = getValue()
        return col.cell ? col.cell(value, row.original) : (value ?? "-")
      },
      enableSorting: col.enableSorting ?? false,
    }))
  }, [columns])

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  // No longer needed
  // const columnWidths = React.useMemo(() => ... )

  if (data.length === 0) {
    return (
      <div className={cn("text-center py-20 text-muted-foreground bg-white rounded-2xl border border-divider", className)}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={cn("w-full h-full", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-y border-divider">
                {headerGroup.headers.map((header) => {
                  const column = columns.find((col) => col.id === header.id)
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "h-14 px-4 py-4 align-middle font-medium text-base text-content-secondary first:pl-6 last:pr-6 whitespace-nowrap",
                        column?.headerClassName
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b border-divider hover:bg-gray-50/50 transition-colors cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => {
                  const column = columns.find((col) => col.id === cell.column.id)
                  return (
                    <td
                      key={cell.id}
                      className={cn(
                        "p-4 align-middle first:pl-6 last:pr-6",
                        column?.className
                      )}
                    >
                      <div className="flex items-center whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {(serverPagination || enablePagination) && (
        <Pagination
          currentPage={serverPagination?.currentPage ?? table.getState().pagination.pageIndex + 1}
          totalPages={serverPagination?.totalPages ?? table.getPageCount()}
          totalItems={serverPagination?.totalItems ?? data.length}
          pageSize={pageSize}
          onPageChange={serverPagination?.onPageChange ?? ((page) => table.setPageIndex(page - 1))}
          itemLabel={itemLabel}
        />
      )}
    </div>
  )
}

export default UniTable
