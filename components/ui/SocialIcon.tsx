'use client';

import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaDragon,
  FaGamepad,
  FaFire,
  FaSpaceShuttle
} from 'react-icons/fa';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

interface SocialIconProps {
  platform: 'github' | 'linkedin' | 'twitter' | 'instagram';
  url: string;
  playfulMode?: boolean;
}

const NORMAL_ICONS = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  instagram: <FaInstagram />,
};

const MEME_ICONS = {
  github: <FaDragon />,          // Because coding feels like taming dragons
  linkedin: <FaSpaceShuttle />,  // For "launching" your career
  twitter: <FaFire />,           // Hot takes = fire emoji
  instagram: <FaGamepad />,      // Because life's a game
};

const NORMAL_COLORS = {
  github: 'bg-gray-800 hover:bg-gray-700',
  linkedin: 'bg-blue-600 hover:bg-blue-500',
  twitter: 'bg-sky-400 hover:bg-sky-300',
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400',
};

const MEME_COLORS = {
  github: 'bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600',
  linkedin: 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600',
  twitter: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
  instagram: 'bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600',
};

const MEME_TOOLTIPS = {
  github: "My Lair of Code",
  linkedin: "Professional Meme Lord",
  twitter: "Hot Takes Inc",
  instagram: "Filtered Reality"
};

export function SocialIcon({ platform, url, playfulMode: propMemeMode }: SocialIconProps) {
  const { isPlayfulMode: contextMemeMode } = usePlayfulMode();
  const isPlayfulMode = propMemeMode ?? contextMemeMode;

  const icons = isPlayfulMode ? MEME_ICONS : NORMAL_ICONS;
  const colors = isPlayfulMode ? MEME_COLORS : NORMAL_COLORS;

  return (
    <motion.div
      className="relative"
      whileHover={isPlayfulMode ? { scale: 1.1 } : {}}
    >
      {isPlayfulMode && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs font-bold bg-yellow-400 text-black rounded-full shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          style={{ pointerEvents: 'none' }}
        >
          {MEME_TOOLTIPS[platform]}
        </motion.div>
      )}

      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          w-12 h-12 rounded-full
          ${colors[platform]}
          text-white text-2xl flex items-center justify-center shadow-md
          ${isPlayfulMode ? 'border-2 border-black' : ''}
          relative z-10
        `}
        whileHover={{
          y: isPlayfulMode ? -8 : -4,
          scale: isPlayfulMode ? 1.2 : 1.1,
          rotate: isPlayfulMode ? [0, 10, -10, 0] : 0
        }}
        whileTap={{
          scale: 0.9,
          rotate: isPlayfulMode ? 360 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: isPlayfulMode ? 300 : 500,
          damping: isPlayfulMode ? 10 : 15
        }}
      >
        {icons[platform]}
        {isPlayfulMode && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white opacity-0"
            whileHover={{
              opacity: 0.3,
              scale: 1.3
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.a>
    </motion.div>
  );
}
