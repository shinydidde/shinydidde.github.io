'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const HERO_IMAGE_STORAGE_KEY = 'hero-image-mode';

export type HeroImageMode = 'current' | 'full';

function readStoredHeroImageMode(): HeroImageMode {
  if (typeof window === 'undefined') return 'current';
  const stored = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
  if (stored === 'full' || stored === 'current') return stored;
  return 'current';
}

interface HeroImageContextType {
  heroImageMode: HeroImageMode;
  setHeroImageMode: (mode: HeroImageMode) => void;
  isFullImage: boolean;
}

const HeroImageContext = createContext<HeroImageContextType | undefined>(undefined);

export function HeroImageProvider({ children }: { children: React.ReactNode }) {
  const [heroImageMode, setHeroImageModeState] = useState<HeroImageMode>('current');

  useEffect(() => {
    setHeroImageModeState(readStoredHeroImageMode());
  }, []);

  const setHeroImageMode = (mode: HeroImageMode) => {
    setHeroImageModeState(mode);
    localStorage.setItem(HERO_IMAGE_STORAGE_KEY, mode);
  };

  return (
    <HeroImageContext.Provider
      value={{
        heroImageMode,
        setHeroImageMode,
        isFullImage: heroImageMode === 'full',
      }}
    >
      {children}
    </HeroImageContext.Provider>
  );
}

export function useHeroImage() {
  const ctx = useContext(HeroImageContext);
  if (ctx === undefined) throw new Error('useHeroImage must be used within HeroImageProvider');
  return ctx;
}
