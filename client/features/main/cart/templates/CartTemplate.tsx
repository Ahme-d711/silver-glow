"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";
import MainNavbar from "@/components/MainNavbar";
import { useCartStore } from "../stores/useCartStore";
import { CartItem } from "../components/CartItem";
import { CartSummary } from "../components/CartSummary";
import { BestsellerProductsSection } from "../../product/components/BestsellerProductsSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StorefrontPageHeader } from "@/components/shared/StorefrontPageHeader";

export const CartTemplate: React.FC = () => {
  const t = useTranslations("Shop");
  const items = useCartStore((state) => state.items);

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-background pt-38 pb-20">
        <div className="container mx-auto px-4">
          <StorefrontPageHeader
            title={t("my_cart") || "My Cart"}
            breadcrumbs={[
              { label: t("home") || "Home", href: "/" },
              { label: t("my_cart") || "My Cart" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-divider rounded-3xl bg-neutral-50/50">
                  <div className="bg-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <ShoppingBag className="h-10 w-10 text-neutral-300" />
                  </div>
                  <SectionHeader 
                    title={t("empty_cart_title") || "Your cart is empty"} 
                    centered 
                    className="mb-2"
                    titleClassName="text-2xl"
                  />
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
        
        {/* Bestseller Products Section */}
        <BestsellerProductsSection />
      </div>
    </>
  );
};
