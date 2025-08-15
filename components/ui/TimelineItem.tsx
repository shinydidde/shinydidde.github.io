'use client';

import { motion } from 'framer-motion';

interface TimelineItemProps {
  experience: {
    role: string;
    period: string;
    company: string;
    highlights: string[];
    tags: string[];
  };
  alignment: 'left' | 'right';
  memeMode?: boolean;
}

export function TimelineItem({ experience, alignment, memeMode = false }: TimelineItemProps) {
  return (
    <div
      className={`relative group ${
        alignment === 'left' ? 'md:text-right md:mr-12' : 'md:text-left md:ml-12'
      }`}
    >
      {/* Timeline dot (distinct meme vs normal hover) */}
      <div
        className={`absolute top-4 ${
          alignment === 'left' ? 'md:-right-6' : 'md:-left-6'
        } w-4 h-4 rounded-full border-2 border-white shadow-lg ${
          memeMode
            ? 'bg-green-500 group-hover:bg-blue-500'
            : 'bg-pink-500 group-hover:bg-purple-600'
        }`}
      />

      {/* Content card */}
      <motion.div
        className={`p-6 rounded-lg border-2 transition-all ${
          memeMode
            ? [
                'border-green-500 bg-white',
                'shadow-[4px_4px_0_0_rgba(59,130,246,0.5)]',
                'hover:border-blue-500',
                'hover:bg-gradient-to-br hover:from-green-50 hover:to-blue-50',
                'hover:shadow-[8px_8px_0_0_rgba(245,158,11,1)]',
              ].join(' ')
            : [
                'border-black bg-white',
                'shadow-[4px_4px_0_0_rgba(0,0,0,1)]',
                'hover:border-fuchsia-600',
                'hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50',
                'hover:shadow-[8px_8px_0_0_rgba(168,85,247,1)]',
              ].join(' ')
        }`}
        whileHover={{ y: -5 }}
      >
        <h3
          className={`text-xl font-bold mb-1 ${
            memeMode
              ? 'text-blue-600 group-hover:text-blue-700'
              : 'group-hover:text-fuchsia-700'
          }`}
        >
          {experience.role}
        </h3>

        <p className={`${memeMode ? 'text-blue-500' : 'text-gray-600'} mb-4`}>
          {experience.period}
        </p>

        <ul className="space-y-2 mb-4">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2">{memeMode ? '🔥' : '✨'}</span>
              <span className={memeMode ? 'font-medium' : ''}>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                memeMode
                  ? 'bg-blue-100 text-blue-800 hover:bg-green-100 hover:text-green-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-pink-100 hover:text-fuchsia-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
