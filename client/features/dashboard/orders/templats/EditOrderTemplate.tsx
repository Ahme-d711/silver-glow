"use client";

import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { OrderForm, OrderFormData } from "../components/OrderForm";
import { useUpdateOrder, useOrder } from "../hooks/useOrders";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormPageSkeleton } from "@/components/shared/FormPageSkeleton";
import type { Order, OrderStatus, PaymentStatus, UpdateOrderPayload } from "../types";

interface EditOrderTemplateProps {
  isOpen?: boolean;
  onClose?: () => void;
  orderData?: Partial<Order> & { id?: string };
}

export default function EditOrderTemplate({ isOpen, onClose, orderData }: EditOrderTemplateProps) {
  const router = useRouter();
  const params = useParams();
  const orderIdFromParams = params?.orderId as string;
  const id = orderData?._id || orderData?.id || orderIdFromParams;
  
  const t = useTranslations("Orders");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { data: fetchedOrder, isLoading: isFetching } = useOrder(id);
  const { mutate: updateOrder, isPending } = useUpdateOrder();

  const order = orderData || fetchedOrder;

  const handleSubmit = (values: OrderFormData) => {
    if (!order) return;
    
    // Transform OrderFormData to UpdateOrderPayload strictly
    const payload: UpdateOrderPayload = {
      status: values.status as OrderStatus,
      paymentStatus: values.paymentStatus as PaymentStatus,
      recipientName: values.recipientName,
      recipientPhone: values.recipientPhone,
      shippingAddress: values.shippingAddress,
      city: values.city,
      governorate: values.governorate,
      country: values.country,
      postalCode: values.postalCode,
      adminNotes: values.adminNotes,
    };

    const orderId = (order as Order)._id;
    updateOrder({ id: orderId, payload }, {
      onSuccess: (response) => {
        if (response.success) {
          if (onClose) {
            onClose();
          } else {
            router.push("/dashboard/orders");
          }
        }
      },
    });
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const content = (
    <div className="space-y-6">
      {!isOpen && (
        <PageHeader
          title={t("edit_order")}
          breadcrumbs={[
            { label: tNav("dashboard"), href: "/" },
            { label: t("title"), href: "/dashboard/orders" },
            { label: t("edit_order") },
          ]}
        />
      )}
      
      <div className={isOpen ? "" : "bg-white p-6 rounded-3xl shadow-sm border border-divider"}>
        {isFetching && !orderData ? (
          <FormPageSkeleton />
        ) : !order ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-content-tertiary">Order not found</p>
          </div>
        ) : (
          <OrderForm
            defaultValues={order}
            onSubmit={handleSubmit}
            isLoading={isPending}
            onCancel={handleCancel}
            submitLabel={tCommon("save")}
            isEdit
          />
        )}
      </div>
    </div>
  );

  if (isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle>{t("edit_order")}</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
}
