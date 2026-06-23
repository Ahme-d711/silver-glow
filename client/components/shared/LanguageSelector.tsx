"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"

export default function LanguageSelector() {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "ar" : "en";
  const toggleLabel = nextLocale.toUpperCase();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  if (!mounted) {
    return (
      <span className="uppercase text-sm font-semibold opacity-0">
        {toggleLabel}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="uppercase text-sm font-semibold hover:opacity-80 transition-opacity outline-none cursor-pointer min-w-[2ch]"
      aria-label={nextLocale === "en" ? "Switch to English" : "Switch to Arabic"}
    >
      {toggleLabel}
    </button>
  );
}
