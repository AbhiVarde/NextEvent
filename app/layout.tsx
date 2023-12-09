// .app/layout.tsx:

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextEvent",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

export default function RootLayout({
  children,
  showNavbar = true,
  showFooter = true,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {showNavbar && <Navbar />}
        {children}
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
