"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { OrderForm, OrderFormData } from "../components/OrderForm";
import { useCreateOrder } from "../hooks/useOrders";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function AddOrderTemplate() {
  const router = useRouter();
  const t = useTranslations("Orders");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleSubmit = (values: OrderFormData) => {
    createOrder(values, {
      onSuccess: (response) => {
        if (response.success) {
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
