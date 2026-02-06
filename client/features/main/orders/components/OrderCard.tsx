"use client";

import React from "react";
import { Order } from "@/features/dashboard/orders/types";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Package, Clock, CheckCircle2, Truck, XCircle, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/utils/image.utils";
import Image from "next/image";

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  PENDING: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  CONFIRMED: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle2 },
  PROCESSING: { color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: Package },
  SHIPPED: { color: "bg-purple-100 text-purple-700 border-purple-200", icon: Truck },
  DELIVERED: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
  CANCELLED: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
  RETURNED: { color: "bg-gray-100 text-gray-700 border-gray-200", icon: XCircle },
};

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const t = useTranslations("Shop");
  const tOrders = useTranslations("Orders");
  const locale = useLocale();
  const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.PENDING;
  const StatusIcon = config.icon;

  return (
    <div className="bg-white border border-divider rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 border-b border-divider flex flex-wrap items-center justify-between gap-4 bg-neutral-50/50">
        <div className="space-y-1">
          <p className="text-xs text-content-tertiary font-medium uppercase tracking-wider">
            {tOrders("order_number") || "Order Number"}
          </p>
          <p className="font-bold text-primary">#{order.trackingNumber}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-content-tertiary font-medium uppercase tracking-wider">
              {tOrders("order_date") || "Date"}
            </p>
            <p className="font-semibold text-primary">
              {new Date(order.createdAt).toLocaleDateString(locale)}
            </p>
          </div>
          <Badge className={cn("px-4 py-1.5 rounded-full border shadow-none font-bold text-xs uppercase tracking-wider", config.color)}>
            <StatusIcon className="w-3.5 h-3.5 me-2" />
            {tOrders(order.status.toLowerCase()) || order.status}
          </Badge>
        </div>
      </div>

      {/* Items */}
      <div className="p-6 space-y-4">
        {order.items.slice(0, 2).map((item, idx) => {
          const product = item.productId as any;
          const image = item.image || product?.mainImage;
          const name = (locale === "ar" ? product?.nameAr : product?.nameEn) || item.name;
          
          return (
            <div key={idx} className="flex gap-4">
              <div className="relative h-16 w-16 shrink-0 bg-neutral-100 rounded-xl overflow-hidden border border-divider">
                <Image
                  src={getImageUrl(image) || "/placeholder.png"}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-primary truncate">{name}</p>
                <p className="text-sm text-content-tertiary">
                  {item.quantity} x {item.price} {t("currency")}
                </p>
              </div>
            </div>
          );
        })}
        {order.items.length > 2 && (
          <p className="text-sm text-content-tertiary font-medium ps-20">
            + {order.items.length - 2} {t("more_items") || "more items"}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-neutral-50/30 border-t border-divider flex items-center justify-between">
        <div>
          <p className="text-xs text-content-tertiary font-medium uppercase tracking-wider">
            {t("total") || "Total"}
          </p>
          <p className="text-xl font-black text-primary">
            {order.totalAmount.toFixed(2)} {t("currency")}
          </p>
        </div>
      </div>
    </div>
  );
};
