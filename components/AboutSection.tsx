// app/components/AboutSection.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'

interface AboutProps {
  personalInfo: {
    title: string
    subtitle: string
    description: string
  }
}

export default function AboutSection({ personalInfo }: AboutProps) {
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
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          {/* Image Side with Layered Blur Boxes */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center"
          >
            <div className="relative w-full h-64 md:h-full">
              <motion.div
                className="absolute inset-0 bg-blue-500 rounded-2xl shadow-lg"
                initial={{ x: -50, y: -50, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="absolute inset-0 bg-purple-500 rounded-2xl shadow-lg"
                initial={{ x: 50, y: 50, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.div
                className="relative h-full w-full bg-white rounded-2xl shadow-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20" />
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">
                      About Me
                    </h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div variants={itemVariants} className="p-8 md:p-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {personalInfo.title}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-4 rounded-full" />
              <h3 className="text-xl text-gray-600 mb-6">
                {personalInfo.subtitle}
              </h3>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="prose prose-lg text-gray-700 max-w-none"
              dangerouslySetInnerHTML={{ __html: personalInfo.description }}
            />

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#experience"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:shadow-md transition"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                My Experience
              </motion.a>
              <motion.a
                href="#projects"
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg shadow hover:shadow-md transition"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
