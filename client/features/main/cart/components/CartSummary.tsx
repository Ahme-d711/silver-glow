"use client";

import { ArrowRight, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartStore, getSubtotal } from "../stores/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { EGYPT_GOVERNORATES } from "@/constants/governorates";
import { useCheckout } from "../hooks/useCart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSettings } from "@/features/dashboard/settings/hooks/useSettings";

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
  const tCommon = useTranslations("Common");
  const items = useCartStore((state) => state.items);
  const subtotal = getSubtotal(items);
  const { user } = useAuthStore();
  const { mutate: checkout, isPending } = useCheckout();
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  
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
    if (!user) {
      toast.error("Please login to complete your purchase");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    checkout(values, {
      onSuccess: () => {
        toast.success("Order placed successfully!");
        clearCart();
        router.push("/orders");
      },
    });
  };

  return (
    <div className="bg-white border border-divider p-6 rounded-3xl space-y-6 shadow-sm">
      <h2 className="text-xl font-bold text-primary tracking-tight">
        {t("order_summary") || "ORDER SUMMARY"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Shipping Form Fields */}
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
                options={EGYPT_GOVERNORATES.map(g => ({
                  label: g.nameEn,
                  value: g.nameEn
                }))}
                required
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-divider">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-content-secondary">
              <span className="text-neutral-500 font-medium">{t("subtotal") || "Subtotal"}</span>
              <span className="text-primary font-bold">
                {t("currency")} {subtotal.toFixed(2)}
              </span>
            </div>

            {/* Delivery Fee */}
            <div className="flex justify-between items-center text-content-secondary">
              <span className="text-neutral-500 font-medium">{t("delivery_fee") || "Delivery Fee"}</span>
              <span className="text-primary font-bold">
                {t("currency")} {deliveryFee}
              </span>
            </div>

            {/* Tax */}
            {taxRate > 0 && (
              <div className="flex justify-between items-center text-content-secondary">
                <span className="text-neutral-500 font-medium">
                  {t("tax") || "Tax"} ({taxRate}%)
                </span>
                <span className="text-primary font-bold">
                  {t("currency")} {taxAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="pt-4 border-t border-divider">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">{t("total") || "Total"}</span>
                <span className="text-2xl font-bold text-primary">
                  {t("currency")} {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
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
    </div>
  );
};
