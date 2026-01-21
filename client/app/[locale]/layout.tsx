import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import { CoreProviders, Providers } from "../providers";
import DashboardLayoutClient from "./dashboard/DashboardLayoutClient";
import { getProfile } from "@/features/auth/actions/auth.service";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://silver-glow.sa/"),
  title: "Silver Glow",
  icons: {
    icon: "/top-logo.svg",
    apple: "/logo.svg",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const profileData = await getProfile();

  // Set direction based on locale
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${cairo.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <CoreProviders>
            <Providers data={profileData}>
              <DashboardLayoutClient>{children}</DashboardLayoutClient>
            </Providers>
          </CoreProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
