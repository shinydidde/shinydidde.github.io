// components/ui/FloatingIcons.tsx
'use client';

import { motion } from 'framer-motion';
import { JSX, useEffect, useState } from 'react';
import {
  FaReact,
  FaCode,
  FaRocket,
  FaPalette,
  FaBolt,
  FaTools,
  FaBrain,
  FaGamepad,
  FaMobile,
  FaDesktop,
  FaLaughSquint,
  FaBug,
  FaStackOverflow,
  FaTerminal,
  FaCoffee
} from 'react-icons/fa';

interface FloatingIcon {
  id: number;
  icon: JSX.Element;
  style: {
    top: string;
    left: string;
    fontSize: string;
    rotate: number;
  };
}

interface FloatingIconsProps {
  count?: number;
  memeMode?: boolean;
}

// Normal mode icons
const NORMAL_ICONS = [
  { icon: <FaReact key="react" className="text-blue-500" />, name: "react" },
  { icon: <FaCode key="code" className="text-gray-700" />, name: "code" },
  { icon: <FaRocket key="rocket" className="text-purple-500" />, name: "rocket" },
  { icon: <FaPalette key="palette" className="text-pink-500" />, name: "palette" },
  { icon: <FaBolt key="bolt" className="text-yellow-500" />, name: "bolt" },
  { icon: <FaTools key="tools" className="text-gray-600" />, name: "tools" },
  { icon: <FaBrain key="brain" className="text-indigo-500" />, name: "brain" },
  { icon: <FaGamepad key="gamepad" className="text-green-500" />, name: "gamepad" },
  { icon: <FaMobile key="mobile" className="text-blue-400" />, name: "mobile" },
  { icon: <FaDesktop key="desktop" className="text-gray-800" />, name: "desktop" }
];

// Meme mode icons
const MEME_ICONS = [
  { icon: <FaLaughSquint key="laugh" className="text-red-500" />, name: "laugh" },
  { icon: <FaBug key="bug" className="text-green-600" />, name: "bug" },
  { icon: <FaStackOverflow key="stack" className="text-orange-500" />, name: "stack" },
  { icon: <FaTerminal key="terminal" className="text-blue-600" />, name: "terminal" },
  { icon: <FaCoffee key="coffee" className="text-brown-500" />, name: "coffee" },
  { icon: <FaCode key="code" className="text-purple-600" />, name: "code" },
  { icon: <FaBolt key="bolt" className="text-yellow-400" />, name: "bolt" },
  { icon: <FaGamepad key="gamepad" className="text-pink-500" />, name: "gamepad" }
];

export function FloatingIcons({ count = 10, memeMode = false }: FloatingIconsProps) {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const iconSet = memeMode ? MEME_ICONS : NORMAL_ICONS;
    const newIcons = Array.from({ length: count }, (_, i) => {
      const randomIcon = iconSet[Math.floor(Math.random() * iconSet.length)];
      return {
        id: i,
        icon: randomIcon.icon,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 20 + 10}px`,
          rotate: Math.random() * 360,
        },
      };
    });
    setIcons(newIcons);
  }, [count, memeMode]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ id, icon, style }) => (
        <motion.div
          key={`floating-icon-${id}`}
          className="absolute"
          style={style}
          animate={{
            y: [0, -50, 0],
            opacity: [0.8, 1, 0.8],
            rotate: [style.rotate, style.rotate + 20],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}
