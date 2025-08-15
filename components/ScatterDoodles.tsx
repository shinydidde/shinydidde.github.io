'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const doodleFiles = [
  '/doodles/leaf.svg',
  '/doodles/me.svg',
  '/doodles/paw.svg',
  '/doodles/code-brackets.svg',
  '/doodles/bird.svg',
  '/doodles/me1.svg',
];

type DoodleSpec = { src: string; top: string; left: string; width: number; duration: number };

export default function ScatterDoodles() {
  const [specs, setSpecs] = useState<DoodleSpec[] | null>(null);

  useEffect(() => {
    const s = doodleFiles.map((src) => ({
      src,
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      width: 40 + Math.random() * 80,
      duration: 8 + Math.random() * 4,
    }));
    setSpecs(s);
  }, []);

  if (!specs) return null;

  return (
    <>
      {specs.map((d, i) => (
        <motion.img
          key={i}
          src={d.src}
          className="doodle absolute"
          style={{ top: d.top, left: d.left, width: d.width }}
          animate={{ rotate: [0, 5, -5, 0], y: [0, -3, 3, 0] }}
          transition={{ duration: d.duration, repeat: Infinity, ease: 'easeInOut' }}
          alt=""
          aria-hidden
        />
      ))}
    </>
  );
}
