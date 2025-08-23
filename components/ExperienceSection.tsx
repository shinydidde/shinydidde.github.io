// components/ExperienceSection.tsx
'use client';

import { motion } from 'framer-motion';
import { TimelineItem } from './ui/TimelineItem';
import { CompanyLogo } from './ui/CompanyLogo';
import { usePlayfulMode } from '@/contexts/PlayfulContext';
import { FaRocket, FaSmileWink } from 'react-icons/fa';

/** Firestore shape passed from parent */
export type ExperienceData = Readonly<{
  illustration?: string;
  title?: string;
  entries: ReadonlyArray<{
    year: string;
    role: string;
    details: ReadonlyArray<string>;
  }>;
}>;

/** Derive company from "Role @ Company" */
function extractCompany(role: string): string {
  const at = role.indexOf('@');
  return at >= 0 ? role.slice(at + 1).trim() : '';
}

/** Best-effort slug → logo path following your /logos/*.png convention */
function logoFromCompany(company: string, fullRole: string): string {
  const c = company.toLowerCase();
  const r = fullRole.toLowerCase();
  if (c.includes('questdot')) return 'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme10.png?alt=media&token=adaef0b7-b922-43bd-9b0e-05f5bcdf6e57';
  if (c.includes('localstack')) return 'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme13.png?alt=media&token=da893878-9802-4c89-804a-ed365f65858f';
  if (c.includes('finnovation') && r.includes('ux')) return 'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme19.png?alt=media&token=6b857c78-0a8a-49c6-879c-2abf26dfebbe';
  if (c.includes('finnovation')) return 'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme2.png?alt=media&token=04f22ca3-c55b-46d0-ac89-afef6b7dd015';
  if (c.includes('wandertrails')) return 'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme7.png?alt=media&token=a84179a3-d8fd-4ab9-9d40-57954867a904';
  if (c.includes('witlab')) return 'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme9.png?alt=media&token=758c1433-f749-46f3-9f6f-5efeeab12c30';
  // generic fallback slug
  const slug = c.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `/logos/${slug || 'company'}.png`;
}

export default function ExperienceSection({ data }: { data: ExperienceData }) {
  const { isPlayfulMode } = usePlayfulMode();

  // Transform Firestore entries → UI model expected by TimelineItem / CompanyLogo
  const experiences = (data.entries ?? []).map((e, idx) => {
    const company = extractCompany(e.role);
    return {
      id: idx + 1,
      role: e.role,
      period: e.year,
      company,
      logo: logoFromCompany(company, e.role),
      highlights: [...e.details],
      tags: [] as string[],
    };
  });

  return (
    <section
      id="experience"
      className={`py-20 relative overflow-hidden ${isPlayfulMode
          ? 'bg-gradient-to-br from-green-100 to-blue-100'
          : 'bg-gradient-to-br from-pink-50 to-purple-50'
        }`}
    >

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isPlayfulMode ? (
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
            className={`text-4xl sm:text-5xl font-bold mb-4 ${isPlayfulMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500'
              : ''
              }`}
          >
            {isPlayfulMode ? 'WORK CHAOS' : 'Work '}
            <span className={isPlayfulMode ? 'text-yellow-400' : 'text-purple-500'}>
              {isPlayfulMode ? 'EXPERIENCE' : 'Experience'}
            </span>
          </h2>
          <p
            className={`text-lg ${isPlayfulMode ? 'text-blue-600' : 'text-gray-600'
              } max-w-2xl mx-auto`}
          >
            <span className="flex items-center justify-center gap-2">
              {isPlayfulMode ? (
                <>
                  My professional journey through the tech chaos
                  <FaSmileWink className="w-5 h-5 text-yellow-500" />
                </>
              ) : (
                <>
                  My professional journey through the tech universe
                  <FaRocket className="w-5 h-5 text-blue-500" />
                </>
              )}
            </span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-1 h-full rounded-full ${isPlayfulMode
              ? 'bg-gradient-to-b from-green-300 to-blue-300'
              : 'bg-gradient-to-b from-purple-300 to-pink-300'
              }`}
          />

          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative mb-20 md:mb-16 md:px-0 ${index % 2 === 0 ? 'pr-8 md:pr-0 md:pl-8' : 'pl-8 md:pl-0 md:pr-8'}`}
            >
              <TimelineItem
                experience={exp}
                alignment={index % 2 === 0 ? 'left' : 'right'}
                playfulMode={isPlayfulMode}
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
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg ${isPlayfulMode ? 'bg-yellow-400 text-black' : 'bg-pink-500 text-white'
              }`}
          >
            {isPlayfulMode ? 'STILL HERE??' : 'NOW'}
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
            className={`text-lg mb-6 ${isPlayfulMode ? 'text-blue-600' : 'text-gray-600'
              }`}
          >
            {isPlayfulMode
              ? 'WANT TO SEE MY FULL RESUME WITH ALL THE CHAOS?'
              : 'Want to see my full resume with all the nerdy details?'}
          </p>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-8 py-3 rounded-full font-bold transition-all ${isPlayfulMode
              // MEME MODE: green/blue gradient + blue hover swap
              ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-[4px_4px_0_0_rgba(245,158,11,1)] hover:from-blue-500 hover:to-green-400 hover:text-black hover:shadow-[8px_8px_0_0_rgba(59,130,246,1)]'
              // NORMAL: purple/pink gradient + pink hover swap
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[4px_4px_0_0_rgba(168,85,247,1)] hover:from-pink-600 hover:to-purple-600 hover:shadow-[8px_8px_0_0_rgba(236,72,153,1)]'
              }`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlayfulMode ? 'DOWNLOAD RESUME (GOOD LUCK)' : 'Download Resume PDF'}
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
}
