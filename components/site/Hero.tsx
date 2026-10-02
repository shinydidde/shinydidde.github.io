'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'
import { prismAt } from './format'
import { useSplashDone } from './Splash'

type Props = {
  name: string
  roles: string[]
  catchPhrase: string
  years: number
  location: string
}

const ease = [0.22, 1, 0.36, 1] as const

function Letters({ text, delay, colorful = false }: { text: string; delay: number; colorful?: boolean }) {
  const reduced = useReducedMotion()
  return (
    <span className="inline-block" aria-hidden>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduced ? false : { y: '110%', rotateX: -90, opacity: 0 }}
          animate={{ y: '0%', rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}
          style={{ transformOrigin: '50% 100%', color: colorful ? prismAt(i) : undefined }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero({ name, roles, catchPhrase, years, location }: Props) {
  const [first, ...rest] = name.split(' ')
  const last = rest.join(' ')
  const [roleIdx, setRoleIdx] = useState(0)
  const splashDone = useSplashDone()

  useEffect(() => {
    if (roles.length < 2) return
    const t = setInterval(() => setRoleIdx(i => (i + 1) % roles.length), 2400)
    return () => clearInterval(t)
  }, [roles.length])

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end pb-16 pt-28 lg:items-center lg:pb-0">
      {/* remounts when the splash lifts so the intro animation plays in view */}
      <div key={splashDone ? 'live' : 'behind-splash'} className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-white/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-prism-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-prism-lime" />
            </span>
            Open to great ideas · {location}
          </motion.div>

          <h1 className="font-display font-extrabold leading-[0.88] tracking-tight [perspective:600px]">
            <span className="sr-only">{name}</span>
            <span className="block overflow-hidden pb-1 leading-[1.05] text-white text-[clamp(3.2rem,15vw,6.5rem)] lg:text-[clamp(5rem,9vw,9rem)]">
              <Letters text={first} delay={0.2} />
            </span>
            <span className="block overflow-hidden pb-1 leading-[1.05] text-[clamp(3.2rem,15vw,6.5rem)] lg:text-[clamp(5rem,9vw,9rem)]">
              <Letters text={last} delay={0.5} colorful />
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-lg font-semibold sm:text-2xl">
            <span className="text-white/60">I&apos;m a</span>
            <span className="relative inline-flex h-[1.4em] min-w-[12ch] overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIdx}
                  initial={{ y: '100%', rotateX: -80, opacity: 0 }}
                  animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                  exit={{ y: '-100%', rotateX: 80, opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="whitespace-nowrap"
                  style={{ color: prismAt(roleIdx) }}
                >
                  {roles[roleIdx] ?? ''}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="mt-5 max-w-xl text-base text-white/70 sm:text-lg"
          >
            {catchPhrase}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#journey"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-ink shadow-[0_0_40px_-5px_rgba(255,61,154,0.7)] transition-transform hover:-translate-y-0.5"
            >
              See my journey
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/10"
            >
              Let&apos;s talk
            </a>
            <span className="ml-1 font-mono text-sm text-white/50">
              <span className="font-display text-2xl font-extrabold text-prism-yellow">{years}+</span> years shipping
            </span>
          </motion.div>
        </div>
      </div>

      {/* hint for the draggable planet behind the hero (desktop) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="pointer-events-none absolute bottom-8 right-8 hidden font-mono text-[11px] uppercase tracking-[0.25em] text-white/45 lg:block"
      >
        ↻ drag the planet to spin it
      </motion.p>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 lg:flex"
      >
        Scroll
        <FiArrowDown />
      </motion.a>
    </section>
  )
}
