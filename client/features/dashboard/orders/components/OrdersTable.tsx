"use client"

import { useRouter } from "next/navigation"
import { HeaderContext, CellContext } from "@tanstack/react-table"
import UniTable, { 
  ProductCell, 
  ActionCell, 
  ActionButton, 
  Trash2, 
  Pencil,
  Eye,
  SelectionHeader,
  SelectionCell,
  StatusSelectCell
} from "@/components/shared/UniTable"
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";
import { cn } from "@/lib/utils"
import { Order, OrderStatus } from "../types"
import { format } from "date-fns"
import { useCancelOrder, useUpdateOrderStatus } from "../hooks/useOrders"
import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { ConfirmationModal } from "@/components/shared/ConfirmationModal";

interface OrdersTableProps {
  orders?: Order[]
  isLoading?: boolean
  onSelectionChange?: (selectedRows: Order[]) => void
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


export function OrdersTable({ orders = [], isLoading, onSelectionChange }: OrdersTableProps) {
  const t = useTranslations("Orders");
  const tCommon = useTranslations("Common");
  const router = useRouter()
  const { mutate: cancelOrder } = useCancelOrder()
  const { mutate: updateStatus } = useUpdateOrderStatus()

  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    orderId: string;
  }>({
    open: false,
    orderId: "",
  });

  const statusOptions: OrderStatus[] = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
  ]

  const handleEdit = (orderId: string) => {
    router.push(`/dashboard/orders/${orderId}/edit`)
  }

  const handleView = (orderId: string) => {
    router.push(`/dashboard/orders/${orderId}`)
  }

  const handleCancelClick = (orderId: string) => {
    setModalConfig({
      open: true,
      orderId,
    });
  };

  const handleConfirmCancel = async () => {
    if (modalConfig.orderId) {
      cancelOrder(modalConfig.orderId);
      setModalConfig({ open: false, orderId: "" });
    }
  };

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
      header: (props: HeaderContext<TableRowData, any>) => (
        <SelectionHeader 
          label={t("order_id")} 
          checked={props.table.getIsAllPageRowsSelected()}
          indeterminate={props.table.getIsSomePageRowsSelected()}
          onChange={(val) => props.table.toggleAllPageRowsSelected(val)}
        />
      ),
      cell: (_: unknown, row: TableRowData, props: CellContext<TableRowData, any>) => (
        <SelectionCell 
          checked={props.row.getIsSelected()} 
          onChange={(val) => props.row.toggleSelected(val)}
          id={row.id.toString().slice(-6).toUpperCase()} 
        />
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
        const statusColors: Record<OrderStatus, string> = {
          PENDING: "bg-yellow-100/50 text-yellow-600 border-yellow-200",
          CONFIRMED: "bg-blue-100/50 text-blue-600 border-blue-200",
          PROCESSING: "bg-purple-100/50 text-purple-600 border-purple-200",
          SHIPPED: "bg-indigo-100/50 text-indigo-600 border-indigo-200",
          DELIVERED: "bg-green-100/50 text-green-600 border-green-200",
          CANCELLED: "bg-gray-100/50 text-gray-600 border-gray-200",
          RETURNED: "bg-red-100/50 text-red-600 border-red-200",
        }

        return (
          <StatusSelectCell
            value={row.status}
            onValueChange={(newStatus) => updateStatus({ id: row.id, status: newStatus })}
            options={statusOptions}
            colorMap={statusColors}
            t={t}
          />
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

  if (isLoading) {
    return <UniTableSkeleton columnCount={9} rowCount={10} />;
  }

  return (
    <>
      <UniTable 
        data={tableData}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        itemLabel="Orders"
        onSelectionChange={React.useCallback((rows: TableRowData[]) => {
          onSelectionChange?.(rows.map(r => r.originalOrder))
        }, [onSelectionChange])}
        getRowId={(row) => row.id}
        showSelection={true}
      />
      
      <ConfirmationModal
        open={modalConfig.open}
        onOpenChange={(open) => setModalConfig((prev) => ({ ...prev, open }))}
        title={t("cancel_order_title") || "Cancel Order"}
        description={t("cancel_order_desc") || "Are you sure you want to cancel this order? This action cannot be undone."}
        onConfirm={handleConfirmCancel}
        variant="destructive"
        confirmText={tCommon("confirm")}
        cancelText={tCommon("cancel")}
      />
    </>
  )
}
