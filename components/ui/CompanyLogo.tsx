'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CompanyLogoProps {
  logo: string;
  company: string;
  side: 'left' | 'right';
  delay?: number;
  playfulMode?: boolean; // Add this to the interface
}

export function CompanyLogo({ logo, company, side, delay = 0, playfulMode = false }: CompanyLogoProps) {
  return (
    <motion.div
      className={`block absolute ${
        side === 'left'
          ? 'left-1/2 -translate-x-1/2 md:right-full md:left-auto md:mr-12 md:translate-x-0'
          : 'left-1/2 -translate-x-1/2 md:left-full md:right-auto md:ml-12 md:translate-x-0'
      } -bottom-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto w-16 h-16 md:w-32 md:h-32 rounded-full bg-white ${
        playfulMode ? 'border-2 border-green-500' : 'border-2 border-black'
      } p-2 shadow-lg`}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, rotate: playfulMode ? 20 : 10 }}
    >
      <Image
        src={logo}
        alt={`${company} logo`}
        width={128}
        height={128}
        className="object-contain object-top w-full h-full rounded-full"
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
      />
      {playfulMode && (
        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold">
          !
        </div>
      )}
    </motion.div>
  );
}
