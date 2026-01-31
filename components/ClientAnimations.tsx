'use client';

import dynamic from 'next/dynamic';
import { usePlayfulMode } from '@/contexts/PlayfulContext';
import { useEffect } from 'react';

// Lazy load heavy animated components on client side only
const DesktopBlackCatWrapper = dynamic(() => import('@/components/DesktopBlackCatWrapper'), { ssr: false });
const FloatingCharacter = dynamic(() => import('@/components/FloatingCharacter'), { ssr: false });
const BlinkingFaces = dynamic(() => import('@/components/BlinkingFaces'), { ssr: false });

export default function ClientAnimations() {
  const { isPlayfulMode, isGoldMode } = usePlayfulMode();

  useEffect(() => {
    // Apply conditional font directly to body style
    const body = document.body;
    if (isPlayfulMode) {
      body.style.fontFamily = 'var(--font-patrick), "Patrick Hand", cursive';
    } else if (isGoldMode) {
      body.style.fontFamily = 'var(--font-gold), "Cinzel", serif';
    } else {
      body.style.fontFamily = 'var(--font-poppins), "Poppins", sans-serif';
    }
  }, [isPlayfulMode, isGoldMode]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-20">
        <FloatingCharacter
          src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fcoder-on-lift.png?alt=media&token=aa7bb9c5-73c2-492f-8758-b4b677c63757"
          playfulSrc="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fcoder-on-lift.png?alt=media&token=aa7bb9c5-73c2-492f-8758-b4b677c63757"
          alt="Floating friend"
          initialY={-130}
          playfulInitialY={-150}
          scrollRange={[0, 0.8]}
          motionRange={[200, -100]}
          playfulMotionRange={[140, -60]}
          side="left"
          size={120}
          playfulSize={120}
          mobileSize={60}
          mobileInitialY={30}
          mobileMotionRange={[15, -15]}
          playfulOnly={true}
        />

        <FloatingCharacter
          src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fc.gif?alt=media&token=2276e8a1-f223-47e9-b07e-c15eca4715ca"
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
          playfulOnly={true}
          idleBob={false}
        />
      </div>

      {/* Blinking Faces */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <BlinkingFaces
          src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fm1.png?alt=media&token=11ed9f17-80d0-4794-8cf0-694ac26c5cd3"
          alt="Playful cat"
          position={{ top: "1%", right: "0" }}
          blinkInterval={5000}
          size={70}
          playfulOnly={true}
        />
        <BlinkingFaces
          src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fm2.png?alt=media&token=6eb25bd3-c4e9-4d36-80c9-e825524b1075"
          alt="Playful cat"
          position={{ bottom: "0", left: "0" }}
          blinkInterval={5000}
          size={70}
          playfulOnly={true}
        />
      </div>

      <DesktopBlackCatWrapper />
    </>
  );
}
