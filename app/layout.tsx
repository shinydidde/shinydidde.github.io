// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Patrick_Hand } from "next/font/google";

// load the sketch font
const sketch = Patrick_Hand({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Mrudula Didde • Portfolio",
  description: "The funky, doodle-driven portfolio of Mrudula Didde",
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
      >
        {children}
      </body>
    </html>
  );
}
