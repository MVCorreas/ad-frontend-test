import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
