import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "Uzair Khan · Portfolio Hero",
  description: "Mesmerizing hero section built with Next.js 14, Tailwind CSS, GSAP, and Lottie"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // RootLayout is a Server Component by default. It wraps every route.
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} bg-base-light text-base-dark transition-colors duration-500 dark:bg-base-dark dark:text-base-light`}>
        {/* ThemeProvider switches Tailwind's class strategy for dark / light modes */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
