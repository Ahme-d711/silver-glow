"use client";

import { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "../ui/input";

export function SearchBar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);

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

  return (
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
  );
}
