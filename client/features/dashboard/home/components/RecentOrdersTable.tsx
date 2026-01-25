"use client"

import React from "react"
import { useRouter } from "next/navigation"
import UniTable, { ProductCell, ActionCell, ActionButton, Eye, Trash2 } from "@/components/shared/UniTable"
import { Badge } from "@/components/ui/badge"
import { StatusFilter } from "@/components/shared/StatusFilter"
import { useOrders } from "@/features/dashboard/orders/hooks/useOrders"
import { Order } from "@/features/dashboard/orders/types"
import { cn } from "@/lib/utils"
import UniLoading from "@/components/shared/UniLoading"

interface TableRowData extends Record<string, unknown> {
  id: number
  productName: string
  otherProducts: string
  productImage: string
  customerName: string
  customerPhone: string
  total: string
  status: string
  originalOrder: Order
}

export function RecentOrdersTable() {
  const router = useRouter()
  const [filter, setFilter] = React.useState("all")
  const { data: orders, isLoading } = useOrders()

  // Transform orders data for table display and limit to 5 most recent
  const tableData = React.useMemo<TableRowData[]>(() => {
    if (!orders) return []
    
    // Sort by createdAt (most recent first) and take first 5
    const sortedOrders = [...orders]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return dateB - dateA
      })
      .slice(0, 5)
      .map((order) => ({
        id: order.id,
        productName: order.orderType || "Order",
        otherProducts: order.trackingNumber ? `Tracking: ${order.trackingNumber}` : "No tracking",
        productImage: order.pictureUrl || "",
        customerName: order.recipientName || order.userName || "-",
        customerPhone: order.recipientPhone || "-",
        total: `$${order.deliveryCost?.toFixed(2) || "0.00"}`,
        status: order.status,
        originalOrder: order,
      }))
    
    return sortedOrders
  }, [orders])

  // Filter by status if needed
  const filteredData = React.useMemo(() => {
    if (filter === "all") return tableData
    return tableData.filter((row) => row.status === filter)
  }, [tableData, filter])

  const handleView = (orderId: number) => {
    router.push(`/orders/${orderId}`)
  }

  const columns = [
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
      id: "customer",
      header: "Customer",
      cell: (_: unknown, row: TableRowData) => (
        <div className="flex flex-col">
          <span className="font-semibold text-content-primary leading-tight">{row.customerName}</span>
          <span className="text-xs text-content-secondary mt-0.5">{row.customerPhone}</span>
        </div>
      ),
    },
    {
      id: "total",
      header: "Total",
      accessorKey: "total",
      className: "font-medium text-content-secondary",
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
            "border-none px-4 py-1.5 rounded-xl font-semibold",
            statusColors[row.status] || "bg-secondary text-primary"
          )}>
            {row.status.replace(/_/g, " ")}
          </Badge>
        )
      },
    },
    {
      id: "action",
      header: "Action",
      headerClassName: "flex justify-center",
      className: "flex justify-center gap-3",
      cell: (_: unknown, row: TableRowData) => (
        <ActionCell>
          <ActionButton icon={Eye} onClick={() => handleView(row.id)} />
          <ActionButton icon={Trash2} variant="danger" onClick={() => console.log("Delete", row.id)} />
        </ActionCell>
      ),
    },
  ]

  return (
    <div className="bg-white space-y-6 rounded-[24px] shadow-sm border border-divider overflow-hidden">
      {/* Header section */}
      <div className="p-6 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-content-primary">Recent Orders</h2>
          {orders && orders.length > 5 && (
            <Badge className="bg-success/10 text-success text-sm border-none hover:bg-success/20 px-3 py-1 rounded-lg font-semibold">
              +{orders.length - 5} Orders
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3">
          <StatusFilter value={filter} onValueChange={setFilter} />
        </div>
      </div>

      {/* Table section */}
      <div>
        {isLoading ? (
          <div className="p-8">
            <UniLoading />
          </div>
        ) : (
          <UniTable
            data={filteredData}
            columns={columns}
            enablePagination={false}
            pageSize={5}
            itemLabel="Orders"
          />
        )}
      </div>
    </div>
  )
}
