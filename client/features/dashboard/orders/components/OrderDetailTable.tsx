"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import UniTable, { ProductCell } from "@/components/shared/UniTable"

import { useParams } from "next/navigation"
import { OrderStatus, OrderItem } from "../types"
import { exportToExcel } from "@/utils/excelExport"
import { useOrder } from "../hooks/useOrders"
import { useTranslations } from "next-intl"
import { format } from "date-fns"

interface OrderDetailTableProps {
  items: OrderItem[]
}

export function OrderDetailTable({ items }: OrderDetailTableProps) {
  const t = useTranslations("Orders");
  const tCommon = useTranslations("Common");

  const columns = [
    {
      id: "product",
      header: t("product"),
      cell: (_: unknown, row: OrderItem) => (
        <ProductCell 
          title={row.name} 
          subtitle={row.size ? `${t("size")}: ${row.size}` : ""} 
          image={row.image || ""} 
        />
      )
    },
    {
      id: "id",
      header: t("id"),
      accessorKey: "id",
      className: "font-semibold text-primary"
    },
    {
      id: "quantity",
      header: t("quantity"),
      accessorKey: "quantity",
      className: "text-content-secondary"
    },
    {
      id: "price",
      header: t("price"),
      cell: (_: unknown, row: OrderItem) => (
        <span className="text-content-secondary">{row.price.toFixed(2)} {tCommon("currency")}</span>
      )
    },
    {
      id: "total_price",
      header: t("total"),
      cell: (_: unknown, row: OrderItem) => (
        <span className="text-content-secondary">{(row.price * row.quantity).toFixed(2)} {tCommon("currency")}</span>
      )
    }
  ]

  return (
    <Card className="rounded-[24px] border-none shadow-none overflow-hidden h-full">
      <CardHeader className="">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg font-semibold">{t("order_items")}</CardTitle>
        </div>
      </CardHeader>
      <UniTable 
        data={items} 
        columns={columns} 
      />
    </Card>
  )
}
