'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { PRISM } from './format'

const R = 26

/** Floating "back to top" button with a rainbow ring that fills as you scroll. */
export default function ScrollToTop() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full sm:bottom-8 sm:right-8"
        >
          <svg viewBox="0 0 60 60" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <defs>
              <linearGradient id="to-top-ring" x1="0" y1="0" x2="1" y2="1">
                {PRISM.map((c, i) => (
                  <stop key={c} offset={`${(i / (PRISM.length - 1)) * 100}%`} stopColor={c} />
                ))}
              </linearGradient>
            </defs>
            <circle cx="30" cy="30" r={R} fill="rgba(16,9,38,0.75)" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
            <motion.circle
              cx="30"
              cy="30"
              r={R}
              fill="none"
              stroke="url(#to-top-ring)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <FiArrowUp className="relative text-white transition-transform duration-300 group-hover:-translate-y-0.5" size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
