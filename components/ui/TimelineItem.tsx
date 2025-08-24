'use client';

import { motion } from 'framer-motion';
import { FaFire, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

interface TimelineItemProps {
  experience: {
    role: string;
    period: string;
    company: string;
    highlights: string[];
    tags: string[];
  };
  alignment: 'left' | 'right';
  playfulMode?: boolean;
}

export function TimelineItem({ experience, alignment, playfulMode = false }: TimelineItemProps) {
  return (
    <div
      className={`relative group ${
        alignment === 'left' ? 'md:text-right md:mr-12' : 'md:text-left md:ml-12'
      }`}
    >
      {/* Timeline dot (distinct meme vs normal hover) */}
      <div
        className={`absolute top-6 ${
          alignment === 'left' ? 'md:-right-6' : 'md:-left-6'
        } w-5 h-5 rounded-full border-3 border-white shadow-lg z-10 ${
          playfulMode
            ? 'bg-green-500 group-hover:bg-blue-500'
            : 'bg-gray-800 group-hover:bg-gray-900 ring-2 ring-gray-100'
        }`}
      />

      {/* Content card */}
      <motion.div
        className={`p-8 rounded-xl transition-all duration-300 ${
          playfulMode
            ? [
                'border-green-500 bg-white border-2',
                'shadow-[4px_4px_0_0_rgba(59,130,246,0.5)]',
                'hover:border-blue-500',
                'hover:bg-gradient-to-br hover:from-green-50 hover:to-blue-50',
                'hover:shadow-[8px_8px_0_0_rgba(245,158,11,1)]',
              ].join(' ')
            : [
                'bg-white border border-gray-200',
                'shadow-lg shadow-gray-100',
                'hover:border-gray-300',
                'hover:shadow-xl hover:shadow-gray-200',
              ].join(' ')
        }`}
        whileHover={{ y: playfulMode ? -5 : -2 }}
      >
        <div className="mb-6">
          <h3
            className={`text-2xl font-semibold mb-3 leading-tight ${
              playfulMode
                ? 'text-blue-600 group-hover:text-blue-700'
                : 'text-gray-900 group-hover:text-black'
            }`}
          >
            {experience.role}
          </h3>
          
          {!playfulMode && experience.company && (
            <div className="flex items-center gap-2 mb-2">
              <FaBuilding className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium">{experience.company}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <FaCalendarAlt className={`w-4 h-4 ${
              playfulMode ? 'text-blue-500' : 'text-gray-500'
            }`} />
            <p className={`text-sm font-medium ${
              playfulMode ? 'text-blue-500 tracking-wide uppercase' : 'text-gray-600'
            }`}>
              {experience.period}
            </p>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-3 mt-1.5">
                {playfulMode ? (
                  <FaFire className="w-3 h-3 text-orange-500" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                )}
              </span>
              <span className={`leading-relaxed ${
                playfulMode ? 'font-medium' : 'text-gray-700'
              }`}>
                {highlight}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                playfulMode
                  ? 'bg-blue-100 text-blue-800 hover:bg-green-100 hover:text-green-800'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900'
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
