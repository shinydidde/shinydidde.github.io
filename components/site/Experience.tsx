'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import type { ExperienceEntry } from '@/lib/firestoreService'
import { Reveal, SectionHeading, TiltCard } from './primitives'
import { prismAt, splitRole } from './format'

export default function Experience({ title, entries }: { title: string; entries: ExperienceEntry[] }) {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 70%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="journey" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading label="Experience" title={title || 'My Journey'} />

        <div ref={track} className="relative mt-16">
          {/* rail + animated rainbow fill */}
          <div aria-hidden className="absolute bottom-0 left-4 top-0 w-[3px] rounded-full bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-4 top-0 w-[3px] origin-top rounded-full lg:left-1/2 lg:-translate-x-1/2"
            style={{
              scaleY: draw,
              background: 'linear-gradient(#ff3d9a, #ff8a3d, #ffd23f, #b8f53a, #22d3ee, #8b5cf6)',
            }}
          />

          <ol className="relative">
          {entries.map((e, i) => {
            const { role, company } = splitRole(e.role)
            const color = prismAt(i)
            const right = i % 2 === 1
            return (
              <li key={`${e.role}-${i}`} className="relative mb-12 pl-14 last:mb-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
                {/* node */}
                <span
                  className="absolute left-4 top-8 z-10 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full bg-ink lg:left-1/2"
                  style={{ boxShadow: `0 0 0 3px ${color}, 0 0 24px 4px ${color}` }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                </span>

                <Reveal className={right ? 'lg:col-start-2' : 'lg:col-start-1'} delay={0.05}>
                  <TiltCard className="rounded-3xl" max={8}>
                    <article className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
                      <div
                        className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl"
                        style={{ background: color }}
                      />
                      <p
                        className="inline-block rounded-full px-3 py-1 font-mono text-xs font-bold text-ink"
                        style={{ background: color }}
                      >
                        {e.year}
                      </p>
                      <h3 className="mt-4 font-display text-xl font-extrabold leading-tight sm:text-2xl">{role}</h3>
                      {company && (
                        <p className="mt-1 font-semibold" style={{ color }}>
                          {company}
                        </p>
                      )}
                      <ul className="mt-5 space-y-2.5">
                        {e.details.map(d => (
                          <li key={d} className="flex gap-3 text-sm leading-relaxed text-white/75 sm:text-[15px]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: color }} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </TiltCard>
                </Reveal>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    </section>
  )
}
