import { format } from "date-fns";
import { useTranslations } from "next-intl";
import type { Order } from "../types";
import { OrderAddressCard } from "./order-detail/OrderAddressCard";
import { OrderStatusTimelineCard } from "./order-detail/OrderStatusTimelineCard";

export function OrderDetailSidebar({ data }: { data: Order }) {
  const t = useTranslations("Orders");

  if (!data) return null;

  const orderDate = data.createdAt
    ? format(new Date(data.createdAt), "dd/MM/yyyy, HH:mm")
    : "N/A";
  const updatedDate = data.updatedAt
    ? format(new Date(data.updatedAt), "dd/MM/yyyy, HH:mm")
    : "DD/MM/YY, 00:00";
  const shippedDate = data.shippedAt
    ? format(new Date(data.shippedAt), "dd/MM/yyyy, HH:mm")
    : "DD/MM/YY, 00:00";
  const deliveredDate = data.deliveredAt
    ? format(new Date(data.deliveredAt), "dd/MM/yyyy, HH:mm")
    : "DD/MM/YY, 00:00";

  return (
    <div className="space-y-6">
      <OrderAddressCard
        title={t("address")}
        billingLabel={t("billing_address")}
        shippingLabel={t("shipping_address")}
        billingAddress={data.shippingAddress}
        shippingAddress={data.shippingAddress}
      />

      <OrderStatusTimelineCard
        title={t("order_status")}
        status={data.status}
        orderDate={orderDate}
        updatedDate={updatedDate}
        shippedDate={shippedDate}
        deliveredDate={deliveredDate}
        hasShippedAt={Boolean(data.shippedAt)}
        hasDeliveredAt={Boolean(data.deliveredAt)}
        pendingDatePlaceholder="DD/MM/YY, 00:00"
      />
    </div>
  );
}
