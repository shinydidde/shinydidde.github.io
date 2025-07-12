// app/components/ExperienceSection.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import DoodleSection from './DoodleSection';
import type { ExperienceListData } from '../lib/firestoreService';

interface ExperienceSectionProps {
  data: ExperienceListData;
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  // parent container staggering
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  // each entry fades/flies in
  const item: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  // card resting vs hover states
  const cardVariants: Variants = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, 15, -15, 0],
      scale: 1.02,
      transition: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
    },
  };

  return (
    <DoodleSection bgImage="/images/exp-bg.avif">
      <motion.div
        id="experience"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-4 py-20"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-4xl font-sketch text-teal mb-2">{data.title}</h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-magenta to-lime" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-magenta to-lime transform -translate-x-1/2" />

          {data.entries.map((entry, idx) => {
            const onLeft = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                variants={item}
                className={`mb-12 flex flex-col md:flex-row ${
                  onLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* dot */}
                <div className="hidden md:flex absolute left-1/2 top-8 w-4 h-4 bg-gradient-to-r from-magenta to-lime rounded-full transform -translate-x-1/2 z-10" />

                {/* year bubble */}
                <div
                  className={`md:w-1/2 p-4 ${
                    onLeft ? 'text-right md:pr-8' : 'text-left md:pl-8'
                  }`}
                >
                  <motion.span
                    whileHover={{ x: onLeft ? -6 : 6 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-block rounded-full bg-gradient-to-r from-magenta to-lime px-4 py-2 text-white shadow-lg"
                  >
                    {entry.year}
                  </motion.span>
                </div>

                {/* content card */}
                <div className="md:w-1/2 p-4 flex">
                  <motion.div
                    variants={cardVariants}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    className="
                      flex-1 rounded-2xl border-2 border-dashed border-magenta/60
                      bg-paper/60 backdrop-blur-xs p-6
                    "
                  >
                    <h3
                      className="mb-4 text-lg font-semibold text-teal"
                      dangerouslySetInnerHTML={{ __html: entry.role }}
                    />
                    <ul className="list-inside list-disc space-y-2 text-gray-700">
                      {entry.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </DoodleSection>
  );
}
