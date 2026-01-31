'use client';

import { usePlayfulMode } from '@/contexts/PlayfulContext';
import { useStarfield } from '@/contexts/StarfieldContext';
import StarfieldBackground from './StarfieldBackground';

export default function StarfieldBackgroundWrapper() {
  const { isGoldMode } = usePlayfulMode();
  const { starfieldOn } = useStarfield();

  if (!isGoldMode || !starfieldOn) return null;

  return (
    <StarfieldBackground className="fixed inset-0 w-full h-full pointer-events-none z-0" />
  );
}
