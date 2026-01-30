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
  github: 'bg-gradient-to-r from-vibrant-red to-vibrant-yellow hover:from-vibrant-red hover:to-vibrant-orange',
  linkedin: 'bg-gradient-to-r from-vibrant-cyan to-vibrant-blue hover:from-vibrant-blue hover:to-vibrant-cyan',
  twitter: 'bg-gradient-to-r from-vibrant-pink to-vibrant-purple hover:from-vibrant-purple hover:to-vibrant-pink',
  instagram: 'bg-gradient-to-r from-vibrant-yellow to-vibrant-orange hover:from-vibrant-orange hover:to-vibrant-red',
};

const MEME_TOOLTIPS = {
  github: "My Lair of Code",
  linkedin: "Professional Meme Lord",
  twitter: "Hot Takes Inc",
  instagram: "Filtered Reality"
};

const GOLD_STYLE = 'bg-transparent border-2 border-gold text-gold hover:bg-gold/30 hover:border-gold';
const GRAYSCALE_STYLE = 'bg-transparent border-2 border-gray-800 text-gray-900 hover:bg-gray-100 hover:border-black';

export function SocialIcon({ platform, url, playfulMode: propMemeMode }: SocialIconProps) {
  const { isPlayfulMode: contextMemeMode, isGoldMode, isGrayscaleMode } = usePlayfulMode();
  const isPlayfulMode = propMemeMode ?? contextMemeMode;
  const useGold = isGoldMode && !isPlayfulMode;
  const useGrayscale = isGrayscaleMode && !isPlayfulMode;

  const icons = isPlayfulMode ? MEME_ICONS : NORMAL_ICONS;
  const colors = useGold
    ? { github: GOLD_STYLE, linkedin: GOLD_STYLE, twitter: GOLD_STYLE, instagram: GOLD_STYLE }
    : useGrayscale
      ? { github: GRAYSCALE_STYLE, linkedin: GRAYSCALE_STYLE, twitter: GRAYSCALE_STYLE, instagram: GRAYSCALE_STYLE }
      : (isPlayfulMode ? MEME_COLORS : NORMAL_COLORS);

  return (
    <motion.div
      className="relative"
      whileHover={isPlayfulMode ? { scale: 1.1 } : {}}
    >
      {isPlayfulMode && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs font-bold bg-vibrant-yellow text-black rounded-full shadow-lg"
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
          ${useGold ? 'text-2xl' : useGrayscale ? 'text-2xl text-black' : 'text-white text-2xl'}
          flex items-center justify-center shadow-md
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
