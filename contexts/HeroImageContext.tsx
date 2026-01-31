'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchSiteSettings, updateSiteSettings } from '@/lib/firestoreService';

export type HeroImageMode = 'current' | 'full';

interface HeroImageContextType {
  heroImageMode: HeroImageMode;
  setHeroImageMode: (mode: HeroImageMode) => void;
  isFullImage: boolean;
  loading: boolean;
}

const HeroImageContext = createContext<HeroImageContextType | undefined>(undefined);

export function HeroImageProvider({ children }: { children: React.ReactNode }) {
  const [heroImageMode, setHeroImageModeState] = useState<HeroImageMode>('current');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings()
      .then((data) => {
        if (!cancelled) setHeroImageModeState(data.heroImageMode);
      })
      .catch(() => { /* keep default */ })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const setHeroImageMode = (mode: HeroImageMode) => {
    setHeroImageModeState(mode);
    updateSiteSettings({ heroImageMode: mode }).catch(() => {});
  };

  return (
    <HeroImageContext.Provider
      value={{
        heroImageMode,
        setHeroImageMode,
        isFullImage: heroImageMode === 'full',
        loading,
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
