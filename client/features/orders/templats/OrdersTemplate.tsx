"use client"

import { Download } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { useOrdersState, useOrders, useOrdersByStatus } from "../hooks/useOrders"
import { OrdersSubTabs } from "../components/OrdersSubTabs"
import { TableFilters } from "@/components/shared/TableFilters"
import { OrdersTable } from "../components/OrdersTable"
import { WaselTable } from "../components/WaselTable"
import { OrderStatus } from "../types"
import UniLoading from "@/components/shared/UniLoading"
import NoDataMsg from "@/components/shared/NoDataMsg"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl";

export default function OrdersTemplate() {
  const searchParams = useSearchParams();
  const t = useTranslations("Orders");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const statusTabs = [
    { label: t("all_orders"), value: "all" },
    { label: t("created"), value: "CREATED" },
    { label: t("pending"), value: "PENDING" },
    { label: t("accepted"), value: "ACCEPTED" },
    { label: t("in_progress"), value: "IN_PROGRESS" },
    { label: t("in_the_way"), value: "IN_THE_WAY" },
    { label: t("return"), value: "RETURN" },
    { label: t("delivered"), value: "DELIVERED" },
  ];
  const search = searchParams.get("search") || "";

  const {
    activeTab,
    setActiveTab,
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
      order.pickupAddress.toLowerCase().includes(searchLower) ||
      order.recipientAddress.toLowerCase().includes(searchLower)
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
          }
        ]}
      />

      {/* Main Container */}
      <div className="bg-white rounded-[24px] border border-divider overflow-hidden">
        <OrdersSubTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <TableFilters 
          tabs={statusTabs}
          activeTab={activeStatus}
          setActiveTab={setActiveStatus}
          date={date}
          setDate={setDate}
        />

        {activeTab === "orders" ? (
          isLoading ? (
            <div className="p-8">
              <UniLoading />
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
          )
        ) : (
          <WaselTable />
        )}
      </div>
    </div>
  )
}
