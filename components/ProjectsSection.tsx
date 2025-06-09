// app/components/ProjectsSection.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

interface Project {
  img: string
  desc: string
  url: string
}

interface ProjectsProps {
  data: {
    title: string
    projects: Project[]
    description?: string
  }
}

export default function ProjectsSection({ data }: ProjectsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          {data.title}
        </motion.h2>
        <motion.div
          variants={itemVariants}
          className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 rounded-full"
        />
        {data.description && (
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {data.description}
          </motion.p>
        )}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {data.projects.map((project, idx) => (
          <motion.a
            key={`proj-${idx}`}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="relative h-48 w-full">
              <Image
                src={project.img}
                alt={project.desc}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-110"
                priority={idx < 3} // prerender first row for LCP
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="bg-white p-6">
              <p className="text-gray-700 text-base">{project.desc}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  )
}
