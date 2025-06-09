// app/components/FooterSection.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
import { SocialLink } from '../lib/firestoreService'

interface FooterProps {
  personalInfo: {
    name: string
    email?: string
    socialLinks?: SocialLink[]
    resume?: string
    logoUrl: string
  }
}

export default function FooterSection({ personalInfo }: FooterProps) {
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
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <motion.div variants={itemVariants} className="flex items-center mb-6 md:mb-0">
            {personalInfo.logoUrl && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
                <Image
                  src={personalInfo.logoUrl}
                  alt="Logo"
                  fill
                  sizes="40px"
                />
              </div>
            )}
            <p className="text-sm">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
          </motion.div>

          {/* Contact & Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-sm hover:text-white transition"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email
              </a>
            )}

            {personalInfo.socialLinks?.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:text-white transition"
              >
                <div className="relative w-4 h-4 mr-2">
                  <Image
                    src={link.icon}
                    alt={link.name}
                    fill
                    sizes="16px"
                  />
                </div>
                {link.name}
              </a>
            ))}

            {personalInfo.resume && (
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:text-white transition"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 00-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Resume
              </a>
            )}
          </motion.div>
        </div>

        {/* Back to Top */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center text-sm text-gray-500 hover:text-white transition"
          >
            Back to top
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </motion.footer>
  )
}
