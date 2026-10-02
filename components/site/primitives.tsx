'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { ReactNode, PointerEvent } from 'react'

/** Fades and lifts children into view once. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 40,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y, rotateX: -12, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  )
}

/** Card that tilts toward the pointer in 3D, with a moving glare highlight. */
export function TiltCard({
  children,
  className = '',
  max = 12,
  glare = true,
}: {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}) {
  const reduced = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 200, damping: 18, mass: 0.4 }
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const gx = useTransform(px, v => `${v * 100}%`)
  const gy = useTransform(py, v => `${v * 100}%`)
  const glareBg = useTransform(
    [gx, gy],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.28), transparent 55%)`
  )

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`group/tilt relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}

export function SectionHeading({
  label,
  title,
  accent,
  align = 'left',
}: {
  label: string
  title: string
  accent?: string
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <p className="section-label mb-4">
        <span className="mr-3 inline-block h-px w-10 bg-prism-cyan align-middle" />
        {label}
      </p>
      <h2 className="section-title">
        {title}
        {accent && (
          <>
            {' '}
            <span className="text-rainbow">{accent}</span>
          </>
        )}
      </h2>
    </Reveal>
  )
}
