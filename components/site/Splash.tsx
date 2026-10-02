'use client'

// Loading splash: the sketch portrait gets "painted" in colour by a rising
// wave as the page loads, while coloured-pencil portraits pop in around the screen.
// Shown once per browser session (see SPLASH_INIT_SCRIPT in app/layout.tsx).

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PRISM, prismAt } from './format'
import SplashPortraits, { SPLASH_PORTRAIT_SRCS } from './SplashPortraits'

export const SPLASH_DONE_EVENT = 'splash:done'

/** True once the splash has gone (or was skipped), so intros can play in view. */
export function useSplashDone() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    if ((window as Window & { __splashDone?: boolean }).__splashDone) return setDone(true)
    const on = () => setDone(true)
    window.addEventListener(SPLASH_DONE_EVENT, on)
    return () => window.removeEventListener(SPLASH_DONE_EVENT, on)
  }, [])
  return done
}

const MESSAGES = [
  'Waking up the cats…',
  'Bribing the dog with treats…',
  'Watering the trees…',
  'Polishing the stars…',
  'Centering a div…',
  'Feeding the fireflies…',
  'Untangling the yarn…',
]

// Deterministic star field so server and client markup match
const STARS = Array.from({ length: 46 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1
  // fixed-precision strings so server and client serialise identically
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    top: `${(r(2) * 100).toFixed(2)}%`,
    size: `${(1 + r(3) * 2.5).toFixed(1)}px`,
    delay: `${(r(4) * 3).toFixed(2)}s`,
    color: prismAt(i),
  }
})

function Paw({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
      <ellipse cx="20" cy="27" rx="9" ry="8" fill={color} />
      <ellipse cx="9" cy="16" rx="4" ry="5" fill={color} />
      <ellipse cx="16" cy="9" rx="4" ry="5" fill={color} />
      <ellipse cx="24" cy="9" rx="4" ry="5" fill={color} />
      <ellipse cx="31" cy="16" rx="4" ry="5" fill={color} />
    </svg>
  )
}

