"use client";

import { HomeHeroLoadingProvider } from "@/features/main/home/context/HomeHeroLoadingContext";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

export function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HomeHeroLoadingProvider>
      <div className="flex flex-col min-h-screen">
        <MainNavbar />
        <main className="grow" data-site-chrome>
          {children}
        </main>
        <MainFooter />
      </div>
    </HomeHeroLoadingProvider>
  );
}
