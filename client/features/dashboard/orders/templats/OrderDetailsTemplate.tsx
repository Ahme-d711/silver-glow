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
import { exportToExcel } from "@/utils/excelExport"
import { useOrder } from "../hooks/useOrders"
import { useTranslations } from "next-intl"

export default function OrderDetailsTemplate() {
  const params = useParams()
  const orderId = params.orderId as string
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  
  const t = useTranslations("Orders");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const { data: order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-destructive font-semibold">{t("error_loading")}</p>
        <p className="text-content-tertiary">{(error as Error)?.message || t("order_not_found")}</p>
      </div>
    );
  }

  const handleExport = () => {
    exportToExcel([order as unknown as Record<string, unknown>], {
      filename: `Order_${order._id}.xlsx`,
      sheetName: t("details"),
    });
  };
  return (
    <div className="p-8 space-y-6 min-h-screen">
      <PageHeader
        title={t("details")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/orders" },
          { label: t("details") },
        ]}
        actionButtons={[
          {
            label: tCommon("export"),
            icon: Download,
            variant: "outline",
            className: "bg-secondary text-primary border-divider rounded-xl h-10 px-6 gap-2 font-semibold border-none",
            onClick: handleExport
          },
          {
            label: t("edit"),
            icon: Pencil,
            className: "bg-primary text-white rounded-xl h-10 px-6 gap-2 font-semibold shadow-none hover:bg-primary/90",
            onClick: () => setIsEditOpen(true)
          }
        ]}
      />

      <div className="space-y-6">
        {/* Info Cards Row */}
        <OrderDetailCards data={order} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Content: Order Table */}
          <div className="lg:col-span-2">
            <OrderDetailTable items={order.items} />
          </div>

          {/* Sidebar: Address & Status */}
          <OrderDetailSidebar data={order} />
        </div>
      </div>

      <EditOrderTemplate 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        orderData={order} 
      />
    </div>
  )
}
