'use client'

// Colored-pencil portraits of me (one per hair colour) scattered randomly around
// the edges of the splash screen, popping in one by one as the page loads.

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

// [file, width, height]
const PORTRAITS: [string, number, number][] = [
  ['me1', 213, 282], ['me2', 206, 310], ['me4', 203, 284], ['me5', 203, 267], ['me6', 202, 272],
  ['me7', 203, 285], ['me8', 204, 289], ['me9', 211, 291], ['me10', 213, 274], ['me11', 202, 261],
  ['me12', 265, 300], ['me13', 213, 292], ['me14', 283, 313], ['me15', 306, 313], ['me16', 206, 264],
  ['me18', 237, 307], ['me19', 210, 308], ['me20', 258, 305],
]

export const SPLASH_PORTRAIT_SRCS = PORTRAITS.map(([f]) => `/images/site/me/${f}.webp`)

type Placed = { src: string; w: number; h: number; x: number; y: number; size: number; rotate: number; at: number }

const sticker =
  '[filter:drop-shadow(0_0_1.5px_#fff)_drop-shadow(0_0_1.5px_#fff)_drop-shadow(0_10px_16px_rgba(0,0,0,0.45))]'

// a little see-through so they sit behind the main portrait and text
const OPACITY = 0.55
const GAP = 10 // px between neighbours

type Box = { l: number; t: number; r: number; b: number }
const overlaps = (a: Box, b: Box) => a.l < b.r + GAP && a.r + GAP > b.l && a.t < b.b + GAP && a.b + GAP > b.t

/** Random, non-overlapping spots around the edges, avoiding the portrait and text in the middle. */
function scatter(W: number, H: number): Placed[] {
  const small = W < 640
  const base = small ? 62 : W < 1100 ? 84 : 104
  const items = [...PORTRAITS].sort(() => Math.random() - 0.5)
  // keep-out zone for the main portrait, name and progress text
  const centreHalfW = Math.min(W * (small ? 0.36 : 0.22), 260)
  const centre: Box = { l: W / 2 - centreHalfW, r: W / 2 + centreHalfW, t: H * 0.14, b: H * 0.9 }
  const boxes: Box[] = []
  const placed: Placed[] = []

  items.forEach(([f, w, h]) => {
    if (small && placed.length >= 10) return
    const size = base * (0.85 + Math.random() * 0.3)
    const rotate = (Math.random() - 0.5) * 24
    // exact bounding box of the image after its tilt
    const rad = Math.abs((rotate * Math.PI) / 180)
    const iw = size
    const ih = size * (h / w)
    const bw = iw * Math.cos(rad) + ih * Math.sin(rad)
    const bh = ih * Math.cos(rad) + iw * Math.sin(rad)
    for (let tries = 0; tries < 400; tries++) {
      const x = bw / 2 + 4 + Math.random() * (W - bw - 8)
      const y = bh / 2 + 4 + Math.random() * (H - bh - 8)
      const box = { l: x - bw / 2, r: x + bw / 2, t: y - bh / 2, b: y + bh / 2 }
      if (overlaps(box, centre) || boxes.some(o => overlaps(box, o))) continue
      boxes.push(box)
      placed.push({ src: `/images/site/me/${f}.webp`, w, h, x, y, size, rotate, at: 0 })
      break
    }
    // no clean spot left: skip this one rather than overlap
  })
  // spread the pop-ins over the load
  placed.forEach((p, i) => { p.at = 4 + (i / Math.max(placed.length, 1)) * 86 })
  return placed
}

export default function SplashPortraits({ progress, reduced }: { progress: number; reduced: boolean }) {
  // positions depend on the window, so they're picked after mount (no SSR mismatch)
  const [items, setItems] = useState<Placed[]>([])
  useEffect(() => {
    setItems(scatter(window.innerWidth, window.innerHeight))
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {items.map(p => (
        <div
          key={p.src}
          className="absolute"
          style={{ left: p.x, top: p.y, width: p.size, transform: 'translate(-50%, -50%)' }}
        >
          <AnimatePresence>
            {progress >= p.at && (
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.3, rotate: p.rotate - 25 }}
                animate={{ opacity: OPACITY, scale: 1, rotate: p.rotate }}
                transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 260, damping: 15 }}
              >
                <Image src={p.src} alt="" width={p.w} height={p.h} className={`w-full ${sticker}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
