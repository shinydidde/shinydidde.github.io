// components/HeroSection.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import DoodleSection from './DoodleSection'
import type { HeroData } from '@/lib/firestoreService'

interface HeroSectionProps {
  data: HeroData
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { name, role, avatarUrl, backgrounds, catchPhrase, scrollPrompt } = data
  const bgImage = backgrounds[0] ?? '/images/hero-bg.avif'

  return (
    <DoodleSection
      bgImage={bgImage}
      divider={false}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20 pb-0"
    >

      {/* Centered Panel */}
      <motion.div
        className="
          relative z-10 mx-auto flex flex-col items-center text-center
          bg-paper/10 backdrop-blur-sm p-8 rounded-2xl
          border-2 border-dashed border-teal/80
          max-w-md
        "
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Avatar */}
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="
            relative mb-6 w-36 h-36 rounded-full overflow-hidden
            border-4 border-dashed border-magenta
          "
        >
          <Image src={avatarUrl} alt={`${name} avatar`} fill className="object-cover" />
        </motion.div>

        {/* Name & Role */}
        <motion.h1
          className="text-5xl font-sketch text-teal mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="text-2xl text-magenta mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {role}
        </motion.p>

        {/* Catchphrase */}
        <motion.p
          className="italic text-lg mb-6 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {catchPhrase}
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#about"
          className="px-8 py-3 bg-gradient-to-r from-lime to-magenta rounded-full text-white font-sketch shadow-lg hover:shadow-2xl"
          whileHover={{
            scale: 1.05,
            rotate: [0, 4]           // spring only supports 2 keyframes
          }}
          transition={{ type: 'spring', stiffness: 200, repeat: Infinity, repeatType: 'mirror' }}
        >
          Let’s Go!
        </motion.a>

        {/* Scroll prompt */}
        <motion.div
          className="mt-8 text-sm text-gray-700"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {scrollPrompt}
        </motion.div>
      </motion.div>
    </DoodleSection>
  )
}
