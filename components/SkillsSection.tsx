// components/SkillsSection.tsx
'use client';

import React, { useMemo } from 'react';
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
function SkillRow({ name, Icon, level, playful }: { name: string; Icon: IconType; level: number; playful: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className={playful ? 'text-blue-600' : 'text-fuchsia-700'} aria-hidden />
          <span className="font-semibold text-sm tracking-wide">{name}</span>
        </div>
        <span className="text-xs font-bold opacity-70">{level}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-zinc-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${playful ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-pink-500 to-fuchsia-600'
            }`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function CategoryHeader({ label, playful }: { label: string; playful: boolean }) {
  return (
    <div className="col-span-full -mx-1 mb-2">
      <div
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black tracking-wider border-2 ${playful
            ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black border-black'
            : 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white border-black'
          }`}
      >
        <span>{label}</span>
      </div>
      <div
        className={`h-1 w-full rounded-full mt-2 ${playful ? 'bg-gradient-to-r from-green-300 to-blue-400' : 'bg-gradient-to-r from-pink-300 to-fuchsia-400'
          }`}
      />
    </div>
  );
}

/* ---------- Main ---------- */

const DEFAULT_LEVEL = 95;
const DEFAULT_SQL_LEVEL = 60;
const clamp01to100 = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

export default function SkillsSection({ data }: { data: SkillsData }) {
  const { isPlayfulMode } = usePlayfulMode();

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
      className={`py-20 relative overflow-hidden ${isPlayfulMode
          ? 'bg-gradient-to-br from-green-100 to-blue-100'
          : 'bg-gradient-to-br from-pink-50 to-purple-50'
        }`}
    >

      {/* soft background accents */}
      <div className="absolute inset-0 pointer-events-none">
        {isPlayfulMode ? (
          <>
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-green-200/40 blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-200/40 blur-xl" />
          </>
        ) : (
          <>
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-purple-100/60 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-pink-100/60 blur-3xl" />
          </>
        )}
      </div>

      <div className="container mx-auto px-6">
        {/* Title */}
        {model.title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2
              className={`text-4xl sm:text-5xl font-bold ${isPlayfulMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600' : 'text-gray-900'
                }`}
            >
              {model.title}
            </h2>
          </motion.div>
        )}

        {/* Compact single panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className={[
            'mx-auto max-w-6xl rounded-2xl border-4',
            isPlayfulMode ? 'border-yellow-400 bg-white' : 'border-black bg-white',
            'p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.20)]',
          ].join(' ')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {model.cats.map((cat) => (
              <React.Fragment key={cat.label}>
                <CategoryHeader label={cat.label} playful={isPlayfulMode} />
                {cat.items.map((s) => (
                  <SkillRow
                    key={`${cat.label}-${s.name}`}
                    name={s.name}
                    Icon={s.Icon}
                    level={s.level}
                    playful={isPlayfulMode}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
