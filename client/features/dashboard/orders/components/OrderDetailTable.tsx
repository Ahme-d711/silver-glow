"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import UniTable, { ProductCell } from "@/components/shared/UniTable"

import { useParams } from "next/navigation"
import { OrderStatus, OrderItem } from "../types"
import { exportToExcel } from "@/utils/excelExport"
import { useOrder } from "../hooks/useOrders"
import { format } from "date-fns"

interface OrderDetailTableProps {
  items: OrderItem[]
}

export function OrderDetailTable({ items }: OrderDetailTableProps) {
  const columns = [
    {
      id: "product",
      header: "Product",
      cell: (_: unknown, row: OrderItem) => (
        <ProductCell 
          title={row.name} 
          subtitle={row.size ? `Size: ${row.size}` : ""} 
          image={row.image || ""} 
        />
      )
    },
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      className: "font-semibold text-primary"
    },
    {
      id: "quantity",
      header: "Quantity",
      accessorKey: "quantity",
      className: "text-content-secondary"
    },
    {
      id: "price",
      header: "Price",
      cell: (_: unknown, row: OrderItem) => (
        <span className="text-content-secondary">${row.price.toFixed(2)}</span>
      )
    },
    {
      id: "total_price",
      header: "Total",
      cell: (_: unknown, row: OrderItem) => (
        <span className="text-content-secondary">${(row.price * row.quantity).toFixed(2)}</span>
      )
    }
  ]

  return (
    <Card className="rounded-[24px] border-none shadow-none overflow-hidden h-full">
      <CardHeader className="">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg font-semibold">Order List</CardTitle>
        </div>
      </CardHeader>
      <UniTable 
        data={items} 
        columns={columns} 
      />
    </Card>
  )
}
