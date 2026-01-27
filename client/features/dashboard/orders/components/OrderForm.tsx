"use client";

import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniTextarea } from "@/components/shared/uni-form/UniTextarea";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { UniAsyncCombobox } from "@/components/shared/uni-form/UniAsyncCombobox";
import { Button } from "@/components/ui/button";
import { Loader, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import { Order } from "../types";
import { Product } from "@/features/dashboard/products/types";
import { User } from "@/features/dashboard/auth/types";
import { UserReference } from "@/types";

import { getAllProducts } from "@/features/dashboard/products/services/product.service";
import { getAllUsers } from "@/features/dashboard/users/services/user.service";

// Form Schema
const orderFormSchema = z.object({
  userId: z.string().min(1, "Customer is required"),
  items: z.array(z.object({
    productId: z.string().min(1, "Product is required"),
    name: z.string().min(1, "Product name is required"),
    price: z.coerce.number(),
    quantity: z.coerce.number().int().min(1),
    image: z.string().optional(),
  })).min(1),
  recipientName: z.string().min(1),
  recipientPhone: z.string().min(1),
  shippingAddress: z.string().min(1),
  city: z.string().min(1),
  governorate: z.string().min(1, "Governorate is required"),
  country: z.string().min(1),
  postalCode: z.string().optional(),
  paymentMethod: z.string(),
  customerNotes: z.string().optional(),
  adminNotes: z.string().optional(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
  defaultValues?: Partial<Order>;
  onSubmit: (values: OrderFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  isEdit?: boolean;
}

export function OrderForm({
  defaultValues,
  onSubmit,
  isLoading,
  onCancel,
  submitLabel,
  isEdit,
}: OrderFormProps) {
  const t = useTranslations("Orders");
  const tCommon = useTranslations("Common");

  const initialUserId = typeof defaultValues?.userId === 'object' && defaultValues?.userId !== null 
    ? (defaultValues.userId as UserReference)._id 
    : (defaultValues?.userId as string) || "";

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema) as Resolver<OrderFormData>,
    defaultValues: {
      userId: initialUserId,
      items: (defaultValues?.items || []).map((item) => ({
        productId: item.productId || "",
        name: item.name || "",
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || "",
      })).length > 0 ? (defaultValues?.items || []).map((item) => ({
        productId: item.productId || "",
        name: item.name || "",
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || "",
      })) : [{ productId: "", name: "", price: 0, quantity: 1, image: "" }],
      recipientName: defaultValues?.recipientName || "",
      recipientPhone: defaultValues?.recipientPhone || "",
      shippingAddress: defaultValues?.shippingAddress || "",
      city: defaultValues?.city || "",
      governorate: defaultValues?.governorate || "",
      country: defaultValues?.country || "",
      postalCode: defaultValues?.postalCode || "",
      paymentMethod: defaultValues?.paymentMethod || "COD",
      customerNotes: defaultValues?.customerNotes || "",
      adminNotes: defaultValues?.adminNotes || "",
      status: defaultValues?.status || "PENDING",
      paymentStatus: defaultValues?.paymentStatus || "PENDING",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const handleProductSelect = (index: number, product: Product) => {
    if (product) {
      form.setValue(`items.${index}.name`, product.nameAr || product.nameEn);
      form.setValue(`items.${index}.price`, product.price);
      form.setValue(`items.${index}.image`, product.mainImage);
    }
  };

  const handleUserSelect = (user: User) => {
    if (user) {
      form.setValue("recipientName", user.name || "");
      form.setValue("recipientPhone", user.phone || "");
    }
  };

  const fetchUsers = async (search: string) => {
    const response = await getAllUsers({ search, limit: 10 });
    return response.success ? response.data?.users || [] : [];
  };

  const fetchProducts = async (search: string) => {
    const response = await getAllProducts({ search, limit: 10 });
    return Array.isArray(response) ? response : [];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Customer Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">{t("customer")}</h3>
          <UniAsyncCombobox
            control={form.control}
            name="userId"
            label={t("customer")}
            onSelect={handleUserSelect}
            fetchData={fetchUsers}
            placeholder={t("select_customer")}
            searchPlaceholder={tCommon("search")}
            emptyMessage={tCommon("no_data")}
            getItemLabel={(user: User) => `${user.name} (${user.phone})`}
            disabled={isEdit}
            required
          />
        </div>

        {/* Order Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary">{t("order_items")}</h3>
            {!isEdit && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ productId: "", name: "", price: 0, quantity: 1, image: "" })}
                className="rounded-xl border-primary text-primary hover:bg-primary/5"
              >
                <Plus className="h-4 w-4 me-2" />
                {t("add_item")}
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-6 border border-divider/50 rounded-3xl space-y-6 bg-gray-50/30">
                <div className="flex items-center justify-between border-b border-divider/50 pb-4">
                  <h4 className="font-bold text-primary">{t("item")} {index + 1}</h4>
                  {fields.length > 1 && !isEdit && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-error hover:text-error/80 hover:bg-error/10 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <UniAsyncCombobox
                    control={form.control}
                    name={`items.${index}.productId`}
                    label={t("product")}
                    onSelect={(product: Product) => handleProductSelect(index, product)}
                    fetchData={fetchProducts}
                    placeholder={t("select_product")}
                    searchPlaceholder={tCommon("search")}
                    emptyMessage={tCommon("no_data")}
                    getItemLabel={(product: Product) => product.nameAr || product.nameEn}
                    disabled={isEdit}
                    required
                  />

                  <UniInput
                    control={form.control}
                    name={`items.${index}.name`}
                    label={t("product_name")}
                    placeholder={t("enter_product_name")}
                    readOnly
                    required
                  />

                  <UniInput
                    control={form.control}
                    name={`items.${index}.price`}
                    label={t("price")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    readOnly
                    required
                  />

                  <UniInput
                    control={form.control}
                    name={`items.${index}.quantity`}
                    label={t("quantity")}
                    type="number"
                    min="1"
                    placeholder="1"
                    disabled={isEdit}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">{t("shipping_info")}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniInput
              control={form.control}
              name="recipientName"
              label={t("recipient_name")}
              placeholder={t("enter_recipient_name")}
              required
            />

            <UniInput
              control={form.control}
              name="recipientPhone"
              label={t("recipient_phone")}
              placeholder="+1234567890"
              required
            />
          </div>

          <UniTextarea
            control={form.control}
            name="shippingAddress"
            label={t("shipping_address")}
            placeholder={t("enter_full_address")}
            rows={3}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniInput
              control={form.control}
              name="city"
              label={t("city")}
              placeholder={t("enter_city")}
              required
            />

            <UniAsyncCombobox
              control={form.control}
              name="governorate"
              label={t("governorate") || "Governorate"}
              fetchData={async (search) => {
                const { EGYPT_GOVERNORATES } = await import("@/constants/governorates");
                const locale = window.localStorage.getItem("NEXT_LOCALE") || "ar";
                return EGYPT_GOVERNORATES.filter((g) => 
                  g.nameAr.includes(search) || 
                  g.nameEn.toLowerCase().includes(search.toLowerCase())
                );
              }}
              placeholder={t("select_governorate") || "Select Governorate"}
              searchPlaceholder={tCommon("search")}
              emptyMessage={tCommon("no_data")}
              getItemLabel={(g: any) => {
                const locale = typeof window !== 'undefined' ? window.localStorage.getItem("NEXT_LOCALE") || "ar" : "ar";
                return locale === "ar" ? g.nameAr : g.nameEn;
              }}
              getItemValue={(g: any) => g.nameEn}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniInput
              control={form.control}
              name="country"
              label={t("country")}
              placeholder={t("enter_country")}
              required
            />

            <UniInput
              control={form.control}
              name="postalCode"
              label={t("postal_code")}
              placeholder="12345"
            />
          </div>
        </div>

        {/* Payment & Status */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">{t("payment_status")}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniSelect
              control={form.control}
              name="paymentMethod"
              label={t("payment_method")}
              options={[
                { label: t("payment_cod"), value: "COD" },
                { label: t("payment_card"), value: "CARD" },
                { label: t("payment_paypal"), value: "PAYPAL" },
              ]}
              required
            />

            <UniSelect
              control={form.control}
              name="paymentStatus"
              label={t("payment_status")}
              options={[
                { label: t("pending"), value: "PENDING" },
                { label: t("paid"), value: "PAID" },
                { label: t("failed"), value: "FAILED" },
              ]}
              disabled={!isEdit}
            />
          </div>

          {isEdit && (
            <UniSelect
              control={form.control}
              name="status"
              label={t("order_status")}
              options={[
                { label: t("pending"), value: "PENDING" },
                { label: t("confirmed"), value: "CONFIRMED" },
                { label: t("processing"), value: "PROCESSING" },
                { label: t("shipped"), value: "SHIPPED" },
                { label: t("delivered"), value: "DELIVERED" },
                { label: t("cancelled"), value: "CANCELLED" },
                { label: t("returned"), value: "RETURNED" },
              ]}
              required
            />
          )}
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">{t("notes")}</h3>
          
          <UniTextarea
            control={form.control}
            name="customerNotes"
            label={t("customer_notes")}
            placeholder={t("enter_customer_notes")}
            rows={3}
          />

          {isEdit && (
            <UniTextarea
              control={form.control}
              name="adminNotes"
              label={t("admin_notes")}
              placeholder={t("enter_admin_notes")}
              rows={3}
            />
          )}
        </div>

        {/* Summary */}
        <div className="p-8 bg-primary/5 border border-primary/10 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg text-content-secondary font-medium">
            {t("total_items")}: <span className="text-primary font-bold text-2xl ml-2">{fields.length}</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {t("total_amount")}: {((form.watch("items") || []).reduce((acc: number, item) => acc + (Number(item.price) * Number(item.quantity) || 0), 0)).toFixed(2)} {tCommon("currency")}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end pt-8 border-t border-divider/50">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="px-10 h-12 rounded-xl border-divider text-content-secondary font-bold hover:bg-gray-100"
            >
              {tCommon("cancel")}
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="px-12 h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            {isLoading && <Loader className="me-2 h-5 w-5 animate-spin" />}
            {submitLabel || tCommon("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
