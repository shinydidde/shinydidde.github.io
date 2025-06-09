// app/components/EducationSection.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'

interface EducationItem {
  year: string             // e.g. "Jan '24 - Jan '25"
  title: string            // e.g. "Masters - Information Systems with Computing"
  content: string          // e.g. "Dublin Business School"
  desc: string             // e.g. "74% First Class Honours"
}

interface EducationProps {
  data: {
    title: string
    description?: string
    education: EducationItem[]
  }
}

export default function EducationSection({ data }: EducationProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
      id="education"
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
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
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

      {/* Education Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {data.education.map((eduItem, idx) => (
          <motion.div
            key={`edu-${idx}`}
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{eduItem.title}</h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                  {eduItem.year}
                </span>
              </div>
              <p className="text-blue-600 font-medium mb-2">{eduItem.content}</p>
              <p className="text-gray-700">{eduItem.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
