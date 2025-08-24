// components/DesktopBlackCatWrapper.tsx
"use client";

import dynamic from 'next/dynamic';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

const DesktopBlackCat = dynamic(
  () => import('@/components/DesktopBlackCat'),
  {
    ssr: false,
    loading: () => <div className="w-[80px] h-[70px]" /> // Optional loading state
  }
);

export default function DesktopBlackCatWrapper() {
  const { isPlayfulMode } = usePlayfulMode();

  if (!isPlayfulMode) {
    return null;
  }

  return (
    <div className="hidden md:block">
      <DesktopBlackCat />
    </div>
  );
}
