import { format } from "date-fns";
import { useTranslations } from "next-intl";
import type { Order } from "../types";
import { OrderSummaryCard } from "./order-detail/OrderSummaryCard";
import { OrderCustomerCard } from "./order-detail/OrderCustomerCard";
import { OrderDocumentCard } from "./order-detail/OrderDocumentCard";

export function OrderDetailCards({ data }: { data: Order }) {
  const t = useTranslations("Orders");

  if (!data) return null;

  const customer =
    typeof data.userId === "object" && data.userId?.name
      ? data.userId.name
      : data.recipientName;

  const paymentMethod = data.paymentMethod
    ? t(`payment_${data.paymentMethod.toLowerCase()}` as Parameters<typeof t>[0])
    : "N/A";

  const statusLabel = t(data.status.toLowerCase() as Parameters<typeof t>[0]);
  const date = data.createdAt ? format(new Date(data.createdAt), "dd MMM yyyy") : "N/A";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <OrderSummaryCard
        orderNumber={t("order_number", { id: data._id.slice(-6).toUpperCase() })}
        statusLabel={statusLabel}
        date={date}
        paymentMethod={paymentMethod}
        orderType={t("standard")}
        addedLabel={t("added")}
        paymentMethodLabel={t("payment_method")}
        typeLabel={t("type")}
      />

      <OrderCustomerCard
        title={t("customer")}
        customerLabel={t("customer")}
        phoneLabel={t("phone") || "Phone"}
        customer={customer}
        phone={data.recipientPhone}
      />

      <OrderDocumentCard
        title={t("document")}
        invoiceLabel={t("invoice")}
        showLabel={t("show")}
      />
    </div>
  );
}
