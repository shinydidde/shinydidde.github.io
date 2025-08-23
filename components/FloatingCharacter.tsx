'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

interface FloatingCharacterProps {
  src: string;
  alt: string;
  initialY?: number;
  scrollRange?: [number, number];
  motionRange?: [number, number];
  side?: 'left' | 'right' | 'center';
  className?: string;
  playfulOnly?: boolean;
  idleBob?: boolean;
  bobHeight?: number;
  size?: number;

  // Mobile behavior
  hideOnMobile?: boolean;
  mobileSize?: number;
  mobileInitialY?: number;
  mobileMotionRange?: [number, number];

  // Playful-mode overrides
  playfulSrc?: string;
  playfulSize?: number;
  playfulInitialY?: number;
  playfulMotionRange?: [number, number];
}

export default function FloatingCharacter({
  src,
  alt,
  initialY = 0,
  scrollRange = [0, 1],
  motionRange = [-100, 100],
  side = 'right',
  className = '',
  playfulOnly = false,
  idleBob = false,
  bobHeight = 8,
  size = 300,
  hideOnMobile = false,
  mobileSize,
  mobileInitialY,
  mobileMotionRange = [0, 0],

  // playful overrides
  playfulSrc,
  playfulSize,
  playfulInitialY,
  playfulMotionRange,
}: FloatingCharacterProps) {
  // --- Hooks must be unconditional
  const { isPlayfulMode } = usePlayfulMode();
  const { scrollYProgress } = useScroll();

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Resolve playful-mode base props
  const baseSrc = isPlayfulMode && playfulSrc ? playfulSrc : src;
  const baseSize = isPlayfulMode && playfulSize !== undefined ? playfulSize : size;
  const baseInitialY = isPlayfulMode && playfulInitialY !== undefined ? playfulInitialY : initialY;
  const baseMotionRange = isPlayfulMode && playfulMotionRange ? playfulMotionRange : motionRange;

  // Then apply mobile overrides
  const effSize = isMobile ? (mobileSize ?? baseSize) : baseSize;
  const effInitialY = isMobile ? (mobileInitialY ?? baseInitialY) : baseInitialY;
  const effMotionRange = isMobile ? mobileMotionRange : baseMotionRange;

  // Motion values (unconditional)
  const rawY = useTransform(scrollYProgress, scrollRange, effMotionRange);
  const rawX = useTransform(
    scrollYProgress,
    scrollRange,
    side === 'right' ? [0, 50] : side === 'left' ? [0, -50] : [0, 0]
  );
  const rawR = useTransform(scrollYProgress, scrollRange, [-5, 5]);

  const yScroll = useSpring(rawY, { stiffness: 140, damping: 22 });
  const x = useSpring(rawX, { stiffness: 140, damping: 22 });
  const rotate = useSpring(rawR, { stiffness: 90, damping: 18 });

  const time = useMotionValue(0);
  useAnimationFrame((ms) => time.set(ms));
  const rawBob = useTransform(time, (ms) => (idleBob ? Math.sin(ms / 700) * bobHeight : 0));
  const bob = useSpring(rawBob, { stiffness: 80, damping: 20 });

  const y = useTransform(
    [yScroll, bob] as MotionValue<number>[],
    ([scrollY, bobY]: number[]) => scrollY + bobY
  );

  const positionClass = useMemo(
    () => (side === 'right' ? 'right-4' : side === 'left' ? 'left-4' : 'left-1/2 -translate-x-1/2'),
    [side]
  );

  // Render gate AFTER hooks
  if (!mounted || (playfulOnly && !isPlayfulMode) || (hideOnMobile && isMobile)) return null;

  return (
    <div
      className={`fixed z-30 pointer-events-none ${positionClass} ${className}`}
      style={{
        top: effInitialY,
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.25))',
        width: effSize,
        height: effSize,
      }}
    >
      <motion.div style={{ y, x, rotate, willChange: 'transform' }} whileHover={{ scale: 1.08 }}>
        <Image
          src={baseSrc}
          alt={alt}
          width={effSize}
          height={effSize}
          className="object-contain select-none"
          loading="lazy"
          draggable={false}
          priority={false}
        />
      </motion.div>
    </div>
  );
}
