"use client";

import { ArrowRight, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartStore, getSubtotal } from "../stores/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CartSummary: React.FC = () => {
  const t = useTranslations("Shop");
  const items = useCartStore((state) => state.items);
  const subtotal = getSubtotal(items);
  
  // Dummy values for now as per design
  const discount = subtotal * 0.2; // 20% discount as shown in design
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="bg-white border border-divider p-6 rounded-3xl space-y-6 shadow-sm">
      <h2 className="text-xl font-bold text-primary tracking-tight">
        {t("order_summary") || "ORDER SUMMARY"}
      </h2>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-content-secondary">
          <span className="text-neutral-500 font-medium">{t("subtotal") || "Subtotal"}</span>
          <span className="text-primary font-bold">
            {t("currency")} {subtotal.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center text-content-secondary">
          <span className="text-neutral-500 font-medium">{t("discount") || "Discount (-20%)"}</span>
          <span className="text-destructive font-bold">
            -{t("currency")} {discount.toFixed(2)}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between items-center text-content-secondary">
          <span className="text-neutral-500 font-medium">{t("delivery_fee") || "Delivery Fee"}</span>
          <span className="text-primary font-bold">
            {t("currency")} {deliveryFee}
          </span>
        </div>

        <div className="pt-4 border-t border-divider">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">{t("total") || "Total"}</span>
            <span className="text-2xl font-bold text-primary">
              {t("currency")} {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Coupon Code */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-content-tertiary" />
          <Input
            placeholder={t("coupon_code_placeholder") || "Add coupon code"}
            className="pl-10 h-12 bg-neutral-50 border-none rounded-xl"
          />
        </div>
        <Button variant="secondary" className="h-12 px-6 rounded-xl bg-primary text-white hover:bg-primary/90">
          {t("activation") || "activation"}
        </Button>
      </div>

      {/* Checkout Button */}
      <Button className="w-full h-14 bg-[#1a2b4b] hover:bg-[#111d33] text-white rounded-2xl flex items-center justify-center gap-2 text-lg font-bold transition-all shadow-lg hover:shadow-xl group">
        {t("go_to_pay") || "Go to pay"}
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
      </Button>
    </div>
  );
};
