"use client";

import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Logo } from "./navbar/Logo";
import { SearchBar } from "./navbar/SearchBar";
import { NavbarActions } from "./navbar/NavbarActions";
import { useHomeHeroLoading } from "@/features/main/home/context/HomeHeroLoadingContext";

export default function MainNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isHomeHeroLoading } = useHomeHeroLoading();

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
  if (isHomeHeroLoading) return null;

  return (
    <nav
      data-site-chrome
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-10 flex items-center",
        isHome && !isScrolled ? "bg-transparent" : "bg-primary",
        isScrolled && "shadow-lg",
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
