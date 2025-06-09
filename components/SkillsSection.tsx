// app/components/SkillsSection.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

interface SkillsProps {
  data: {
    title: string
    description?: string
    logos: string[]
  }
}

export default function SkillsSection({ data }: SkillsProps) {
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
      id="skills"
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

      {/* Logos Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6"
      >
        {data.logos.map((logoUrl, idx) => (
          <motion.div
            key={`logo-${idx}`}
            variants={itemVariants}
            className="flex items-center justify-center bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="relative w-12 h-12">
              <Image
                src={logoUrl}
                alt={`Skill ${idx + 1}`}
                fill
                sizes="48px"
                className="object-contain"
                priority={idx < 7} // prioritize first row
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
