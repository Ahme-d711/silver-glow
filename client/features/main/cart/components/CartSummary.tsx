"use client";

import { ArrowRight, Lock, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartItems, useCheckout } from "../hooks/useCart";
import { getSubtotal } from "../utils/cart.utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { EGYPT_GOVERNORATES } from "@/constants/governorates";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSettings } from "@/features/dashboard/settings/hooks/useSettings";
import { useRequireAuth } from "@/features/auth/hooks/useRequireAuth";

const shippingSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientPhone: z.string().min(1, "Recipient phone is required"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  city: z.string().min(1, "City is required"),
  governorate: z.string().min(1, "Governorate is required"),
  country: z.string().min(1, "Country is required"),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export const CartSummary: React.FC = () => {
  const t = useTranslations("Shop");
  const tOrders = useTranslations("Orders");
  const { items } = useCartItems();
  const subtotal = getSubtotal(items);
  const { user } = useAuthStore();
  const { requireAuth } = useRequireAuth();
  const { mutate: checkout, isPending } = useCheckout();
  const router = useRouter();
  const { settings } = useSettings();

  const shippingCost = settings?.shippingCost ?? 50;
  const freeShippingThreshold = settings?.freeShippingThreshold ?? 1000;
  const taxRate = settings?.taxRate ?? 0;

  const deliveryFee = subtotal > 0 && subtotal < freeShippingThreshold ? shippingCost : 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + deliveryFee + taxAmount;

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      recipientName: user?.name || "",
      recipientPhone: user?.phone || "",
      shippingAddress: user?.address || "",
      city: "",
      governorate: "",
      country: "Egypt",
    },
  });

  const onSubmit = (values: ShippingFormValues) => {
    if (items.length === 0) {
      toast.error(t("empty_cart_title"));
      return;
    }

    requireAuth("checkout", () => {
      checkout(values, {
        onSuccess: () => {
          toast.success(tOrders("order_placed") || "Order placed successfully!");
          router.push("/orders");
        },
      });
    });
  };

  const handleGuestCheckout = () => {
    if (items.length === 0) return;
    requireAuth("checkout");
  };

  return (
    <div className="bg-white border border-divider p-6 rounded-3xl space-y-6 shadow-sm">
      <h2 className="text-xl font-bold text-primary tracking-tight">
        {t("order_summary") || "ORDER SUMMARY"}
      </h2>

      {user ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                {tOrders("shipping_info")}
              </h3>

              <UniInput
                control={form.control}
                name="recipientName"
                placeholder={tOrders("recipient_name")}
                required
              />

              <UniInput
                control={form.control}
                name="recipientPhone"
                placeholder={tOrders("recipient_phone")}
                required
              />

              <UniInput
                control={form.control}
                name="shippingAddress"
                placeholder={tOrders("shipping_address")}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <UniInput
                  control={form.control}
                  name="city"
                  placeholder={tOrders("city")}
                  required
                />
                <UniSelect
                  control={form.control}
                  name="governorate"
                  placeholder={tOrders("governorate")}
                  options={EGYPT_GOVERNORATES.map((g) => ({
                    label: g.nameEn,
                    value: g.nameEn,
                  }))}
                  required
                />
              </div>
            </div>

            <OrderTotals
              t={t}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              taxRate={taxRate}
              taxAmount={taxAmount}
              total={total}
            />

            <Button
              type="submit"
              disabled={isPending || items.length === 0}
              className="w-full h-14 bg-[#1a2b4b] hover:bg-[#111d33] text-white rounded-2xl flex items-center justify-center gap-2 text-lg font-bold transition-all shadow-lg hover:shadow-xl group"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {t("go_to_pay") || "Go to pay"}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 flex items-start gap-3">
            <Lock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900/80 leading-relaxed">
              {t("guest_checkout_hint")}
            </p>
          </div>

          <OrderTotals
            t={t}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            taxRate={taxRate}
            taxAmount={taxAmount}
            total={total}
          />

          <Button
            type="button"
            onClick={handleGuestCheckout}
            disabled={items.length === 0}
            className="w-full h-14 bg-[#1a2b4b] hover:bg-[#111d33] text-white rounded-2xl flex items-center justify-center gap-2 text-lg font-bold transition-all shadow-lg hover:shadow-xl group"
          >
            {t("sign_in_to_checkout")}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

function OrderTotals({
  t,
  subtotal,
  deliveryFee,
  taxRate,
  taxAmount,
  total,
}: {
  t: ReturnType<typeof useTranslations>;
  subtotal: number;
  deliveryFee: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}) {
  return (
    <div className="space-y-4 pt-4 border-t border-divider">
      <div className="flex justify-between items-center text-content-secondary">
        <span className="text-neutral-500 font-medium">{t("subtotal")}</span>
        <span className="text-primary font-bold">
          {t("currency")} {subtotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center text-content-secondary">
        <span className="text-neutral-500 font-medium">{t("delivery_fee")}</span>
        <span className="text-primary font-bold">
          {t("currency")} {deliveryFee}
        </span>
      </div>

      {taxRate > 0 && (
        <div className="flex justify-between items-center text-content-secondary">
          <span className="text-neutral-500 font-medium">
            {t("tax")} ({taxRate}%)
          </span>
          <span className="text-primary font-bold">
            {t("currency")} {taxAmount.toFixed(2)}
          </span>
        </div>
      )}

      <div className="pt-4 border-t border-divider">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">{t("total")}</span>
          <span className="text-2xl font-bold text-primary">
            {t("currency")} {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
