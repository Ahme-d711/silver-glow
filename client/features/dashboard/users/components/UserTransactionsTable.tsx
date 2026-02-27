
"use client"

import React from "react"
import { format } from "date-fns";
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";
import { Badge } from "@/components/ui/badge"
import UniTable, { ProductCell } from "@/components/shared/UniTable"
import { TableFilters } from "@/components/shared/TableFilters"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

interface Transaction {
  id: string
  product: string
  sub: string
  total: string
  status: string
  date: string
  image?: string
}

interface UserTransactionsTableProps {
  transactions: Transaction[]
  isLoading?: boolean
  filterValue?: string
  onFilterChange?: (value: string) => void
  date?: Date | undefined
  onDateChange?: (date: Date | undefined) => void
}

export function UserTransactionsTable({ 
  transactions, 
  isLoading = false,
  filterValue,
  onFilterChange,
  date,
  onDateChange
}: UserTransactionsTableProps) {
  const t = useTranslations("Users")
  const tCommon = useTranslations("Common")
  const tOrders = useTranslations("Orders")
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || ""
  

  const filterOptions = [
    { label: t("all_status"), value: "all" },
    { label: tOrders("pending"), value: "PENDING" },
    { label: tOrders("confirmed"), value: "CONFIRMED" },
    { label: tOrders("processing"), value: "PROCESSING" },
    { label: tOrders("shipped"), value: "SHIPPED" },
    { label: tOrders("delivered"), value: "DELIVERED" },
    { label: tOrders("cancelled"), value: "CANCELLED" },
    { label: tOrders("returned"), value: "RETURNED" },
  ]

 
  const columns = [
    {
      id: "orderId",
      header: t("order_id"),
      cell: (_: unknown, row: Transaction) => <span className="text-primary font-semibold">{row.id}</span>
    },
    {
      id: "product",
      header: t("product"),
      cell: (_: unknown, row: Transaction) => (
        <ProductCell 
          title={row.product}
          subtitle={row.sub}
          image={row.image}
        />
      )
    },
    {
      id: "total",
      header: t("total"),
      accessorKey: "total",
      className: "font-medium text-content-secondary"
    },
    {
      id: "status",
      header: t("status"),
      cell: (_: unknown, row: Transaction) => {
        const statusColors: Record<string, string> = {
          PENDING: "bg-yellow-100/50 text-yellow-600 border-yellow-200",
          CONFIRMED: "bg-blue-100/50 text-blue-600 border-blue-200",
          PROCESSING: "bg-purple-100/50 text-purple-600 border-purple-200",
          SHIPPED: "bg-indigo-100/50 text-indigo-600 border-indigo-200",
          DELIVERED: "bg-green-100/50 text-green-600 border-green-200",
          CANCELLED: "bg-gray-100/50 text-gray-600 border-gray-200",
          RETURNED: "bg-red-100/50 text-red-600 border-red-200",
        }
        
        const colorClass = statusColors[row.status] || "bg-purple-100/50 text-primary border-none"

        return (
          <Badge className={cn("px-4 py-1.5 rounded-xl font-semibold shadow-none border hover:bg-opacity-70", colorClass)}>
            {tOrders(row.status.toLowerCase() as any)}
          </Badge>
        )
      }
    },
    {
      id: "date",
      header: t("date"),
      accessorKey: "date",
      className: "text-content-tertiary font-medium"
    }
  ]
 
  if (isLoading) {
    return <UniTableSkeleton columnCount={5} rowCount={5} />;
  }
 
  return (
    <div className="bg-white rounded-[32px] border border-divider">
      <div className="p-6 pb-0 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-content-primary">{t("transaction_history")}</h3>
      <TableFilters
        date={date}
        setDate={onDateChange}
        filterValue={filterValue}
        onFilterChange={onFilterChange}
        filterOptions={filterOptions}
        className="px-6 py-4 border-b border-divider/50"
        />
        </div>
      <div className="p-0">
        <UniTable 
          columns={columns}
          data={transactions}
          enablePagination={true}
          pageSize={5}
          itemLabel={tOrders("title")}
        />
      </div>
    </div>
  )
}
