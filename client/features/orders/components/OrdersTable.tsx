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
  id: number
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

export function OrdersTable({ orders = [] }: OrdersTableProps) {
  const router = useRouter()
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  const handleEdit = (order: Order) => {
    setEditingOrder(order)
    setIsEditOpen(true)
  }

  const handleView = (orderId: number) => {
    router.push(`/orders/${orderId}`)
  }

  // Transform orders data for table display
  const tableData = React.useMemo<TableRowData[]>(() => {
    return orders.map((order) => ({
      id: order.id,
      productName: order.orderType || "Order",
      otherProducts: order.trackingNumber ? `Tracking: ${order.trackingNumber}` : "No tracking",
      productImage: order.pictureUrl || "",
      date: order.createdAt ? format(new Date(order.createdAt), "dd MMM yyyy") : "-",
      customer: order.recipientName || order.userName || "-",
      total: `$${order.deliveryCost?.toFixed(2) || "0.00"}`,
      payment: order.receiverPaysShipping ? "Receiver" : "Sender",
      status: order.status,
      selected: false,
      originalOrder: order,
    }))
  }, [orders])

  const columns = [
    {
      id: "id",
      header: <SelectionHeader label="Order ID" />,
      cell: (_: unknown, row: TableRowData) => (
        <SelectionCell isSelected={row.selected} id={row.id} />
      ),
    },
    {
      id: "product",
      header: "Product",
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
      header: "Date",
      accessorKey: "date",
      className: "text-content-secondary",
    },
    {
      id: "customer",
      header: "Customer",
      accessorKey: "customer",
      className: "font-medium text-content-primary",
    },
    {
      id: "total",
      header: "Total",
      accessorKey: "total",
      className: "text-content-secondary",
    },
    {
      id: "payment",
      header: "Payment",
      accessorKey: "payment",
      className: "text-content-secondary",
    },
    {
      id: "status",
      header: "Status",
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
            {row.status.replace(/_/g, " ")}
          </Badge>
        )
      },
    },
    {
      id: "action",
      header: "Action",
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
