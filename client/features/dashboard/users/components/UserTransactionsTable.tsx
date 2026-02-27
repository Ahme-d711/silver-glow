
"use client"

import React from "react"
import { format } from "date-fns";
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";
import { Badge } from "@/components/ui/badge"
import UniTable, { ProductCell } from "@/components/shared/UniTable"
import { TableFilters } from "@/components/shared/TableFilters"
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
    { label: tOrders("completed"), value: "completed" },
    { label: tOrders("processing"), value: "processing" },
    { label: tOrders("cancelled"), value: "cancelled" },
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
      cell: (_: unknown, row: Transaction) => (
        <Badge className="bg-purple-100/50 text-primary border-none px-4 py-1.5 rounded-xl font-semibold shadow-none hover:bg-purple-100/50">
          {row.status}
        </Badge>
      )
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
