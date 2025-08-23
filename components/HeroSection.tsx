// components/HeroSection.tsx
'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FloatingIcons } from './ui/FloatingIcons';
import { Sticker } from './ui/Sticker';
import { usePlayfulMode } from '@/contexts/PlayfulContext';
import Modal from '@/components/ui/Modal';
import {
  FaLaughSquint,
  FaBug,
  FaCode,
  FaLeaf,
  FaPaw,
  FaGlobeAmericas,
  FaMagic,
  FaTerminal,
  FaStackOverflow
} from 'react-icons/fa';
import { GiBrain, GiElephant, GiButterfly } from 'react-icons/gi';
import { TbTrees } from 'react-icons/tb';

interface HeroData {
  name: string;
  avatarUrl: string;
  catchPhrase: string;
  scrollPrompt: string;
  normalRoles?: string[];
  playfulRoles?: string[];
  normalFacts?: string[];
  playfulFacts?: string[];
  playfulTitle?: string;
  playfulButtonText?: string;
  normalButtonText?: string;
  sticker1?: { emoji: string; text: string };
  sticker2?: { emoji: string; text: string };
}

const DEFAULT_NORMAL_ROLES = ["Web Developer", "Tech Lead", "Nature Lover"];
const DEFAULT_PLAYFUL_ROLES = ["Bug Creator", "Stack Overflow Expert", "Console.log() Master"];

const ICON_MAP = {
  code: <FaCode className="inline mr-2" />,
  brain: <GiBrain className="inline mr-2" />,
  leaf: <FaLeaf className="inline mr-2" />,
  paw: <FaPaw className="inline mr-2" />,
  globe: <FaGlobeAmericas className="inline mr-2" />,
  magic: <FaMagic className="inline mr-2" />,
  laugh: <FaLaughSquint className="inline mr-2" />,
  bug: <FaBug className="inline mr-2" />,
  stack: <FaStackOverflow className="inline mr-2" />,
  terminal: <FaTerminal className="inline mr-2" />,
  elephant: <GiElephant className="inline mr-2" />,
  trees: <TbTrees className="inline mr-2" />,
  butterfly: <GiButterfly className="inline mr-2" />
};

