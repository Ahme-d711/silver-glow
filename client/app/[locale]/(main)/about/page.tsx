import React from "react";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("Footer");
  
  return (
    <StaticPageTemplate 
      title={t("about")} 
      description="Learn more about Silver Glow and our commitment to premium quality fashion."
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p>
            At Silver Glow, our mission is to provide high-quality, stylish, and comfortable clothing that empowers individuals to express their unique sense of style. We believe that fashion should be accessible, sustainable, and reflective of the modern world.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-background p-6 rounded-2xl border border-divider">
            <h3 className="text-xl font-semibold text-primary mb-2">Quality First</h3>
            <p>Every piece in our collection is crafted with the finest materials and attention to detail, ensuring longevity and comfort.</p>
          </div>
          <div className="bg-background p-6 rounded-2xl border border-divider">
            <h3 className="text-xl font-semibold text-primary mb-2">Sustainable Fashion</h3>
            <p>We are committed to ethical manufacturing processes and reducing our environmental footprint in the fashion industry.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Our History</h2>
          <p>
            Founded in 2023, Silver Glow started as a small boutique with a vision to redefine urban fashion. Today, we are proud to serve customers globally, maintaining our core values of excellence and innovation.
          </p>
        </section>
      </div>
    </StaticPageTemplate>
  );
}
