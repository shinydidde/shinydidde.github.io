// app/components/ProjectsSection.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import DoodleSection from './DoodleSection';
import type { ProjectsListData } from '../lib/firestoreService';

interface ProjectsSectionProps {
  data: ProjectsListData;
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120 },
    },
  };

  return (
    <DoodleSection bgImage="/images/projects-bg.avif">
      {/* Header */}
      <motion.div
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={container}
        className="text-center max-w-4xl mx-auto mb-16 px-4"
      >
        <motion.h2 variants={item} className="text-4xl font-sketch text-teal mb-2">
          {data.title}
        </motion.h2>
        <motion.div
          variants={item}
          className="mx-auto mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-magenta to-lime"
        />
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
      >
        {data.items.map((proj, idx) => (
          <motion.a
            key={proj.title}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            whileHover={{
              scale: 1.03,
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              type: 'tween',
              duration: 0.5,
              ease: 'easeInOut'
            }}
            className="
              relative flex flex-col rounded-2xl overflow-hidden
              border-2 border-dashed border-magenta/60
              bg-paper/60 backdrop-blur-xs
              transition-transform duration-300
            "
          >
            {/* image */}
            <div className="relative h-48 w-full">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={idx < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* text */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h3 className="text-xl font-semibold text-teal mb-2">{proj.title}</h3>
              <p className="text-gray-700 flex-grow">{proj.description}</p>
              <span className="mt-4 inline-block text-sm font-sketch text-magenta">
                View Live →
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </DoodleSection>
  );
}
