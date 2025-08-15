'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CompanyLogoProps {
  logo: string;
  company: string;
  side: 'left' | 'right';
  delay?: number;
  memeMode?: boolean; // Add this to the interface
}

export function CompanyLogo({ logo, company, side, delay = 0, memeMode = false }: CompanyLogoProps) {
  return (
    <motion.div
      className={`hidden md:block absolute ${
        side === 'left' ? 'right-full mr-12' : 'left-full ml-12'
      } top-4 w-16 h-16 rounded-full bg-white ${
        memeMode ? 'border-2 border-green-500' : 'border-2 border-black'
      } p-2 shadow-lg`}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, rotate: memeMode ? 20 : 10 }}
    >
      <Image
        src={logo}
        alt={`${company} logo`}
        width={64}
        height={64}
        className="object-contain w-full h-full"
      />
      {memeMode && (
        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold">
          !
        </div>
      )}
    </motion.div>
  );
}
