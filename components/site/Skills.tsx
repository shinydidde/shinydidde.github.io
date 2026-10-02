'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { SkillCategory } from '@/lib/firestoreService'
import { Reveal, SectionHeading } from './primitives'
import { prismAt } from './format'

// Spread category colours across the palette: pink, yellow, cyan, violet…
const catColor = (ci: number) => prismAt(ci * 2 + (ci > 1 ? 1 : 0))

type Tag = { name: string; cat: number; x: number; y: number; z: number }

/** Evenly spread n points over a unit sphere (Fibonacci lattice). */
function fibonacciSphere(n: number) {
  const pts: [number, number, number][] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r])
  }
  return pts
}

function SkillSphere({ categories, focus }: { categories: SkillCategory[]; focus: number | null }) {
  const wrap = useRef<HTMLDivElement>(null)
  const tagEls = useRef<(HTMLSpanElement | null)[]>([])
  const focusRef = useRef(focus)
  focusRef.current = focus

  const tags = useMemo<Tag[]>(() => {
    const flat = categories.flatMap((c, ci) => c.items.map(it => ({ name: it.name, cat: ci })))
    const pts = fibonacciSphere(flat.length)
    return flat.map((t, i) => ({ ...t, x: pts[i][0], y: pts[i][1], z: pts[i][2] }))
  }, [categories])

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ax = 0.3, ay = 0          // current rotation
    let vx = 0, vy = reduced ? 0 : 0.0035 // angular velocity
    let dragging = false, lastX = 0, lastY = 0
    let hovering = false
    let visible = true
    let raf = 0

    const render = () => {
      const R = el.clientWidth * 0.4
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay)
      tags.forEach((t, i) => {
        const node = tagEls.current[i]
        if (!node) return
        // rotate around Y then X
        const x1 = t.x * cy + t.z * sy
        const z1 = -t.x * sy + t.z * cy
        const y2 = t.y * cx - z1 * sx
        const z2 = t.y * sx + z1 * cx
        const depth = (z2 + 1) / 2 // 0 back .. 1 front
        const scale = 0.55 + depth * 0.65
        const f = focusRef.current
        const dim = f !== null && t.cat !== f
        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * R}px, ${y2 * R}px, 0) scale(${scale})`
        node.style.opacity = String(dim ? 0.08 : 0.25 + depth * 0.75)
        node.style.zIndex = String(Math.round(depth * 100))
        node.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 4}px)` : 'none'
      })
    }

    const tick = () => {
      if (!dragging) {
        const idle = reduced ? 0 : hovering ? 0.0008 : 0.0035
        vy += (idle - vy) * 0.02
        vx *= 0.95
      }
      ay += vy
      ax = Math.max(-1.2, Math.min(1.2, ax + vx))
      render()
      if (visible) raf = requestAnimationFrame(tick)
    }

    const down = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      el.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      vy = (e.clientX - lastX) * 0.005
      vx = (e.clientY - lastY) * 0.005
      lastX = e.clientX
      lastY = e.clientY
    }
    const up = () => { dragging = false }
    const enter = () => { hovering = true }
    const leave = () => { hovering = false; dragging = false }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(tick)
    })
    io.observe(el)

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    render()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [tags])

  return (
    <div
      ref={wrap}
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[560px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
    >
      {/* glowing core */}
      <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.45),rgba(255,61,154,0.15)_50%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-[8%] rounded-full border border-white/5" />
      <div className="absolute inset-[8%] rotate-[70deg] scale-y-[0.3] rounded-full border border-white/10" />
      {tags.map((t, i) => (
        <span
          key={`${t.name}-${i}`}
          ref={n => { tagEls.current[i] = n }}
          className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full px-3 py-1.5 font-display text-xs font-semibold text-ink shadow-lg will-change-transform sm:text-sm"
          style={{ background: catColor(t.cat) }}
        >
          {t.name}
        </span>
      ))}
    </div>
  )
}

export default function Skills({ title, categories }: { title: string; categories: SkillCategory[] }) {
  const [focus, setFocus] = useState<number | null>(null)
  const total = categories.reduce((n, c) => n + c.items.length, 0)

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label={`${total} tools in orbit`} title={title.split(' ').slice(0, -1).join(' ') || 'Skills'} accent={title.split(' ').slice(-1)[0]} />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <SkillSphere categories={categories} focus={focus} />
            <p className="mt-2 text-center font-mono text-xs text-white/40">drag to spin ↻</p>
          </Reveal>

          <div className="space-y-4">
            {categories.map((c, ci) => {
              const active = focus === ci
              return (
                <Reveal key={c.type} delay={ci * 0.08}>
                  <button
                    type="button"
                    onClick={() => setFocus(active ? null : ci)}
                    aria-pressed={active}
                    className={`glass group w-full rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                      active ? 'bg-white/10' : ''
                    }`}
                    style={active ? { boxShadow: `0 0 0 2px ${catColor(ci)}, 0 20px 50px -20px ${catColor(ci)}` } : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-extrabold">{c.type}</h3>
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-xs font-bold text-ink"
                        style={{ background: catColor(ci) }}
                      >
                        {c.items.length}
                      </span>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {c.items.map(it => (
                        <li key={it.name} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">
                          {it.name}
                        </li>
                      ))}
                    </ul>
                  </button>
                </Reveal>
              )
            })}
            <p className="font-mono text-xs text-white/40">Tap a group to light it up on the sphere.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
