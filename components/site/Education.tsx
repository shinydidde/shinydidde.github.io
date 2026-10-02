import type { EducationEntry } from '@/lib/firestoreService'
import { Reveal, SectionHeading, TiltCard } from './primitives'
import { prismAt } from './format'

export default function Education({ title, entries }: { title: string; entries: EducationEntry[] }) {
  if (!entries.length) return null

  return (
    <section id="education" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label="Learning" title={title || 'Education'} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((e, i) => {
            const color = prismAt(i + 3)
            return (
              <Reveal key={e.title} delay={i * 0.08}>
                <TiltCard className="h-full rounded-3xl" max={16}>
                  <article
                    className="relative flex h-full flex-col overflow-hidden rounded-3xl p-6 text-ink"
                    style={{ background: `linear-gradient(150deg, ${color}, ${prismAt(i + 4)})` }}
                  >
                    <span
                      aria-hidden
                      className="absolute -bottom-6 -right-2 font-display text-[7rem] font-extrabold leading-none text-ink/10"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70">{e.year}</p>
                    <h3 className="mt-3 font-display text-lg font-extrabold leading-snug">{e.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-ink/80">{e.institution}</p>
                    {e.grade && (
                      <p className="relative mt-auto inline-block w-max rounded-full bg-ink px-3 py-1 pt-1 text-xs font-bold text-white">
                        {e.grade}
                      </p>
                    )}
                  </article>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
