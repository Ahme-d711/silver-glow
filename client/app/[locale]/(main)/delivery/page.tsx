import React from "react";
import StaticPageTemplate from "@/components/StaticPageTemplate";
import { useTranslations } from "next-intl";

export default function DeliveryPage() {
  const t = useTranslations("Footer");
  
  return (
    <StaticPageTemplate 
      title={t("delivery_details")} 
      description="Find all the information you need about our shipping methods, costs, and estimates."
    >
      <div className="space-y-12">
        <section className="bg-background p-10 rounded-3xl border border-divider">
          <h2 className="text-2xl font-bold text-primary mb-6">Delivery Times & Costs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-divider">
                  <th className="py-4 font-bold text-primary">Shipping Area</th>
                  <th className="py-4 font-bold text-primary">Rate (EGP)</th>
                  <th className="py-4 font-bold text-primary">Estimated Delivery</th>
                </tr>
              </thead>
              <tbody className="text-content-secondary">
                <tr className="border-b border-divider/50 hover:bg-white transition-colors">
                  <td className="py-4">Greater Cairo & Giza</td>
                  <td className="py-4">50 EGP</td>
                  <td className="py-4">1-2 Business Days</td>
                </tr>
                <tr className="border-b border-divider/50 hover:bg-white transition-colors">
                  <td className="py-4">Alexandria & Suez</td>
                  <td className="py-4">65 EGP</td>
                  <td className="py-4">2-3 Business Days</td>
                </tr>
                <tr className="border-b border-divider/50 hover:bg-white transition-colors">
                  <td className="py-4">Delta & Upper Egypt</td>
                  <td className="py-4">80 EGP</td>
                  <td className="py-4">3-5 Business Days</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 font-bold text-primary">FREE SHIPPING</td>
                  <td className="py-4 font-bold text-success">0 EGP</td>
                  <td className="py-4 italic font-medium">Orders over 1000 EGP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-divider shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Tracking Your order</h3>
            <p>Once your order is shipped, we will send you a tracking number and a link to trace your package in real-time until it reaches your doorstep.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-divider shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Handling Insurance</h3>
            <p>Your orders are fully insured during the transit. If any package gets lost or damaged, we will replace it or refund your payment immediately.</p>
          </div>
        </section>

        <p className="text-center italic text-content-secondary">Note: Delivery times are estimates and may vary during national holidays and sales seasons.</p>
      </div>
    </StaticPageTemplate>
  );
}
