'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'gold' | 'playful' | 'grayscale';

interface PlayfulContextType {
  themeMode: ThemeMode;
  isPlayfulMode: boolean;
  isGoldMode: boolean;
  isGrayscaleMode: boolean;
  setTheme: (mode: ThemeMode) => void;
  /** Button: cycle only between gold and grayscale */
  cycleGoldGrayscale: () => void;
  /** Full cycle (gold → playful → grayscale → gold) - kept for compatibility */
  cycleTheme: () => void;
  togglePlayfulMode: () => void;
}

const PlayfulContext = createContext<PlayfulContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme-mode';
const MODES: ThemeMode[] = ['gold', 'playful', 'grayscale'];

function readStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'gold';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'playful' || stored === 'grayscale' || stored === 'gold') return stored;
  // Migrate old playful-mode key
  const legacy = localStorage.getItem('playful-mode');
  if (legacy === '1') return 'playful';
  if (legacy === '0') return 'gold';
  return 'gold';
}

export function PlayfulProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('gold');

  useEffect(() => {
    const saved = readStoredTheme();
    setThemeModeState(saved);
    document.body.classList.remove('playful-mode', 'theme-gold', 'theme-grayscale');
    document.body.classList.add(`theme-${saved}`);
    document.body.setAttribute('data-theme', saved);
    if (saved === 'playful') document.body.classList.add('playful-mode');
    document.body.setAttribute('data-playful-mode', (saved === 'playful').toString());
  }, []);

  const setTheme = (next: ThemeMode) => {
    setThemeModeState(next);
    document.body.classList.remove('playful-mode', 'theme-gold', 'theme-grayscale');
    document.body.classList.add(`theme-${next}`);
    document.body.setAttribute('data-theme', next);
    if (next === 'playful') document.body.classList.add('playful-mode');
    document.body.setAttribute('data-playful-mode', (next === 'playful').toString());
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  const cycleTheme = () => {
    const idx = MODES.indexOf(themeMode);
    const next = MODES[(idx + 1) % MODES.length];
    setTheme(next);
  };

  /** Cycle only gold ↔ grayscale (for the theme button). From playful, go to gold. */
  const cycleGoldGrayscale = () => {
    if (themeMode === 'playful') setTheme('gold');
    else if (themeMode === 'gold') setTheme('grayscale');
    else setTheme('gold');
  };

  const togglePlayfulMode = () => {
    const next = themeMode === 'playful' ? 'grayscale' : 'playful';
    setTheme(next);
  };

  const isPlayfulMode = themeMode === 'playful';
  const isGoldMode = themeMode === 'gold';
  const isGrayscaleMode = themeMode === 'grayscale';

  return (
    <PlayfulContext.Provider
      value={{
        themeMode,
        isPlayfulMode,
        isGoldMode,
        isGrayscaleMode,
        setTheme,
        cycleGoldGrayscale,
        cycleTheme,
        togglePlayfulMode,
      }}
    >
      {children}
    </PlayfulContext.Provider>
  );
}

export function usePlayfulMode() {
  const context = useContext(PlayfulContext);
  if (context === undefined) {
    throw new Error('usePlayfulMode must be used within a PlayfulProvider');
  }
  return context;
}
