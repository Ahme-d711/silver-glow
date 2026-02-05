"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Search, ShoppingCart, Wallet, User, Menu, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { getImageUrl } from "@/utils/image.utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

function UserMenu() {
  const { user } = useAuthStore();
  const t = useTranslations("Navigation");
  const tAuth = useTranslations("Auth");
  const { logout } = useLogout();
  const [imageError, setImageError] = useState(false);
  
  const userId = user?._id || user?.id;
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
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update searchQuery when URL changes externally
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Live Search Logic
  useEffect(() => {
    // Skip if search hasn't changed from what's in the URL
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearch === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    // Always ensure we are on /shop when searching
    if (!pathname.includes("/shop")) {
      if (debouncedSearch) {
        router.push(`/shop?${params.toString()}`);
      }
    } else {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Immediate search on submit
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-8 px-10 flex items-center",
        isScrolled || !isHome ? "bg-primary shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
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
              className="w-full h-18.5 bg-white rounded-2xl text-primary px-12 focus:outline-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <Link href="/cart" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden lg:inline">{t("cart")}</span>
          </Link>
          
          <div className="h-6 w-px bg-white/20 hidden md:block" />

          <Link href="/wallet" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Wallet className="h-5 w-5" />
            <span className="hidden lg:inline">{t("wallet")}</span>
          </Link>

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
