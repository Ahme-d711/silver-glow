"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import { Order } from "../types";

// Form Schema
const orderFormSchema = z.object({
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

  const form = useForm<any>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      items: defaultValues?.items?.map(item => ({
        productId: item.productId || "",
        name: item.name || "",
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || "",
      })) || [{ productId: "", name: "", price: 0, quantity: 1, image: "" }],
      recipientName: defaultValues?.recipientName || "",
      recipientPhone: defaultValues?.recipientPhone || "",
      shippingAddress: defaultValues?.shippingAddress || "",
      city: defaultValues?.city || "",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Order Items Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t("order_items")}</h3>
            {!isEdit && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ productId: "", name: "", price: 0, quantity: 1, image: "" })}
              >
                <Plus className="h-4 w-4 me-2" />
                {t("add_item")}
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-xl space-y-4 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{t("item")} {index + 1}</h4>
                  {fields.length > 1 && !isEdit && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-error hover:text-error/80 hover:bg-error/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("product_name")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t("enter_product_name")} readOnly={isEdit} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("price")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            placeholder="0.00"
                            readOnly={isEdit}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("quantity")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            placeholder="1"
                            readOnly={isEdit}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.productId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("product_id")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t("enter_product_id")} readOnly={isEdit} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t("shipping_info")}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("recipient_name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("enter_recipient_name")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("recipient_phone")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+1234567890" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>{t("shipping_address")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t("enter_full_address")} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("city")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("enter_city")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("country")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("enter_country")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("postal_code")} ({tCommon("optional")})</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="12345" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("payment_method")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_payment_method")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="COD">{t("payment_cod")}</SelectItem>
                      <SelectItem value="CARD">{t("payment_card")}</SelectItem>
                      <SelectItem value="PAYPAL">{t("payment_paypal")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Order Status (For Edit Only) */}
        {isEdit && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("admin_status")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("order_status")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">{t("pending")}</SelectItem>
                        <SelectItem value="CONFIRMED">{t("confirmed")}</SelectItem>
                        <SelectItem value="PROCESSING">{t("processing")}</SelectItem>
                        <SelectItem value="SHIPPED">{t("shipped")}</SelectItem>
                        <SelectItem value="DELIVERED">{t("delivered")}</SelectItem>
                        <SelectItem value="CANCELLED">{t("cancelled")}</SelectItem>
                        <SelectItem value="RETURNED">{t("returned")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("payment_status")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">{t("pending")}</SelectItem>
                        <SelectItem value="PAID">{t("paid")}</SelectItem>
                        <SelectItem value="FAILED">{t("failed")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t("notes")}</h3>
          
          <FormField
            control={form.control}
            name="customerNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("customer_notes")} ({tCommon("optional")})</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder={t("enter_customer_notes")} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEdit && (
            <FormField
              control={form.control}
              name="adminNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin_notes")} ({tCommon("optional")})</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t("enter_admin_notes")} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end pt-6 border-t">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="px-8 rounded-xl"
            >
              {tCommon("cancel")}
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="px-8 rounded-xl">
            {isLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
            {submitLabel || tCommon("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
