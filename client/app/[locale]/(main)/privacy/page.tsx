import React from "react";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("Footer");
  
  return (
    <StaticPageTemplate 
      title={t("privacy_policy")} 
      description="We value your privacy and are committed to protecting your personal data."
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold text-primary mb-2">1. Information We Collect</h2>
          <p>We may collect personal information such as your name, email address, phone number, and physical address when you create an account or make a purchase.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-2">2. How We Use It</h2>
          <p>The information we collect is used to process your orders, improve our services, and communicate with you about your account and our latest collections.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-2">3. Data Security</h2>
          <p>We use advanced security protocols to protect your personal data from unauthorized access or disclosure during transmission and storage.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-2">4. Third-Party Sharing</h2>
          <p>We do not sell your personal data to third parties. Your information is only shared with trusted service providers to facilitate your orders and payments.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-2">5. Cookies</h2>
          <p>We use cookies to enhance your browsing experience and personalize the content we show you. You can manage your cookie preferences in your browser settings.</p>
        </section>

        <p className="pt-8 text-sm italic">Last updated: March 30, 2026</p>
      </div>
    </StaticPageTemplate>
  );
}
