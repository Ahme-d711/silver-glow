"use client";

import Link from "next/link";

export function AuthFooter() {
  return (
    <div className="absolute bottom-10 left-10 md:left-24 lg:left-60 w-[calc(100%-80px)] lg:w-[1300px] flex flex-col md:flex-row items-center justify-between pointer-events-auto z-10">
      <span className="text-sm font-medium text-primary/60 text-center md:text-left mb-4 md:mb-0">
        © {new Date().getFullYear()} Silver Glow. All Rights Reserved.
      </span>
      <div className="flex items-center gap-4 md:gap-8 text-white text-sm font-medium">
        <Link href="#" className="hover:opacity-80 transition-opacity">Marketplace</Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">License</Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">Terms of Use</Link>
        <Link href="#" className="hover:opacity-80 transition-opacity">Blog</Link>
      </div>
    </div>
  );
}
