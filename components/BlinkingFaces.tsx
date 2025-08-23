// components/BlinkingFaces.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

interface BlinkingFaceProps {
  src: string;
  alt: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  blinkInterval?: number;
  size?: number;
  playfulOnly?: boolean;
  hoverEffect?: boolean;
  floatEffect?: boolean;
}

export default function BlinkingFaces({
  src,
  alt,
  position,
  blinkInterval = 3000,
  size = 80,
  playfulOnly = false,
  hoverEffect = true,
  floatEffect = true,
}: BlinkingFaceProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const { isPlayfulMode } = usePlayfulMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 300);
    }, blinkInterval + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [blinkInterval]);

  if (playfulOnly && !isPlayfulMode) return null;

  return (
    <motion.div
      className="fixed z-30 cursor-pointer"
      style={{
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
      }}
      animate={{
        scale: isBlinking ? [1, 0.8, 1] : 1,
        rotate: isBlinking ? [0, 5, -5, 0] : 0,
        y: floatEffect ? [0, -15, 0] : 0,
      }}
      transition={{
        duration: 0.5,
        y: floatEffect ? {
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "easeInOut"
        } : {}
      }}
      whileHover={hoverEffect ? {
        scale: 1.2,
        rotate: 5,
        transition: { duration: 0.2 }
      } : {}}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain w-full h-full hover:brightness-110 transition-all"
      />
    </motion.div>
  );
}
