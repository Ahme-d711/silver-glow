"use client"

import * as React from "react"
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, type ColumnDef } from "@tanstack/react-table"
import { Check, Minus, Trash2, Pencil, Eye, ImageOff, RotateCcw } from "lucide-react"
export { Check, Minus, Trash2, Pencil, Eye, RotateCcw }

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Pagination } from "./Pagination"
import { getImageUrl } from "@/utils/image.utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

import { IconType } from "@/types"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

import { Row, Table, HeaderContext, CellContext } from "@tanstack/react-table"

// Types for flexible cell rendering
export type CellRenderer<TData> = (value: unknown, row: TData, props: CellContext<TData, any>) => React.ReactNode

export interface UniTableColumn<TData> {
  id: string
  header: string | React.ReactNode | ((props: HeaderContext<TData, any>) => React.ReactNode)
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
  onSelectionChange?: (selectedRows: TData[]) => void
  getRowId?: (row: TData) => string
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
  imageSize = "h-12 w-12",
  className
}: { 
  image?: string; 
  title: string; 
  subtitle?: string;
  imageSize?: string;
  className?: string;
}) {
  const imageUrl = getImageUrl(image)

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className={cn("rounded-xl bg-divider shrink-0", imageSize)}>
        <AvatarImage src={imageUrl || undefined} alt={title} className="object-cover" />
        <AvatarFallback className="rounded-xl bg-divider text-content-tertiary">
          <ImageOff className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
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
  checked,
  indeterminate,
  onChange,
  label 
}: { 
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string 
}) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox 
        checked={checked} 
        onCheckedChange={(val) => onChange?.(!!val)}
        className={cn(
          "rounded transition-colors shrink-0",
          (checked || indeterminate) 
            ? "bg-primary border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white" 
            : "border-divider bg-white"
        )} 
      />
      {label && <span className="whitespace-nowrap">{label}</span>}
    </div>
  )
}

/**
 * Selection icon for a row
 */
export function SelectionCell({ 
  checked = false, 
  onChange,
  id 
}: { 
  checked?: boolean; 
  onChange?: (checked: boolean) => void;
  id?: string | number 
}) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox 
        checked={checked} 
        onCheckedChange={(val) => onChange?.(!!val)}
        className={cn(
          "rounded transition-colors shrink-0",
          checked ? "bg-primary border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white" : "border-divider bg-white"
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
  icon: IconType; 
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

/**
 * StatusSelectCell helper for rendering a status dropdown with colors
 */
export function StatusSelectCell({
  value,
  onValueChange,
  options,
  colorMap,
  t,
  className
}: {
  value: string;
  onValueChange: (newValue: string) => void;
  options: string[];
  colorMap: Record<string, string>;
  t: (key: any) => string;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger 
        className={cn(
          "h-8 w-[130px] border px-3 py-1 rounded-lg font-medium shadow-none transition-colors",
          colorMap[value] || "bg-gray-100 text-gray-600 border-gray-200",
          className
        )}
      >
        <SelectValue>
          {t(value.toLowerCase())}
        </SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        {options.map((option) => (
          <SelectItem 
            key={option} 
            value={option}
            className={cn(
              "flex items-center gap-2",
              colorMap[option] ? `focus:${colorMap[option]} data-[state=checked]:${colorMap[option]}` : ""
            )}
          >
            <div className={cn("size-2 rounded-full", colorMap[option]?.split(" ")[0] || "bg-gray-400")} />
            {t(option.toLowerCase())}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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
  onSelectionChange,
  getRowId,
  serverPagination,
}: UniTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({})
  
  const tableColumns = React.useMemo<ColumnDef<TData>[]>(() => {
    return columns.map((col) => ({
      id: col.id,
      accessorKey: col.accessorKey as string,
      header: (headerProps) => {
        if (typeof col.header === "function") {
          return col.header(headerProps)
        }
        return col.header
      },
      cell: (cellProps) => {
        const value = cellProps.getValue()
        if (col.cell) {
          return col.cell(value, cellProps.row.original, cellProps)
        }
        return value ?? "-"
      },
      enableSorting: col.enableSorting ?? false,
    }))
  }, [columns])

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getRowId: getRowId,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  // Use a ref to store the latest callback to avoid unnecessary effect triggers
  const onSelectionChangeRef = React.useRef(onSelectionChange)
  onSelectionChangeRef.current = onSelectionChange

  // Trigger onSelectionChange when selection updates
  React.useEffect(() => {
    if (onSelectionChangeRef.current) {
      const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original)
      onSelectionChangeRef.current(selectedRows)
    }
  }, [rowSelection]) // ONLY depend on rowSelection to avoid infinite loops if table/props change

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
          <tbody className="relative">
            <AnimatePresence mode="popLayout" initial={false}>
              {table.getRowModel().rows.map((row) => (
                <motion.tr
                  key={row.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                  transition={{ 
                    opacity: { duration: 0.2 },
                    layout: { type: "spring", stiffness: 500, damping: 50, mass: 1 }
                  }}
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
                </motion.tr>
              ))}
            </AnimatePresence>
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
