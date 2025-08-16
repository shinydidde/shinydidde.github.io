// components/DesktopBlackCatWrapper.tsx
"use client";

import dynamic from 'next/dynamic';

const DesktopBlackCat = dynamic(
  () => import('@/components/DesktopBlackCat'),
  {
    ssr: false,
    loading: () => <div className="w-[80px] h-[70px]" /> // Optional loading state
  }
);

export default function DesktopBlackCatWrapper() {
  return <DesktopBlackCat />;
}
