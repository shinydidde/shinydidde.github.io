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
                    // bg-paper
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
              memeSrc="/characters/party.png"
              alt="Floating friend"
              initialY={-130}
              memeInitialY={-110}
              scrollRange={[0, 0.8]}
              motionRange={[200, -100]}
              memeMotionRange={[140, -60]}
              side="left"
              size={320}
              memeSize={320}
              mobileSize={72}
              mobileInitialY={-12}
              mobileMotionRange={[0, 0]}
            />

            <FloatingCharacter
              src="/faces/c.gif"
              alt="Bug hunter"
              initialY={300}
              scrollRange={[0.1, 0.7]}
              motionRange={[300, -100]}
              side="right"
              size={200}
              hideOnMobile
              memeOnly={true}
              idleBob={false}
            />
          </div>

          {/* Blinking Faces */}
          <div className="fixed inset-0 pointer-events-none z-20">
            <BlinkingFaces
              src="/faces/m1.png"
              alt="Meme cat"
              position={{ top: "1%", right: "0" }}
              blinkInterval={5000}
              size={70}
              memeOnly={true}
            />
            <BlinkingFaces
              src="/faces/m2.png"
              alt="Meme cat"
              position={{ bottom: "0", left: "0" }}
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
