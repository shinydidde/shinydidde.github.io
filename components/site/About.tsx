'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { FiRefreshCw } from 'react-icons/fi'
import { Reveal, SectionHeading, TiltCard } from './primitives'
import { prismAt } from './format'

type Stat = { value: string; label: string }

type Props = {
  title: string
  subtitle: string
  bio: string
  name: string
  facts: string[]
  factButton: string
  stats: Stat[]
  interests: string[]
  current?: { role: string; company: string }
}

const EMOJI: [RegExp, string][] = [
  [/nature/i, '🌿'],
  [/animal/i, '🐾'],
  [/travel/i, '✈️'],
  [/ui|ux|design|magic/i, '🎨'],
  [/lead/i, '🚀'],
  [/engineer/i, '🛠️'],
  [/web|dev/i, '💻'],
]
const emojiFor = (s: string) => EMOJI.find(([re]) => re.test(s))?.[1] ?? '✨'

// Where the interest stickers sit around the portrait card
const STICKER_SPOTS = [
  'left-[-6%] top-[14%] -rotate-6',
  'right-[-6%] top-[34%] rotate-6',
  'left-[-8%] top-[54%] rotate-3',
  'right-[-4%] top-[70%] -rotate-3',
]

/** "12+" counts up 0..12 (then shows the suffix) once it scrolls into view. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduced = useReducedMotion()
  const match = value.match(/^(\d+)(.*)$/)
  const isNumber = !!match
  const target = match ? Number(match[1]) : 0
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!isNumber || !inView) return
    if (reduced) return setN(target)
    const c = animate(0, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: v => setN(Math.round(v)) })
    return () => c.stop()
  }, [isNumber, inView, target, reduced])

  if (!match) return <span>{value}</span>
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {match[2]}
    </span>
  )
}

function PortraitStage({ name, interests, current }: Pick<Props, 'name' | 'interests' | 'current'>) {
  const tags = interests.slice(0, STICKER_SPOTS.length)
  return (
    <div className="relative mx-auto w-full max-w-[19rem] px-4 pt-20 sm:max-w-[21rem]">
      <TiltCard className="rounded-[2.5rem]" max={10} glare={false}>
        <div className="relative [transform-style:preserve-3d]">
          {/* card */}
          <div className="ring-rainbow relative aspect-[4/5] rounded-[2.5rem]">
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] bg-[linear-gradient(160deg,#8b5cf6_0%,#ff3d9a_55%,#ff8a3d_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
              <span aria-hidden className="absolute bottom-[30%] left-[8%] h-3 w-3 rounded-full bg-prism-yellow shadow-[0_0_12px_#ffd23f]" />
              <span aria-hidden className="absolute right-[10%] top-[48%] h-2 w-2 rounded-full bg-prism-cyan shadow-[0_0_12px_#22d3ee]" />
            </div>
          </div>

          {/* portrait: clipped at the bottom and sides, open at the top so her head pops out of the frame */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ transform: 'translateZ(50px)', clipPath: 'inset(-40% 0 0 0 round 0 0 2.5rem 2.5rem)' }}
          >
            <Image
              src="/images/site/about-me.webp"
              alt={`Portrait of ${name}`}
              width={558}
              height={1100}
              className="absolute -top-[18%] left-1/2 w-[92%] max-w-none -translate-x-1/2 [filter:drop-shadow(0_20px_30px_rgba(10,6,24,0.45))]"
            />
          </div>

          {/* currently badge */}
          {current?.role && (
            <div
              className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-ink/80 px-4 py-3 backdrop-blur-md"
              style={{ transform: 'translateZ(70px)' }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-prism-lime opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-prism-lime" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Currently</p>
                <p className="truncate text-sm font-bold">
                  {current.role}
                  {current.company && <span className="text-prism-cyan"> @ {current.company}</span>}
                </p>
              </div>
            </div>
          )}

          {/* interest stickers float in front of the card */}
          {tags.map((it, i) => (
            <span
              key={it}
              className={`absolute ${STICKER_SPOTS[i]} hidden whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-bold text-ink shadow-[0_10px_25px_-8px_rgba(0,0,0,0.6)] sm:inline-flex`}
              style={{ background: prismAt(i + 2), transform: 'translateZ(90px)' }}
            >
              <span className="mr-1.5">{emojiFor(it)}</span>
              {it}
            </span>
          ))}
        </div>
      </TiltCard>

      {/* interests as a simple row on phones */}
      <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:hidden">
        {tags.map((it, i) => (
          <li key={it} className="rounded-full px-3 py-1.5 text-xs font-bold text-ink" style={{ background: prismAt(i + 2) }}>
            {emojiFor(it)} {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function About({ title, subtitle, bio, name, facts, factButton, stats, interests, current }: Props) {
  const [factIdx, setFactIdx] = useState(0)

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <PortraitStage name={name} interests={interests} current={current} />
        </Reveal>

        <div>
          <SectionHeading label="About" title={title || 'About me'} />

          {subtitle && (
            <Reveal delay={0.05}>
              <p className="mt-6 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                <span className="text-rainbow">{subtitle}</span>
              </p>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{bio}</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.07}>
                <div className="glass group relative overflow-hidden rounded-2xl p-4 transition-transform hover:-translate-y-1 sm:p-5">
                  <span
                    aria-hidden
                    className="absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                    style={{ background: prismAt(i) }}
                  />
                  <p className="font-display text-3xl font-extrabold sm:text-4xl" style={{ color: prismAt(i) }}>
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/55 sm:text-xs">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {facts.length > 0 && (
            <Reveal delay={0.3}>
              <div className="glass mt-8 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
                <span aria-hidden className="text-2xl">💡</span>
                <div className="relative min-h-[3rem] flex-1 overflow-hidden" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={factIdx}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="text-white/85"
                    >
                      {facts[factIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <button
                  type="button"
                  onClick={() => setFactIdx(i => (i + 1) % facts.length)}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-prism-lime px-4 py-2 text-sm font-bold text-ink transition-transform hover:scale-105"
                >
                  <FiRefreshCw className="transition-transform duration-500 group-hover:rotate-180" />
                  {factButton}
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
