"use client";

import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { OrderForm, OrderFormData } from "../components/OrderForm";
import { useUpdateOrder, useOrder } from "../hooks/useOrders";
import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";

export default function EditOrderTemplate() {
  const router = useRouter();
  const params = useParams();
  const id = params.orderId as string;
  const t = useTranslations("Orders");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { data: order, isLoading: isFetching } = useOrder(id);
  const { mutate: updateOrder, isPending } = useUpdateOrder();

  const handleSubmit = (values: OrderFormData) => {
    if (!order) return;
    
    updateOrder({ id: order._id, payload: values }, {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/dashboard/orders");
        }
      },
    });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-content-tertiary">Order not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit_order")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/orders" },
          { label: t("edit_order") },
        ]}
      />
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-divider">
        <OrderForm
          defaultValues={order}
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => router.back()}
          submitLabel={tCommon("save")}
          isEdit
        />
      </div>
    </div>
  );
}
