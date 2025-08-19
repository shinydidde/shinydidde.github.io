'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy animated components on client side only
const DesktopBlackCatWrapper = dynamic(() => import('@/components/DesktopBlackCatWrapper'), { ssr: false });
const FloatingCharacter = dynamic(() => import('@/components/FloatingCharacter'), { ssr: false });
const BlinkingFaces = dynamic(() => import('@/components/BlinkingFaces'), { ssr: false });

export default function ClientAnimations() {
  return (
    <>
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
          mobileSize={140}
          mobileInitialY={-24}
          mobileMotionRange={[20, -20]}
        />

        <FloatingCharacter
          src="/faces/c.gif"
          alt="Bug hunter"
          initialY={300}
          scrollRange={[0.1, 0.7]}
          motionRange={[300, -100]}
          side="right"
          size={200}
          mobileSize={80}
          mobileInitialY={500}
          mobileMotionRange={[500, 200]}
          className="md:right-4 right-8"
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
      
      <DesktopBlackCatWrapper />
    </>
  );
}