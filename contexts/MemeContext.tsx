// contexts/MemeContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

interface MemeContextType {
  isMemeMode: boolean;
  toggleMemeMode: () => void;
}

const MemeContext = createContext<MemeContextType | undefined>(undefined);

export function MemeProvider({ children }: { children: React.ReactNode }) {
  const [isMemeMode, setIsMemeMode] = useState(false);

  const toggleMemeMode = () => {
    setIsMemeMode(!isMemeMode);
    if (!isMemeMode) {
      document.body.classList.add('meme-mode');
    } else {
      document.body.classList.remove('meme-mode');
    }
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
