// app/components/ExperienceSection.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'

interface TimelineItem {
  year: string            // e.g. "Oct '24 – Present"
  title: string           // HTML string, e.g. "<h3>Senior Lead</h3> QuestDot"
  content: string         // HTML string, e.g. "<ul>…</ul>"
}

interface ExperienceProps {
  data: {
    title: string
    description?: string
    timeline: TimelineItem[]
  }
}

export default function ExperienceSection({ data }: ExperienceProps) {
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
      id="experience"
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

      {/* Timeline Items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Vertical Line (desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2" />

        {data.timeline.map((timelineItem, idx) => (
          <motion.div
            key={`timeline-${idx}`}
            variants={itemVariants}
            className={`relative mb-12 ${idx % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
          >
            <div className={`flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Timeline Dot */}
              <div className="hidden md:flex absolute left-1/2 top-4 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2 z-10" />

              {/* Year */}
              <div className={`md:w-1/2 p-4 ${idx % 2 === 0 ? 'md:text-right md:pl-8' : 'md:text-left md:pr-8'}`}>
                <motion.div
                  whileHover={{ x: idx % 2 === 0 ? -5 : 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow">
                    {timelineItem.year}
                  </span>
                </motion.div>
              </div>

              {/* Content Card */}
              <div className="md:w-1/2 p-4">
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div
                    className="mb-4 text-gray-900 text-lg font-semibold"
                    dangerouslySetInnerHTML={{ __html: timelineItem.title }}
                  />
                  <div
                    className="prose prose-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: timelineItem.content }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
