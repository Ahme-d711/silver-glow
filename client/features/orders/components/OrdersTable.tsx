"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import UniTable, { 
  ProductCell, 
  ActionCell, 
  ActionButton, 
  Trash2, 
  Pencil,
  Eye,
  SelectionHeader,
  SelectionCell
} from "@/components/shared/UniTable"
import { cn } from "@/lib/utils"
// import { EditOrderTemplate } from "../templats/EditOrderTemplate"
import { Order } from "../types"
import { format } from "date-fns"
import React from "react"

interface OrdersTableProps {
  orders?: Order[]
}

interface TableRowData extends Record<string, unknown> {
  id: string
  productName: string
  otherProducts: string
  productImage: string
  date: string
  customer: string
  total: string
  payment: string
  status: string
  selected: boolean
  originalOrder: Order
}

import { useTranslations } from "next-intl"

export function OrdersTable({ orders = [] }: OrdersTableProps) {
  const t = useTranslations("Orders");
  const tCommon = useTranslations("Common");
  const router = useRouter()
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  const handleEdit = (order: Order) => {
    setEditingOrder(order)
    setIsEditOpen(true)
  }

  const handleView = (orderId: string) => {
    router.push(`/orders/${orderId}`)
  }

  // Transform orders data for table display
  const tableData = React.useMemo<TableRowData[]>(() => {
    return orders.map((order) => ({
      id: order._id,
      productName: order.orderType || t("product"),
      otherProducts: order.trackingNumber ? `${t("tracking_number")}: ${order.trackingNumber}` : tCommon("none"),
      productImage: order.pictureUrl || "",
      date: order.createdAt ? format(new Date(order.createdAt), "dd MMM yyyy") : "-",
      customer: order.recipientName || order.userName || "-",
      total: `${order.deliveryCost?.toFixed(2) || "0.00"} ${tCommon("currency")}`,
      payment: order.receiverPaysShipping ? "Receiver" : "Sender",
      status: order.status,
      selected: false,
      originalOrder: order,
    }))
  }, [orders, t, tCommon])

  const columns = [
    {
      id: "id",
      header: <SelectionHeader label={t("order_id")} />,
      cell: (_: unknown, row: TableRowData) => (
        <SelectionCell isSelected={row.selected} id={row.id.toString().slice(-6).toUpperCase()} />
      ),
    },
    {
      id: "product",
      header: t("product"),
      cell: (_: unknown, row: TableRowData) => (
        <ProductCell
          title={row.productName}
          subtitle={row.otherProducts}
          image={row.productImage}
        />
      ),
    },
    {
      id: "date",
      header: t("date"),
      accessorKey: "date",
      className: "text-content-secondary",
    },
    {
      id: "customer",
      header: t("customer"),
      accessorKey: "customer",
      className: "font-medium text-content-primary",
    },
    {
      id: "total",
      header: t("total"),
      accessorKey: "total",
      className: "text-content-secondary",
    },
    {
      id: "payment",
      header: t("payment"),
      accessorKey: "payment",
      className: "text-content-secondary",
    },
    {
      id: "status",
      header: t("status"),
      cell: (_: unknown, row: TableRowData) => {
        const statusColors: Record<string, string> = {
          CREATED: "bg-blue-100/50 text-blue-600",
          PENDING: "bg-yellow-100/50 text-yellow-600",
          ACCEPTED: "bg-primary/10 text-primary",
          IN_PROGRESS: "bg-purple-100/50 text-purple-600",
          IN_THE_WAY: "bg-indigo-100/50 text-indigo-600",
          RETURN: "bg-error/10 text-error",
          DELIVERED: "bg-success/10 text-success",
        }
        return (
          <Badge className={cn(
            "border-none px-3 py-1 rounded-lg font-medium shadow-none",
            statusColors[row.status] || "bg-gray-100 text-gray-600"
          )}>
            {t(row.status.toLowerCase() as any)}
          </Badge>
        )
      },
    },
    {
      id: "action",
      header: t("action"),
      className: "flex justify-center gap-2",
      headerClassName: "flex justify-center",
      cell: (_: unknown, row: TableRowData) => {
        return (
          <ActionCell>
            <ActionButton 
              icon={Eye} 
              onClick={() => handleView(row.id)} 
            />
            <ActionButton 
              icon={Pencil} 
              onClick={() => handleEdit(row.originalOrder)} 
            />
            <ActionButton 
              icon={Trash2} 
              variant="danger" 
              onClick={() => console.log("Delete", row.id)} 
            />
          </ActionCell>
        )
      },
    },
  ]

  return (
    <>
      <UniTable 
        data={tableData}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        itemLabel="Orders"
      />
      {/* <EditOrderTemplate 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        orderData={editingOrder} 
      /> */}
    </>
  )
}
