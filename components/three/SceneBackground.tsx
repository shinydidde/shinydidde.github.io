'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

// WebGL only runs in the browser; keep three.js out of the server bundle.
const WorldScene = dynamic(() => import('./WorldScene'), { ssr: false })

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function SceneBackground() {
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(true)
  const veil = useRef<HTMLDivElement>(null)

  // Darken the scene once the hero scrolls away so section content stays readable
  useEffect(() => {
    const onScroll = () => {
      if (!veil.current) return
      const t = Math.min(window.scrollY / (window.innerHeight * 0.8), 1)
      veil.current.style.opacity = String(t * 0.55)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setSupported(hasWebGL())
    const t = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Gradient aurora sits underneath the canvas and is the fallback without WebGL */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(255,61,154,0.22),transparent_70%),radial-gradient(50%_50%_at_10%_80%,rgba(34,211,238,0.18),transparent_70%),radial-gradient(40%_40%_at_50%_50%,rgba(139,92,246,0.18),transparent_70%)]" />
      {supported && (
        <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <WorldScene />
        </div>
      )}
      <div ref={veil} className="absolute inset-0 bg-ink opacity-0" />
    </div>
  )
}
