'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    featured?: boolean;
  };
  isHovered?: boolean;
  playfulMode?: boolean;
  index?: number;
}

export function ProjectCard({ project, isHovered, playfulMode = false, index = 0 }: ProjectCardProps) {
  const { isPlayfulMode } = usePlayfulMode();
  const activeMemeMode = playfulMode || isPlayfulMode;

  // Define different colors for each card
  const cardColors = [
    { border: 'border-vibrant-pink', overlay: 'bg-vibrant-pink/20', hover: 'bg-vibrant-pink/40', tag: 'bg-vibrant-pink/20 text-vibrant-pink', title: 'text-vibrant-pink', button: 'bg-vibrant-pink text-black hover:bg-vibrant-pink/80' },
    { border: 'border-vibrant-cyan', overlay: 'bg-vibrant-cyan/20', hover: 'bg-vibrant-cyan/40', tag: 'bg-vibrant-cyan/20 text-vibrant-cyan', title: 'text-vibrant-cyan', button: 'bg-vibrant-cyan text-black hover:bg-vibrant-cyan/80' },
    { border: 'border-vibrant-green', overlay: 'bg-vibrant-green/20', hover: 'bg-vibrant-green/40', tag: 'bg-vibrant-green/20 text-vibrant-green', title: 'text-vibrant-green', button: 'bg-vibrant-green text-black hover:bg-vibrant-green/80' },
    { border: 'border-vibrant-yellow', overlay: 'bg-vibrant-yellow/20', hover: 'bg-vibrant-yellow/40', tag: 'bg-vibrant-yellow/20 text-vibrant-yellow', title: 'text-vibrant-yellow', button: 'bg-vibrant-yellow text-black hover:bg-vibrant-yellow/80' },
    { border: 'border-vibrant-orange', overlay: 'bg-vibrant-orange/20', hover: 'bg-vibrant-orange/40', tag: 'bg-vibrant-orange/20 text-vibrant-orange', title: 'text-vibrant-orange', button: 'bg-vibrant-orange text-black hover:bg-vibrant-orange/80' },
    { border: 'border-vibrant-red', overlay: 'bg-vibrant-red/20', hover: 'bg-vibrant-red/40', tag: 'bg-vibrant-red/20 text-vibrant-red', title: 'text-vibrant-red', button: 'bg-vibrant-red text-black hover:bg-vibrant-red/80' },
    { border: 'border-vibrant-purple', overlay: 'bg-vibrant-purple/20', hover: 'bg-vibrant-purple/40', tag: 'bg-vibrant-purple/20 text-vibrant-purple', title: 'text-vibrant-purple', button: 'bg-vibrant-purple text-black hover:bg-vibrant-purple/80' },
    { border: 'border-vibrant-blue', overlay: 'bg-vibrant-blue/20', hover: 'bg-vibrant-blue/40', tag: 'bg-vibrant-blue/20 text-vibrant-blue', title: 'text-vibrant-blue', button: 'bg-vibrant-blue text-black hover:bg-vibrant-blue/80' }
  ];

  const colors = cardColors[index % cardColors.length];

  return (
    <motion.div
      className={`relative group overflow-hidden rounded-xl border-2 ${
        activeMemeMode
          ? colors.border
          : 'border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]'
      } ${
        project.featured ? 'md:col-span-2' : ''
      }`}
      whileHover={{
        y: -5,
        boxShadow: activeMemeMode
          ? "8px 8px 0 rgba(0, 0, 0, 0.1)"
          : "8px 8px 0 rgba(0, 0, 0, 0.3)"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Project image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
            activeMemeMode ? 'grayscale-[20%]' : ''
          }`}
        />
        <div className={`absolute inset-0 ${
          activeMemeMode
            ? colors.overlay
            : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent'
        }`} />
      </div>

      {/* Project info */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 ${
        activeMemeMode ? 'text-white' : 'text-white'
      }`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeMemeMode
                  ? `${colors.tag} backdrop-blur-sm`
                  : 'bg-white/20 backdrop-blur-sm text-white'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className={`text-xl font-bold mb-2 ${
          activeMemeMode ? colors.title : ''
        }`}>
          {project.title}
        </h3>
        <p className={`text-sm mb-4 ${
          activeMemeMode ? 'text-vibrant-yellow' : 'text-gray-200'
        }`}>
          {project.description}
        </p>

        {/* View project button */}
        <motion.div
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              activeMemeMode
                ? colors.button
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {activeMemeMode ? 'View Chaos' : 'View Project'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
          activeMemeMode
            ? 'bg-vibrant-yellow text-black'
            : 'bg-gray-900 text-white'
        }`}>
          {activeMemeMode ? 'BUGGY' : 'Featured'}
        </div>
      )}

      {/* Hover overlay */}
      <div className={`absolute inset-0 ${
        activeMemeMode
          ? colors.hover
          : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity`} />
    </motion.div>
  );
}
