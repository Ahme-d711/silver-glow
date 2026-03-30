import React from "react";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { useTranslations } from "next-intl";

export default function WorksPage() {
  const t = useTranslations("Footer");
  
  return (
    <StaticPageTemplate 
      title={t("works")} 
      description="Take a look at our latest collections and how we bring fashion to life."
    >
      <div className="space-y-12">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-sm font-semibold text-primary/60 uppercase tracking-widest">Collection 2024</span>
            <h2 className="text-3xl font-bold text-primary">Urban Essentials</h2>
            <p>Our latest collection focuses on comfort and versatility, perfect for the modern urban lifestyle. We've used breathable fabrics and timeless designs that transition seamlessly from day to night.</p>
          </div>
          <div className="bg-secondary/20 h-80 rounded-3xl border border-divider flex items-center justify-center">
            <span className="text-primary/30 font-medium italic">Image: Urban Collection Showcase</span>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="md:order-2 space-y-4">
            <span className="text-sm font-semibold text-primary/60 uppercase tracking-widest">Sustainability Project</span>
            <h2 className="text-3xl font-bold text-primary">Eco-Friendly Line</h2>
            <p>We've partnered with local manufacturers to produce a line of clothing made from 100% recycled materials, reducing waste and supporting fair labor practices without compromising on style.</p>
          </div>
          <div className="md:order-1 bg-secondary/20 h-80 rounded-3xl border border-divider flex items-center justify-center">
            <span className="text-primary/30 font-medium italic">Image: Eco-Line Process</span>
          </div>
        </section>

        <section className="text-center py-12 bg-primary/5 rounded-3xl border border-divider">
          <h2 className="text-2xl font-bold text-primary mb-4">Want to see more?</h2>
          <p className="max-w-xl mx-auto mb-8">Follow us on our social media channels to get daily updates on our design process and upcoming collections.</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors">Instagram Portfolio</button>
          </div>
        </section>
      </div>
    </StaticPageTemplate>
  );
}
