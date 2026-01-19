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

const statusTabs = [
  { label: "All Orders", value: "all" },
  { label: "Created", value: "CREATED" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "In The Way", value: "IN_THE_WAY" },
  { label: "Return", value: "RETURN" },
  { label: "Delivered", value: "DELIVERED" },
]

export default function OrdersTemplate() {
  const {
    activeTab,
    setActiveTab,
    activeStatus,
    setActiveStatus,
    date,
    setDate,
    search,
    setSearch,
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
        title="Order"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Order List" },
        ]}
        actionButtons={[
          {
            label: "Export",
            icon: Download,
            variant: "outline",
            className: "bg-secondary text-primary border-divider rounded-xl h-10 px-6 gap-2 font-semibold",
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
          search={search}
          setSearch={setSearch}
          date={date}
          setDate={setDate}
          searchPlaceholder="Search orders. . ."
        />

        {activeTab === "orders" ? (
          isLoading ? (
            <div className="p-8">
              <UniLoading />
            </div>
          ) : error ? (
            <div className="p-8">
              <NoDataMsg description={error.message || "Failed to load orders"} />
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
