"use client";

import { useSyncExternalStore } from "react";
import { Link } from "@/i18n/routing";
import { ShoppingCart, Heart, Wallet, Menu, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartItems } from "@/features/main/cart/hooks/useCart";
import { getTotalItems } from "@/features/main/cart/utils/cart.utils";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useLoginRequiredModal } from "@/features/auth/stores/loginRequiredModalStore";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";
import LanguageSelector from "../shared/LanguageSelector";
import { UserMenu } from "./UserMenu";

export function NavbarActions() {
  const t = useTranslations("Navigation");
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { user } = useAuthStore();
  const openLoginRequired = useLoginRequiredModal((s) => s.openLoginRequired);
  const { items } = useCartItems();

  const totalItems = getTotalItems(items);
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist?.products?.length || 0;

  return (
    <div className="flex items-center gap-2 md:gap-4 text-secondary font-medium">
      <Link href="/shop" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Store className="h-5 w-5" />
        <span className="hidden lg:inline">{t("shop")}</span>
      </Link>

      <div className="h-6 w-px bg-white/20 hidden md:block" />

      <Link href="/cart" className="flex items-center gap-2 hover:opacity-80 transition-opacity relative group">
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {isHydrated && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">{t("cart")}</span>
      </Link>
      
      <div className="h-6 w-px bg-white/20 hidden md:block" />

      <Link
        href="/wishlist"
        onClick={(e) => {
          if (!user) {
            e.preventDefault();
            openLoginRequired("wishlist");
          }
        }}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity relative group"
      >
        <div className="relative">
          <Heart className="h-5 w-5" />
          {isHydrated && wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">{t("wishlist")}</span>
      </Link>
      

      <div className="flex gap-2 md:gap-4">
      <div className="h-6 w-px bg-white/20 hidden md:block" />
      <Link href="/wallet" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Wallet className="h-5 w-5" />
        <span className="hidden lg:inline">{t("wallet")}</span>
      </Link>
      </div>

      <div className="h-6 w-px bg-white/20 hidden md:block" />

      <LanguageSelector />
      
      <div className="h-6 w-px bg-white/20 hidden md:block" />

      <UserMenu />
      
      <button className="md:hidden">
        <Menu className="h-6 w-6" />
      </button>
    </div>
  );
}