export default function Splash({ name }: { name: string }) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [shown, setShown] = useState(0) // displayed progress 0..100
  const [msg, setMsg] = useState(0)
  const [celebrate, setCelebrate] = useState(false)
  const paint = useRef<HTMLDivElement>(null)
  const exiting = useRef(false)

  const finish = () => {
    if (exiting.current) return
    exiting.current = true
    try { sessionStorage.setItem('splash-seen', '1') } catch {}
    setVisible(false)
    ;(window as Window & { __splashDone?: boolean }).__splashDone = true
    window.dispatchEvent(new Event(SPLASH_DONE_EVENT))
  }

  // Already seen this session: the init script hid us before paint, just unmount.
  const [skipped, setSkipped] = useState(false)
  useEffect(() => {
    if (document.documentElement.dataset.splashSeen) {
      setSkipped(true)
      finish()
    }
  }, [])

  // Progress: real load signals + a minimum runtime so the animation can breathe
  useEffect(() => {
    if (exiting.current) return
    const start = performance.now()
    const minTime = reduced ? 900 : 3200
    const maxTime = 8000
    let signals = 0
    const TOTAL = 3
    const bump = () => { signals++ }

    document.fonts?.ready.then(bump, bump)
    Promise.all(
      [...SPLASH_PORTRAIT_SRCS, '/images/site/face-color.webp', '/images/site/face-sketch.webp'].map(
        src => new Promise<void>(res => { const im = new window.Image(); im.onload = im.onerror = () => res(); im.src = src })
      )
    ).then(bump)
    if (document.readyState === 'complete') bump()
    else window.addEventListener('load', bump, { once: true })

    let shownLocal = 0
    let raf = 0
    let doneAt = 0
    const tick = (now: number) => {
      const elapsed = now - start
      const timeShare = Math.min(elapsed / minTime, 1)
      // never run ahead of real loading, never stall forever
      const target = elapsed > maxTime ? 100 : Math.min(timeShare * 100, 18 + (signals / TOTAL) * 82)
      shownLocal += (target - shownLocal) * (reduced ? 0.3 : 0.07)
      if (target === 100 && shownLocal > 99.5) shownLocal = 100
      setShown(shownLocal)

      // liquid colour rising over the sketch, with a wobbling surface
      if (paint.current) {
        const level = 104 - shownLocal * 1.12 // % from top; overshoots so the wave clears the top
        const t = now / 1000
        const pts: string[] = []
        for (let i = 0; i <= 20; i++) {
          const x = i * 5
          const y = level + (reduced ? 0 : Math.sin(i * 0.7 + t * 3.2) * 2.4 + Math.sin(i * 0.31 - t * 2) * 1.6)
          pts.push(`${x}% ${y.toFixed(2)}%`)
        }
        paint.current.style.clipPath = `polygon(${pts.join(',')}, 100% 100%, 0% 100%)`
      }

      if (shownLocal >= 100) {
        if (!doneAt) {
          doneAt = now
          setCelebrate(true)
        }
        if (now - doneAt > (reduced ? 200 : 900)) return finish()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const m = setInterval(() => setMsg(i => (i + 1) % MESSAGES.length), 1100)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(m)
    }
  }, [reduced])

  const pct = Math.round(shown)
  if (skipped) return null
  const R = 46
  const C = 2 * Math.PI * R

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${name}'s portfolio, ${pct}%`}
          onClick={finish}
          className="splash fixed inset-0 z-[100] flex cursor-pointer select-none flex-col items-center justify-center overflow-hidden bg-ink px-6"
          initial={false}
          // cartoon iris closing onto the portrait reveals the site around it
          exit={reduced ? { opacity: 0 } : { clipPath: 'circle(0% at 50% 44%)' }}
          style={{ clipPath: 'circle(150% at 50% 44%)' }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* aurora + stars */}
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(45%_40%_at_25%_25%,rgba(255,61,154,0.28),transparent_70%),radial-gradient(40%_40%_at_80%_70%,rgba(34,211,238,0.22),transparent_70%),radial-gradient(35%_35%_at_60%_20%,rgba(139,92,246,0.25),transparent_70%)]" />
          {STARS.map((s, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute animate-pulse rounded-full"
              style={{
                left: s.left, top: s.top, width: s.size, height: s.size,
                backgroundColor: s.color, animationDelay: s.delay, boxShadow: `0 0 6px ${s.color}`,
              }}
            />
          ))}

          {/* portraits of me pop in around the edges of the screen */}
          <SplashPortraits progress={shown} reduced={!!reduced} />

          {/* portrait + ring */}
          <motion.div
            className="relative mt-16 h-56 w-56 sm:h-72 sm:w-72"
            animate={celebrate && !reduced ? { y: [0, -18, 0, -8, 0] } : {}}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 100 100" className="absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] -rotate-90" aria-hidden>
              <defs>
                <linearGradient id="splash-ring" x1="0" y1="0" x2="1" y2="1">
                  {PRISM.map((c, i) => (
                    <stop key={c} offset={`${(i / (PRISM.length - 1)) * 100}%`} stopColor={c} />
                  ))}
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
              <circle
                cx="50" cy="50" r={R} fill="none" stroke="url(#splash-ring)" strokeWidth="2.5" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C * (1 - shown / 100)}
              />
            </svg>

            <div className="absolute inset-0 overflow-hidden rounded-full bg-gradient-to-br from-ink-700 to-ink-800 shadow-[0_0_80px_-10px_rgba(255,61,154,0.6)]">
              <Image src="/images/site/face-sketch.webp" alt="" width={586} height={640} priority className="absolute inset-0 h-full w-full object-cover object-top opacity-90" />
              <div ref={paint} className="absolute inset-0" style={{ clipPath: 'polygon(0% 104%, 100% 104%, 100% 100%, 0% 100%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-prism-pink/50 via-prism-orange/40 to-prism-yellow/40" />
                <Image src="/images/site/face-color.webp" alt={`Portrait of ${name}`} width={586} height={640} priority className="absolute inset-0 h-full w-full object-cover object-top" />
              </div>
            </div>

          </motion.div>

          {/* name + status */}
          <div className="relative mt-14 text-center">
            <p className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {name.split('').map((ch, i) => (
                <span key={i} style={{ color: ch === ' ' ? undefined : i < name.indexOf(' ') ? '#fff' : prismAt(i) }}>
                  {ch}
                </span>
              ))}
            </p>
            <div className="mt-3 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={celebrate ? 'done' : msg}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-sm text-white/70"
                >
                  {celebrate ? 'Ready to roll! ✨' : MESSAGES[msg]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-2 font-display text-4xl font-extrabold tabular-nums text-prism-yellow">{pct}%</p>
          </div>

          {/* paw prints wandering across the bottom */}
          <div aria-hidden className="absolute bottom-8 left-0 right-0 h-10">
            {Array.from({ length: 9 }, (_, i) => (
              <motion.span
                key={i}
                className="absolute h-5 w-5"
                style={{ left: `${8 + i * 10.5}%`, top: i % 2 ? 0 : 14, rotate: 90 }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={reduced ? { opacity: 0.6, scale: 1 } : { opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.8] }}
                transition={{ duration: 2.4, delay: i * 0.22, repeat: reduced ? 0 : Infinity, repeatDelay: 0.6 }}
              >
                <Paw color={prismAt(i)} />
              </motion.span>
            ))}
          </div>

          <span className="absolute bottom-24 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
            tap to skip
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
