'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchSiteSettings, updateSiteSettings } from '@/lib/firestoreService';

interface StarfieldContextType {
  starfieldOn: boolean;
  setStarfieldOn: (on: boolean) => void;
  toggleStarfield: () => void;
  loading: boolean;
}

const StarfieldContext = createContext<StarfieldContextType | undefined>(undefined);

export function StarfieldProvider({ children }: { children: React.ReactNode }) {
  const [starfieldOn, setStarfieldOnState] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings()
      .then((data) => {
        if (!cancelled) setStarfieldOnState(data.starfieldEnabled);
      })
      .catch(() => { /* keep default */ })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const setStarfieldOn = (on: boolean) => {
    setStarfieldOnState(on);
    updateSiteSettings({ starfieldEnabled: on }).catch(() => { /* persist locally failed */ });
  };

  const toggleStarfield = () => {
    setStarfieldOnState((prev) => {
      const next = !prev;
      updateSiteSettings({ starfieldEnabled: next }).catch(() => {});
      return next;
    });
  };

  return (
    <StarfieldContext.Provider value={{ starfieldOn, setStarfieldOn, toggleStarfield, loading }}>
      {children}
    </StarfieldContext.Provider>
  );
}

export function useStarfield() {
  const ctx = useContext(StarfieldContext);
  if (ctx === undefined) throw new Error('useStarfield must be used within StarfieldProvider');
  return ctx;
}
