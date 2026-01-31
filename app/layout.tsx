// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Poppins, Patrick_Hand, Cinzel } from "next/font/google";
import PlayfulPopup from "@/components/PlayfulPopup";
import { PlayfulProvider } from '@/contexts/PlayfulContext';
import { StarfieldProvider } from '@/contexts/StarfieldContext';
import { HeroImageProvider } from '@/contexts/HeroImageContext';
import ClientAnimations from '@/components/ClientAnimations';
import StarfieldBackgroundWrapper from '@/components/StarfieldBackgroundWrapper';

// load fonts
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const patrickHand = Patrick_Hand({ subsets: ["latin"], weight: "400" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
        url: `${siteUrl}/images/og.jpg`,
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
    images: [`${siteUrl}/images/og.jpg`],
    creator: "@shinydidde",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Portfolio",
  classification: "Personal Portfolio Website",
};

const THEME_INIT_SCRIPT = `
(function(){
  var s = localStorage.getItem('theme-mode');
  var t = (s === 'playful' || s === 'grayscale' || s === 'gold') ? s : null;
  if (!t) {
    var l = localStorage.getItem('playful-mode');
    t = (l === '1') ? 'playful' : (l === '0') ? 'gold' : 'gold';
  }
  document.body.setAttribute('data-theme', t);
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="text-gray-900
                   antialiased
                   min-h-screen
                   flex
                   flex-col"
        style={{
          '--font-poppins': poppins.style.fontFamily,
          '--font-patrick': patrickHand.style.fontFamily,
          '--font-gold': cinzel.style.fontFamily
        } as React.CSSProperties}
      >
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <PlayfulProvider>
          <HeroImageProvider>
            <StarfieldProvider>
              <StarfieldBackgroundWrapper />
              <ClientAnimations />
              <div className="relative z-10">{children}</div>
              <PlayfulPopup />
            </StarfieldProvider>
          </HeroImageProvider>
        </PlayfulProvider>
      </body>
    </html>
  );
}
