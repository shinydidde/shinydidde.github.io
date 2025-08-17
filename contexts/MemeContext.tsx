'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface MemeContextType {
  isMemeMode: boolean;
  toggleMemeMode: () => void;
}

const MemeContext = createContext<MemeContextType | undefined>(undefined);

export function MemeProvider({ children }: { children: React.ReactNode }) {
  const [isMemeMode, setIsMemeMode] = useState(false);

  // init from localStorage and apply body class
  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('meme-mode') === '1';
    setIsMemeMode(saved);
    document.body.classList.toggle('meme-mode', saved);
  }, []);

  const toggleMemeMode = () => {
    setIsMemeMode((prev) => {
      const next = !prev;
      document.body.classList.toggle('meme-mode', next);
      try { localStorage.setItem('meme-mode', next ? '1' : '0'); } catch {}
      return next;
    });
  };

  return (
    <MemeContext.Provider value={{ isMemeMode, toggleMemeMode }}>
      {children}
    </MemeContext.Provider>
  );
}

export function useMemeMode() {
  const context = useContext(MemeContext);
  if (context === undefined) {
    throw new Error('useMemeMode must be used within a MemeProvider');
  }
  return context;
}
