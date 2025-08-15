// components/ui/SkillBubble.tsx
'use client';

import { motion } from 'framer-motion';
import { JSX } from 'react';

interface SkillBubbleProps {
  name: string;
  icon: JSX.Element;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: number;
  memeMode?: boolean;
}

export function SkillBubble({
  name,
  icon,
  top,
  bottom,
  left,
  right,
  delay = 0,
  memeMode = false
}: SkillBubbleProps) {
  return (
    <motion.div
      className={`absolute ${top ? `top-[${top}]` : ''} ${bottom ? `bottom-[${bottom}]` : ''} ${
        left ? `left-[${left}]` : ''
      } ${right ? `right-[${right}]` : ''} flex flex-col items-center justify-center`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.2 }}
    >
      <div className={`w-16 h-16 rounded-full ${memeMode ? 'bg-yellow-100' : 'bg-white'} border-2 ${
        memeMode ? 'border-blue-500' : 'border-black'
      } flex items-center justify-center text-2xl shadow-lg`}>
        {icon}
      </div>
      <motion.span
        className={`mt-2 text-xs font-bold px-2 py-1 rounded-full ${
          memeMode ? 'bg-blue-500 text-white' : 'bg-black text-white'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.3, duration: 0.3 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
