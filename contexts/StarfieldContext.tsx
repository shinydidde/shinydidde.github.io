'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const STARFIELD_STORAGE_KEY = 'starfield-enabled';

function readStoredStarfield(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem(STARFIELD_STORAGE_KEY);
  if (stored === '0' || stored === 'false') return false;
  if (stored === '1' || stored === 'true') return true;
  return true;
}

interface StarfieldContextType {
  starfieldOn: boolean;
  setStarfieldOn: (on: boolean) => void;
  toggleStarfield: () => void;
}

const StarfieldContext = createContext<StarfieldContextType | undefined>(undefined);

export function StarfieldProvider({ children }: { children: React.ReactNode }) {
  const [starfieldOn, setStarfieldOnState] = useState(true);

  useEffect(() => {
    setStarfieldOnState(readStoredStarfield());
  }, []);

  const setStarfieldOn = (on: boolean) => {
    setStarfieldOnState(on);
    localStorage.setItem(STARFIELD_STORAGE_KEY, on ? '1' : '0');
  };

  const toggleStarfield = () => {
    setStarfieldOnState(prev => {
      const next = !prev;
      localStorage.setItem(STARFIELD_STORAGE_KEY, next ? '1' : '0');
      return next;
    });
  };

  return (
    <StarfieldContext.Provider value={{ starfieldOn, setStarfieldOn, toggleStarfield }}>
      {children}
    </StarfieldContext.Provider>
  );
}

export function useStarfield() {
  const ctx = useContext(StarfieldContext);
  if (ctx === undefined) throw new Error('useStarfield must be used within StarfieldProvider');
  return ctx;
}
