// components/ExperienceSection.tsx
'use client';

import { motion } from 'framer-motion';
import { TimelineItem } from './ui/TimelineItem';
import { CompanyLogo } from './ui/CompanyLogo';
import { useMemeMode } from '@/contexts/MemeContext';

/** Firestore shape passed from parent */
export type ExperienceData = Readonly<{
  illustration?: string;
  title?: string;
  entries: ReadonlyArray<{
    year: string;            // e.g., "Oct '24 – Present"
    role: string;            // e.g., "Senior Lead @ QuestDot"
    details: ReadonlyArray<string>;
  }>;
}>;

/** Derive company from "Role @ Company" */
function extractCompany(role: string): string {
  const at = role.indexOf('@');
  return at >= 0 ? role.slice(at + 1).trim() : '';
}

/** Best-effort slug → logo path following your /logos/*.png convention */
function logoFromCompany(company: string): string {
  const c = company.toLowerCase();
  if (c.includes('questdot')) return '/logos/questdot.png';
  if (c.includes('localstack')) return '/logos/localstack.png';
  if (c.includes('finnovation')) return '/logos/finnovation.png';
  if (c.includes('wandertrails')) return '/logos/wandertrails.png';
  if (c.includes('witlab')) return '/logos/witlab.png';
  // generic fallback slug
  const slug = c.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `/logos/${slug || 'company'}.png`;
}

export default function ExperienceSection({ data }: { data: ExperienceData }) {
  const { isMemeMode } = useMemeMode();

  // Transform Firestore entries → UI model expected by TimelineItem / CompanyLogo
  const experiences = (data.entries ?? []).map((e, idx) => {
    const company = extractCompany(e.role);
    return {
      id: idx + 1,
      role: e.role,
      period: e.year,
      company,
      logo: logoFromCompany(company),
      highlights: [...e.details],
      tags: [] as string[],
    };
  });

  return (
    <section
      id="experience"
      className={`py-20 relative overflow-hidden ${isMemeMode
          ? 'bg-gradient-to-br from-green-100 to-blue-100'
          : 'bg-gradient-to-br from-pink-50 to-purple-50'
        }`}
    >

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isMemeMode ? (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-green-200/50 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-yellow-200/50 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-100/50 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-100/50 blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-yellow-100/50 blur-3xl" />
          </>
        )}
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 ${isMemeMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500'
              : ''
              }`}
          >
            {isMemeMode ? 'WORK CHAOS' : 'Work '}
            <span className={isMemeMode ? 'text-yellow-400' : 'text-purple-500'}>
              {isMemeMode ? 'EXPERIENCE' : 'Experience'}
            </span>
          </h2>
          <p
            className={`text-lg ${isMemeMode ? 'text-blue-600' : 'text-gray-600'
              } max-w-2xl mx-auto`}
          >
            {isMemeMode
              ? 'My professional journey through the tech chaos 🤪'
              : 'My professional journey through the tech universe 🚀'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-1 h-full rounded-full ${isMemeMode
              ? 'bg-gradient-to-b from-green-300 to-blue-300'
              : 'bg-gradient-to-b from-purple-300 to-pink-300'
              }`}
          />

          {/* Timeline items */}
          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative mb-16 ${index % 2 === 0 ? 'pr-8 md:pr-0 md:pl-8' : 'pl-8 md:pl-0 md:pr-8'}`}
            >
              <TimelineItem
                experience={exp}
                alignment={index % 2 === 0 ? 'left' : 'right'}
                memeMode={isMemeMode}
              />

              <CompanyLogo
                logo={exp.logo}
                company={exp.company}
                side={index % 2 === 0 ? 'right' : 'left'}
                delay={index * 0.2}
              />
            </motion.div>
          ))}


          {/* Fun timeline end marker */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            viewport={{ once: true }}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg ${isMemeMode ? 'bg-yellow-400 text-black' : 'bg-pink-500 text-white'
              }`}
          >
            {isMemeMode ? 'STILL HERE??' : 'NOW'}
          </motion.div>
        </div>

        {/* Fun CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p
            className={`text-lg mb-6 ${isMemeMode ? 'text-blue-600' : 'text-gray-600'
              }`}
          >
            {isMemeMode
              ? 'WANT TO SEE MY FULL RESUME WITH ALL THE CHAOS?'
              : 'Want to see my full resume with all the nerdy details?'}
          </p>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-8 py-3 rounded-full font-bold transition-all ${isMemeMode
              // MEME MODE: green/blue gradient + blue hover swap
              ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-[4px_4px_0_0_rgba(245,158,11,1)] hover:from-blue-500 hover:to-green-400 hover:text-black hover:shadow-[8px_8px_0_0_rgba(59,130,246,1)]'
              // NORMAL: purple/pink gradient + pink hover swap
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[4px_4px_0_0_rgba(168,85,247,1)] hover:from-pink-600 hover:to-purple-600 hover:shadow-[8px_8px_0_0_rgba(236,72,153,1)]'
              }`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMemeMode ? 'DOWNLOAD RESUME (GOOD LUCK)' : 'Download Resume PDF'}
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
}