export default function HeroSection({ data }: { data: HeroData }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-15, 15]);
  const scale = useTransform(x, [-100, 100], [0.9, 1.1]);
  const { isPlayfulMode } = usePlayfulMode();

  // Modal state for "random fact"
  const [factOpen, setFactOpen] = useState(false);
  const [factText, setFactText] = useState<string>('');

  // All company logos for meme mode cycling
  const companyLogos = [
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme10.png?alt=media&token=adaef0b7-b922-43bd-9b0e-05f5bcdf6e57',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme13.png?alt=media&token=da893878-9802-4c89-804a-ed365f65858f',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme2.png?alt=media&token=04f22ca3-c55b-46d0-ac89-afef6b7dd015',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme1.png?alt=media&token=28c6dacb-d8bf-4d9e-826b-74a685cd5288',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme11.png?alt=media&token=74e449c2-66dd-4d59-8e10-b7f95387bfe8',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme12.png?alt=media&token=d38704ed-1946-4faa-ad4d-7084cdb82049',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme14.png?alt=media&token=9eb04aff-8b07-4dc6-a427-9ad4b07286f3',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme15.png?alt=media&token=d1ae069d-119f-44b7-a5ee-d3594e243f57',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme16.png?alt=media&token=23858447-6143-4b15-908c-0f96ec96ef04',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme18.png?alt=media&token=69b6b50d-e4d4-4afc-83c2-dcd83d17e17f',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme19.png?alt=media&token=6b857c78-0a8a-49c6-879c-2abf26dfebbe',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme20.png?alt=media&token=a4905b2c-87fe-4179-81b1-3ed6608718ed',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme4.png?alt=media&token=ac66531b-b88f-4fe4-a9f3-77b436fb23d7',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme5.png?alt=media&token=7fe5df8f-8d4d-4711-b7d5-d61dbdbbbe97',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme6.png?alt=media&token=0d1e790a-df98-483e-a7c6-471d371f4217',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme7.png?alt=media&token=a84179a3-d8fd-4ab9-9d40-57954867a904',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme8.png?alt=media&token=80520d0d-d05a-424e-abbd-f72185a2791c',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/logos%2Fme9.png?alt=media&token=758c1433-f749-46f3-9f6f-5efeeab12c30'
  ];

  const normalRoles = data.normalRoles || DEFAULT_NORMAL_ROLES;
  const playfulRoles = data.playfulRoles || DEFAULT_PLAYFUL_ROLES;

  const roles = isPlayfulMode
    ? playfulRoles.map(role => ({
        text: role,
        icon:
          ICON_MAP[
            role.toLowerCase().includes('bug') ? 'bug' :
            role.toLowerCase().includes('elephant') ? 'elephant' :
            role.toLowerCase().includes('nature') ? 'leaf' :
            role.toLowerCase().includes('stack') ? 'stack' :
            role.toLowerCase().includes('console') ? 'terminal' :
            'laugh'
          ] || ICON_MAP.laugh
      }))
    : normalRoles.map(role => ({
        text: role,
        icon:
          ICON_MAP[
            role.toLowerCase().includes('nature') ? 'leaf' :
            role.toLowerCase().includes('animal') ? 'paw' :
            role.toLowerCase().includes('travel') ? 'globe' :
            role.toLowerCase().includes('tech') ? 'brain' :
            role.toLowerCase().includes('magic') ? 'magic' :
            'code'
          ] || ICON_MAP.code
      }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlayfulMode, roles.length]);

  // Logo cycling effect for meme mode
  useEffect(() => {
    if (!isPlayfulMode) return;

    const logoInterval = setInterval(() => {
      setCurrentLogoIndex(prev => (prev + 1) % companyLogos.length);
    }, 5000);

    return () => clearInterval(logoInterval);
  }, [isPlayfulMode, companyLogos.length]);

  // Open modal instead of alert()
  const showRandomFact = () => {
    const facts = isPlayfulMode
      ? data.playfulFacts || ["Check out my creativity!"]
      : data.normalFacts || ["Interesting fact about me"];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setFactText(randomFact);
    setFactOpen(true);
  };

  return (
    <section
      className={`relative w-full min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden ${
        isPlayfulMode ? 'bg-gradient-to-br from-green-100 to-blue-100'
                   : 'bg-gradient-to-br from-purple-50 to-pink-50'
      }`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isPlayfulMode ? (
          <>
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-green-200/40 blur-xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-blue-200/40 blur-xl" />
          </>
        ) : (
          <>
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-200/40 blur-xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-pink-200/40 blur-xl" />
          </>
        )}
      </div>

      <FloatingIcons count={15} playfulMode={isPlayfulMode} />

      <motion.div
        className="relative z-10 mx-auto px-6 sm:px-0 flex flex-col items-center text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Avatar */}
        <motion.div
          className={`relative mb-8 w-40 h-40 border-black rounded-full border-4 ${
            isPlayfulMode
              ? 'shadow-[8px_8px_0_0_rgba(34,197,94,0.5)] hover:shadow-[12px_12px_0_0_rgba(59,130,246,0.5)]'
              : 'shadow-[8px_8px_0_0_rgba(168,85,247,0.5)] hover:shadow-[12px_12px_0_0_rgba(236,72,153,0.5)]'
          } transition-all`}
          whileHover={{
            rotate: isPlayfulMode ? [0, -10, 10, -10, 0] : [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: -50, right: 50 }}
          style={{ x, rotate, scale }}
          onDragEnd={() => animate(x, 0, { type: 'spring', stiffness: 300 })}
        >
          <Image
            src={isPlayfulMode ? companyLogos[currentLogoIndex] : data.avatarUrl}
            alt={isPlayfulMode ? `Company logo ${currentLogoIndex + 1}` : `${data.name} avatar`}
            fill
            className="object-contain rounded-full"
            priority
          />
          <motion.div
            className="absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white"
            animate={{
              scale: [1, 1.2, 1],
              backgroundColor: isPlayfulMode
                ? ['#10b981', '#3b82f6', '#f59e0b']
                : ['#8b5cf6', '#ec4899', '#8b5cf6']
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl font-bold mb-2 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundImage: isPlayfulMode
              ? 'linear-gradient(to right, #10b981, #3b82f6, #f59e0b)'
              : 'linear-gradient(to right, #9333ea, #ec4899)'
          }}
        >
          {isPlayfulMode ? data.playfulTitle || data.name.toUpperCase() : data.name}
        </motion.h1>

        {/* Role */}
        <motion.div
          className="text-2xl sm:text-3xl font-medium mb-6 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            key={currentRoleIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-block bg-clip-text text-transparent ${
              isPlayfulMode ? 'bg-gradient-to-r from-green-500 to-blue-500'
                         : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
          >
            {roles[currentRoleIndex].icon}
            {roles[currentRoleIndex].text}
          </motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl mb-8 max-w-lg relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {data.catchPhrase}
          <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 200 10" preserveAspectRatio="none">
            <path
              d="M0,5 C50,0 50,10 100,5 C150,0 150,10 200,5"
              fill="none"
              stroke={isPlayfulMode ? "#3b82f6" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="#projects"
            className={`px-6 py-3 rounded-full font-bold ${
              isPlayfulMode
                ? 'bg-green-400 text-black shadow-[4px_4px_0_0_rgba(59,130,246,1)] hover:shadow-[8px_8px_0_0_rgba(245,158,11,1)]'
                : 'bg-purple-600 text-white shadow-[4px_4px_0_0_rgba(168,85,247,1)] hover:shadow-[8px_8px_0_0_rgba(236,72,153,1)]'
            } transition-all`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlayfulMode ? data.playfulButtonText || 'Explore My Work' : data.normalButtonText || 'View My Work'}
          </motion.a>

          <motion.button
            onClick={showRandomFact}
            className={`px-6 py-3 rounded-full font-bold border-2 ${
              isPlayfulMode ? 'bg-white text-black border-blue-500'
                         : 'bg-white text-black border-pink-500'
            } transition-all`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlayfulMode ? (
              <>
                {/* keep icon visual parity with playful mode */}
                <FaLaughSquint className="inline mr-2" />
                {data.playfulButtonText || 'Random Fact'}
              </>
            ) : (
              <>
                <FaLeaf className="inline mr-2" />
                {data.normalButtonText || 'Fun Fact'}
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Scroll */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-sm mb-2">{data.scrollPrompt}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={isPlayfulMode ? "#3b82f6" : "currentColor"}>
              <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Stickers */}
        {data.sticker1 && (
          <Sticker emoji={data.sticker1.emoji} text={data.sticker1.text} position="top-right" rotate={15} playfulMode={isPlayfulMode} />
        )}
        {data.sticker2 && (
          <Sticker emoji={data.sticker2.emoji} text={data.sticker2.text} position="bottom-left" rotate={-10} playfulMode={isPlayfulMode} />
        )}
      </motion.div>

      {/* Random Fact Modal */}
      <Modal
        isOpen={factOpen}
        onClose={() => setFactOpen(false)}
        title={isPlayfulMode ? 'RANDOM CHAOS FACT' : 'Random Fun Fact'}
        icon={isPlayfulMode ? FaLaughSquint : FaLeaf}
        size="sm"
      >
        <p className="text-lg">{factText}</p>
      </Modal>
    </section>
  );
}
