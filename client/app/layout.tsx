import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { CoreProviders, Providers } from "./providers";
import DashboardLayoutClient from "./dashboard/DashboardLayoutClient";
import { getProfile } from "@/features/auth/actions/auth.service";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profileData = await getProfile();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cairo.variable} font-sans antialiased`}
      >
        <CoreProviders>
          <Providers data={profileData}>
            <DashboardLayoutClient>{children}</DashboardLayoutClient>
          </Providers>
        </CoreProviders>
      </body>
    </html>
  );
}
