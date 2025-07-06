// components/EducationSection.tsx
'use client'
import { motion, Variants } from 'framer-motion'
import DoodleSection from './DoodleSection'
import type { EducationListData, EducationEntry } from '../lib/firestoreService'

interface Props {
  data: EducationListData;
}

export default function EducationSection({ data }: Props) {
  // simple pop + tilt on hover
  const hoverAnim: Variants = {
    rest: { y: 0, rotate: 0, scale: 1 },
    hover: {
      y: -4,
      rotate: [0, 15, -15, 0],
      scale: 1.02,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.6
      }
    }
  }

  return (
    <DoodleSection bgImage="/images/education-bg.png">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-sketch text-teal mb-2">{data.title}</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-magenta to-lime mx-auto mb-8 rounded-full" />
      </div>

      {/* Grid of “paper” cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {data.entries.map((e: EducationEntry, idx: number) => (
          <motion.div
            key={idx}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={hoverAnim}
            className="
              p-6
              bg-paper/60 backdrop-blur-xs
              border-2 border-dashed border-magenta/60
              rounded-2xl
            "
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-teal">{e.title}</h3>
              <span className="px-3 py-1 bg-yellow-100 text-gray-800 text-sm rounded-full">
                {e.year}
              </span>
            </div>
            <p className="text-magenta font-medium mb-1">{e.institution}</p>
            <p className="text-gray-700">{e.grade}</p>
          </motion.div>
        ))}
      </div>
    </DoodleSection>
  )
}
