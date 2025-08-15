// components/MemePopup.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    showMeme?: () => void;
  }
}

// Keep memes stable so callbacks/effects don't change every render
const MEMES = [
  "When the Lighthouse score is 100 but IE11 still exists:",
  "Me explaining why we need to refactor (for the 5th time):",
  "When someone says 'just use jQuery':",
  "My face when the tests pass on the first try:",
  "Debugging CSS be like:",
];

export default function MemePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [memeText, setMemeText] = useState('');

  const showRandomMeme = useCallback(() => {
    setMemeText(MEMES[Math.floor(Math.random() * MEMES.length)]);
    setShowPopup(true);
  }, []);

  // Expose to window with proper deps (no eslint warning)
  useEffect(() => {
    window.showMeme = showRandomMeme;
    return () => {
      delete window.showMeme;
    };
  }, [showRandomMeme]);

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white p-4 rounded-lg shadow-xl border-4 border-black max-w-xs">
        <div className="font-bold text-xl mb-2">{memeText}</div>
        <button
          onClick={() => setShowPopup(false)}
          className="text-sm text-gray-500 hover:text-black"
        >
          [close]
        </button>
      </div>
    </div>
  );
}
