"use client";

import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useCartStore } from "@/features/main/cart/stores/useCartStore";
import { useCart } from "@/features/main/cart/hooks/useCart";
import { useMergeCart } from "@/features/main/cart/hooks/useMergeCart";

import { Logo } from "./navbar/Logo";
import { SearchBar } from "./navbar/SearchBar";
import { NavbarActions } from "./navbar/NavbarActions";

export default function MainNavbar() {
  const { user } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const { setItems } = useCartStore();
  const { data: cartData } = useCart();
  useMergeCart();

  // Sync backend cart with store for authenticated users
  useEffect(() => {
    if (user && cartData?.data?.cart?.items) {
      type PopulatedCartItem = {
        productId: {
          _id: string;
          nameEn: string;
          nameAr: string;
          price: number;
          mainImage: string;
          stock: number;
          sizes?: Array<{ size: string; stock: number; price: number }>;
        } | null;
        size?: string;
        quantity: number;
      };

      const backendItems = (cartData.data.cart.items as PopulatedCartItem[])
        .filter((item) => item.productId)
        .map((item) => {
          const selectedSizeData = item.size && item.productId!.sizes 
            ? item.productId!.sizes.find((s) => s.size === item.size)
            : null;

          return {
            id: `${item.productId!._id}-${item.size || "nosize"}`,
            productId: item.productId!._id,
            nameEn: item.productId!.nameEn,
            nameAr: item.productId!.nameAr,
            price: selectedSizeData?.price || item.productId!.price,
            mainImage: item.productId!.mainImage,
            size: item.size || "N/A",
            quantity: item.quantity,
            stock: selectedSizeData?.stock || item.productId!.stock, 
            isSynced: true,
          };
        });
      setItems(backendItems);
    }
  }, [user, cartData, setItems]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register") || pathname.includes("/verify");

  if (isAuthPage) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-10 flex items-center",
        isScrolled || !isHome ? "bg-primary shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center max-w-7xl justify-between gap-4">
        <Logo />
        <SearchBar />
        <NavbarActions />
      </div>
    </nav>
  );
}
