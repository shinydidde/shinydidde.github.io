// components/ui/Sticker.tsx
'use client';

import { motion } from 'framer-motion';

interface StickerProps {
  emoji: string;
  text: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  rotate?: number;
  memeMode?: boolean;
}

export function Sticker({ emoji, text, position, rotate = 0, memeMode = false }: StickerProps) {
  const positionClasses = {
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} px-4 py-2 rounded-full border-2 shadow-md flex items-center gap-2 z-20 ${
        memeMode
          ? 'bg-yellow-100 border-red-500 text-red-600'
          : 'bg-white border-black text-black'
      }`}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      whileHover={{ scale: 1.1, rotate: rotate + 5 }}
    >
      <span className="text-xl">{emoji}</span>
      <span className="font-bold text-sm">{text}</span>
    </motion.div>
  );
}
