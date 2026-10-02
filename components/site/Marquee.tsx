// Two crossing ribbons of roles, tilted in opposite directions.
import { prismAt } from './format'

function Ribbon({ items, reverse, className }: { items: string[]; reverse?: boolean; className: string }) {
  const row = [...items, ...items]
  return (
    <div className={`overflow-hidden py-4 ${className}`}>
      <div
        className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-2xl font-extrabold uppercase sm:text-4xl"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span style={{ color: prismAt(i) }} aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee({ primary, secondary }: { primary: string[]; secondary: string[] }) {
  if (!primary.length) return null
  return (
    <div aria-hidden className="relative z-10 my-10 select-none">
      <Ribbon
        items={secondary.length ? secondary : primary}
        reverse
        className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-prism-cyan text-ink opacity-90"
      />
      <Ribbon
        items={primary}
        className="relative mx-[-5%] -rotate-[3deg] bg-gradient-to-r from-prism-pink via-prism-violet to-prism-pink text-white shadow-[0_20px_60px_-10px_rgba(255,61,154,0.6)]"
      />
    </div>
  )
}
