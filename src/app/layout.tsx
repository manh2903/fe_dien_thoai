import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppThemeProvider } from "@/theme/AppThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhoneShop - Cửa hàng điện thoại uy tín",
  description: "Cửa hàng điện thoại uy tín - máy mới, máy cũ chất lượng",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full`}>
      <body className={`${inter.className} min-h-full antialiased`}>
        <AppThemeProvider>{children}</AppThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
