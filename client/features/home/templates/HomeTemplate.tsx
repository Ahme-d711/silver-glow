"use client";

import { MainNavbar } from "@/components/MainNavbar";
import { HeroSection } from "../components/HeroSection";
import { useHomeAds } from "../hooks/useHome";

export default function HomeTemplate() {
  const { data: ads = [] } = useHomeAds();

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      
      <main className="grow">
        {/* Hero Section */}
        <HeroSection ads={ads} />

        {/* Feature Sections can be added here */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-primary text-center mb-12">
              Why Choose Silver Glow?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: "Premium Quality", desc: "Handcrafted jewelry with the finest materials since 2007." },
                 { title: "Fast Delivery", desc: "Secure and quick delivery right to your doorstep." },
                 { title: "Secure Wallet", desc: "Safe and easy transactions with our integrated wallet system." }
               ].map((feature, i) => (
                 <div key={i} className="p-8 rounded-3xl bg-secondary/20 hover:bg-secondary/30 transition-all border border-divider/50">
                    <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                    <p className="text-primary/60">{feature.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer can be added here or reuse existing */}
      <footer className="bg-primary py-12 text-white">
        <div className="container mx-auto px-4 text-center">
            <p className="opacity-60">© {new Date().getFullYear()} Silver Glow. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
