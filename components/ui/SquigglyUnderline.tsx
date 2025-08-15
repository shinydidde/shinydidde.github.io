// components/ui/SquigglyUnderline.tsx
'use client';

import { motion } from 'framer-motion';

interface SquigglyUnderlineProps {
  color?: string;
}

export function SquigglyUnderline({ color = 'currentColor' }: SquigglyUnderlineProps) {
  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-full h-2"
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <path
        d="M0,8 C50,3 50,13 100,8 C150,3 150,13 200,8"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
