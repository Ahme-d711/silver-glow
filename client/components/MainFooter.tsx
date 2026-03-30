"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Github,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";

const MainFooter = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const pathname = usePathname();
  const isRtl = locale === "ar";

  const isAuthPage = pathname.includes("/login") || pathname.includes("/register") || pathname.includes("/verify");

  if (isAuthPage) return null;

  const sections = [
    {
      title: t("company"),
      links: [
        { label: t("about"), href: "/#" },
        { label: t("features"), href: "/#" },
        { label: t("works"), href: "/#" },
      ],
    },
    {
      title: t("help"),
      links: [
        { label: t("customer_support"), href: "/#" },
        { label: t("delivery_details"), href: "/#" },
        { label: t("terms_conditions"), href: "/#" },
        { label: t("privacy_policy"), href: "/#" },
      ],
    },
  ];

  const payments = [
    { name: "Visa", src: "/footer/Visa.svg" },
    { name: "Mastercard", src: "/footer/Mastercard.svg" },
    { name: "PayPal", src: "/footer/Paypal.svg" },
    { name: "ApplePay", src: "/footer/ Pay.svg" },
    { name: "GooglePay", src: "/footer/G Pay.svg" },
  ];

  return (
    <footer className="bg-white border-t border-divider pt-16 pb-8">
      <div className="container max-w-[1440px] mx-auto px-4">
        {/* Top Section: Branding and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="text-3xl font-bold text-primary tracking-tight">
              {t("brand_name")}
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
                <h4 className="text-lg font-medium uppercase tracking-widest text-primary">
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
          
          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            {payments.map((payment) => (
              <div 
                key={payment.name}
                className="w-12 h-8 relative flex items-center justify-center rounded-md border border-divider bg-white p-1 transition-all cursor-default hover:shadow-sm"
              >
                <Image
                  src={payment.src}
                  alt={payment.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default MainFooter;
