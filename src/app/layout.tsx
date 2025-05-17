import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito-sans" });

export const metadata: Metadata = {
  title: "Grace Email Signature Generator",
  description: "Create and copy a custom Grace Community Church email signature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Nunito Sans as primary font, fallback to Arial and sans-serif. */}
      <body className={`${nunitoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
