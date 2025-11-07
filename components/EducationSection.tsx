// components/EducationSection.tsx
'use client';

import { motion } from 'framer-motion';
import { EducationCard } from './ui/EducationCard';
import {
  FaFlask,
  FaGraduationCap,
  FaPencilAlt,
  FaUniversity,
} from 'react-icons/fa';
import { usePlayfulMode } from '@/contexts/PlayfulContext';
import type { JSX } from 'react';

/** Firestore payload */
export type EducationData = Readonly<{
  title?: string;
  entries: ReadonlyArray<{
    title: string;        // e.g., "Masters - Information Systems with Computing"
    institution: string;  // e.g., "Dublin Business School"
    year: string;         // e.g., "Jan '24 - Jan '25"
    grade?: string;       // e.g., "74% First Class Honours"
  }>;
}>;

/** Map entry title → icon & soft card tint (keeps your previous palette) */
function iconAndColorFor(title: string): { icon: JSX.Element; color: string } {
  const t = title.toLowerCase();
  if (/(master|m\.sc|ms|information systems)/i.test(t)) {
    return { icon: <FaGraduationCap />, color: 'bg-purple-100' };
  }
  if (/(bachelor|b\.tech|engineering|it)/i.test(t)) {
    return { icon: <FaUniversity />, color: 'bg-pink-100' };
  }
  if (/(intermediate|junior|mpc)/i.test(t)) {
    return { icon: <FaFlask />, color: 'bg-yellow-100' };
  }
  if (/(10th|tenth|ssc|high school)/i.test(t)) {
    return { icon: <FaPencilAlt />, color: 'bg-green-100' };
  }
  return { icon: <FaGraduationCap />, color: 'bg-purple-100' };
}

export default function EducationSection({ data }: { data: EducationData }) {
  const { isPlayfulMode } = usePlayfulMode();

  // Transform Firestore -> UI expected by <EducationCard />
  const items = (data.entries ?? []).map((e, i) => {
    const { icon, color } = iconAndColorFor(e.title || '');
    return {
      id: i + 1,
      degree: e.title,
      institution: e.institution,
      period: e.year,
      description: e.grade ?? '', // show grade inside the card body
      icon,
      color,
    };
  });

  return (
    <section
      id="education"
      className={`relative ${
        isPlayfulMode
          ? 'py-16 overflow-hidden'
          : 'pt-12 pb-16'
      }`}
    >

      <div className={`mx-auto px-6 ${isPlayfulMode ? 'container max-w-7xl' : 'max-w-5xl'}`}>
        {/* Section header */}
        {isPlayfulMode ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-vibrant-purple via-vibrant-cyan to-vibrant-yellow">
              EDU-PLAYFUL-CATION
            </h2>
            <p className="text-lg text-vibrant-purple max-w-2xl mx-auto">
              Where I officially learned to Google error messages
            </p>
          </motion.div>
        ) : (
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              Education
            </h2>
            <div className="w-24 h-0.5 bg-slate-900 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Academic achievements and continuous learning journey
            </p>
          </div>
        )}

        {/* Education content */}
        {isPlayfulMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <EducationCard item={item} index={index} playfulMode={isPlayfulMode} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Minimal Education List */
          <div className="space-y-4 max-w-2xl mx-auto">
            {items.map((item) => (
              <div key={item.id} className="group border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-slate-900">
                      {item.degree}
                    </h3>
                    <div className="text-sm text-slate-600">
                      {item.institution}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 sm:text-right">
                    {item.period}
                    {item.description && (
                      <div className="text-xs mt-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        {isPlayfulMode && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center p-6 rounded-xl max-w-2xl mx-auto bg-white border-vibrant-purple border-2 shadow-[6px_6px_0_0_rgba(196,69,105,0.5)]"
          >
            <h3 className="text-xl font-bold mb-2 text-vibrant-purple">
              REAL TALK (KINDA):
            </h3>
            <p className="text-gray-800">
              99% OF MY SKILLS CAME FROM STACK OVERFLOW AND RANDOM BLOG POSTS. THE DEGREE JUST MADE MY LINKEDIN LOOK FANCY
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
