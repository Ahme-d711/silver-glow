"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Search, ShoppingCart, Wallet, User, Menu, LogOut, ChevronDown, Package, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { getImageUrl } from "@/utils/image.utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Button } from "./ui/button";
import { useCartStore, getTotalItems } from "@/features/main/cart/stores/useCartStore";
import { useCart } from "@/features/main/cart/hooks/useCart";
import { useMergeCart } from "@/features/main/cart/hooks/useMergeCart";

import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { useWishlist } from "@/features/main/wishlist/hooks/useWishlist";
import LanguageSelector from "./shared/LanguageSelector";

function UserMenu() {
  const { user } = useAuthStore();
  const t = useTranslations("Navigation");
  const tAuth = useTranslations("Auth");
  const { logout } = useLogout();
  const [imageError, setImageError] = useState(false);
  
  const userName = user?.name || "User";
  const userPhoto = getImageUrl(user?.picture);
  const userInitial = userName.charAt(0).toUpperCase();

  if (!user) {
    return (
      <Link href="/login" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <User className="h-5 w-5" />
        <span className="hidden lg:inline">{t("log_in")} / {t("create_account")}</span>
      </Link>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none">
          <Avatar className="h-8 w-8 border border-white/20">
            {!imageError && userPhoto ? (
              <AvatarImage
                src={userPhoto}
                alt={userName}
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : null}
            <AvatarFallback className="bg-primary text-white text-xs">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <span className="hidden lg:inline text-sm font-medium truncate max-w-[100px]">
            {userName}
          </span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 mt-2 mr-4" align="end">
        <div className="flex flex-col gap-1">
          <div className="px-2 py-1.5 text-sm font-semibold border-b mb-1">
            {tAuth("welcome_back")}, {userName.split(" ")[0]}
          </div>
          <Link href="/dashboard" className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start cursor-pointer h-9 px-2"
            >
              <User className="h-4 w-4 mr-2" />
               Dashboard
            </Button>
          </Link>
          <Link href="/orders" className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start cursor-pointer h-9 px-2"
            >
              <Package className="h-4 w-4 mr-2" />
               {t("my_orders") || "My Orders"}
            </Button>
          </Link>
          <Button
            onClick={() => logout()}
            variant="ghost"
            className="w-full justify-start cursor-pointer h-9 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t("logout")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function MainNavbar() {
  const { user } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isFocused, setIsFocused] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { items, setItems } = useCartStore();
  const { data: cartData } = useCart();
  useMergeCart();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sync backend cart with store for authenticated users
  useEffect(() => {
    if (user && cartData?.data?.cart?.items) {
      const backendItems = cartData.data.cart.items
        .filter((item: any) => item.productId) // Safety check: productId might be null if product deleted
        .map((item: any) => ({
          id: `${item.productId._id}-${item.size || "nosize"}`,
          productId: item.productId._id,
          nameEn: item.productId.nameEn,
          nameAr: item.productId.nameAr,
          price: item.productId.price,
          mainImage: item.productId.mainImage,
          size: item.size || "N/A",
          quantity: item.quantity,
          stock: item.productId.stock, 
          isSynced: true,
        }));
      setItems(backendItems);
    }
  }, [user, cartData, setItems]);

  const totalItems = getTotalItems(items);
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist?.products?.length || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update searchQuery when URL changes externally or on navigation
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    } else if (!pathname.includes("/shop")) {
      // Clear input if we navigate away from shop and there's no search param
      setSearchQuery("");
    }
  }, [searchParams, pathname]);

  // Live Search Logic
  useEffect(() => {
    // Only trigger logic if focused or if we are already on shop page 
    // (to allow clearing search if user deletes text)
    if (!isFocused && !pathname.includes("/shop")) return;

    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearch === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    // Redirect to shop if searching from another page while focused
    if (!pathname.includes("/shop")) {
      if (debouncedSearch && isFocused) {
        router.push(`/shop?${params.toString()}`);
      }
    } else {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, pathname, router, searchParams, isFocused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    router.push(`/shop?${params.toString()}`);
  };

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
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Silver Glow"
            width={80}
            height={80}
            className="brightness-0 invert"
          />
        </Link>

        {/* Search Bar (Middle) */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-2xl relative"
        >
          <div className="relative w-full">
            <Input
              type="text"
              placeholder={t("search_placeholder")}
              className="w-full h-12 bg-white rounded-2xl text-primary px-12 focus:outline-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 cursor-pointer" 
              onClick={handleSearch}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1 border-l border-divider/50">
               <Menu className="h-5 w-5 text-primary/40" />
            </div>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-6 text-secondary font-medium">
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

          <Link href="/wishlist" className="flex items-center gap-2 hover:opacity-80 transition-opacity relative group">
            <div className="relative">
              <Heart className="h-5 w-5" />
              {isHydrated && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden lg:inline">{t("wishlist") || "Wishlist"}</span>
          </Link>
          
          <div className="h-6 w-px bg-white/20 hidden md:block" />

          <Link href="/wallet" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Wallet className="h-5 w-5" />
            <span className="hidden lg:inline">{t("wallet")}</span>
          </Link>

          <div className="h-6 w-px bg-white/20 hidden md:block" />

          <LanguageSelector showLabel={true} />
          
          <div className="h-6 w-px bg-white/20 hidden md:block" />

          <UserMenu />
          
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
