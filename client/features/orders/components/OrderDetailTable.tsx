"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import UniTable, { ProductCell } from "@/components/shared/UniTable"

// Mock data for the table
const orderItems = [
  {
    productName: "Logic+ Wireless Mouse",
    subtitle: "Black",
    id: "302011",
    total_pcs: "1 pcs",
    price: "$121.00",
    total: "$121.00",
    productImage: ""
  },
  {
    productName: "Smartwatch E2",
    subtitle: "Black",
    id: "302011",
    total_pcs: "1 pcs",
    price: "$590.00",
    total: "$590.00",
    productImage: ""
  }
]

export function OrderDetailTable() {
  const columns = [
    {
      id: "product",
      header: "Product",
      cell: (_: any, row: any) => (
        <ProductCell 
          title={row.productName} 
          subtitle={row.subtitle} 
          image={row.productImage} 
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
      id: "total_pcs",
      header: "Total",
      accessorKey: "total_pcs",
      className: "text-content-secondary"
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      className: "text-content-secondary"
    },
    {
      id: "total_price",
      header: "Total",
      accessorKey: "total",
      className: "text-content-secondary"
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
        data={orderItems} 
        columns={columns} 
      />
    </Card>
  )
}
