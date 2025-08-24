'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface PlayfulContextType {
  isPlayfulMode: boolean;
  togglePlayfulMode: () => void;
}

const PlayfulContext = createContext<PlayfulContextType | undefined>(undefined);

export function PlayfulProvider({ children }: { children: React.ReactNode }) {
  const [isPlayfulMode, setIsPlayfulMode] = useState(false);

  // init from localStorage and apply body class and data attribute
  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('playful-mode') === '1';
    setIsPlayfulMode(saved);
    document.body.classList.toggle('playful-mode', saved);
    document.body.setAttribute('data-playful-mode', saved.toString());
  }, []);

  const togglePlayfulMode = () => {
    setIsPlayfulMode((prev) => {
      const next = !prev;
      document.body.classList.toggle('playful-mode', next);
      document.body.setAttribute('data-playful-mode', next.toString());
      try { localStorage.setItem('playful-mode', next ? '1' : '0'); } catch {}
      return next;
    });
  };

  return (
    <PlayfulContext.Provider value={{ isPlayfulMode, togglePlayfulMode }}>
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