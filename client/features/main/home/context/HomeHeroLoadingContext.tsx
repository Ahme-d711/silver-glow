"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "@/i18n/routing";
import { HeroLoadingScreen } from "../components/HeroLoadingScreen";

interface HomeHeroLoadingContextValue {
  isHome: boolean;
  isHomeHeroLoading: boolean;
  setHomeHeroLoading: (loading: boolean) => void;
}

const HomeHeroLoadingContext =
  createContext<HomeHeroLoadingContextValue | null>(null);

export function useHomeHeroLoading() {
  const context = useContext(HomeHeroLoadingContext);
  if (!context) {
    throw new Error(
      "useHomeHeroLoading must be used within HomeHeroLoadingProvider"
    );
  }
  return context;
}

export function HomeHeroLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (!isHome) {
      setIsLoading(false);
      setOverlayMounted(false);
      document.documentElement.classList.remove("home-hero-boot");
      return;
    }

    setIsLoading(true);
    setOverlayMounted(true);
    document.documentElement.classList.add("home-hero-boot");
  }, [isClient, isHome]);

  const setHomeHeroLoading = useCallback(
    (loading: boolean) => {
      if (!isHome) return;
      setIsLoading(loading);

      if (loading) {
        document.documentElement.classList.add("home-hero-boot");
      }
    },
    [isHome]
  );

  const handleBootComplete = useCallback(() => {
    setOverlayMounted(false);
    document.documentElement.classList.remove("home-hero-boot");
  }, []);

  const value = useMemo(
    () => ({
      isHome,
      isHomeHeroLoading: isHome && isLoading,
      setHomeHeroLoading,
    }),
    [isHome, isLoading, setHomeHeroLoading]
  );

  return (
    <HomeHeroLoadingContext.Provider value={value}>
      {isClient && overlayMounted ? (
        <HeroLoadingScreen
          visible={isLoading}
          onExitComplete={handleBootComplete}
        />
      ) : null}
      {children}
    </HomeHeroLoadingContext.Provider>
  );
}
