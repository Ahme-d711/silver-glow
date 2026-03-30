import React from "react";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { useTranslations } from "next-intl";

export default function SupportPage() {
  const t = useTranslations("Footer");
  
  return (
    <StaticPageTemplate 
      title={t("customer_support")} 
      description="Need help with your order or have a question about our products? Our team is here to help you."
    >
      <div className="space-y-12">
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-divider shadow-sm text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Email Support</h3>
            <p className="text-content-secondary">Ask any question or report a problem and we'll get back to you within 24 hours.</p>
            <a href="mailto:support@silverglow.com" className="text-primary font-bold hover:underline">support@silverglow.com</a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-divider shadow-sm text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Phone Call</h3>
            <p className="text-content-secondary">Available from 9 AM to 6 PM every day to answer your urgent inquiries.</p>
            <a href="tel:+1234567890" className="text-primary font-bold hover:underline">+20 101 893 9831</a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-divider shadow-sm text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Live Chat</h3>
            <p className="text-content-secondary">Chat live with our experts to get fast help and personalized style advice.</p>
            <button className="text-primary font-bold hover:underline">Start Chatting</button>
          </div>
        </section>

        <section className="bg-background p-10 rounded-3xl border border-divider">
          <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <details className="group border-b border-divider pb-4 cursor-pointer">
              <summary className="text-lg font-medium text-primary list-none flex justify-between items-center group-open:mb-2 transition-all">
                How do I track my order?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-content-secondary leading-relaxed">You can track your order by logging into your account and visiting the "My Orders" section. You will also receive a tracking link via email once your order has been shipped.</p>
            </details>
            <details className="group border-b border-divider pb-4 cursor-pointer">
              <summary className="text-lg font-medium text-primary list-none flex justify-between items-center group-open:mb-2 transition-all">
                What is your return policy?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-content-secondary leading-relaxed">We offer a 14-day return policy for most items in their original condition. Please check our full Terms & Conditions for more details.</p>
            </details>
            <details className="group border-b border-divider pb-4 cursor-pointer">
              <summary className="text-lg font-medium text-primary list-none flex justify-between items-center group-open:mb-2 transition-all">
                Do you ship internationally?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-content-secondary leading-relaxed">Currently we focus on domestic shipping, but we are working hard to bring Silver Glow to the rest of the world soon!</p>
            </details>
          </div>
        </section>
      </div>
    </StaticPageTemplate>
  );
}
