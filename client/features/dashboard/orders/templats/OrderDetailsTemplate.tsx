"use client"

import { Download, Pencil } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { OrderDetailCards } from "../components/OrderDetailCards"
import { OrderDetailTable } from "../components/OrderDetailTable"
import { OrderDetailSidebar } from "../components/OrderDetailSidebar"
import  EditOrderTemplate  from "./EditOrderTemplate"
import React from "react"
import { useParams } from "next/navigation"
import { OrderStatus } from "../types"

interface MockOrder {
  id: string;
  customer: string;
  date: string;
  status: OrderStatus;
  order_type: string;
  recipient_phone: string;
  payment_method: string;
  billing_address: string;
  shipping_address: string;
}

export default function OrderDetailsTemplate() {
  const params = useParams()
  const orderId = params.orderId as string
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  const orderData: MockOrder = {
    id: orderId || "302011",
    customer: "Josh Adam",
    date: "12 Dec 2022",
    status: "PROCESSING" as OrderStatus,
    order_type: "Clothes",
    recipient_phone: "909 427 2910",
    payment_method: "Visa",
    billing_address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
    shipping_address: "1833 Bel Meadow Drive, Fontana, California 92335, USA"
  }
  return (
    <div className="p-8 space-y-6 min-h-screen">
      <PageHeader
        title="Order Details"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Order List", href: "/orders" },
          { label: "Order Details" },
        ]}
        actionButtons={[
          {
            label: "Export",
            icon: Download,
            variant: "outline",
            className: "bg-secondary text-primary border-divider rounded-xl h-10 px-6 gap-2 font-semibold border-none",
            onClick: () => console.log("Exporting...")
          },
          {
            label: "Edit Order",
            icon: Pencil,
            className: "bg-primary text-white rounded-xl h-10 px-6 gap-2 font-semibold shadow-none hover:bg-primary/90",
            onClick: () => setIsEditOpen(true)
          }
        ]}
      />

      <div className="space-y-6">
        {/* Info Cards Row */}
        <OrderDetailCards data={orderData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Content: Order Table */}
          <div className="lg:col-span-2">
            <OrderDetailTable />
          </div>

          {/* Sidebar: Address & Status */}
          <OrderDetailSidebar data={orderData} />
        </div>
      </div>

      <EditOrderTemplate 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        orderData={orderData} 
      />
    </div>
  )
}
