import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppThemeProvider } from "@/theme/AppThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PhoneShop - Cửa hàng điện thoại uy tín",
    template: "%s | PhoneShop",
  },
  description:
    "PhoneShop - Cửa hàng điện thoại uy tín. iPhone mới & cũ chính hãng, giá tốt, bảo hành rõ ràng, tư vấn tận tâm.",
  applicationName: "PhoneShop",
  keywords: [
    "PhoneShop",
    "điện thoại",
    "iPhone",
    "iPhone cũ",
    "iPhone mới",
    "mua iPhone",
    "điện thoại giá rẻ",
    "cửa hàng điện thoại",
  ],
  authors: [{ name: "PhoneShop" }],
  creator: "PhoneShop",
  publisher: "PhoneShop",
  category: "ecommerce",
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "PhoneShop",
    title: "PhoneShop - Cửa hàng điện thoại uy tín",
    description:
      "iPhone mới & cũ chính hãng, giá tốt, bảo hành rõ ràng. Mua điện thoại uy tín tại PhoneShop.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "PhoneShop - Cửa hàng điện thoại uy tín",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhoneShop - Cửa hàng điện thoại uy tín",
    description:
      "iPhone mới & cũ chính hãng, giá tốt, bảo hành rõ ràng tại PhoneShop.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
