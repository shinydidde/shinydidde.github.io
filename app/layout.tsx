// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Poppins, Patrick_Hand } from "next/font/google";
import PlayfulPopup from "@/components/PlayfulPopup";
import { PlayfulProvider } from '@/contexts/PlayfulContext';
import ClientAnimations from '@/components/ClientAnimations';

// load fonts
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const patrickHand = Patrick_Hand({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Mrudula Didde • Software Developer",
  description: "Portfolio of Mrudula Didde - Full-Stack Developer specializing in React, TypeScript, and modern web technologies. Explore my projects and experience.",
  openGraph: {
    title: "Mrudula Didde • Software Developer",
    description: "Portfolio of Mrudula Didde - Full-Stack Developer specializing in React, TypeScript, and modern web technologies.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fme.png?alt=media&token=41732060-f7cd-4b67-b0c3-0cf2beeab18b",
        width: 1200,
        height: 630,
        alt: "Mrudula Didde - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mrudula Didde • Software Developer",
    description: "Portfolio of Mrudula Didde - Full-Stack Developer specializing in React, TypeScript, and modern web technologies.",
    images: ["https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fme.png?alt=media&token=41732060-f7cd-4b67-b0c3-0cf2beeab18b"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="text-gray-900
                   antialiased
                   min-h-screen
                   flex
                   flex-col"
        style={{
          '--font-poppins': poppins.style.fontFamily,
          '--font-patrick': patrickHand.style.fontFamily
        } as React.CSSProperties}
      >

        <PlayfulProvider>
          <ClientAnimations />
          {children}
          <PlayfulPopup />
        </PlayfulProvider>
      </body>
    </html>
  );
}
