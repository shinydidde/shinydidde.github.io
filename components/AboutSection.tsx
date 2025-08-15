// components/AboutSection.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import DoodleSection from './DoodleSection';
import type { AboutData } from '../lib/firestoreService';
import { useMemeMode } from '@/contexts/MemeContext';
import Modal from '@/components/ui/Modal';

import {
  FaLightbulb,
  FaFire,
  FaSyncAlt,
  FaCss3Alt,
  FaCode,
  FaGrinSquint,
  FaSkull,
  FaJsSquare,
  FaGlassCheers,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

// ---- Strict icon keys ----
const ICON_KEYS = [
  'refresh',
  'css',
  'code',
  'lightbulb',
  'crazy',
  'fire',
  'skull',
  'javascript',
  'party',
] as const;

type FactIcon = typeof ICON_KEYS[number];
type Fact = Readonly<{ text: string; icon: FactIcon }>;
type UnknownFact = { text?: unknown; icon?: unknown };

const isFactIcon = (v: unknown): v is FactIcon =>
  typeof v === 'string' && (ICON_KEYS as readonly string[]).includes(v);

// icon key -> FA component
const ICON_COMPONENT_MAP: Record<FactIcon, IconType> = {
  refresh: FaSyncAlt,
  css: FaCss3Alt,
  code: FaCode,
  lightbulb: FaLightbulb,
  crazy: FaGrinSquint,
  fire: FaFire,
  skull: FaSkull,
  javascript: FaJsSquare,
  party: FaGlassCheers,
};

// helper to safely coerce unknown array
function toUnknownFacts(input: unknown): ReadonlyArray<UnknownFact> {
  return Array.isArray(input) ? (input as ReadonlyArray<UnknownFact>) : [];
}

export default function AboutSection({
  data,
}: {
  data: AboutData & { memeBio?: string };
}) {
  const { isMemeMode } = useMemeMode();

  const hoverAnim: Variants = {
    rest: { y: 0, scale: 1 },
    hover: { y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 180, damping: 12 } },
  };

  const currentTitle = isMemeMode ? data.memeTitle : data.title;
  const currentSubtitle = isMemeMode ? data.memeSubtitle : data.subtitle;
  const currentBio = isMemeMode ? (data.memeBio ?? data.bio) : data.bio;

  // ✅ Move sourceFacts logic inside useMemo to satisfy react-hooks/exhaustive-deps
  const facts: Fact[] = useMemo(() => {
    const raw = isMemeMode ? data.memeFacts : data.normalFacts; // may be undefined or invalid
    const arr = toUnknownFacts(raw);

    // Step 1: ensure text is a non-empty string and icon exists
    const step1 = arr
      .map((f) => {
        const text = typeof f?.text === 'string' ? f.text.trim() : '';
        const icon = f?.icon;
        return text ? { text, icon } : null;
      })
      .filter((f): f is { text: string; icon: unknown } => f !== null && typeof f.icon !== 'undefined');

    // Step 2: ensure icon is a string
    const step2 = step1.filter(
      (f): f is { text: string; icon: string } => typeof f.icon === 'string'
    );

    // Step 3: ensure icon matches our FactIcon union
    const step3 = step2.filter((f): f is Fact => isFactIcon(f.icon));

    return step3;
  }, [isMemeMode, data.memeFacts, data.normalFacts]);

  const hasFacts = facts.length > 0;
  const currentButtonText = isMemeMode ? data.buttonText?.meme : data.buttonText?.normal;

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Fact | null>(null);

  const openRandomFact = () => {
    if (!facts.length) return;
    const idx = Math.floor(Math.random() * facts.length);
    setSelected(facts[idx]);
    setIsOpen(true);
  };

  const boxShadowClass = isMemeMode
    ? 'shadow-[8px_8px_0_0_rgba(59,130,246,0.30)]'
    : 'shadow-[8px_8px_0_0_rgba(0,0,0,0.20)]';

  const SelectedIcon: IconType | undefined = selected ? ICON_COMPONENT_MAP[selected.icon] : undefined;

  return (
    <DoodleSection
      bgImage={data.illustration}
      divider={true}
      className={`pt-0 pb-20 -mt-16 ${isMemeMode
        ? 'bg-gradient-to-br from-green-100 to-blue-100'
        : 'bg-gradient-to-br from-pink-50 to-purple-50'
        }`}
      bgPosition="top center"
    >
      {/* Wrapper so we can position doodles around the card, not inside it */}
      <div className="relative max-w-4xl mx-auto px-8">
        {/* Visible doodles placed AROUND the card (no clipping) */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          {isMemeMode ? (
            <>
              <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-green-200/60 blur-xl" />
              <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-blue-200/60 blur-xl" />
              <div className="absolute top-1/3 -left-14 w-20 h-20 rounded-full bg-yellow-200/60 blur-lg" />
              <div className="absolute bottom-1/3 -right-14 w-24 h-24 rounded-full bg-cyan-200/50 blur-lg" />
            </>
          ) : (
            <>
              <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-purple-100/70 blur-2xl" />
              <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-pink-100/70 blur-2xl" />
              <div className="absolute top-1/3 -left-14 w-20 h-20 rounded-full bg-fuchsia-100/70 blur-xl" />
              <div className="absolute bottom-1/3 -right-14 w-24 h-24 rounded-full bg-rose-100/70 blur-xl" />
            </>
          )}
        </div>

        {/* Card */}
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={hoverAnim}
          className={[
            'relative z-10 px-8 py-12',
            isMemeMode ? 'bg-green-50/90' : 'bg-white',
            'border-4',
            isMemeMode ? 'border-green-500' : 'border-black',
            'rounded-2xl',
            boxShadowClass,
          ].join(' ')}
        >
          {/* Corner accent */}
          <div className={`absolute top-0 right-0 w-24 h-24 ${isMemeMode ? 'bg-blue-200/70' : 'bg-pink-100'} clip-corner`} />

          {/* Sticker */}
          <div
            className={`absolute -top-6 -right-6 ${isMemeMode ? 'bg-blue-400' : 'bg-yellow-200'} border-4 ${isMemeMode ? 'border-green-500' : 'border-[var(--panel-border,#000)]'
              } rounded-full w-16 h-16 flex items-center justify-center text-3xl rotate-12 shadow-md`}
          >
            <FaGlassCheers className={isMemeMode ? 'text-white' : 'text-black'} />
          </div>

          {currentTitle && (
            <h2
              className={`text-4xl md:text-5xl font-bold mb-2 ${isMemeMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500' : 'text-gray-900'
                }`}
              style={{ fontFamily: 'Permanent Marker, cursive' }}
            >
              {currentTitle}
            </h2>
          )}

          {currentSubtitle && (
            <p className={`text-xl md:text-2xl italic mb-6 font-medium ${isMemeMode ? 'text-blue-600' : 'text-pink-600'}`}>
              {currentSubtitle}
            </p>
          )}

          {currentBio && (
            <div
              className={`prose prose-lg md:prose-xl mx-auto ${isMemeMode ? 'text-gray-800' : 'text-gray-700'}`}
              dangerouslySetInnerHTML={{ __html: currentBio }}
            />
          )}

          {hasFacts && currentButtonText && (
            <motion.button
              onClick={openRandomFact}
              className={[
                'mt-8 px-6 py-3 rounded-full border-2 text-sm font-bold transition-all duration-300 flex items-center mx-auto',
                isMemeMode
                  ? 'bg-green-400 hover:bg-blue-500 text-black border-yellow-400 shadow-[4px_4px_0_0_rgba(245,158,11,1)] hover:shadow-[6px_6px_0_0_rgba(59,130,246,1)]'
                  : 'bg-lime-400 hover:bg-pink-500 text-black border-[var(--panel-border,#000)]',
              ].join(' ')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMemeMode ? <FaFire className="mr-2" /> : <FaLightbulb className="mr-2" />}
              {currentButtonText}
            </motion.button>
          )}
        </motion.div>
      </div>
      <Modal isOpen={isOpen && !!selected} onClose={() => setIsOpen(false)} title="Random Dev Fact" icon={SelectedIcon} size="sm" > <p className="text-lg font-medium">{selected?.text}</p> </Modal>

      {/* keep the clip-corner helper */}
      <style jsx>{`
        .clip-corner {
          clip-path: polygon(100% 0, 0% 100%, 100% 100%);
        }
      `}</style>
    </DoodleSection>
  );

}
