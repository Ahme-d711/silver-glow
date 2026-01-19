"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import UniTable, { ProductCell } from "@/components/shared/UniTable"
import { TableFilters } from "@/components/shared/TableFilters"

interface Transaction {
  id: string
  product: string
  sub: string
  total: string
  status: string
  date: string
}

interface CustomerTransactionsTableProps {
  transactions: Transaction[]
}

const filterOptions = [
  { label: "All Status", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Processing", value: "processing" },
  { label: "Cancelled", value: "cancelled" },
]

export function CustomerTransactionsTable({ transactions }: CustomerTransactionsTableProps) {
  const [search, setSearch] = React.useState("")
  const [date, setDate] = React.useState<Date | undefined>()
  const [filter, setFilter] = React.useState("all")

  const columns = [
    {
      id: "orderId",
      header: "Order ID",
      cell: (_: any, row: any) => <span className="text-primary font-semibold">{row.id}</span>
    },
    {
      id: "product",
      header: "Product",
      cell: (_: any, row: any) => (
        <ProductCell 
          title={row.product}
          subtitle={row.sub}
          image=""
        />
      )
    },
    {
      id: "total",
      header: "Total",
      accessorKey: "total",
      className: "font-medium text-content-secondary"
    },
    {
      id: "status",
      header: "Status",
      cell: (_: any, row: any) => (
        <Badge className="bg-purple-100/50 text-primary border-none px-4 py-1.5 rounded-xl font-semibold shadow-none hover:bg-purple-100/50">
          {row.status}
        </Badge>
      )
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      className: "text-content-tertiary font-medium"
    }
  ]

  return (
    <div className="bg-white rounded-[32px] border border-divider">
      <div className="p-6 pb-0 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-content-primary">Transaction History</h3>
      <TableFilters
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search transactions..."
        date={date}
        setDate={setDate}
        filterValue={filter}
        onFilterChange={setFilter}
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
          itemLabel="Orders"
        />
      </div>
    </div>
  )
}
