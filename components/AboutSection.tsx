// app/components/AboutSection.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import DoodleSection from './DoodleSection'
import type { AboutData } from '../lib/firestoreService'

interface AboutSectionProps {
  data: AboutData
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { illustration, title, subtitle, bio } = data

  // subtle float + scale on hover for the inner panel
  const hoverAnim: Variants = {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -4,
      scale: 1.02,
      transition: { type: 'spring', stiffness: 180, damping: 12 }
    }
  }

  return (
    <DoodleSection
      bgImage={illustration}
      divider={true}
      className="pt-0 pb-20 -mt-16"
      bgPosition="top center"
    >
      {/* Centered panel */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={hoverAnim}
        className="
          max-w-4xl mx-auto px-4 py-12
          bg-paper/60 backdrop-blur-xs
          border-2 border-dashed border-magenta/70
          rounded-2xl
        "
      >
        <h2 className="text-4xl font-sketch text-teal mb-2">{title}</h2>
        <p className="text-xl text-magenta italic mb-6">{subtitle}</p>
        <div
          className="prose prose-lg text-gray-800 mx-auto"
          dangerouslySetInnerHTML={{ __html: bio }}
        />
      </motion.div>
    </DoodleSection>
  )
}
