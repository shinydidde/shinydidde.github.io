// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";

const display = Unbounded({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-display" });
const body    = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const mono    = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mruduladidde.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mrudula Didde • Frontend Engineer & Software Developer",
    template: "%s | Mrudula Didde"
  },
  description: "Portfolio of Mrudula Didde - Frontend Engineer with 11+ years of experience specializing in React, Next.js, TypeScript, and modern web technologies. Explore my projects, skills, and professional experience.",
  keywords: [
    "Mrudula Didde",
    "Frontend Engineer",
    "Software Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "Full Stack Developer",
    "UI/UX Developer",
    "Portfolio",
    "Tech Lead",
    "JavaScript Developer"
  ],
  authors: [{ name: "Mrudula Didde" }],
  creator: "Mrudula Didde",
  publisher: "Mrudula Didde",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mrudula Didde Portfolio",
    title: "Mrudula Didde • Frontend Engineer & Software Developer",
    description: "Portfolio of Mrudula Didde - Frontend Engineer with 11+ years of experience specializing in React, Next.js, TypeScript, and modern web technologies. Explore my projects, skills, and professional experience.",
    images: [
      {
        url: `${siteUrl}/images/og.jpg?v=2`,
        width: 1200,
        height: 630,
        alt: "Mrudula Didde - Frontend Engineer & Software Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mrudula Didde • Frontend Engineer & Software Developer",
    description: "Portfolio of Mrudula Didde - Frontend Engineer with 11+ years of experience specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: [`${siteUrl}/images/og.jpg?v=2`],
    creator: "@shinydidde",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Portfolio",
  classification: "Personal Portfolio Website",
};

// Runs before first paint: skip the splash if it was already shown this session
// (add ?splash to the URL to replay it)
const SPLASH_INIT_SCRIPT = `try{if(sessionStorage.getItem('splash-seen')&&!/[?&]splash\\b/.test(location.search))document.documentElement.dataset.splashSeen='1'}catch(e){}`;

export const viewport = {
  themeColor: "#0a0618",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain min-h-screen antialiased">
        <script dangerouslySetInnerHTML={{ __html: SPLASH_INIT_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
