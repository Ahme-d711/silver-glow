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
import { useCancelOrder } from "../hooks/useOrders"
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
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder()

  const handleEdit = (orderId: string) => {
    router.push(`/dashboard/orders/${orderId}/edit`)
  }

  const handleView = (orderId: string) => {
    router.push(`/dashboard/orders/${orderId}`)
  }

  const handleCancelClick = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(orderId)
    }
  }

  // Transform orders data for table display
  const tableData = React.useMemo<TableRowData[]>(() => {
    return orders.map((order) => {
      const firstItem = order.items?.[0];
      const itemsCount = order.items?.length || 0;
      
      return {
        id: order._id,
        productName: firstItem?.name || t("product"),
        otherProducts: itemsCount > 1 ? `+${itemsCount - 1} ${tCommon("products")}` : "",
        productImage: firstItem?.image || "",
        date: order.createdAt ? format(new Date(order.createdAt), "dd MMM yyyy") : "-",
        customer: order.recipientName || "-",
        total: `${order.totalAmount?.toFixed(2) || "0.00"} ${tCommon("currency")}`,
        payment: t(`payment_${order.paymentMethod?.toLowerCase()}` as Parameters<typeof t>[0]) || order.paymentMethod,
        status: order.status,
        selected: false,
        originalOrder: order,
      }
    })
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
          PENDING: "bg-yellow-100/50 text-yellow-600",
          CONFIRMED: "bg-blue-100/50 text-blue-600",
          PROCESSING: "bg-purple-100/50 text-purple-600",
          SHIPPED: "bg-indigo-100/50 text-indigo-600",
          DELIVERED: "bg-success/10 text-success",
          CANCELLED: "bg-gray-100/50 text-gray-600",
          RETURNED: "bg-error/10 text-error",
        }
        return (
          <Badge className={cn(
            "border-none px-3 py-1 rounded-lg font-medium shadow-none",
            statusColors[row.status] || "bg-gray-100 text-gray-600"
          )}>
            {t(row.status.toLowerCase() as Parameters<typeof t>[0])}
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
              onClick={() => handleEdit(row.id)} 
            />
            <ActionButton 
              icon={Trash2} 
              variant="danger" 
              onClick={() => handleCancelClick(row.id)} 
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
