'use client';

import { motion } from 'framer-motion';

interface EducationCardProps {
  item: {
    id: number;
    degree: string;
    institution: string;
    period: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  };
  index: number;
  playfulMode?: boolean;
}

export function EducationCard({ item, index, playfulMode = false }: EducationCardProps) {
  return (
    <motion.div
      className={`p-6 rounded-xl border-2 ${
        playfulMode
          ? 'border-green-500 bg-white shadow-[4px_4px_0_0_rgba(59,130,246,0.3)] hover:shadow-[8px_8px_0_0_rgba(245,158,11,0.5)]'
          : 'border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]'
      } transition-all`}
      whileHover={{ y: -5 }}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className={`${playfulMode ? item.color : 'bg-gray-100'} w-12 h-12 rounded-full flex items-center justify-center text-xl text-gray-800`}>
          {item.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`text-lg font-bold mb-1 ${
            playfulMode ? 'text-blue-600' : 'text-gray-900'
          }`}>
            {item.degree}
          </h3>
          <p className="text-sm font-medium text-gray-600 mb-2">
            {item.institution} • {item.period}
          </p>
          <p className={`text-sm ${
            playfulMode ? 'text-gray-800 font-medium' : 'text-gray-600'
          }`}>
            {item.description}
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      {playfulMode && (
        <div className="absolute top-2 right-2 text-xs font-bold px-2 py-1 bg-yellow-400 rounded-full">
          #{index + 1}
        </div>
      )}
    </motion.div>
  );
}
