"use client";

import React from "react";
import Link from "next/link";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Github,
  CreditCard
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export const MainFooter = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const sections = [
    {
      title: t("company"),
      links: [
        { label: t("about"), href: "/about" },
        { label: t("features"), href: "/features" },
        { label: t("works"), href: "/works" },
        { label: t("career"), href: "/career" },
      ],
    },
    {
      title: t("help"),
      links: [
        { label: t("customer_support"), href: "/support" },
        { label: t("delivery_details"), href: "/delivery" },
        { label: t("terms_conditions"), href: "/terms" },
        { label: t("privacy_policy"), href: "/privacy" },
      ],
    },
    {
      title: t("faq"),
      links: [
        { label: t("account"), href: "/account" },
        { label: t("manage_deliveries"), href: "/deliveries" },
        { label: t("orders"), href: "/orders" },
        { label: t("payments"), href: "/payments" },
      ],
    },
    {
      title: t("resources"),
      links: [
        { label: t("free_ebooks"), href: "/ebooks" },
        { label: t("development_tutorial"), href: "/tutorial" },
        { label: t("how_to_blog"), href: "/blog" },
        { label: t("youtube_playlist"), href: "/youtube" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-divider pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section: Branding and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="text-3xl font-bold text-primary tracking-tight">
              Silver Glow.Com
            </Link>
            <p className="text-content-secondary text-base max-w-xs leading-relaxed">
              {t("description")}
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[Twitter, Facebook, Instagram, Github].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-divider text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-content-secondary hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright and Payments */}
        <div className="pt-8 border-t border-divider flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-content-secondary text-sm">
            {t("rights")}
          </p>
          
          {/* Payment Icons (Simulated with simple containers for now to match design) */}
          <div className="flex items-center gap-3">
            {["VISA", "Mastercard", "PayPal", "ApplePay", "GooglePay"].map((payment) => (
              <div 
                key={payment}
                className="px-3 py-1.5 rounded-md border border-divider bg-gray-50 text-[10px] font-bold text-primary grayscale hover:grayscale-0 transition-all cursor-default"
              >
                {payment}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
