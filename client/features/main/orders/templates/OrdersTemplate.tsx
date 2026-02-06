"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useMyOrders } from "../hooks/useOrders";
import { OrderCard } from "../components/OrderCard";
import { ChevronRight, ShoppingBag, Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export const OrdersTemplate: React.FC = () => {
  const t = useTranslations("Shop");
  const tOrders = useTranslations("Orders");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const { data, isLoading } = useMyOrders();
  const orders = data?.data?.orders || [];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-content-secondary mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("home") || "Home"}
          </Link>
          <ChevronRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
          <span className="text-primary font-medium">
            {tOrders("my_orders") || "My Orders"}
          </span>
        </nav>

        <h1 className="text-4xl font-black text-primary mb-10 tracking-tight">
          {tOrders("my_orders") || "My Orders"}
        </h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
            <p className="text-content-tertiary font-medium">{tCommon("loading") || "Loading orders..."}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-divider rounded-[40px] bg-neutral-50/50">
            <div className="bg-white p-8 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShoppingBag className="h-12 w-12 text-neutral-300" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              {tOrders("no_orders_title") || "No orders yet"}
            </h2>
            <p className="text-content-tertiary mb-10 max-w-md mx-auto">
              {tOrders("no_orders_desc") || "Looks like you haven't placed any orders yet. Start exploring our premium collection!"}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center h-14 px-10 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
            >
              {t("continue_shopping") || "Start Shopping"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
