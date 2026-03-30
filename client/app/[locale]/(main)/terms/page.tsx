import React from "react";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("Footer");
  
  return (
    <StaticPageTemplate 
      title={t("terms_conditions")} 
      description="Please read these terms and conditions carefully before using our services."
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold text-primary mb-2">1. Introduction</h2>
          <p>By using the Silver Glow website and services, you agree to comply with these terms. We reserve the right to change these terms at any time.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-2">2. Products & Orders</h2>
          <p>We try to display our products as accurately as possible. However, the colors and appearance might vary depending on your device settings. All orders are subject to availability.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-2">3. Pricing & Payments</h2>
          <p>The prices listed on our website are inclusive of applicable taxes. We accept various payment methods including credit cards, PayPal, and Cash on Delivery.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-2">4. Intellectual Property</h2>
          <p>All content on this website, including text, graphics, and images, is the property of Silver Glow and is protected by international copyright laws.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-2">5. Limitation of Liability</h2>
          <p>Silver Glow is not liable for any indirect or consequential damages that may arise from the use of our website or the purchase of our products.</p>
        </section>
        
        <p className="pt-8 text-sm italic">Last updated: March 30, 2026</p>
      </div>
    </StaticPageTemplate>
  );
}
