"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { OrderForm, OrderFormData } from "../components/OrderForm";
import { useCreateOrder } from "../hooks/useOrders";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { CreateOrderPayload, PaymentMethod, PaymentStatus } from "../types";

export default function AddOrderTemplate() {
  const router = useRouter();
  const t = useTranslations("Orders");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleSubmit = (values: OrderFormData) => {
    // Calculate totals strictly for the payload
    const subtotal = values.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingCost = 0; // Default or calculate if needed
    const discountAmount = 0;
    const totalAmount = subtotal + shippingCost - discountAmount;

    const payload: CreateOrderPayload = {
      userId: values.userId,
      items: values.items,
      recipientName: values.recipientName,
      recipientPhone: values.recipientPhone,
      shippingAddress: values.shippingAddress,
      city: values.city,
      country: values.country,
      postalCode: values.postalCode,
      subtotal,
      shippingCost,
      discountAmount,
      totalAmount,
      paymentMethod: values.paymentMethod as PaymentMethod,
      paymentStatus: values.paymentStatus as PaymentStatus,
      customerNotes: values.customerNotes,
    };

    createOrder(payload, {
      onSuccess: (response) => {
        if (response.success) {
          router.refresh();
          router.push("/dashboard/orders");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("add_order")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/orders" },
          { label: t("add_order") },
        ]}
      />
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-divider">
        <OrderForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => router.back()}
          submitLabel={t("create_order")}
        />
      </div>
    </div>
  );
}
