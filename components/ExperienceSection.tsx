// components/ExperienceSection.tsx
'use client';

import { motion } from 'framer-motion';
import { TimelineItem } from './ui/TimelineItem';
import { CompanyLogo } from './ui/CompanyLogo';
import { usePlayfulMode } from '@/contexts/PlayfulContext';
import { FaSmileWink } from 'react-icons/fa';

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
      className={`relative ${isPlayfulMode
          ? 'py-20 overflow-hidden'
          : 'pt-12 pb-32'
        }`}
    >


      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        {isPlayfulMode ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-vibrant-red via-vibrant-yellow to-vibrant-cyan font-bold mb-6">
              WORK CHAOS
              <span className="text-vibrant-yellow">EXPERIENCE</span>
            </h2>
            <p className="text-lg text-vibrant-red max-w-3xl mx-auto">
              <span className="flex items-center justify-center gap-2">
                My professional journey through the tech chaos
                <FaSmileWink className="w-5 h-5 text-vibrant-yellow" />
              </span>
            </p>
          </motion.div>
        ) : (
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              Professional Experience
            </h2>
            <div className="w-24 h-0.5 bg-slate-900 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              A decade of crafting exceptional digital experiences and leading high-performance engineering teams
            </p>
          </div>
        )}

        {/* Timeline */}
        {isPlayfulMode ? (
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full rounded-full bg-gradient-to-b from-vibrant-red to-vibrant-cyan" />

            {/* Timeline items */}
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative mb-20 md:mb-16 md:px-0 ${
                  index % 2 === 0 ? 'pr-8 md:pr-0 md:pl-8' : 'pl-8 md:pl-0 md:pr-8'
                }`}
              >
                <TimelineItem
                  experience={exp}
                  alignment={index % 2 === 0 ? 'left' : 'right'}
                  playfulMode={isPlayfulMode}
                />

                {/* Show company logo only in playful mode */}
                <CompanyLogo
                  logo={exp.logo}
                  company={exp.company}
                  side={index % 2 === 0 ? 'right' : 'left'}
                  delay={index * 0.2}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Modern Professional Timeline */
          <div className="space-y-16">
            {experiences.map((exp) => (
              <div key={exp.id} className="group">
                <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start">
                  {/* Year & Company */}
                  <div className="md:text-right space-y-3">
                    <div className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                      {exp.period}
                    </div>
                    <div className="text-lg font-light text-gray-900">
                      {exp.company}
                    </div>
                  </div>

                  {/* Role & Details */}
                  <div className="relative md:pl-8">
                    {/* Subtle vertical line */}
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200 group-hover:bg-gray-400 transition-colors duration-300"></div>

                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-gray-900 leading-tight">
                        {exp.role.split('@')[0].trim()}
                      </h3>

                      <div className="space-y-4">
                        {exp.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                            <span className="font-light">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {isPlayfulMode ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <p className="text-lg mb-6 text-vibrant-red">
              WANT TO SEE MY FULL RESUME WITH ALL THE CHAOS?
            </p>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 font-semibold transition-all bg-gradient-to-r from-vibrant-red to-vibrant-yellow text-black shadow-[4px_4px_0_0_rgba(255,107,107,1)] hover:from-vibrant-yellow hover:to-vibrant-cyan hover:text-black hover:shadow-[8px_8px_0_0_rgba(34,211,238,1)] rounded-full"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              DOWNLOAD RESUME (GOOD LUCK)
            </motion.a>
          </motion.div>
        ) : (
          <div className="text-center mt-20">
            <div className="w-12 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-base font-light text-gray-500 mb-8 tracking-wide">
              View comprehensive experience details
            </p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Download Resume
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
