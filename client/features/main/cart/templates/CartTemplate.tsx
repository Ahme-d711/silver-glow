"use client";

import { useTranslations, useLocale } from "next-intl";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { useCartStore } from "../stores/useCartStore";
import { CartItem } from "../components/CartItem";
import { CartSummary } from "../components/CartSummary";

export const CartTemplate: React.FC = () => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const items = useCartStore((state) => state.items);

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-content-secondary mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              {t("home") || "Home"}
            </Link>
            <ChevronRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
            <span className="text-primary font-medium">
              {t("cart") || "Cart"}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-divider rounded-3xl bg-neutral-50/50">
                  <div className="bg-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <ShoppingBag className="h-10 w-10 text-neutral-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    {t("empty_cart_title") || "Your cart is empty"}
                  </h2>
                  <p className="text-content-tertiary mb-8">
                    {t("empty_cart_desc") || "Looks like you haven't added anything yet."}
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95"
                  >
                    {t("continue_shopping") || "Continue Shopping"}
                  </Link>
                </div>
              ) : (
                <div className="bg-white border border-divider rounded-3xl p-4 divide-y divide-divider shadow-sm">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-28">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};
