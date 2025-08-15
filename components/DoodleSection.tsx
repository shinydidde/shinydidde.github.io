'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion, type TargetAndTransition, type VariantLabels } from 'framer-motion';
import dynamic from 'next/dynamic';

// ⬇️ render ScatterDoodles only on the client to avoid SSR/client mismatch
const ScatterDoodles = dynamic(() => import('./ScatterDoodles'), { ssr: false });

export interface DoodleSectionProps {
  children: ReactNode;
  bgImage: string;
  divider?: boolean;
  className?: string;
  bgPosition?: string;
  blendMode?: React.CSSProperties['mixBlendMode'];
  bgOpacity?: number;
  parallax?: boolean;
  animation?: {
    initial?: boolean | TargetAndTransition | VariantLabels;
    whileInView?: TargetAndTransition | VariantLabels;
    viewport?: { once?: boolean; margin?: string };
  };
}

export default function DoodleSection({
  children,
  bgImage,
  divider = true,
  className = '',
  bgPosition = 'center',
  blendMode = 'normal',
  bgOpacity = 1,
  parallax = false,
  animation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
}: DoodleSectionProps) {
  return (
    <motion.section
      initial={animation.initial}
      whileInView={animation.whileInView}
      viewport={animation.viewport}
      className={`relative overflow-hidden ${className}`}
    >
      {/* 1) Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-no-repeat ${parallax ? 'bg-fixed' : ''}`}
        style={{
          backgroundImage: `url("${bgImage}")`,
          backgroundPosition: bgPosition,
          opacity: bgOpacity,
          mixBlendMode: blendMode,
        }}
      />

      {/* 2) Scatter doodles layer (client-only now) */}
      <div className="absolute inset-0 pointer-events-none">
        <ScatterDoodles />
      </div>

      {/* 3) Content */}
      <div className="relative z-10">{children}</div>

      {/* 4) Divider */}
      {divider && (
        <div className="absolute bottom-0 left-0 w-full h-16 opacity-20 pointer-events-none">
          <Image
            src="/images/scribble-divider.svg"
            alt="Divider"
            fill
            sizes="100vw"
            className="object-cover object-left-top"
            priority={false}
          />
        </div>
      )}
    </motion.section>
  );
}
