// components/SkillsSection.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { usePlayfulMode } from '@/contexts/PlayfulContext';
import type { IconType } from 'react-icons';

// Font Awesome / Simple Icons
import {
  FaReact, FaNodeJs, FaGitAlt, FaDocker, FaHtml5, FaCss3Alt, FaJsSquare,
  FaGithub, FaWordpress, FaCode, FaAws
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTypescript, SiVuedotjs, SiAngular, SiSvelte, SiJquery,
  SiFirebase, SiMysql, SiNpm, SiGoogletagmanager, SiGoogleanalytics,
  SiCloudflare, SiGodaddy, SiMailchimp, SiGhost, SiJira, SiLess
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

/* ---------- Firestore payload ---------- */
export type SkillsData = Readonly<{
  title?: string;
  categories?: ReadonlyArray<{
    type: string;
    items: ReadonlyArray<{
      name: string;
      icon?: string;
      level?: number; // optional in Firestore
    }>;
  }>;
}>;

/* ---------- Icon mapping & helpers ---------- */
const ICON_KEYS = [
  'angular', 'react', 'nextjs', 'vue', 'svelte', 'html5', 'css3', 'javascript', 'jquery',
  'node', 'nodejs', 'firebase', 'mysql', 'npm', 'git', 'github', 'docker', 'aws',
  'google-tag-manager', 'gtm', 'google-analytics', 'ga', 'cloudflare', 'godaddy',
  'mailchimp', 'wordpress', 'ghost', 'jira', 'less', 'typescript', 'restapis', 'rest'
] as const;
type IconKey = typeof ICON_KEYS[number];

const ICON_MAP: Record<IconKey, IconType> = {
  angular: SiAngular,
  react: FaReact,
  nextjs: SiNextdotjs,
  vue: SiVuedotjs,
  svelte: SiSvelte,
  html5: FaHtml5,
  css3: FaCss3Alt,
  javascript: FaJsSquare,
  jquery: SiJquery,
  node: FaNodeJs,
  nodejs: FaNodeJs,
  firebase: SiFirebase,
  mysql: SiMysql,
  npm: SiNpm,
  git: FaGitAlt,
  github: FaGithub,
  docker: FaDocker,
  aws: FaAws,
  'google-tag-manager': SiGoogletagmanager,
  gtm: SiGoogletagmanager,
  'google-analytics': SiGoogleanalytics,
  ga: SiGoogleanalytics,
  cloudflare: SiCloudflare,
  godaddy: SiGodaddy,
  mailchimp: SiMailchimp,
  wordpress: FaWordpress,
  ghost: SiGhost,
  jira: SiJira,
  less: SiLess,
  typescript: SiTypescript,
  restapis: TbApi,
  rest: TbApi,
};

function normalizeToIconKey(raw?: string): IconKey | undefined {
  if (!raw) return undefined;
  const s = raw.trim().toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
  if (s === 'next' || s === 'nextjs') return 'nextjs';
  if (s === 'vue' || s === 'vuejs') return 'vue';
  if (s === 'ts' || s === 'typescript') return 'typescript';
  if (s === 'js' || s === 'javascript') return 'javascript';
  if (s === 'node' || s === 'nodejs') return 'nodejs';
  if (s === 'ga' || s === 'googleanalytics') return 'ga';
  if (s === 'gtm' || s === 'googletagmanager') return 'gtm';
  if (s === 'restapis' || s === 'restapi' || s === 'rest') return 'restapis';
  const candidates: IconKey[] = ICON_KEYS as unknown as IconKey[];
  return candidates.find((k) => k.replace(/-/g, '') === s) as IconKey | undefined;
}

function resolveIcon(item: { name: string; icon?: string }): IconType {
  const byIcon = normalizeToIconKey(item.icon);
  if (byIcon && ICON_MAP[byIcon]) return ICON_MAP[byIcon];
  const byName = normalizeToIconKey(item.name);
  if (byName && ICON_MAP[byName]) return ICON_MAP[byName];
  return FaCode;
}

/* ---------- Small UI bits ---------- */
function SkillCard({ name, Icon, level, playful, index }: { name: string; Icon: IconType; level: number; playful: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={playful ? { scale: 1.05, y: -5 } : { y: -2 }}
      className={`p-6 transition-all duration-200 ${
        playful
          ? `bg-white border-2 rounded-xl ${
              index % 6 === 0 ? 'border-vibrant-pink shadow-[4px_4px_0_0_rgba(255,107,157,0.3)] hover:shadow-[8px_8px_0_0_rgba(34,211,238,0.4)]' :
              index % 6 === 1 ? 'border-vibrant-cyan shadow-[4px_4px_0_0_rgba(34,211,238,0.3)] hover:shadow-[8px_8px_0_0_rgba(255,212,59,0.4)]' :
              index % 6 === 2 ? 'border-vibrant-yellow shadow-[4px_4px_0_0_rgba(255,212,59,0.3)] hover:shadow-[8px_8px_0_0_rgba(255,146,43,0.4)]' :
              index % 6 === 3 ? 'border-vibrant-orange shadow-[4px_4px_0_0_rgba(255,146,43,0.3)] hover:shadow-[8px_8px_0_0_rgba(255,107,107,0.4)]' :
              index % 6 === 4 ? 'border-vibrant-red shadow-[4px_4px_0_0_rgba(255,107,107,0.3)] hover:shadow-[8px_8px_0_0_rgba(196,69,105,0.4)]' :
              'border-vibrant-purple shadow-[4px_4px_0_0_rgba(196,69,105,0.3)] hover:shadow-[8px_8px_0_0_rgba(255,107,157,0.4)]'
            }`
          : 'bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300'
      }`}
    >
      {/* Icon and name */}
      <div className="flex items-center gap-4 mb-4">
        {/* Show icon only in playful mode */}
        {playful && (
          <div className={`p-3 rounded-lg ${
            index % 6 === 0 ? 'bg-gradient-to-br from-vibrant-pink/20 to-vibrant-cyan/20' :
            index % 6 === 1 ? 'bg-gradient-to-br from-vibrant-cyan/20 to-vibrant-yellow/20' :
            index % 6 === 2 ? 'bg-gradient-to-br from-vibrant-yellow/20 to-vibrant-orange/20' :
            index % 6 === 3 ? 'bg-gradient-to-br from-vibrant-orange/20 to-vibrant-red/20' :
            index % 6 === 4 ? 'bg-gradient-to-br from-vibrant-red/20 to-vibrant-purple/20' :
            'bg-gradient-to-br from-vibrant-purple/20 to-vibrant-pink/20'
          }`}>
            <Icon
              className={`text-2xl ${
                index % 6 === 0 ? 'text-vibrant-pink' :
                index % 6 === 1 ? 'text-vibrant-cyan' :
                index % 6 === 2 ? 'text-vibrant-yellow' :
                index % 6 === 3 ? 'text-vibrant-orange' :
                index % 6 === 4 ? 'text-vibrant-red' :
                'text-vibrant-purple'
              }`}
              aria-hidden
            />
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-1 text-gray-900">{name}</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Proficiency</span>
            <span className={`text-base font-semibold ${
              playful ? (
                index % 6 === 0 ? 'text-vibrant-pink' :
                index % 6 === 1 ? 'text-vibrant-cyan' :
                index % 6 === 2 ? 'text-vibrant-yellow' :
                index % 6 === 3 ? 'text-vibrant-orange' :
                index % 6 === 4 ? 'text-vibrant-red' :
                'text-vibrant-purple'
              ) : 'text-gray-900'
            }`}>
              {level}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className={`h-2 rounded-full overflow-hidden ${
          playful ? 'bg-gray-200' : 'bg-gray-200'
        }`}>
          <motion.div
            className={`h-full rounded-full ${
              playful
                ? (
                  index % 6 === 0 ? 'bg-gradient-to-r from-vibrant-pink to-vibrant-cyan' :
                  index % 6 === 1 ? 'bg-gradient-to-r from-vibrant-cyan to-vibrant-yellow' :
                  index % 6 === 2 ? 'bg-gradient-to-r from-vibrant-yellow to-vibrant-orange' :
                  index % 6 === 3 ? 'bg-gradient-to-r from-vibrant-orange to-vibrant-red' :
                  index % 6 === 4 ? 'bg-gradient-to-r from-vibrant-red to-vibrant-purple' :
                  'bg-gradient-to-r from-vibrant-purple to-vibrant-pink'
                )
                : 'bg-gray-900'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1.2, delay: index * 0.05 + 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ label, active, onClick, playful, index = 0 }: { label: string; active: boolean; onClick: () => void; playful: boolean; index?: number }) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 font-medium transition-all duration-200 ${
        active
          ? playful
            ? `text-white rounded-full ${
                index % 6 === 0 ? 'bg-gradient-to-r from-vibrant-pink to-vibrant-cyan shadow-[4px_4px_0_0_rgba(255,107,157,1)]' :
                index % 6 === 1 ? 'bg-gradient-to-r from-vibrant-cyan to-vibrant-yellow shadow-[4px_4px_0_0_rgba(34,211,238,1)]' :
                index % 6 === 2 ? 'bg-gradient-to-r from-vibrant-yellow to-vibrant-orange shadow-[4px_4px_0_0_rgba(255,212,59,1)]' :
                index % 6 === 3 ? 'bg-gradient-to-r from-vibrant-orange to-vibrant-red shadow-[4px_4px_0_0_rgba(255,146,43,1)]' :
                index % 6 === 4 ? 'bg-gradient-to-r from-vibrant-red to-vibrant-purple shadow-[4px_4px_0_0_rgba(255,107,107,1)]' :
                'bg-gradient-to-r from-vibrant-purple to-vibrant-pink shadow-[4px_4px_0_0_rgba(196,69,105,1)]'
              }`
            : 'bg-gray-900 text-white rounded-md shadow-sm'
          : playful
            ? `bg-white text-gray-700 border-2 rounded-full hover:bg-opacity-10 ${
                index % 6 === 0 ? 'border-vibrant-pink hover:bg-vibrant-pink' :
                index % 6 === 1 ? 'border-vibrant-cyan hover:bg-vibrant-cyan' :
                index % 6 === 2 ? 'border-vibrant-yellow hover:bg-vibrant-yellow' :
                index % 6 === 3 ? 'border-vibrant-orange hover:bg-vibrant-orange' :
                index % 6 === 4 ? 'border-vibrant-red hover:bg-vibrant-red' :
                'border-vibrant-purple hover:bg-vibrant-purple'
              }`
            : 'bg-white text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300'
      }`}
      whileHover={playful ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}

/* ---------- Main ---------- */

const DEFAULT_LEVEL = 95;
const DEFAULT_SQL_LEVEL = 60;
const clamp01to100 = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

export default function SkillsSection({ data }: { data: SkillsData }) {
  const { isPlayfulMode } = usePlayfulMode();
  const [activeTab, setActiveTab] = useState(0);

  // Build render model from Firestore with safe numeric level
  const model = useMemo(() => {
    const cats = (data.categories ?? []).map((c) => ({
      label: c.type,
      items: c.items.map((it) => {
        const Icon = resolveIcon(it);
        // safe fallback: if level missing, prefer lower for SQL, high for others
        const fallback = /sql/i.test(it.name) ? DEFAULT_SQL_LEVEL : DEFAULT_LEVEL;
        const level = clamp01to100(typeof it.level === 'number' ? it.level : fallback);
        return { name: it.name, Icon, level };
      }),
    }));
    return { title: data.title ?? 'Skills & Superpowers', cats };
  }, [data]);

  return (
    <section
      id="skills"
      className={`relative ${isPlayfulMode
          ? 'py-20 bg-gradient-to-br from-vibrant-pink/10 via-vibrant-cyan/10 via-vibrant-yellow/10 via-vibrant-orange/10 to-vibrant-red/10 overflow-hidden'
          : 'py-20 bg-gradient-to-br from-vibrant-pink/5 via-vibrant-cyan/5 to-vibrant-yellow/5'
        }`}
    >
      {/* soft background accents - only for playful mode */}
      {isPlayfulMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-vibrant-pink/20 blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-vibrant-cyan/20 blur-xl" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-vibrant-yellow/20 blur-xl" />
          <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-vibrant-orange/20 blur-xl" />
          <div className="absolute bottom-1/4 left-1/4 w-28 h-28 rounded-full bg-vibrant-red/20 blur-xl" />
          <div className="absolute top-3/4 left-1/3 w-16 h-16 rounded-full bg-vibrant-purple/20 blur-xl" />
        </div>
      )}

      <div className={`mx-auto px-6 ${isPlayfulMode ? 'container max-w-7xl' : 'max-w-6xl'}`}>
        {/* Title */}
        {model.title && (
          isPlayfulMode ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-vibrant-pink via-vibrant-cyan via-vibrant-yellow via-vibrant-orange to-vibrant-red">
                {model.title}
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-vibrant-pink via-vibrant-cyan via-vibrant-yellow to-vibrant-orange" />
            </motion.div>
          ) : (
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
                Technical Skills
              </h2>
              <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                A comprehensive overview of technologies, frameworks, and tools I use to craft exceptional digital experiences
              </p>
            </div>
          )
        )}

        {/* Tab Navigation */}
        {isPlayfulMode ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {model.cats.map((category, index) => (
              <TabButton
                key={category.label}
                label={category.label}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
                playful={isPlayfulMode}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {model.cats.map((category, index) => (
                <button
                  key={category.label}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === index
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content */}
        {isPlayfulMode ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[400px]"
          >
            {model.cats[activeTab] && (
              <>
                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {model.cats[activeTab].items.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      Icon={skill.Icon}
                      level={skill.level}
                      playful={isPlayfulMode}
                      index={index}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        ) : (
          /* Professional Skills Layout */
          <div key={activeTab} className="min-h-[400px]">
            {model.cats[activeTab] && (
              <div>
                {/* Professional Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                  {model.cats[activeTab].items.map((skill, index) => (
                    <div key={skill.name} className="group text-center space-y-4">
                      {/* Icon */}
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                          <skill.Icon className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Skill name */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                          {skill.name}
                        </h4>
                        <div className="text-xs text-gray-500 font-light">
                          {skill.level}% proficiency
                        </div>
                      </div>

                      {/* Minimalist progress indicator */}
                      <div className="space-y-2">
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              transitionDelay: `${index * 50}ms`
                            }}
                          />
                        </div>

                        {/* Subtle hover effect */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-xs text-gray-400 font-light">
                            {skill.level >= 90 ? 'Expert' :
                             skill.level >= 75 ? 'Advanced' :
                             skill.level >= 60 ? 'Proficient' : 'Intermediate'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
