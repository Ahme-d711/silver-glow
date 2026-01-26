"use client"

import { Download, Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { useOrdersState, useOrders, useOrdersByStatus, useCancelOrder } from "../hooks/useOrders"
import { TableFilters } from "@/components/shared/TableFilters"
import { OrdersTable } from "../components/OrdersTable"
import { OrderStatus } from "../types"
import UniLoading from "@/components/shared/UniLoading"
import NoDataMsg from "@/components/shared/NoDataMsg"
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl";

export default function OrdersTemplate() {
  const searchParams = useSearchParams();
  const t = useTranslations("Orders");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

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
            variant: "outline",
            className: "bg-secondary/10 text-primary border-none hover:bg-secondary/20 font-bold h-11 px-6 rounded-xl",
            onClick: () => console.log("Exporting...")
          },
          {
            label: t("add_order"),
            icon: Plus,
            href: "/dashboard/orders/add",
            className: "bg-primary text-white hover:bg-primary/90 font-bold h-11 px-6 rounded-xl",
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
          <OrdersTable orders={filteredOrders} />
        )}
      </div>
    </div>
  )
}
