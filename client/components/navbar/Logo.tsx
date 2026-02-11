"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

export function Logo() {
  return (
    <Link href="/" className="shrink-0">
      <Image
        src="/logo.svg"
        alt="Silver Glow"
        width={80}
        height={80}
        className="brightness-0 invert"
      />
    </Link>
  );
}
