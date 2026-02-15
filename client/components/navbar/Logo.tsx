"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Logo() {
  const t = useTranslations("Navigation");
  
  return (
    <Link href="/" className="shrink-0">
      <Image
        src="/logo.svg"
        alt={t("home")}
        width={80}
        height={80}
        className="brightness-0 invert"
      />
    </Link>
  );
}
