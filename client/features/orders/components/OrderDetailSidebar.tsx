"use client"

import { MapPin, CheckCircle2, Clock, Package, Truck, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrderDetailSidebar({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Address Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-content-tertiary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-content-tertiary">Billing Address</span>
              <p className="text-sm font-medium text-content-primary">
                {data.billing_address}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-content-tertiary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-content-tertiary">Shipping Address</span>
              <p className="text-sm font-medium text-content-primary">
                {data.shipping_address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Timeline Card */}
      <Card className="rounded-[24px] border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Order Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 relative">
          {/* Vertical line connector */}
          <div className="absolute left-[35px] top-[40px] bottom-[40px] w-0.5 bg-gray-100 border-dashed border-l-2" />
          
          <div className="flex gap-4 relative z-10">
            <div className="h-10 w-10 bg-secondary text-primary rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary">Order Placed</span>
              <span className="text-sm text-content-tertiary">An order has been placed.</span>
              <span className="text-sm text-content-tertiary mt-1">12/12/2022, 03:00</span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="h-10 w-10 bg-secondary text-primary rounded-full flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary">Processing</span>
              <span className="text-sm text-content-tertiary">Seller has processed your order.</span>
              <span className="text-sm text-content-tertiary mt-1">12/12/2022, 03:15</span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="h-10 w-10 bg-gray-100 text-content-tertiary rounded-full flex items-center justify-center shrink-0">
              <Package className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary opacity-60">Packed</span>
              <span className="text-sm text-content-tertiary opacity-60">DD/MM/YY, 00:00</span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="h-10 w-10 bg-gray-100 text-content-tertiary rounded-full flex items-center justify-center shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary opacity-60">Shipping</span>
              <span className="text-sm text-content-tertiary opacity-60">DD/MM/YY, 00:00</span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="h-10 w-10 bg-gray-100 text-content-tertiary rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-content-primary opacity-60">Delivered</span>
              <span className="text-sm text-content-tertiary opacity-60">DD/MM/YY, 00:00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
