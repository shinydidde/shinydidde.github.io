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
import { useMemeMode } from '@/contexts/MemeContext';
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
  const { isMemeMode } = useMemeMode();

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
      className={`py-20 relative overflow-hidden ${
        isMemeMode
          ? 'bg-gradient-to-br from-green-100 to-blue-100'
          : 'bg-gradient-to-br from-pink-50 to-purple-50'
      }`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isMemeMode ? (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-green-200/50 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-200/50 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-100/50 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-100/50 blur-3xl" />
          </>
        )}
      </div>

      <div className="container mx-auto px-6">
        {/* Section header (title from Firestore) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isMemeMode
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500'
                : ''
            }`}
          >
            {data.title ?? (isMemeMode ? 'EDU-MEME-CATION' : 'Education')}
          </h2>
          <p
            className={`text-lg ${
              isMemeMode ? 'text-blue-600' : 'text-gray-600'
            } max-w-2xl mx-auto`}
          >
            {isMemeMode
              ? 'Where I officially learned to Google error messages'
              : 'A snapshot of my academic journey'}
          </p>
        </motion.div>

        {/* Education cards from Firestore */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <EducationCard item={item} index={index} memeMode={isMemeMode} />
            </motion.div>
          ))}
        </div>

        {/* Fun fact / note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className={`mt-20 text-center p-6 rounded-xl border-2 ${
            isMemeMode
              ? 'bg-white border-green-500 shadow-[6px_6px_0_0_rgba(59,130,246,0.5)]'
              : 'bg-white border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]'
          } max-w-2xl mx-auto`}
        >
          <h3 className={`text-xl font-bold mb-2 ${isMemeMode ? 'text-blue-600' : ''}`}>
            {isMemeMode ? 'REAL TALK (KINDA):' : 'Real Talk:'}
          </h3>
          <p className={isMemeMode ? 'text-gray-800' : 'text-gray-700'}>
            {isMemeMode
              ? '99% OF MY SKILLS CAME FROM STACK OVERFLOW AND RANDOM BLOG POSTS. THE DEGREE JUST MADE MY LINKEDIN LOOK FANCY 💼'
              : 'A lot of the practical skills came from projects, tinkering, and '}
            {!isMemeMode && (
              <span className="text-pink-500 font-bold">
                countless hours of trial and error
              </span>
            )}
            {!isMemeMode && '.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
