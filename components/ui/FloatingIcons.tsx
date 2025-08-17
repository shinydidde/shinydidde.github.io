// components/ui/FloatingIcons.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactElement, useEffect, useState } from 'react';
import {
  FaReact, FaCode, FaRocket, FaPalette, FaBolt, FaTools, FaBrain,
  FaGamepad, FaMobile, FaDesktop, FaLaughSquint, FaBug,
  FaStackOverflow, FaTerminal, FaCoffee
} from 'react-icons/fa';

type FloatingIcon = {
  id: number;
  icon: ReactElement;
  style: {
    top: string;
    left: string;
    fontSize: string;
    rotate: number;
  };
  // per-icon animation params (avoid recomputing on every render)
  duration: number;
  amplitude: number;
  delay: number;
};

interface FloatingIconsProps {
  count?: number;
  memeMode?: boolean;
}

// Normal mode icons
const NORMAL_ICONS = [
  { icon: <FaReact key="react" className="text-blue-500" /> },
  { icon: <FaCode key="code" className="text-gray-700" /> },
  { icon: <FaRocket key="rocket" className="text-purple-500" /> },
  { icon: <FaPalette key="palette" className="text-pink-500" /> },
  { icon: <FaBolt key="bolt" className="text-yellow-500" /> },
  { icon: <FaTools key="tools" className="text-gray-600" /> },
  { icon: <FaBrain key="brain" className="text-indigo-500" /> },
  { icon: <FaGamepad key="gamepad" className="text-green-500" /> },
  { icon: <FaMobile key="mobile" className="text-blue-400" /> },
  { icon: <FaDesktop key="desktop" className="text-gray-800" /> }
];

// Meme mode icons
const MEME_ICONS = [
  { icon: <FaLaughSquint key="laugh" className="text-red-500" /> },
  { icon: <FaBug key="bug" className="text-green-600" /> },
  { icon: <FaStackOverflow key="stack" className="text-orange-500" /> },
  { icon: <FaTerminal key="terminal" className="text-blue-600" /> },
  { icon: <FaCoffee key="coffee" className="text-amber-800" /> }, // brown isn't a Tailwind default
  { icon: <FaCode key="code" className="text-purple-600" /> },
  { icon: <FaBolt key="bolt" className="text-yellow-400" /> },
  { icon: <FaGamepad key="gamepad" className="text-pink-500" /> }
];

export function FloatingIcons({ count = 10, memeMode = false }: FloatingIconsProps) {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const iconSet = memeMode ? MEME_ICONS : NORMAL_ICONS;
    const newIcons: FloatingIcon[] = Array.from({ length: count }, (_, i) => {
      const { icon } = iconSet[Math.floor(Math.random() * iconSet.length)];
      const rotateStart = Math.random() * 360;
      return {
        id: i,
        icon,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 20 + 10}px`,
          rotate: rotateStart
        },
        duration: Math.random() * 8 + 6, // 6–14s
        amplitude: Math.random() * 40 + 20, // 20–60px
        delay: Math.random() * 2 // 0–2s
      };
    });
    setIcons(newIcons);
  }, [count, memeMode]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ id, icon, style, duration, amplitude, delay }) => (
        <motion.div
          key={`floating-icon-${id}`}
          className="absolute"
          style={style}
          animate={{
            y: [0, -amplitude, 0],
            opacity: [0.7, 1, 0.7],
            rotate: [style.rotate, style.rotate + 20, style.rotate]
          }}
          transition={{
            type: 'tween',         // <-- force tween so 3+ keyframes work
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}
