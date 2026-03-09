import type { Metadata } from "next";
import { Roboto, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Chatbot from "@/components/Chatbot";
import Preloader from "@/components/Preloader";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lustomotive | Premium Car Care in Panagarh, West Bengal",
  description: "Premium car wash, detailing, PPF, ceramic coatings, and paint correction services in Panagarh by Lustomotive Detailing Studio, a sub-brand of Amar Bharat Company.",
  keywords: ["car detailing Panagarh", "car wash Panagarh", "paint protection film", "PPF", "ceramic coating", "Amar Bharat Company", "The Detailing Mafia", "premium detailing West Bengal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${roboto.variable} ${orbitron.variable} antialiased bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden hide-scrollbar`}>
        <Preloader />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />

        <Chatbot />
      </body>
    </html>
  );
}
