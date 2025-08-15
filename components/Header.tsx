// app/components/Header.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SquigglyUnderline } from './ui/SquigglyUnderline';
import { useMemeMode } from '@/contexts/MemeContext';
import { FaLaughSquint, FaGraduationCap } from 'react-icons/fa';

interface HeaderProps {
  hero: {
    name: string;
    logo: string;
  };
  navItems?: {
    name: string;
    href: string;
  }[];
  memeNavItems?: {
    name: string;
    href: string;
  }[];
}

const DEFAULT_NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Work', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
];

const DEFAULT_MEME_NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Skillz', href: '#skills' },
  { name: 'Work', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Edu-meme-cation', href: '#education' },
];

export default function Header({ hero, navItems, memeNavItems }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isMemeMode, toggleMemeMode } = useMemeMode();

  // Use provided nav items or fallback to defaults
  const currentNavItems = isMemeMode
    ? memeNavItems || DEFAULT_MEME_NAV_ITEMS
    : navItems || DEFAULT_NAV_ITEMS;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMemeModeToggle = () => {
    toggleMemeMode();
    setMobileMenuOpen(false);
  };

  const getNavItemDisplay = (name: string) => {
    if (isMemeMode && name === 'Education') {
      return (
        <span className="flex items-center">
          Edu-meme-cation <FaGraduationCap className="ml-2" />
        </span>
      );
    }
    if (isMemeMode && name === 'Skills') {
      return (
        <span className="flex items-center">
          Skillz <FaLaughSquint className="ml-2" />
        </span>
      );
    }
    return name;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 shadow-lg py-2 border-b-2 border-black'
          : 'bg-transparent py-4'
      } ${isMemeMode ? 'meme-mode-header' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with fun hover effect */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: isMemeMode ? [0, -10, 10, -10, 0] : [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
          >
            <Link href="#" className="flex items-center gap-3 group" aria-label="Home">
              <div className="relative w-10 h-10">
                <Image
                  src={hero.logo}
                  alt={`${hero.name} Logo`}
                  fill
                  className={`rounded-full border-2 ${
                    isMemeMode
                      ? 'border-yellow-400 group-hover:border-red-500'
                      : 'border-purple-500 group-hover:border-pink-500'
                  } transition-colors`}
                  priority
                />
                <motion.div
                  className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full border-2 border-white"
                  animate={{
                    scale: [1, 1.2, 1],
                    backgroundColor: isMemeMode
                      ? ['#ff0000', '#00ff00', '#0000ff']
                      : ['#4ade80', '#22d3ee', '#4ade80']
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <span className={`text-xl font-bold bg-clip-text ${
                isMemeMode
                  ? 'text-transparent bg-gradient-to-r from-red-500 via-green-500 to-blue-500'
                  : 'text-transparent bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                {hero.name}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-2 py-1 font-medium group"
              >
                <span className={`relative z-10 ${isMemeMode ? 'font-meme' : ''}`}>
                  {getNavItemDisplay(item.name)}
                </span>
                <SquigglyUnderline color={isMemeMode ? '#FFD700' : '#EC4899'} />
                {pathname === item.href && (
                  <motion.span
                    layoutId="activeNavItem"
                    className={`absolute left-0 top-full w-full h-0.5 ${
                      isMemeMode ? 'bg-yellow-400' : 'bg-pink-500'
                    }`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
            <motion.button
              onClick={handleMemeModeToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                isMemeMode
                  ? 'bg-yellow-400 text-black shadow-[4px_4px_0_0_rgba(255,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,255,0,1)]'
                  : 'bg-black text-white shadow-[4px_4px_0_0_rgba(236,72,153,1)] hover:shadow-[6px_6px_0_0_rgba(236,72,153,1)]'
              }`}
              aria-label={isMemeMode ? 'Disable meme mode' : 'Enable meme mode'}
            >
              {isMemeMode ? 'Normal Mode 🏁' : 'Meme Mode 🚀'}
            </motion.button>
          </nav>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-black focus:outline-none relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                className="text-2xl"
              >
                ✕
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                className="flex flex-col gap-1"
              >
                <motion.span className={`w-6 h-0.5 rounded-full ${isMemeMode ? 'bg-yellow-500' : 'bg-black'}`} />
                <motion.span className={`w-6 h-0.5 rounded-full ${isMemeMode ? 'bg-yellow-500' : 'bg-black'}`} />
                <motion.span className={`w-6 h-0.5 rounded-full ${isMemeMode ? 'bg-yellow-500' : 'bg-black'}`} />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden fixed inset-0 z-40 pt-24 px-6 flex flex-col gap-6 ${
                isMemeMode ? 'bg-yellow-50' : 'bg-white'
              }`}
            >
              {currentNavItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl font-bold block py-3 ${
                      isMemeMode ? 'font-meme text-black' : 'text-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {getNavItemDisplay(item.name)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: currentNavItems.length * 0.1 }}
                className="mt-8"
              >
                <button
                  onClick={handleMemeModeToggle}
                  className={`w-full py-3 rounded-full font-bold text-lg ${
                    isMemeMode
                      ? 'bg-yellow-400 text-black'
                      : 'bg-black text-white'
                  }`}
                >
                  {isMemeMode ? 'Normal Mode 🏁' : 'Meme Mode 🎉'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
