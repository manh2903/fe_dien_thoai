import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhoneShop - Cửa hàng điện thoại",
  description: "Cửa hàng điện thoại uy tín - máy mới, máy cũ chất lượng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <body className="min-h-full bg-zinc-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
