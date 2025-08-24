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
}

export function ProjectCard({ project, isHovered, playfulMode = false }: ProjectCardProps) {
  const { isPlayfulMode } = usePlayfulMode();
  const activeMemeMode = playfulMode || isPlayfulMode;

  return (
    <motion.div
      className={`relative group overflow-hidden rounded-xl border-2 ${
        activeMemeMode
          ? 'border-green-500 shadow-[4px_4px_0_0_rgba(59,130,246,0.5)]'
          : 'border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]'
      } ${
        project.featured ? 'md:col-span-2' : ''
      }`}
      whileHover={{
        y: -5,
        boxShadow: activeMemeMode
          ? "8px 8px 0 rgba(245, 158, 11, 0.7)"
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
            ? 'bg-gradient-to-t from-green-900/60 via-blue-900/30 to-transparent'
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
                  ? 'bg-blue-100/20 backdrop-blur-sm text-blue-100'
                  : 'bg-white/20 backdrop-blur-sm text-white'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className={`text-xl font-bold mb-2 ${
          activeMemeMode ? 'text-yellow-300' : ''
        }`}>
          {project.title}
        </h3>
        <p className={`text-sm mb-4 ${
          activeMemeMode ? 'text-blue-100' : 'text-gray-200'
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
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
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
            ? 'bg-yellow-400 text-black'
            : 'bg-gray-900 text-white'
        }`}>
          {activeMemeMode ? 'BUGGY' : 'Featured'}
        </div>
      )}

      {/* Hover overlay */}
      <div className={`absolute inset-0 ${
        activeMemeMode
          ? 'bg-gradient-to-t from-green-900/80 via-blue-900/40 to-transparent'
          : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity`} />
    </motion.div>
  );
}
