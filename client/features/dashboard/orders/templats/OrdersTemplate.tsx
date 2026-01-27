"use client"

import { Download, Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { useOrdersState, useOrders, useOrdersByStatus, useCancelOrder } from "../hooks/useOrders"
import { TableFilters } from "@/components/shared/TableFilters"
import { OrdersTable } from "../components/OrdersTable"
import { Order, OrderStatus } from "../types"
import UniLoading from "@/components/shared/UniLoading"
import NoDataMsg from "@/components/shared/NoDataMsg"
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { exportToExcel } from "@/utils/excelExport";
import { toast } from "sonner";
import { useState } from "react";

export default function OrdersTemplate() {
  const searchParams = useSearchParams();
  const t = useTranslations("Orders");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);

  const handleExport = () => {
    if (filteredOrders.length === 0 || selectedOrders.length === 0) {
      toast.error(tCommon("no_data_to_export") || "No data to export");
      return;
    }

    const dataToExport = selectedOrders.map((order) => ({
      [t("order_id")]: order._id?.toString().slice(-6).toUpperCase(),
      [t("customer")]: order.recipientName,
      [t("date")]: order.createdAt ? format(new Date(order.createdAt), "dd MMM yyyy") : "-",
      [t("total")]: `${order.totalAmount?.toFixed(2) || "0.00"} ${tCommon("currency")}`,
      [t("payment")]: t(`payment_${order.paymentMethod?.toLowerCase()}` as Parameters<typeof t>[0]) || order.paymentMethod,
      [t("status")]: t(order.status.toLowerCase() as Parameters<typeof t>[0]),
      [tNav("contact")]: order.recipientPhone,
      [t("shipping_address")]: `${order.shippingAddress}, ${order.city}, ${order.governorate}`,
    }));

    exportToExcel(dataToExport, {
      filename: `Orders_${format(new Date(), "yyyy-MM-dd")}.xlsx`,
      sheetName: "Orders",
    });
  };

  const statusTabs = [
    { label: t("all_orders"), value: "all" },
    { label: t("pending"), value: "PENDING" },
    { label: t("confirmed"), value: "CONFIRMED" },
    { label: t("processing"), value: "PROCESSING" },
    { label: t("shipped"), value: "SHIPPED" },
    { label: t("delivered"), value: "DELIVERED" },
    { label: t("cancelled"), value: "CANCELLED" },
    { label: t("returned"), value: "RETURNED" },
  ];
  const search = searchParams.get("search") || "";

  const {
    activeStatus,
    setActiveStatus,
    date,
    setDate,
  } = useOrdersState()

  // Fetch orders - use getAllOrders if "all" is selected, otherwise use getOrdersByStatus
  const isAllOrders = activeStatus === "all"
  const selectedStatus = isAllOrders ? null : (activeStatus as OrderStatus)
  
  // Fetch all orders when "all" is selected
  const { data: allOrders, isLoading: isLoadingAll, error: errorAll } = useOrders()
  
  // Fetch orders by status when a specific status is selected
  const { data: ordersByStatus, isLoading: isLoadingStatus, error: errorStatus } = useOrdersByStatus(
    selectedStatus,
    undefined
  )
  
  // Determine which data to use
  const orders = isAllOrders ? allOrders : ordersByStatus
  const isLoading = isAllOrders ? isLoadingAll : isLoadingStatus
  const error = isAllOrders ? errorAll : errorStatus

  // Filter orders based on search
  const filteredOrders = orders?.filter((order) => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      order.trackingNumber?.toLowerCase().includes(searchLower) ||
      order.recipientName.toLowerCase().includes(searchLower) ||
      order.recipientPhone.toLowerCase().includes(searchLower) ||
      order.shippingAddress.toLowerCase().includes(searchLower) ||
      order.city?.toLowerCase().includes(searchLower)
    )
  }) || []

  return (
    <div className="space-y-6 min-h-[90vh]">
      <PageHeader
        title={t("title")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title") },
        ]}
        actionButtons={[
          {
            label: t("export"),
            icon: Download,
            variant: "secondary",
            onClick: handleExport
          },
          {
            label: t("add_order"),
            icon: Plus,
            href: "/dashboard/orders/add",
          }
        ]}
      />

      {/* Main Container */}
      <div className="bg-white rounded-[24px] border border-divider overflow-hidden">
        <TableFilters 
          tabs={statusTabs}
          activeTab={activeStatus}
          setActiveTab={setActiveStatus}
          date={date}
          setDate={setDate}
        />

        {isLoading ? (
          <div className="p-0">
             <UniTableSkeleton columnCount={8} rowCount={10} />
          </div>
        ) : error ? (
          <div className="p-8">
            <NoDataMsg 
              title={t("title")}
              description={error?.message || tCommon("no_data_desc")} 
            />
          </div>
        ) : (
          <OrdersTable 
            orders={filteredOrders} 
            onSelectionChange={setSelectedOrders}
          />
        )}
      </div>
    </div>
  )
}
