import { MapPin, CheckCircle2, Clock, Package, Truck, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order } from "../types"
import { useTranslations } from "next-intl"
import { format } from "date-fns"

export function OrderDetailSidebar({ data }: { data: Order }) {
  const t = useTranslations("Orders");
  if (!data) return null;

  const billingAddress = data.shippingAddress;
  const shippingAddress = data.shippingAddress;
  const orderDate = data.createdAt ? format(new Date(data.createdAt), "dd/MM/yyyy, HH:mm") : "N/A";
  const shippedDate = data.shippedAt ? format(new Date(data.shippedAt), "dd/MM/yyyy, HH:mm") : "DD/MM/YY, 00:00";
  const deliveredDate = data.deliveredAt ? format(new Date(data.deliveredAt), "dd/MM/yyyy, HH:mm") : "DD/MM/YY, 00:00";

  return (
    <div className="space-y-6">
      {/* Address Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{t("address")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-content-tertiary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-content-tertiary">{t("billing_address")}</span>
              <p className="text-sm font-medium text-content-primary">
                {billingAddress}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-content-tertiary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-content-tertiary">{t("shipping_address")}</span>
              <p className="text-sm font-medium text-content-primary">
                {shippingAddress}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Timeline Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{t("order_status")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 relative">
          {/* Vertical line connector */}
          <div className="absolute left-[35px] top-[40px] bottom-[40px] w-0.5 bg-gray-100 border-dashed border-l-2" />
          
          <div className="flex gap-4 relative z-10">
            <div className={`h-10 w-10 ${data.status !== "PENDING" ? "bg-secondary text-primary" : "bg-gray-100 text-content-tertiary"} rounded-full flex items-center justify-center shrink-0`}>
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary">{t("order_placed")}</span>
              <span className="text-sm text-content-tertiary">{t("order_placed_desc")}</span>
              <span className="text-sm text-content-tertiary mt-1">{orderDate}</span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className={`h-10 w-10 ${["PROCESSING", "SHIPPED", "DELIVERED"].includes(data.status) ? "bg-secondary text-primary" : "bg-gray-100 text-content-tertiary"} rounded-full flex items-center justify-center shrink-0`}>
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary">{t("processing")}</span>
              <span className="text-sm text-content-tertiary">{t("processing_desc")}</span>
              <span className="text-sm text-content-tertiary mt-1">{orderDate}</span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className={`h-10 w-10 ${["SHIPPED", "DELIVERED"].includes(data.status) ? "bg-secondary text-primary" : "bg-gray-100 text-content-tertiary"} rounded-full flex items-center justify-center shrink-0`}>
              <Truck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary">{t("shipped")}</span>
              <span className="text-sm text-content-tertiary">{data.shippedAt ? t("on_the_way") : t("pending_shipping")}</span>
              <span className="text-sm text-content-tertiary mt-1">{shippedDate}</span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className={`h-10 w-10 ${data.status === "DELIVERED" ? "bg-secondary text-primary" : "bg-gray-100 text-content-tertiary"} rounded-full flex items-center justify-center shrink-0`}>
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary">{t("delivered")}</span>
              <span className="text-sm text-content-tertiary">{data.deliveredAt ? t("has_been_delivered") : t("pending_delivery")}</span>
              <span className="text-sm text-content-tertiary mt-1">{deliveredDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
