import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

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
  title: "FinalFile",
  description: "Payment-gated delivery pages for photographers and media freelancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-white text-zinc-950 antialiased">
        <div className="min-h-screen">
          <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                FinalFile
              </Link>
              <nav className="flex items-center gap-3 text-sm font-medium text-zinc-600">
                <Link href="/dashboard" className="hover:text-emerald-600">
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/new"
                  className="rounded-full bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
                >
                  New Delivery Page
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
