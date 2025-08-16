// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Patrick_Hand, Permanent_Marker } from "next/font/google";
import MemePopup from "@/components/MemePopup";
import { MemeProvider } from '@/contexts/MemeContext';
import DesktopBlackCatWrapper from '@/components/DesktopBlackCatWrapper';
import FloatingCharacter from '@/components/FloatingCharacter';
import BlinkingFaces from '@/components/BlinkingFaces';

// load fonts
const sketch = Patrick_Hand({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Mrudula Didde • Meme-tastic Portfolio",
  description: "The funky, doodle-driven portfolio of Mrudula Didde - now with 100% more memes!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sketch.className}
                    bg-paper
                    text-gray-900
                    antialiased
                    min-h-screen
                    flex
                    flex-col`}
        style={{ fontFamily: marker.style.fontFamily }}
      >
        {/* Doodle background elements */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-magenta/20"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-lime/20"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-teal/20"></div>
        </div>

        <MemeProvider>
          <div className="fixed inset-0 pointer-events-none z-20">
            <FloatingCharacter
              src="/characters/coder-on-lift.png"
              alt="Developer on lift"
              initialY={-130}
              mobileInitialY={-12}
              scrollRange={[0, 0.8]}
              motionRange={[200, -100]}
              mobileMotionRange={[0, 0]}
              side="left"
              size={320}
              mobileSize={72}
              idleBob={false}
            />

            <FloatingCharacter
              src="/characters/bug-hunter.png"
              alt="Bug hunter"
              initialY={300}
              scrollRange={[0.1, 0.7]}
              motionRange={[300, -100]}
              side="right"
              size={260}
              hideOnMobile
              memeOnly={true}
              idleBob={false}
            />
          </div>

          {/* Blinking Faces */}
          <div className="fixed inset-0 pointer-events-none z-20">
            <BlinkingFaces
              src="/faces/meme-cat.png"
              alt="Meme cat"
              position={{ top: "30%", left: "15%" }}
              blinkInterval={5000}
              size={70}
              memeOnly={true}
            />
          </div>
          {children}
          <MemePopup />
          <DesktopBlackCatWrapper />
        </MemeProvider>
      </body>
    </html>
  );
}
