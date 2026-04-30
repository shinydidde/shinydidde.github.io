'use client';

import { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

const SCROLL_SHOW_Y = 280;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { isPlayfulMode, isGoldMode } = usePlayfulMode();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_SHOW_Y);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const themeButton =
    isPlayfulMode
      ? 'bg-gradient-to-br from-vibrant-pink via-vibrant-cyan to-vibrant-yellow text-white border-2 border-vibrant-purple shadow-lg hover:shadow-xl hover:scale-110 focus:ring-vibrant-pink focus:ring-offset-2 focus:ring-offset-white'
      : isGoldMode
        ? 'bg-black/90 text-gold border-2 border-gold hover:bg-gold/15 hover:text-gold-light shadow-[0_0_20px_rgba(212,175,55,0.25)] focus:ring-gold focus:ring-offset-2 focus:ring-offset-black'
        : 'bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-md focus:ring-gray-500 focus:ring-offset-2';

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-[45] flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 md:bottom-8 md:right-8 ${themeButton} ${
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <FaChevronUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
