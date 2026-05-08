import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhinav | Modern Developer Portfolio",
  description: "A highly professional, modern, and creative developer portfolio.",
};

import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import { PortfolioModeProvider } from "@/context/PortfolioModeContext";
import Scene from "@/components/canvas/Scene";
import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden selection:bg-primary/50">
        <SmoothScrolling>
          <PortfolioModeProvider>
            <Scene />
            <BackgroundGrid />
            <CustomCursor />
            <Header />
            {children}
          </PortfolioModeProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
