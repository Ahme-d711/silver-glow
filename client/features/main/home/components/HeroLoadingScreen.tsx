"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroLoadingScreenProps {
  visible: boolean;
  onExitComplete?: () => void;
}

export function HeroLoadingScreen({
  visible,
  onExitComplete,
}: HeroLoadingScreenProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState(visible);
  const [isExiting, setIsExiting] = useState(false);

  useLayoutEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useLayoutEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsExiting(false);
      document.documentElement.classList.add("home-hero-boot");
      return;
    }

    if (!shouldRender) return;

    setIsExiting(true);
    const timer = window.setTimeout(() => {
      setShouldRender(false);
      setIsExiting(false);
      document.documentElement.classList.remove("home-hero-boot");
      onExitComplete?.();
    }, 700);

    return () => window.clearTimeout(timer);
  }, [visible, shouldRender, onExitComplete]);

  useLayoutEffect(() => {
    if (!shouldRender) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  if (!portalTarget || !shouldRender) {
    return null;
  }

  return createPortal(
    <div
      aria-hidden={!visible}
      aria-busy={visible}
      className={cn(
        "fixed inset-0 z-200 flex items-center justify-center bg-black transition-opacity duration-700 ease-out",
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/4 blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/6 blur-2xl animate-pulse"
          style={{ animationDelay: "400ms" }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/90 border-r-white/20 animate-spin"
            style={{ animationDuration: "1.4s" }}
          />
          <div
            className="absolute inset-2 rounded-full border border-white/5 animate-spin"
            style={{ animationDuration: "2.8s", animationDirection: "reverse" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt=""
              width={52}
              height={52}
              className="brightness-0 invert opacity-90 animate-pulse"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="h-px w-36 bg-linear-to-r from-transparent via-white/40 to-transparent" />
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce"
                style={{ animationDelay: `${dot * 160}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}
