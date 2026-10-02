'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'

const LINKS = [
  { id: 'about',     label: 'About' },
  { id: 'skills',    label: 'Skills' },
  { id: 'journey',   label: 'Journey' },
  { id: 'education', label: 'Education' },
  { id: 'contact',   label: 'Contact' },
]

export default function Nav({ initials }: { initials: string }) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    LINKS.forEach(l => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <>
      {/* Rainbow scroll progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left"
        style={{ scaleX: progress, background: 'var(--rainbow)' }}
      />

      <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
            scrolled ? 'glass shadow-[0_10px_40px_-10px_rgba(139,92,246,0.5)]' : 'bg-transparent'
          }`}
        >
          <a
            href="#top"
            className="ring-rainbow grid h-10 w-10 place-items-center rounded-full"
            aria-label="Back to top"
          >
            <span className="grid h-full w-full place-items-center rounded-full bg-ink-800 font-display text-sm font-extrabold">
              {initials}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active === l.id ? 'text-ink' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1 rounded-full bg-gradient-to-r from-prism-pink via-prism-orange to-prism-yellow px-4 py-2 text-sm font-bold text-ink transition-transform hover:scale-105 sm:inline-flex"
            >
              Resume <FiArrowUpRight />
            </a>
            <button
              type="button"
              className="glass grid h-10 w-10 place-items-center rounded-full md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-ink-900/95 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-3">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-extrabold text-white transition-colors hover:text-prism-pink"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex w-max items-center gap-2 rounded-full bg-gradient-to-r from-prism-pink via-prism-orange to-prism-yellow px-6 py-3 font-bold text-ink"
            >
              Download resume <FiArrowUpRight />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
