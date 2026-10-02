'use client'

// A tiny low-poly planet: trees, flowers, a fox, a bunny and an owl, with
// birds, butterflies and clouds circling under a starry sky. Everything is
// built from primitives so nothing has to be downloaded.

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { PRISM } from '@/components/site/format'

const R = 1.3 // planet radius
const UP = new THREE.Vector3(0, 1, 0)

// Shared, mutation-only input state (read inside useFrame, never triggers renders)
const input = {
  mx: 0,
  my: 0,
  scroll: 0,
  // click-and-drag spin (radians), with momentum after release
  dragX: 0,
  dragY: 0,
  velX: 0,
  velY: 0,
  dragging: false,
  // where the planet is on screen, in CSS pixels (updated every frame)
  planet: { x: -1e4, y: -1e4, r: 0 },
}

/** Is the pointer over the planet while the hero is on screen? */
function overPlanet(x: number, y: number) {
  if (window.scrollY > window.innerHeight * 0.6) return false
  const { planet } = input
  return Math.hypot(x - planet.x, y - planet.y) < planet.r
}

function useInputTracking() {
  useEffect(() => {
    let lastX = 0
    let lastY = 0
    const setCursor = (c: string) => {
      document.documentElement.style.cursor = c
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || !overPlanet(e.clientX, e.clientY)) return
      if ((e.target as Element | null)?.closest('a, button, input, textarea, select')) return
      input.dragging = true
      input.velX = input.velY = 0
      lastX = e.clientX
      lastY = e.clientY
      setCursor('grabbing')
      document.documentElement.style.userSelect = 'none'
    }
    const onMove = (e: PointerEvent) => {
      input.mx = (e.clientX / window.innerWidth) * 2 - 1
      input.my = -((e.clientY / window.innerHeight) * 2 - 1)
      if (input.dragging) {
        const dx = (e.clientX - lastX) * 0.008
        const dy = (e.clientY - lastY) * 0.006
        input.dragY += dx
        input.dragX = THREE.MathUtils.clamp(input.dragX + dy, -1.1, 1.1)
        input.velY = dx
        input.velX = dy
        lastX = e.clientX
        lastY = e.clientY
      } else if (e.pointerType === 'mouse') {
        setCursor(overPlanet(e.clientX, e.clientY) ? 'grab' : '')
      }
    }
    const onUp = () => {
      if (!input.dragging) return
      input.dragging = false
      setCursor('')
      document.documentElement.style.userSelect = ''
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      input.scroll = max > 0 ? window.scrollY / max : 0
    }
    onScroll()
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      setCursor('')
    }
  }, [])
}

/* ---------- helpers ---------- */

function seeded(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const matCache = new Map<string, THREE.MeshStandardMaterial>()
function mat(color: string, emissive = 0) {
  const key = `${color}-${emissive}`
  let m = matCache.get(key)
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color,
      flatShading: true,
      roughness: 0.85,
      emissive: emissive ? new THREE.Color(color) : undefined,
      emissiveIntensity: emissive,
    })
    matCache.set(key, m)
  }
  return m
}

function surfaceNormal(lat: number, lon: number) {
  return new THREE.Vector3().setFromSphericalCoords(
    1,
    THREE.MathUtils.degToRad(90 - lat),
    THREE.MathUtils.degToRad(lon)
  )
}

/** Stands its children upright on the planet surface at (lat, lon). */
function OnPlanet({
  lat,
  lon,
  turn = 0,
  scale = 1,
  lift = 0,
  children,
}: {
  lat: number
  lon: number
  turn?: number
  scale?: number
  lift?: number
  children: React.ReactNode
}) {
  const { position, quaternion } = useMemo(() => {
    const n = surfaceNormal(lat, lon)
    const q = new THREE.Quaternion().setFromUnitVectors(UP, n)
    q.multiply(new THREE.Quaternion().setFromAxisAngle(UP, turn))
    return { position: n.multiplyScalar(R - 0.02 + lift), quaternion: q }
  }, [lat, lon, turn, lift])
  return (
    <group position={position} quaternion={quaternion} scale={scale}>
      {children}
    </group>
  )
}

/* ---------- planet ---------- */

function Planet() {
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(R, 3)
    const rand = seeded(7)
    const greens = ['#22a55a', '#1f9a55', '#27b062', '#1d8f58', '#2bb56c', '#239e5e', '#7cc934']
    const pos = g.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const c = new THREE.Color()
    // polyhedron geometry is non-indexed: every 3 vertices form one face
    for (let i = 0; i < pos.count; i += 3) {
      // mostly deep greens, with the odd lime patch
      c.set(rand() < 0.1 ? greens[6] : greens[Math.floor(rand() * 6)])
      for (let k = 0; k < 3; k++) c.toArray(colors, (i + k) * 3)
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [])

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial vertexColors flatShading roughness={0.9} />
    </mesh>
  )
}

function Pine({ color = '#0f9d8a' }: { color?: string }) {
  return (
    <group>
      <mesh material={mat('#7c4a2d')} position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.12, 6]} />
      </mesh>
      {[0, 1, 2].map(i => (
        <mesh key={i} material={mat(color)} position={[0, 0.16 + i * 0.09, 0]}>
          <coneGeometry args={[0.13 - i * 0.03, 0.16, 7]} />
        </mesh>
      ))}
    </group>
  )
}

function RoundTree({ color }: { color: string }) {
  return (
    <group>
      <mesh material={mat('#7c4a2d')} position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.18, 6]} />
      </mesh>
      <mesh material={mat(color)} position={[0, 0.25, 0]}>
        <icosahedronGeometry args={[0.13, 0]} />
      </mesh>
      <mesh material={mat(color)} position={[0.07, 0.2, 0.03]}>
        <icosahedronGeometry args={[0.08, 0]} />
      </mesh>
    </group>
  )
}

function Mushroom() {
  return (
    <group scale={0.8}>
      <mesh material={mat('#fff7ed')} position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.08, 6]} />
      </mesh>
      <mesh material={mat('#ff3d6e')} position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.06, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh material={mat('#ffffff')} position={[0.025, 0.125, 0.02]}>
        <sphereGeometry args={[0.012, 6, 6]} />
      </mesh>
    </group>
  )
}

function Flower({ color }: { color: string }) {
  return (
    <group>
      <mesh material={mat('#16a34a')} position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.06, 4]} />
      </mesh>
      <mesh material={mat(color, 0.3)} position={[0, 0.065, 0]}>
        <dodecahedronGeometry args={[0.022, 0]} />
      </mesh>
    </group>
  )
}

function Rock() {
  return (
    <mesh material={mat('#a8a2c4')} position={[0, 0.02, 0]} scale={[1, 0.6, 0.8]}>
      <dodecahedronGeometry args={[0.06, 0]} />
    </mesh>
  )
}

function Pond() {
  return (
    <mesh position={[0, 0.012, 0]}>
      <cylinderGeometry args={[0.2, 0.2, 0.02, 14]} />
      <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.35} roughness={0.2} flatShading />
    </mesh>
  )
}

/* ---------- animals ---------- */

/* ---------- wildlife ---------- */

function Eyes({ x, y, z, r = 0.01, color = '#1e1b2e' }: { x: number; y: number; z: number; r?: number; color?: string }) {
  return (
    <>
      {[-1, 1].map(s => (
        <mesh key={s} material={mat(color)} position={[s * x, y, z]}>
          <sphereGeometry args={[r, 6, 6]} />
        </mesh>
      ))}
    </>
  )
}

function Fox() {
  const tail = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (tail.current) tail.current.rotation.y = Math.sin(t * 3) * 0.5
    if (head.current) head.current.rotation.y = Math.sin(t * 0.7) * 0.4
  })
  const orange = mat('#ff7a1a')
  const white = mat('#fff7ed')
  const dark = mat('#2b1a12')
  return (
    <group>
      {[[-0.05, 0.09], [0.05, 0.09], [-0.05, -0.09], [0.05, -0.09]].map(([x, z], i) => (
        <mesh key={i} material={dark} position={[x, 0.06, z]}>
          <cylinderGeometry args={[0.022, 0.018, 0.12, 5]} />
        </mesh>
      ))}
      <mesh material={orange} position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.08, 0.16, 3, 7]} />
      </mesh>
      <mesh material={white} position={[0, 0.16, 0.13]}>
        <icosahedronGeometry args={[0.06, 0]} />
      </mesh>
      <group ref={head} position={[0, 0.28, 0.15]}>
        <mesh material={orange}>
          <icosahedronGeometry args={[0.08, 0]} />
        </mesh>
        <mesh material={white} position={[0, -0.02, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.045, 0.11, 6]} />
        </mesh>
        <mesh material={dark} position={[0, -0.02, 0.14]}>
          <sphereGeometry args={[0.015, 6, 6]} />
        </mesh>
        {[-1, 1].map(s => (
          <mesh key={s} material={orange} position={[s * 0.045, 0.08, -0.01]} rotation={[0, 0, -s * 0.2]}>
            <coneGeometry args={[0.03, 0.08, 4]} />
          </mesh>
        ))}
        <Eyes x={0.035} y={0.02} z={0.065} r={0.011} />
      </group>
      <group ref={tail} position={[0, 0.2, -0.16]}>
        <group rotation={[-1.0, 0, 0]}>
          <mesh material={orange} position={[0, 0.1, 0]}>
            <capsuleGeometry args={[0.05, 0.14, 3, 7]} />
          </mesh>
          <mesh material={white} position={[0, 0.2, 0]}>
            <icosahedronGeometry args={[0.04, 0]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/** Deer that lowers its head to graze now and then. */
function Deer() {
  const neck = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const graze = Math.max(0, Math.sin(clock.elapsedTime * 0.5)) // 0..1
    if (neck.current) neck.current.rotation.x = 0.2 + graze * 1.1
  })
  const fur = mat('#b5713d')
  const light = mat('#f3e3c9')
  const antler = mat('#e9d8b4')
  return (
    <group>
      {[[-0.04, 0.09], [0.04, 0.09], [-0.04, -0.09], [0.04, -0.09]].map(([x, z], i) => (
        <mesh key={i} material={fur} position={[x, 0.09, z]}>
          <cylinderGeometry args={[0.014, 0.011, 0.18, 5]} />
        </mesh>
      ))}
      <mesh material={fur} position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.065, 0.16, 3, 7]} />
      </mesh>
      <mesh material={light} position={[0, 0.24, -0.15]}>
        <icosahedronGeometry args={[0.025, 0]} />
      </mesh>
      {[[0.03, 0.26, 0.02], [-0.035, 0.25, -0.05], [0.02, 0.27, -0.08]].map((p, i) => (
        <mesh key={i} material={light} position={p as [number, number, number]}>
          <sphereGeometry args={[0.009, 5, 5]} />
        </mesh>
      ))}
      <group ref={neck} position={[0, 0.24, 0.1]}>
        <mesh material={fur} position={[0, 0.07, 0.02]} rotation={[0.35, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.14, 6]} />
        </mesh>
        <group position={[0, 0.15, 0.05]}>
          <mesh material={fur} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.045, 0.12, 6]} />
          </mesh>
          <mesh material={mat('#2b1a12')} position={[0, 0, 0.065]}>
            <sphereGeometry args={[0.012, 5, 5]} />
          </mesh>
          <Eyes x={0.03} y={0.015} z={0.0} r={0.009} />
          {[-1, 1].map(s => (
            <group key={s} position={[s * 0.025, 0.03, -0.03]} rotation={[0, 0, -s * 0.4]}>
              <mesh material={antler} position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.006, 0.008, 0.1, 4]} />
              </mesh>
              <mesh material={antler} position={[s * 0.02, 0.07, 0]} rotation={[0, 0, -s * 0.8]}>
                <cylinderGeometry args={[0.005, 0.006, 0.05, 4]} />
              </mesh>
            </group>
          ))}
          {[-1, 1].map(s => (
            <mesh key={`e${s}`} material={fur} position={[s * 0.05, 0.02, -0.03]} rotation={[0, 0, -s * 1.1]}>
              <coneGeometry args={[0.016, 0.05, 4]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  )
}

/** Elephant flapping its ears and swinging its trunk. */
function Elephant() {
  const trunk = useRef<THREE.Group>(null)
  const ears = useRef<(THREE.Mesh | null)[]>([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (trunk.current) trunk.current.rotation.x = 0.2 + Math.sin(t * 1.4) * 0.35
    ears.current.forEach((e, i) => {
      if (e) e.rotation.y = (i ? -1 : 1) * (0.3 + Math.sin(t * 2.2) * 0.25)
    })
  })
  const grey = mat('#9ca3c4')
  const dark = mat('#7c83a3')
  return (
    <group>
      {[[-0.06, 0.08], [0.06, 0.08], [-0.06, -0.08], [0.06, -0.08]].map(([x, z], i) => (
        <mesh key={i} material={grey} position={[x, 0.07, z]}>
          <cylinderGeometry args={[0.035, 0.038, 0.14, 7]} />
        </mesh>
      ))}
      <mesh material={grey} position={[0, 0.2, 0]} scale={[1, 0.9, 1.25]}>
        <icosahedronGeometry args={[0.12, 1]} />
      </mesh>
      <group position={[0, 0.25, 0.15]}>
        <mesh material={grey}>
          <icosahedronGeometry args={[0.08, 1]} />
        </mesh>
        {[-1, 1].map((s, i) => (
          <mesh
            key={s}
            ref={el => { ears.current[i] = el }}
            material={dark}
            position={[s * 0.075, 0.01, -0.03]}
            scale={[0.25, 1, 0.9]}
          >
            <icosahedronGeometry args={[0.075, 0]} />
          </mesh>
        ))}
        <Eyes x={0.04} y={0.02} z={0.065} r={0.01} />
        {[-1, 1].map(s => (
          <mesh key={`t${s}`} material={mat('#fffaf0')} position={[s * 0.03, -0.045, 0.06]} rotation={[1.3, 0, 0]}>
            <coneGeometry args={[0.009, 0.05, 5]} />
          </mesh>
        ))}
        <group ref={trunk} position={[0, -0.02, 0.07]}>
          <mesh material={grey} position={[0, -0.04, 0.01]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.026, 0.09, 6]} />
          </mesh>
          <mesh material={grey} position={[0, -0.1, 0.035]} rotation={[0.6, 0, 0]}>
            <cylinderGeometry args={[0.016, 0.02, 0.07, 6]} />
          </mesh>
        </group>
      </group>
      <mesh material={dark} position={[0, 0.2, -0.16]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.08, 4]} />
      </mesh>
    </group>
  )
}

/** Brown bear swaying gently. */
function Bear() {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.z = Math.sin(clock.elapsedTime * 1.2) * 0.06
  })
  const fur = mat('#7a4a2a')
  const muzzle = mat('#c99a6b')
  return (
    <group ref={g}>
      {[[-0.055, 0.07], [0.055, 0.07], [-0.055, -0.07], [0.055, -0.07]].map(([x, z], i) => (
        <mesh key={i} material={fur} position={[x, 0.05, z]}>
          <cylinderGeometry args={[0.032, 0.035, 0.1, 6]} />
        </mesh>
      ))}
      <mesh material={fur} position={[0, 0.16, 0]} scale={[1, 0.85, 1.25]}>
        <icosahedronGeometry args={[0.11, 1]} />
      </mesh>
      <group position={[0, 0.22, 0.13]}>
        <mesh material={fur}>
          <icosahedronGeometry args={[0.075, 1]} />
        </mesh>
        <mesh material={muzzle} position={[0, -0.02, 0.06]} scale={[1, 0.8, 0.8]}>
          <icosahedronGeometry args={[0.035, 1]} />
        </mesh>
        <mesh material={mat('#1e1b2e')} position={[0, -0.005, 0.088]}>
          <sphereGeometry args={[0.012, 6, 6]} />
        </mesh>
        {[-1, 1].map(s => (
          <mesh key={s} material={fur} position={[s * 0.055, 0.06, -0.01]}>
            <sphereGeometry args={[0.025, 6, 6]} />
          </mesh>
        ))}
        <Eyes x={0.03} y={0.02} z={0.062} r={0.009} />
      </group>
    </group>
  )
}

/** Fluffy sheep made of puffs. */
function Sheep() {
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (head.current) head.current.rotation.x = Math.max(0, Math.sin(clock.elapsedTime * 0.7)) * 0.6
  })
  const wool = mat('#f8f7ff')
  const face = mat('#3b3550')
  const puffs: [number, number, number][] = [[0, 0.16, 0], [0.05, 0.15, 0.05], [-0.05, 0.15, 0.05], [0.05, 0.15, -0.05], [-0.05, 0.15, -0.05], [0, 0.2, 0.02], [0, 0.19, -0.05]]
  return (
    <group>
      {[[-0.04, 0.05], [0.04, 0.05], [-0.04, -0.05], [0.04, -0.05]].map(([x, z], i) => (
        <mesh key={i} material={face} position={[x, 0.05, z]}>
          <cylinderGeometry args={[0.013, 0.012, 0.1, 5]} />
        </mesh>
      ))}
      {puffs.map((p, i) => (
        <mesh key={i} material={wool} position={p}>
          <icosahedronGeometry args={[0.06, 0]} />
        </mesh>
      ))}
      <group ref={head} position={[0, 0.17, 0.1]}>
        <mesh material={face} position={[0, 0, 0.03]} scale={[0.8, 1, 1.1]}>
          <icosahedronGeometry args={[0.04, 1]} />
        </mesh>
        <mesh material={wool} position={[0, 0.035, 0.015]}>
          <icosahedronGeometry args={[0.03, 0]} />
        </mesh>
        {[-1, 1].map(s => (
          <mesh key={s} material={face} position={[s * 0.045, 0.01, 0.01]} rotation={[0, 0, s * 1.2]}>
            <capsuleGeometry args={[0.008, 0.03, 2, 4]} />
          </mesh>
        ))}
        <Eyes x={0.02} y={0.012} z={0.065} r={0.007} color="#ffffff" />
      </group>
    </group>
  )
}

/** Hedgehog: a spiky dome with a pointy nose. */
function Hedgehog() {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (g.current) g.current.scale.y = 1 + Math.sin(clock.elapsedTime * 2) * 0.04
  })
  const spikes = useMemo(() => {
    const out: { p: THREE.Vector3; q: THREE.Quaternion }[] = []
    for (let i = 0; i < 26; i++) {
      const phi = Math.acos(1 - (i / 26) * 0.95)
      const th = i * 2.4
      const n = new THREE.Vector3(Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th))
      if (n.z > 0.55) continue // keep the face clear
      out.push({ p: n.clone().multiplyScalar(0.065), q: new THREE.Quaternion().setFromUnitVectors(UP, n) })
    }
    return out
  }, [])
  const spike = mat('#5a3b28')
  return (
    <group ref={g}>
      <group position={[0, 0.03, 0]} scale={[1, 0.8, 1.2]}>
        <mesh material={mat('#8a6347')}>
          <icosahedronGeometry args={[0.065, 1]} />
        </mesh>
        {spikes.map((s, i) => (
          <mesh key={i} material={spike} position={s.p} quaternion={s.q}>
            <coneGeometry args={[0.012, 0.045, 4]} />
          </mesh>
        ))}
      </group>
      <mesh material={mat('#e6c9a8')} position={[0, 0.03, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.025, 0.05, 6]} />
      </mesh>
      <mesh material={mat('#1e1b2e')} position={[0, 0.03, 0.108]}>
        <sphereGeometry args={[0.008, 5, 5]} />
      </mesh>
      <Eyes x={0.018} y={0.045} z={0.075} r={0.006} />
    </group>
  )
}

/** Squirrel holding an acorn, flicking its big tail. */
function Squirrel() {
  const tail = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (tail.current) tail.current.rotation.x = -0.3 + Math.sin(clock.elapsedTime * 4) * 0.15
  })
  const fur = mat('#c0602a')
  const belly = mat('#f3d2a8')
  return (
    <group>
      <mesh material={fur} position={[0, 0.07, 0]} scale={[0.9, 1.2, 0.9]}>
        <icosahedronGeometry args={[0.05, 1]} />
      </mesh>
      <mesh material={belly} position={[0, 0.07, 0.03]} scale={[0.6, 0.9, 0.5]}>
        <icosahedronGeometry args={[0.045, 1]} />
      </mesh>
      <group position={[0, 0.15, 0.015]}>
        <mesh material={fur}>
          <icosahedronGeometry args={[0.04, 1]} />
        </mesh>
        {[-1, 1].map(s => (
          <mesh key={s} material={fur} position={[s * 0.022, 0.04, -0.005]}>
            <coneGeometry args={[0.012, 0.035, 4]} />
          </mesh>
        ))}
        <Eyes x={0.018} y={0.008} z={0.035} r={0.007} />
      </group>
      {/* acorn */}
      <group position={[0, 0.1, 0.06]}>
        <mesh material={mat('#a0662f')}>
          <icosahedronGeometry args={[0.018, 0]} />
        </mesh>
        <mesh material={mat('#5a3b28')} position={[0, 0.015, 0]}>
          <sphereGeometry args={[0.019, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>
      <group ref={tail} position={[0, 0.05, -0.05]}>
        <mesh material={fur} position={[0, 0.06, -0.03]} rotation={[-0.4, 0, 0]} scale={[1, 1, 0.8]}>
          <capsuleGeometry args={[0.035, 0.09, 3, 7]} />
        </mesh>
        <mesh material={fur} position={[0, 0.14, 0.0]} rotation={[0.5, 0, 0]} scale={[1, 1, 0.8]}>
          <capsuleGeometry args={[0.03, 0.05, 3, 7]} />
        </mesh>
      </group>
    </group>
  )
}

/** Turtle poking its head in and out. */
function Turtle() {
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (head.current) head.current.position.z = 0.075 + Math.sin(clock.elapsedTime * 0.9) * 0.02
  })
  const skin = mat('#8fbf6a')
  return (
    <group>
      <mesh material={mat('#2f7d4a')} position={[0, 0.025, 0]} scale={[1, 0.65, 1.15]}>
        <sphereGeometry args={[0.07, 7, 5, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh material={mat('#4caf6e')} position={[0, 0.06, 0]} scale={[1, 0.3, 1.1]}>
        <icosahedronGeometry args={[0.045, 0]} />
      </mesh>
      {[[-0.05, 0.05], [0.05, 0.05], [-0.05, -0.05], [0.05, -0.05]].map(([x, z], i) => (
        <mesh key={i} material={skin} position={[x, 0.015, z]}>
          <sphereGeometry args={[0.018, 5, 5]} />
        </mesh>
      ))}
      <group ref={head} position={[0, 0.03, 0.075]}>
        <mesh material={skin}>
          <icosahedronGeometry args={[0.025, 1]} />
        </mesh>
        <Eyes x={0.013} y={0.008} z={0.02} r={0.005} />
      </group>
    </group>
  )
}

/** Duck paddling in circles on the pond. */
function Duck() {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.6
    if (g.current) {
      g.current.position.set(Math.cos(t) * 0.09, 0.02 + Math.sin(t * 6) * 0.004, Math.sin(t) * 0.09)
      g.current.rotation.y = -t
    }
  })
  return (
    <group ref={g}>
      <mesh material={mat('#ffffff')} position={[0, 0.02, 0]} scale={[0.9, 0.7, 1.3]}>
        <icosahedronGeometry args={[0.035, 1]} />
      </mesh>
      <group position={[0, 0.055, 0.03]}>
        <mesh material={mat('#ffffff')}>
          <icosahedronGeometry args={[0.022, 1]} />
        </mesh>
        <mesh material={mat('#ff9f1c')} position={[0, -0.004, 0.025]} rotation={[Math.PI / 2, 0, 0]} scale={[1.4, 1, 0.6]}>
          <coneGeometry args={[0.009, 0.02, 4]} />
        </mesh>
        <Eyes x={0.012} y={0.006} z={0.016} r={0.004} />
      </group>
    </group>
  )
}

/** Frog on a lily pad that hops every few seconds. */
function Frog() {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const p = (clock.elapsedTime % 3.2) / 3.2
    if (g.current) g.current.position.y = 0.012 + (p > 0.85 ? Math.sin(((p - 0.85) / 0.15) * Math.PI) * 0.05 : 0)
  })
  const green = mat('#4ade80')
  return (
    <group>
      <mesh material={mat('#16a34a')} position={[0, 0.008, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.006, 10, 1, false, 0, Math.PI * 1.75]} />
      </mesh>
      <group ref={g}>
        <mesh material={green} position={[0, 0.02, 0]} scale={[1.1, 0.7, 1]}>
          <icosahedronGeometry args={[0.03, 1]} />
        </mesh>
        {[-1, 1].map(s => (
          <group key={s}>
            <mesh material={green} position={[s * 0.016, 0.042, 0.012]}>
              <sphereGeometry args={[0.011, 6, 6]} />
            </mesh>
            <mesh material={mat('#1e1b2e')} position={[s * 0.017, 0.045, 0.021]}>
              <sphereGeometry args={[0.005, 5, 5]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

/** Tiger: orange with black stripes, prowling with a swishing tail. */
function Tiger() {
  const tail = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (tail.current) tail.current.rotation.y = Math.sin(t * 2) * 0.5
    if (head.current) head.current.rotation.y = Math.sin(t * 0.6) * 0.35
  })
  const fur = mat('#f08a24')
  const white = mat('#fff4e6')
  const black = mat('#1c1410')
  return (
    <group>
      {[[-0.045, 0.08], [0.045, 0.08], [-0.045, -0.08], [0.045, -0.08]].map(([x, z], i) => (
        <mesh key={i} material={fur} position={[x, 0.055, z]}>
          <cylinderGeometry args={[0.022, 0.02, 0.11, 6]} />
        </mesh>
      ))}
      <mesh material={fur} position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.065, 0.15, 3, 8]} />
      </mesh>
      {/* stripes wrap over the back */}
      {[-0.08, -0.03, 0.02, 0.07].map(z => (
        <mesh key={z} material={black} position={[0, 0.17, z]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.25]}>
          <torusGeometry args={[0.062, 0.007, 4, 10, Math.PI]} />
        </mesh>
      ))}
      <group ref={head} position={[0, 0.19, 0.13]}>
        <mesh material={fur}>
          <icosahedronGeometry args={[0.062, 1]} />
        </mesh>
        <mesh material={white} position={[0, -0.022, 0.045]} scale={[1.2, 0.8, 0.8]}>
          <icosahedronGeometry args={[0.03, 1]} />
        </mesh>
        <mesh material={mat('#ff8fa3')} position={[0, -0.008, 0.07]}>
          <sphereGeometry args={[0.009, 6, 6]} />
        </mesh>
        {[-1, 1].map(s => (
          <group key={s}>
            <mesh material={fur} position={[s * 0.045, 0.048, -0.01]}>
              <sphereGeometry args={[0.018, 6, 6]} />
            </mesh>
            <mesh material={black} position={[s * 0.03, 0.04, 0.035]} rotation={[0, 0, s * 0.5]}>
              <boxGeometry args={[0.022, 0.005, 0.004]} />
            </mesh>
          </group>
        ))}
        <Eyes x={0.024} y={0.012} z={0.052} r={0.008} color="#c8e64a" />
      </group>
      <group ref={tail} position={[0, 0.16, -0.14]}>
        <mesh material={fur} position={[0, 0.03, -0.05]} rotation={[-1.0, 0, 0]}>
          <capsuleGeometry args={[0.012, 0.1, 2, 6]} />
        </mesh>
        <mesh material={black} position={[0, 0.07, -0.085]}>
          <sphereGeometry args={[0.014, 6, 6]} />
        </mesh>
      </group>
    </group>
  )
}

/** Lion with a big mane, shaking it now and then. */
function Lion() {
  const head = useRef<THREE.Group>(null)
  const tail = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (head.current) head.current.rotation.z = Math.sin(t * 0.8) * 0.12
    if (tail.current) tail.current.rotation.y = Math.sin(t * 1.5) * 0.45
  })
  const fur = mat('#dba35c')
  const mane = mat('#9a4b1c')
  const maneLight = mat('#c26b26')
  return (
    <group>
      {[[-0.045, 0.08], [0.045, 0.08], [-0.045, -0.08], [0.045, -0.08]].map(([x, z], i) => (
        <mesh key={i} material={fur} position={[x, 0.06, z]}>
          <cylinderGeometry args={[0.022, 0.02, 0.12, 6]} />
        </mesh>
      ))}
      <mesh material={fur} position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.066, 0.14, 3, 8]} />
      </mesh>
      <group ref={head} position={[0, 0.2, 0.13]}>
        {/* mane */}
        <mesh material={mane} position={[0, 0, -0.015]}>
          <dodecahedronGeometry args={[0.085, 0]} />
        </mesh>
        <mesh material={maneLight} position={[0, 0.01, 0]} rotation={[0.3, 0.4, 0]}>
          <dodecahedronGeometry args={[0.072, 0]} />
        </mesh>
        <mesh material={fur} position={[0, 0, 0.04]}>
          <icosahedronGeometry args={[0.05, 1]} />
        </mesh>
        <mesh material={mat('#f3dcb6')} position={[0, -0.02, 0.075]} scale={[1.2, 0.8, 0.8]}>
          <icosahedronGeometry args={[0.025, 1]} />
        </mesh>
        <mesh material={mat('#3b2412')} position={[0, -0.006, 0.098]}>
          <sphereGeometry args={[0.009, 6, 6]} />
        </mesh>
        <Eyes x={0.02} y={0.012} z={0.082} r={0.007} color="#5a3410" />
      </group>
      <group ref={tail} position={[0, 0.16, -0.14]}>
        <mesh material={fur} position={[0, -0.02, -0.05]} rotation={[-2.2, 0, 0]}>
          <capsuleGeometry args={[0.01, 0.1, 2, 6]} />
        </mesh>
        <mesh material={mane} position={[0, -0.07, -0.08]}>
          <icosahedronGeometry args={[0.018, 0]} />
        </mesh>
      </group>
    </group>
  )
}

/** Green snake slithering in place, tongue flicking. */
function Snake() {
  const segs = useRef<(THREE.Mesh | null)[]>([])
  const head = useRef<THREE.Group>(null)
  const tongue = useRef<THREE.Mesh>(null)
  const N = 12
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 2.2
    segs.current.forEach((m, i) => {
      if (m) m.position.x = Math.sin(t - i * 0.6) * 0.03 * (i / N + 0.3)
    })
    if (head.current) head.current.position.x = Math.sin(t + 0.6) * 0.012
    if (tongue.current) tongue.current.visible = Math.sin(clock.elapsedTime * 6) > 0.4
  })
  return (
    <group>
      {Array.from({ length: N }, (_, i) => (
        <mesh
          key={i}
          ref={el => { segs.current[i] = el }}
          material={mat(i % 3 === 1 ? '#facc15' : '#4d9a1f')}
          position={[0, 0.016, -i * 0.022]}
        >
          <sphereGeometry args={[0.017 - i * 0.0009, 8, 6]} />
        </mesh>
      ))}
      <group ref={head} position={[0, 0.022, 0.03]}>
        <mesh material={mat('#4d9a1f')} scale={[1, 0.7, 1.4]}>
          <icosahedronGeometry args={[0.02, 1]} />
        </mesh>
        <Eyes x={0.012} y={0.008} z={0.014} r={0.004} color="#facc15" />
        <mesh ref={tongue} material={mat('#e11d48')} position={[0, -0.002, 0.035]}>
          <boxGeometry args={[0.004, 0.002, 0.02]} />
        </mesh>
      </group>
    </group>
  )
}

/** Spider dangling from a tree branch on a silk thread. */
function DanglingSpider() {
  const g = useRef<THREE.Group>(null)
  const thread = useRef<THREE.Mesh>(null)
  const legs = useRef<(THREE.Group | null)[]>([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const drop = 0.08 + (Math.sin(t * 0.9) + 1) * 0.04
    if (g.current) g.current.position.y = -drop
    if (thread.current) {
      thread.current.scale.y = drop
      thread.current.position.y = -drop / 2
    }
    legs.current.forEach((l, i) => {
      if (l) l.rotation.z = (i % 2 ? -1 : 1) * (0.5 + Math.sin(t * 8 + i) * 0.15)
    })
  })
  const body = mat('#2a1f3d')
  return (
    <group>
      <mesh ref={thread} material={mat('#e5e7eb')}>
        <cylinderGeometry args={[0.0012, 0.0012, 1, 4]} />
      </mesh>
      <group ref={g}>
        <mesh material={body} position={[0, -0.02, 0]}>
          <icosahedronGeometry args={[0.022, 1]} />
        </mesh>
        <mesh material={body} position={[0, 0.002, 0]}>
          <icosahedronGeometry args={[0.013, 1]} />
        </mesh>
        <mesh material={mat('#ef4444')} position={[0, -0.03, 0.017]}>
          <sphereGeometry args={[0.006, 5, 5]} />
        </mesh>
        <Eyes x={0.005} y={0.006} z={0.011} r={0.003} color="#ffffff" />
        {Array.from({ length: 8 }, (_, i) => {
          const side = i % 2 ? -1 : 1
          const z = (Math.floor(i / 2) - 1.5) * 0.008
          return (
            <group key={i} ref={el => { legs.current[i] = el }} position={[0, -0.002, z]} rotation={[0, (Math.floor(i / 2) - 1.5) * 0.35 * side, 0]}>
              <mesh material={body} position={[side * 0.016, 0.004, 0]} rotation={[0, 0, side * 0.6]}>
                <cylinderGeometry args={[0.0015, 0.0015, 0.03, 4]} />
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}

/** Little songbird perched on a treetop, pecking and hopping. */
function Songbird({ color, belly, seed = 0 }: { color: string; belly: string; seed?: number }) {
  const g = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + seed
    const hop = (t % 2.6) / 2.6
    if (g.current) {
      g.current.position.y = hop > 0.88 ? Math.sin(((hop - 0.88) / 0.12) * Math.PI) * 0.025 : 0
      g.current.rotation.y = Math.floor(t / 2.6) * 1.3
    }
    if (head.current) head.current.rotation.x = Math.sin(t * 5) > 0.7 ? 0.6 : 0
  })
  return (
    <group ref={g}>
      <mesh material={mat(color)} position={[0, 0.02, 0]} scale={[0.85, 0.85, 1.2]}>
        <icosahedronGeometry args={[0.022, 1]} />
      </mesh>
      <mesh material={mat(belly)} position={[0, 0.015, 0.008]} scale={[0.7, 0.7, 0.9]}>
        <icosahedronGeometry args={[0.018, 1]} />
      </mesh>
      <mesh material={mat(color)} position={[0, 0.03, -0.03]} rotation={[-0.6, 0, 0]}>
        <boxGeometry args={[0.014, 0.003, 0.025]} />
      </mesh>
      <group ref={head} position={[0, 0.04, 0.016]}>
        <mesh material={mat(color)}>
          <icosahedronGeometry args={[0.014, 1]} />
        </mesh>
        <mesh material={mat('#ffb020')} position={[0, -0.002, 0.016]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.004, 0.012, 4]} />
        </mesh>
        <Eyes x={0.008} y={0.004} z={0.01} r={0.0025} />
      </group>
    </group>
  )
}

/* ---------- my pets ---------- */

const GINGER = '#f2a154'
const GINGER_DARK = '#d97b2b'
const CREAM = '#ffe4c2'
const PINK = '#ff9db0'

/** Ginger cat sitting upright, tail swishing, looking around. */
function SittingCat({ eye = '#4ade80' }: { eye?: string }) {
  const head = useRef<THREE.Group>(null)
  const tail = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (head.current) head.current.rotation.y = Math.sin(t * 0.5) * 0.6
    if (tail.current) tail.current.rotation.z = Math.sin(t * 1.8) * 0.5
  })
  const fur = mat(GINGER)
  const dark = mat(GINGER_DARK)
  const cream = mat(CREAM)
  return (
    <group>
      {/* body + front legs */}
      <mesh material={fur} position={[0, 0.1, 0]} scale={[1, 1.25, 0.95]}>
        <icosahedronGeometry args={[0.08, 1]} />
      </mesh>
      <mesh material={cream} position={[0, 0.1, 0.05]} scale={[0.7, 1.1, 0.5]}>
        <icosahedronGeometry args={[0.06, 1]} />
      </mesh>
      <mesh material={dark} position={[0, 0.17, -0.04]} scale={[0.9, 0.35, 0.8]}>
        <icosahedronGeometry args={[0.06, 0]} />
      </mesh>
      {[-1, 1].map(s => (
        <mesh key={s} material={fur} position={[s * 0.035, 0.05, 0.055]}>
          <cylinderGeometry args={[0.016, 0.018, 0.1, 6]} />
        </mesh>
      ))}
      {/* head */}
      <group ref={head} position={[0, 0.24, 0.03]}>
        <mesh material={fur}>
          <icosahedronGeometry args={[0.065, 1]} />
        </mesh>
        <mesh material={cream} position={[0, -0.018, 0.05]} scale={[1, 0.7, 0.7]}>
          <icosahedronGeometry args={[0.03, 1]} />
        </mesh>
        <mesh material={mat(PINK)} position={[0, -0.006, 0.07]}>
          <sphereGeometry args={[0.008, 6, 6]} />
        </mesh>
        {[-1, 1].map(s => (
          <group key={s}>
            <mesh material={fur} position={[s * 0.038, 0.058, -0.005]} rotation={[0, 0, -s * 0.25]}>
              <coneGeometry args={[0.026, 0.06, 3]} />
            </mesh>
            <mesh material={mat(PINK)} position={[s * 0.037, 0.055, 0.004]} rotation={[0, 0, -s * 0.25]}>
              <coneGeometry args={[0.014, 0.04, 3]} />
            </mesh>
            <mesh material={mat(eye, 0.4)} position={[s * 0.027, 0.012, 0.055]}>
              <sphereGeometry args={[0.012, 8, 8]} />
            </mesh>
            <mesh material={mat('#111111')} position={[s * 0.027, 0.012, 0.066]} scale={[0.35, 1, 0.4]}>
              <sphereGeometry args={[0.008, 6, 6]} />
            </mesh>
          </group>
        ))}
      </group>
      {/* tail curling up behind */}
      <group ref={tail} position={[0, 0.03, -0.08]}>
        <mesh material={fur} position={[0, 0.02, -0.04]} rotation={[-1.2, 0, 0]}>
          <capsuleGeometry args={[0.016, 0.08, 2, 6]} />
        </mesh>
        <mesh material={dark} position={[0, 0.09, -0.08]} rotation={[-0.3, 0, 0]}>
          <capsuleGeometry args={[0.016, 0.08, 2, 6]} />
        </mesh>
      </group>
    </group>
  )
}

/** Ginger cat curled up asleep, breathing slowly. */
function SleepingCat() {
  const body = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (body.current) body.current.scale.y = 1 + Math.sin(clock.elapsedTime * 1.6) * 0.05
  })
  const fur = mat(GINGER)
  const dark = mat(GINGER_DARK)
  return (
    <group ref={body}>
      <mesh material={fur} position={[0, 0.055, 0]} scale={[1.35, 0.6, 1.05]}>
        <icosahedronGeometry args={[0.1, 1]} />
      </mesh>
      <mesh material={dark} position={[-0.03, 0.095, -0.02]} scale={[1, 0.3, 0.9]}>
        <icosahedronGeometry args={[0.07, 0]} />
      </mesh>
      {/* tail wrapped around the front */}
      <mesh material={dark} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0.4]}>
        <torusGeometry args={[0.12, 0.022, 5, 14, Math.PI]} />
      </mesh>
      {/* head resting on the paws */}
      <group position={[0.1, 0.07, 0.06]} rotation={[0, 0.6, 0.15]}>
        <mesh material={fur}>
          <icosahedronGeometry args={[0.058, 1]} />
        </mesh>
        <mesh material={mat(CREAM)} position={[0, -0.014, 0.045]} scale={[1, 0.7, 0.7]}>
          <icosahedronGeometry args={[0.026, 1]} />
        </mesh>
        <mesh material={mat(PINK)} position={[0, -0.004, 0.062]}>
          <sphereGeometry args={[0.007, 6, 6]} />
        </mesh>
        {[-1, 1].map(s => (
          <group key={s}>
            <mesh material={fur} position={[s * 0.034, 0.05, -0.005]} rotation={[0, 0, -s * 0.25]}>
              <coneGeometry args={[0.024, 0.055, 3]} />
            </mesh>
            {/* closed eyes */}
            <mesh material={mat('#3b2412')} position={[s * 0.024, 0.01, 0.05]} rotation={[0, 0, s * 0.15]}>
              <boxGeometry args={[0.02, 0.004, 0.004]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

/** Red collar with a round black name tag reading "CHERRY". */
function Collar() {
  const tagTexture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#111111'
    ctx.beginPath()
    ctx.arc(128, 128, 124, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#d4d4d8'
    ctx.lineWidth = 10
    ctx.stroke()
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 54px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('CHERRY', 128, 120)
    ctx.fillStyle = '#ef4444'
    ctx.font = '40px system-ui, sans-serif'
    ctx.fillText('♥', 128, 180)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
  useEffect(() => () => tagTexture.dispose(), [tagTexture])

  return (
    // sits around the neck, tilted to follow it from chest to head
    <group position={[0, 0.275, 0.165]} rotation={[-0.93, 0, 0]}>
      <mesh material={mat('#e11d48')}>
        <torusGeometry args={[0.058, 0.013, 6, 16]} />
      </mesh>
      {/* tag hangs from the front of the collar */}
      <group position={[0, -0.062, 0.012]} rotation={[0.93, 0, 0]}>
        <mesh material={mat('#c0c0c8')} position={[0, 0.012, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.006, 0.002, 4, 8]} />
        </mesh>
        <mesh position={[0, -0.012, 0.006]}>
          <circleGeometry args={[0.024, 20]} />
          <meshStandardMaterial map={tagTexture} roughness={0.4} metalness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}

/** Cherry: fluffy white dog with tall ears. Trots when walking, gallops otherwise. */
function Dog({ walking = false }: { walking?: boolean }) {
  const legs = useRef<(THREE.Group | null)[]>([])
  const tail = useRef<THREE.Group>(null)
  const body = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * (walking ? 7 : 13)
    legs.current.forEach((l, i) => {
      // walking: diagonal pairs move together; galloping: front/back pairs
      const phase = walking ? (i === 0 || i === 3 ? 0 : Math.PI) : (i < 2 ? 0 : Math.PI) + (i % 2) * 0.4
      if (l) l.rotation.x = Math.sin(t + phase) * (walking ? 0.45 : 0.8)
    })
    if (tail.current) tail.current.rotation.z = Math.sin(t * (walking ? 1.4 : 0.7)) * 0.4
    if (body.current) body.current.position.y = Math.abs(Math.sin(t)) * (walking ? 0.01 : 0.025)
  })
  const white = mat('#fbf7ee')
  const cream = mat('#efe3cc')
  const brown = mat('#5b3a29')
  return (
    <group ref={body}>
      {/* legs pivot at the hips */}
      {[[-0.045, 0.1], [0.045, 0.1], [-0.045, -0.09], [0.045, -0.09]].map(([x, z], i) => (
        <group key={i} ref={el => { legs.current[i] = el }} position={[x, 0.14, z]}>
          <mesh material={white} position={[0, -0.065, 0]}>
            <cylinderGeometry args={[0.022, 0.018, 0.13, 6]} />
          </mesh>
        </group>
      ))}
      {/* body + fluffy ruff */}
      <mesh material={white} position={[0, 0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.085, 0.17, 3, 8]} />
      </mesh>
      <mesh material={white} position={[0, 0.21, 0.12]} scale={[1.1, 1.1, 0.9]}>
        <icosahedronGeometry args={[0.085, 1]} />
      </mesh>
      <Collar />
      {/* head */}
      <group position={[0, 0.31, 0.19]}>
        <mesh material={white}>
          <icosahedronGeometry args={[0.075, 1]} />
        </mesh>
        <mesh material={cream} position={[0, -0.022, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.04, 0.09, 6]} />
        </mesh>
        <mesh material={brown} position={[0, -0.022, 0.118]}>
          <sphereGeometry args={[0.014, 6, 6]} />
        </mesh>
        {[-1, 1].map(s => (
          <group key={s}>
            <mesh material={white} position={[s * 0.042, 0.085, -0.01]} rotation={[0, 0, -s * 0.18]}>
              <coneGeometry args={[0.03, 0.1, 4]} />
            </mesh>
            <mesh material={mat('#f6c9b8')} position={[s * 0.041, 0.08, 0.004]} rotation={[0, 0, -s * 0.18]}>
              <coneGeometry args={[0.016, 0.07, 4]} />
            </mesh>
            <mesh material={brown} position={[s * 0.03, 0.018, 0.06]}>
              <sphereGeometry args={[0.011, 6, 6]} />
            </mesh>
          </group>
        ))}
      </group>
      {/* fluffy tail curled over the back */}
      <group ref={tail} position={[0, 0.24, -0.14]}>
        <mesh material={white} position={[0, 0.06, -0.02]} rotation={[-0.5, 0, 0]}>
          <capsuleGeometry args={[0.045, 0.1, 3, 7]} />
        </mesh>
      </group>
    </group>
  )
}

/* ---------- me ---------- */

const smoothCache = new Map<string, THREE.MeshStandardMaterial>()
/** Non-faceted material for faces and hair, which look harsh flat-shaded. */
function smooth(color: string, roughness = 0.6) {
  const key = `${color}-${roughness}`
  let m = smoothCache.get(key)
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness })
    smoothCache.set(key, m)
  }
  return m
}

const ombreMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, side: THREE.DoubleSide })

const HAIR_ROOT = new THREE.Color('#2a140e')
const HAIR_MID = new THREE.Color('#6e3119')
const HAIR_TIP = new THREE.Color('#e3893b')

/**
 * Bakes a hair piece into head space and colours it by height, so every piece
 * shares one continuous gradient: dark roots down to about the chin, then
 * warming through auburn to copper tips (like the photo).
 */
function bakeHair(g: THREE.BufferGeometry, m: THREE.Matrix4) {
  g.applyMatrix4(m)
  const pos = g.attributes.position
  const colors = new Float32Array(pos.count * 3)
  const c = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp((-0.02 - pos.getY(i)) / 0.15, 0, 1) // 0 at the chin .. 1 at the tips
    const e = t * t * (3 - 2 * t) // smoothstep for a soft blend
    if (e < 0.5) c.copy(HAIR_ROOT).lerp(HAIR_MID, e * 2)
    else c.copy(HAIR_MID).lerp(HAIR_TIP, (e - 0.5) * 2)
    c.toArray(colors, i * 3)
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  g.computeVertexNormals()
  return g
}

const M = (pos: [number, number, number], rot: [number, number, number] = [0, 0, 0], scl: [number, number, number] = [1, 1, 1]) =>
  new THREE.Matrix4().compose(new THREE.Vector3(...pos), new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)), new THREE.Vector3(...scl))

/** Head with a proper face and long side-swept ombré hair. */
function MyHead() {
  const hair = useMemo(() => {
    const R0 = 0.0415
    const shell: [number, number, number] = [0.98, 1.2, 1.04] // hugs the head, with some volume on top
    return [
      // crown: smooth cap over the top, down to the hairline
      bakeHair(new THREE.SphereGeometry(R0, 32, 10, 0, Math.PI * 2, 0, Math.PI * 0.27), M([0, 0.006, -0.002], [0, 0, 0.06], shell)),
      // sides and back of the head, open at the front for the face
      bakeHair(new THREE.SphereGeometry(R0, 32, 14, Math.PI * 0.72, Math.PI * 1.56, Math.PI * 0.27, Math.PI * 0.4), M([0, 0.006, -0.002], [0, 0, 0.06], shell)),
      // long hair falling down the back, flaring slightly
      bakeHair(new THREE.CylinderGeometry(0.039, 0.052, 0.21, 28, 8, true, Math.PI * 0.62, Math.PI * 0.76), M([0, -0.11, -0.006])),
      // strands over each shoulder, falling forward
      ...[-1, 1].flatMap(s => {
        const tube = (pts: [number, number, number][], r: number) =>
          bakeHair(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), 40, r, 12, false), M([0, 0, 0]))
        return [
          // front lock: from the temple, framing the cheek, over the shoulder and down the chest
          tube([[s * 0.029, 0.03, 0.016], [s * 0.033, 0.0, 0.024], [s * 0.034, -0.035, 0.024], [s * 0.036, -0.08, 0.034], [s * 0.033, -0.14, 0.04], [s * 0.03, -0.19, 0.038]], 0.0085),
          // fuller lock just behind it, from above the ear
          tube([[s * 0.036, 0.026, -0.004], [s * 0.04, -0.01, 0.0], [s * 0.042, -0.06, 0.006], [s * 0.042, -0.13, 0.008], [s * 0.039, -0.19, 0.004]], 0.0095),
        ]
      }),
    ]
  }, [])
  useEffect(() => () => hair.forEach(g => g.dispose()), [hair])

  const skin = smooth('#d39a72')
  const brow = smooth('#2a1610')
  const lips = smooth('#c8203c', 0.35)

  return (
    <group>
      {/* face */}
      <mesh material={skin} scale={[0.9, 1.1, 0.95]}>
        <sphereGeometry args={[0.038, 24, 18]} />
      </mesh>
      {[-1, 1].map(s => (
        <group key={s}>
          {/* eye white, iris, sparkle */}
          <mesh material={smooth('#fbf7f2', 0.3)} position={[s * 0.0135, 0.006, 0.0315]} scale={[1.25, 0.75, 0.5]}>
            <sphereGeometry args={[0.0075, 12, 10]} />
          </mesh>
          <mesh material={smooth('#3b2314', 0.3)} position={[s * 0.0135, 0.006, 0.0345]}>
            <sphereGeometry args={[0.0042, 10, 8]} />
          </mesh>
          <mesh material={smooth('#ffffff', 0.2)} position={[s * 0.0125, 0.0075, 0.0383]}>
            <sphereGeometry args={[0.0011, 6, 6]} />
          </mesh>
          {/* eyebrows */}
          <mesh material={brow} position={[s * 0.0135, 0.0175, 0.0335]} rotation={[0, 0, s * -0.12]}>
            <boxGeometry args={[0.013, 0.0024, 0.002]} />
          </mesh>
        </group>
      ))}
      {/* nose */}
      <mesh material={smooth('#c78a63')} position={[0, -0.003, 0.0365]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.0042, 0.01, 10]} />
      </mesh>
      {/* red lips */}
      <mesh material={lips} position={[0, -0.0165, 0.0335]} scale={[1.7, 0.5, 0.6]}>
        <sphereGeometry args={[0.0055, 12, 8]} />
      </mesh>
      <mesh material={lips} position={[0, -0.0198, 0.0328]} scale={[1.45, 0.62, 0.6]}>
        <sphereGeometry args={[0.0055, 12, 8]} />
      </mesh>
      {/* beauty mark */}
      <mesh material={brow} position={[0.008, -0.0245, 0.033]}>
        <sphereGeometry args={[0.0012, 6, 6]} />
      </mesh>

      {/* hair: one continuous gradient from dark roots to copper tips */}
      {hair.map((g, i) => (
        <mesh key={i} geometry={g} material={ombreMat} />
      ))}
    </group>
  )
}

/** Me: long brown-to-copper hair, black midi dress, gold rope belt, walking. */
function Me() {
  const legs = useRef<(THREE.Group | null)[]>([])
  const swingArm = useRef<THREE.Group>(null)
  const body = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 7 // matches Cherry's trot
    legs.current.forEach((l, i) => {
      if (l) l.rotation.x = Math.sin(t + i * Math.PI) * 0.14 // small steps in a pencil dress
    })
    if (swingArm.current) swingArm.current.rotation.x = Math.sin(t) * 0.3
    if (body.current) body.current.position.y = Math.abs(Math.sin(t)) * 0.004
    if (head.current) head.current.rotation.z = Math.sin(t) * 0.025
  })

  // Fitted midi dress as one smooth silhouette: hem, knees, hips, waist, bust, shoulders, neckline
  const dressGeo = useMemo(() => {
    const profile = [
      [0.033, 0.105], [0.035, 0.12], [0.037, 0.16], [0.041, 0.2], [0.046, 0.235], [0.048, 0.258],
      [0.044, 0.282], [0.035, 0.303], [0.036, 0.318], [0.044, 0.338], [0.047, 0.352], [0.045, 0.367],
      [0.038, 0.381], [0.022, 0.392], [0.0135, 0.397],
    ].map(([r, y]) => new THREE.Vector2(r, y))
    return new THREE.LatheGeometry(profile, 32)
  }, [])
  useEffect(() => () => dressGeo.dispose(), [dressGeo])

  const skin = smooth('#d39a72', 0.55)
  const dress = smooth('#141019', 0.75)
  const gold = smooth('#d9ab3a', 0.3)
  const nude = smooth('#e6b08c', 0.4)

  return (
    <group ref={body}>
      {/* legs pivot at the hips inside the skirt; calves show below the hem */}
      {[-1, 1].map((s, i) => (
        <group key={s} ref={el => { legs.current[i] = el }} position={[s * 0.018, 0.2, 0]}>
          <mesh material={skin} position={[0, -0.0825, 0]}>
            <cylinderGeometry args={[0.0135, 0.0082, 0.165, 14]} />
          </mesh>
          {/* nude strapless pump with a stiletto heel: heel up, toes down */}
          <group position={[0, -0.165, 0]}>
            <mesh material={nude} position={[0, -0.017, 0.01]} rotation={[-0.89, 0, 0]} scale={[0.85, 1, 0.75]}>
              <capsuleGeometry args={[0.0074, 0.027, 4, 12]} />
            </mesh>
            {/* bare top of the foot above the shoe */}
            <mesh material={skin} position={[0, -0.009, 0.006]} rotation={[-0.89, 0, 0]} scale={[0.75, 1, 0.55]}>
              <capsuleGeometry args={[0.0062, 0.016, 4, 10]} />
            </mesh>
            <mesh material={nude} position={[0, -0.021, -0.008]}>
              <cylinderGeometry args={[0.0028, 0.0016, 0.028, 8]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* fitted black midi dress + gold rope belt at the waist (flattened front-to-back) */}
      <group scale={[1, 1, 0.86]}>
        <mesh geometry={dressGeo} material={dress} />
        <mesh material={gold} position={[0, 0.305, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.0365, 0.0042, 8, 32]} />
        </mesh>
      </group>
      <mesh material={gold} position={[0.012, 0.293, 0.028]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.0035, 0.022, 3, 8]} />
      </mesh>

      {/* arms: right one swings; left one is held forward with the leash */}
      <group ref={swingArm} position={[-0.044, 0.37, 0]} rotation={[0, 0, -0.1]}>
        <mesh material={dress} position={[0, -0.016, 0]}>
          <cylinderGeometry args={[0.0125, 0.0118, 0.034, 14]} />
        </mesh>
        <mesh material={skin} position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.0105, 0.0075, 0.1, 12]} />
        </mesh>
        <mesh material={gold} position={[0, -0.122, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.0085, 0.0022, 6, 12]} />
        </mesh>
        <mesh material={skin} position={[0, -0.138, 0]} scale={[0.8, 1.2, 0.6]}>
          <sphereGeometry args={[0.01, 10, 8]} />
        </mesh>
      </group>
      <group position={[0.044, 0.37, 0]} rotation={[-0.55, 0, 0.1]}>
        <mesh material={dress} position={[0, -0.016, 0]}>
          <cylinderGeometry args={[0.0125, 0.0118, 0.034, 14]} />
        </mesh>
        <mesh material={skin} position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.0105, 0.0075, 0.1, 12]} />
        </mesh>
        {/* watch */}
        <mesh material={gold} position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.0088, 0.0028, 6, 12]} />
        </mesh>
        <mesh material={skin} position={[0, -0.138, 0]} scale={[0.8, 1.2, 0.6]}>
          <sphereGeometry args={[0.01, 10, 8]} />
        </mesh>
      </group>

      {/* neck + head */}
      <mesh material={skin} position={[0, 0.405, 0]}>
        <cylinderGeometry args={[0.0115, 0.013, 0.03, 12]} />
      </mesh>
      <group ref={head} position={[0, 0.45, 0]}>
        <MyHead />
      </group>
    </group>
  )
}

/** Red leash from my hand to Cherry's collar, with a little sag. */
function Leash({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const geo = useMemo(() => {
    const a = new THREE.Vector3(...from)
    const b = new THREE.Vector3(...to)
    const mid = a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, -0.07, 0))
    const curve = new THREE.CatmullRomCurve3([a, mid, b])
    return new THREE.TubeGeometry(curve, 20, 0.003, 5, false)
  }, [from, to])
  useEffect(() => () => geo.dispose(), [geo])
  return <mesh geometry={geo} material={mat('#e11d48')} />
}

// Axis of the great circle we walk along (tilted so the path misses the other animals)
const RUN_AXIS = new THREE.Vector3(-0.6, 1, 0.6).normalize()

// Positions inside the walking pair's frame (+Y out from the planet, +Z = direction of travel)
const ME_AT: [number, number, number] = [-0.13, 0, -0.07]
const ME_SCALE = 1.25
const DOG_SCALE = 1.1
// My left hand (≈[0.058, 0.253, 0.072] in Me's own frame, after the raised-arm rotation)
// and Cherry's collar tag, both in the pair's frame
const LEASH_FROM: [number, number, number] = [ME_AT[0] + 0.058 * ME_SCALE, 0.253 * ME_SCALE, ME_AT[2] + 0.072 * ME_SCALE]
const LEASH_TO: [number, number, number] = [0, 0.235 * DOG_SCALE, 0.19 * DOG_SCALE]

/** Me walking Cherry in laps around the planet along RUN_AXIS's great circle. */
function WalkingPair({ speed }: { speed: number }) {
  const lap = useRef<THREE.Group>(null)
  const { trackQ, pairQ } = useMemo(() => {
    const trackQ = new THREE.Quaternion().setFromUnitVectors(UP, RUN_AXIS)
    // pair's up -> outward (+Z), pair's forward -> direction of travel (+X)
    const m = new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0))
    return { trackQ, pairQ: new THREE.Quaternion().setFromRotationMatrix(m) }
  }, [])
  useFrame((_, dt) => {
    if (lap.current) lap.current.rotation.y += dt * 0.16 * speed // a stroll, not a sprint
  })
  return (
    <group quaternion={trackQ}>
      <group ref={lap}>
        <group position={[0, 0, R - 0.02]} quaternion={pairQ}>
          <group scale={DOG_SCALE}>
            <Dog walking />
          </group>
          <group position={ME_AT} scale={ME_SCALE}>
            <Me />
          </group>
          <Leash from={LEASH_FROM} to={LEASH_TO} />
        </group>
      </group>
    </group>
  )
}

function Bunny() {
  const body = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (body.current) body.current.position.y = Math.abs(Math.sin(clock.elapsedTime * 3.2)) * 0.06
  })
  const fur = mat('#f5f3ff')
  const pink = mat('#ff8fc7')
  return (
    <group ref={body}>
      <mesh material={fur} position={[0, 0.09, 0]} scale={[1, 0.9, 1.2]}>
        <icosahedronGeometry args={[0.09, 1]} />
      </mesh>
      <mesh material={fur} position={[0, 0.19, 0.08]}>
        <icosahedronGeometry args={[0.065, 1]} />
      </mesh>
      {[-1, 1].map(s => (
        <group key={s} position={[s * 0.03, 0.3, 0.06]} rotation={[-0.2, 0, s * 0.15]}>
          <mesh material={fur}>
            <capsuleGeometry args={[0.018, 0.1, 2, 6]} />
          </mesh>
          <mesh material={pink} position={[0, 0, 0.012]} scale={[0.6, 0.85, 0.5]}>
            <capsuleGeometry args={[0.018, 0.1, 2, 6]} />
          </mesh>
        </group>
      ))}
      <mesh material={pink} position={[0, 0.19, 0.145]}>
        <sphereGeometry args={[0.012, 6, 6]} />
      </mesh>
      {[-1, 1].map(s => (
        <mesh key={s} material={mat('#1e1b4b')} position={[s * 0.035, 0.21, 0.125]}>
          <sphereGeometry args={[0.01, 6, 6]} />
        </mesh>
      ))}
      <mesh material={fur} position={[0, 0.1, -0.12]}>
        <icosahedronGeometry args={[0.035, 0]} />
      </mesh>
    </group>
  )
}

function Owl() {
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // look around, pausing between turns
    if (head.current) head.current.rotation.y = Math.sin(t * 0.6) > 0.3 ? 0.9 : Math.sin(t * 0.6) < -0.3 ? -0.9 : 0
  })
  const brown = mat('#8b5a3c')
  const belly = mat('#e7c9a5')
  return (
    <group>
      <mesh material={brown} position={[0, 0.08, 0]} scale={[1, 1.2, 0.95]}>
        <icosahedronGeometry args={[0.07, 1]} />
      </mesh>
      <mesh material={belly} position={[0, 0.07, 0.04]} scale={[0.75, 1, 0.6]}>
        <icosahedronGeometry args={[0.06, 1]} />
      </mesh>
      <group ref={head} position={[0, 0.17, 0]}>
        <mesh material={brown}>
          <icosahedronGeometry args={[0.065, 1]} />
        </mesh>
        {[-1, 1].map(s => (
          <group key={s}>
            <mesh material={mat('#ffffff')} position={[s * 0.028, 0.005, 0.05]}>
              <sphereGeometry args={[0.024, 8, 8]} />
            </mesh>
            <mesh material={mat('#ffd23f', 0.6)} position={[s * 0.028, 0.005, 0.068]}>
              <sphereGeometry args={[0.013, 8, 8]} />
            </mesh>
            <mesh material={mat('#111111')} position={[s * 0.028, 0.005, 0.078]}>
              <sphereGeometry args={[0.006, 6, 6]} />
            </mesh>
            <mesh material={brown} position={[s * 0.04, 0.06, 0]} rotation={[0, 0, -s * 0.4]}>
              <coneGeometry args={[0.015, 0.045, 4]} />
            </mesh>
          </group>
        ))}
        <mesh material={mat('#ff9f1c')} position={[0, -0.018, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.01, 0.025, 4]} />
        </mesh>
      </group>
    </group>
  )
}

/* ---------- things in the air ---------- */

function Bird({ color, radius, tilt, speed, phase }: { color: string; radius: number; tilt: number; speed: number; phase: number }) {
  const orbit = useRef<THREE.Group>(null)
  const lw = useRef<THREE.Group>(null)
  const rw = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbit.current) orbit.current.rotation.y = phase + t * speed
    const flap = Math.sin(t * 12 + phase) * 0.7
    if (lw.current) lw.current.rotation.z = flap
    if (rw.current) rw.current.rotation.z = -flap
  })
  const m = mat(color)
  return (
    <group rotation={[tilt, 0, tilt * 0.5]}>
      <group ref={orbit}>
        <group position={[radius, 0, 0]} rotation={[0, Math.PI, 0]} scale={0.9}>
          <mesh material={m} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.03, 0.12, 5]} />
          </mesh>
          {/* wings hinge at the body */}
          <group ref={lw}>
            <mesh material={m} position={[-0.07, 0, 0]}>
              <boxGeometry args={[0.13, 0.008, 0.05]} />
            </mesh>
          </group>
          <group ref={rw}>
            <mesh material={m} position={[0.07, 0, 0]}>
              <boxGeometry args={[0.13, 0.008, 0.05]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

function Butterfly({ color, seed }: { color: string; seed: number }) {
  const g = useRef<THREE.Group>(null)
  const l = useRef<THREE.Mesh>(null)
  const r = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + seed * 10
    if (g.current) {
      const n = surfaceNormal(Math.sin(t * 0.3) * 50, t * 12 + seed * 90).multiplyScalar(R + 0.4 + Math.sin(t * 2) * 0.06)
      g.current.position.copy(n)
      g.current.lookAt(0, 0, 0)
    }
    const flap = Math.sin(t * 18) * 1.1
    if (l.current) l.current.rotation.y = flap
    if (r.current) r.current.rotation.y = -flap
  })
  return (
    <group ref={g} scale={1.5}>
      <mesh ref={l}>
        <circleGeometry args={[0.035, 5, 0, Math.PI]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r} rotation={[0, 0, Math.PI]}>
        <circleGeometry args={[0.035, 5, 0, Math.PI]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Cloud({ lat, lon, speed }: { lat: number; lon: number; speed: number }) {
  const g = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * speed
  })
  const white = mat('#f8f7ff')
  return (
    <group ref={g}>
      <OnPlanet lat={lat} lon={lon} lift={0.75}>
        <group scale={[1.5, 1.05, 1.5]}>
          <mesh material={white}><icosahedronGeometry args={[0.1, 0]} /></mesh>
          <mesh material={white} position={[0.1, -0.02, 0]}><icosahedronGeometry args={[0.075, 0]} /></mesh>
          <mesh material={white} position={[-0.1, -0.03, 0.02]}><icosahedronGeometry args={[0.07, 0]} /></mesh>
        </group>
      </OnPlanet>
    </group>
  )
}

function Moon() {
  const { viewport, size } = useThree()
  // top-right corner, clear of the hero text
  const position: [number, number, number] =
    size.width >= 1024 ? [viewport.width * 0.42, viewport.height * 0.38, -2.5] : [viewport.width * 0.32, viewport.height * 0.4, -2]
  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshStandardMaterial color="#fff4c2" emissive="#ffe58a" emissiveIntensity={0.9} flatShading />
      </mesh>
      {[[0.15, 0.1, 0.36], [-0.12, -0.15, 0.36], [0.05, -0.22, 0.33]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.06 - i * 0.012, 8, 8]} />
          <meshStandardMaterial color="#f2d675" emissive="#e8c75a" emissiveIntensity={0.5} flatShading />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.75, 24, 24]} />
        <meshBasicMaterial color="#ffd23f" transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </group>
  )
}

function ShootingStar() {
  const m = useRef<THREE.Mesh>(null)
  const state = useRef({ t: 0, next: 2, from: new THREE.Vector3(), dir: new THREE.Vector3() })
  useFrame((_, dt) => {
    const s = state.current
    const mesh = m.current
    if (!mesh) return
    s.t += dt
    if (s.t > s.next) {
      s.t = 0
      s.next = 4 + Math.random() * 5
      s.from.set(2 + Math.random() * 4, 2.5 + Math.random() * 1.5, -4)
      s.dir.set(-1, -0.45, 0).normalize()
      mesh.rotation.z = Math.atan2(s.dir.y, s.dir.x)
    }
    const life = s.t / 0.9
    mesh.visible = life < 1
    mesh.position.copy(s.from).addScaledVector(s.dir, life * 7)
    ;(mesh.material as THREE.MeshBasicMaterial).opacity = Math.sin(Math.min(life, 1) * Math.PI)
  })
  return (
    <mesh ref={m} visible={false}>
      <planeGeometry args={[0.9, 0.025]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

/* ---------- seasons ---------- */

type Season = 'christmas' | 'newyear' | null

/** December -> Christmas tree, January -> New Year + fireworks. Preview with ?season=december|january. */
function getSeason(): Season {
  if (typeof window === 'undefined') return null
  const q = new URLSearchParams(window.location.search).get('season')
  if (q === 'december' || q === 'christmas') return 'christmas'
  if (q === 'january' || q === 'newyear') return 'newyear'
  const m = new Date().getMonth()
  return m === 11 ? 'christmas' : m === 0 ? 'newyear' : null
}

const LIGHT_COLORS = ['#ff3d6e', '#ffd23f', '#22d3ee', '#b8f53a']

/** Christmas tree with twinkling string lights, ornaments, a glowing star and presents. */
function ChristmasTree() {
  // one material per bulb colour so they can twinkle in turn
  const bulbs = useMemo(
    () => LIGHT_COLORS.map(c => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 2 })),
    []
  )
  useEffect(() => () => bulbs.forEach(b => b.dispose()), [bulbs])
  const star = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    bulbs.forEach((b, i) => {
      b.emissiveIntensity = 0.8 + Math.max(0, Math.sin(t * 3 - i * 1.6)) * 3
    })
    if (star.current) {
      star.current.rotation.y = t * 0.8
      star.current.scale.setScalar(1 + Math.sin(t * 4) * 0.08)
    }
  })

  // tree envelope: radius shrinks from 0.2 at y=0.1 to 0 at y=0.58
  const radiusAt = (y: number) => Math.max(0, 0.2 * (1 - (y - 0.1) / 0.48))
  // two strands of lights spiralling up in opposite directions
  const lights = useMemo(
    () =>
      [1, -1].flatMap((dir, strand) =>
        Array.from({ length: 60 }, (_, i) => {
          const t = i / 60
          const y = 0.11 + t * 0.44
          const a = dir * t * Math.PI * 9 + strand * 1.3
          const r = radiusAt(y) + 0.007
          return { p: [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number], c: (i + strand) % LIGHT_COLORS.length }
        })
      ),
    []
  )
  const ornaments = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const y = 0.13 + (((i * 37) % 100) / 100) * 0.36
        const a = i * 2.39996
        const r = radiusAt(y) + 0.002
        return {
          p: [Math.cos(a) * r, y - 0.012, Math.sin(a) * r] as [number, number, number],
          color: ['#e11d48', '#fbbf24', '#e5e7eb', '#a855f7', '#22d3ee'][i % 5],
          size: 0.012 + (i % 3) * 0.003,
        }
      }),
    []
  )
  // gold and silver tinsel garlands
  const tinsel = useMemo(
    () =>
      [0, Math.PI].map(offset => {
        const pts = Array.from({ length: 80 }, (_, i) => {
          const t = i / 79
          const y = 0.12 + t * 0.4
          const a = t * Math.PI * 5 + offset
          const r = radiusAt(y) + 0.004
          return new THREE.Vector3(Math.cos(a) * r, y - Math.sin(t * Math.PI * 10) * 0.006, Math.sin(a) * r)
        })
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.0035, 5, false)
      }),
    []
  )
  useEffect(() => () => tinsel.forEach(g => g.dispose()), [tinsel])

  const green = mat('#15803d')
  const greenDark = mat('#166534')
  return (
    <group>
      <mesh material={mat('#6b3f22')} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.025, 0.032, 0.1, 6]} />
      </mesh>
      {[
        [0.2, 0.2, 0.18],
        [0.16, 0.18, 0.29],
        [0.12, 0.16, 0.4],
        [0.08, 0.14, 0.5],
      ].map(([r, h, y], i) => (
        <mesh key={i} material={i % 2 ? green : greenDark} position={[0, y, 0]}>
          <coneGeometry args={[r, h, 9]} />
        </mesh>
      ))}
      {tinsel.map((g, i) => (
        <mesh key={`t${i}`} geometry={g}>
          <meshStandardMaterial
            color={i ? '#e5e7eb' : '#fbbf24'}
            emissive={i ? '#cbd5e1' : '#f59e0b'}
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      ))}
      {ornaments.map((o, i) => (
        <mesh key={`o${i}`} position={o.p}>
          <sphereGeometry args={[o.size, 10, 8]} />
          <meshStandardMaterial color={o.color} metalness={0.7} roughness={0.2} emissive={o.color} emissiveIntensity={0.3} />
        </mesh>
      ))}
      {lights.map((l, i) => (
        <mesh key={`l${i}`} material={bulbs[l.c]} position={l.p}>
          <sphereGeometry args={[0.0075, 6, 6]} />
        </mesh>
      ))}
      {/* star */}
      <group ref={star} position={[0, 0.6, 0]}>
        {[0, Math.PI / 2].map(r => (
          <mesh key={r} rotation={[0, r, 0]} scale={[1, 1, 0.35]}>
            <octahedronGeometry args={[0.035, 0]} />
            <meshStandardMaterial color="#ffd23f" emissive="#ffb800" emissiveIntensity={2.2} />
          </mesh>
        ))}
        <pointLight color="#ffcf6b" intensity={2.2} distance={1.1} />
      </group>
      {/* presents */}
      {[
        [0.13, 0.08, '#e11d48', '#fde047'],
        [-0.12, 0.1, '#3b82f6', '#ffffff'],
        [0.02, -0.15, '#22c55e', '#ef4444'],
      ].map(([x, z, box, ribbon], i) => (
        <group key={`g${i}`} position={[x as number, 0.025, z as number]} rotation={[0, i * 0.7, 0]}>
          <mesh material={mat(box as string)}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
          </mesh>
          <mesh material={mat(ribbon as string)}>
            <boxGeometry args={[0.053, 0.052, 0.012]} />
          </mesh>
          <mesh material={mat(ribbon as string)}>
            <boxGeometry args={[0.012, 0.052, 0.053]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Glowing "Happy New Year / <year>" sign floating above the planet. */
function NewYearSign() {
  // in January it's the current year; when previewing at other times, the upcoming one
  const now = new Date()
  const year = now.getMonth() === 0 ? now.getFullYear() : now.getFullYear() + 1
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 420
    const ctx = c.getContext('2d')!
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '600 64px system-ui, sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = '#ff3d9a'
    ctx.shadowBlur = 24
    ctx.fillText('✨ HAPPY NEW YEAR ✨', 512, 80)
    const g = ctx.createLinearGradient(160, 0, 864, 0)
    ;['#ff3d9a', '#ff8a3d', '#ffd23f', '#b8f53a', '#22d3ee', '#8b5cf6'].forEach((col, i, a) => g.addColorStop(i / (a.length - 1), col))
    ctx.font = '900 250px system-ui, sans-serif'
    ctx.shadowColor = '#ffd23f'
    ctx.shadowBlur = 40
    ctx.fillStyle = g
    ctx.fillText(String(year), 512, 265)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [year])
  useEffect(() => () => tex.dispose(), [tex])
  const g = useRef<THREE.Sprite>(null)
  useFrame(({ clock }) => {
    if (g.current) g.current.position.y = 2.05 + Math.sin(clock.elapsedTime * 1.2) * 0.05
  })
  return (
    <sprite ref={g} position={[0, 2.05, 0]} scale={[2.4, 0.98, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} />
    </sprite>
  )
}

let softDotTex: THREE.Texture | null = null
/** Round, soft-edged sprite for snowflakes and firework sparks. */
function softDot() {
  if (softDotTex) return softDotTex
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.8)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  softDotTex = new THREE.CanvasTexture(c)
  return softDotTex
}

/** Gentle snowfall across the whole sky. */
function Snow({ count = 400 }: { count?: number }) {
  const { geo, drift } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const drift = new Float32Array(count * 2) // fall speed, sway phase
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      drift[i * 2] = 0.25 + Math.random() * 0.35
      drift[i * 2 + 1] = Math.random() * Math.PI * 2
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return { geo, drift }
  }, [count])
  useEffect(() => () => geo.dispose(), [geo])

  useFrame(({ clock }, dt) => {
    const pos = geo.attributes.position as THREE.BufferAttribute
    const t = clock.elapsedTime
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) - drift[i * 2] * dt
      if (y < -5) y = 5
      pos.setY(i, y)
      pos.setX(i, pos.getX(i) + Math.sin(t * 0.8 + drift[i * 2 + 1]) * 0.002)
    }
    pos.needsUpdate = true
  })

  return (
    <points geometry={geo}>
      <pointsMaterial map={softDot()} size={0.09} transparent opacity={0.85} depthWrite={false} color="#ffffff" />
    </points>
  )
}

const FW_PARTICLES = 120
const FW_LIFE = 1.8

/** Fireworks: bursts of coloured sparks around the planet, staggered so the sky is never empty. */
function Fireworks({ count = 5 }: { count?: number }) {
  const bursts = useMemo(
    () =>
      Array.from({ length: count }, (_, k) => {
        const geo = new THREE.BufferGeometry()
        const pos = new Float32Array(FW_PARTICLES * 3)
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        const material = new THREE.PointsMaterial({
          size: 0.13,
          map: softDot(),
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          color: PRISM[k % PRISM.length],
        })
        const vel = new Float32Array(FW_PARTICLES * 3)
        return { geo, material, vel, origin: new THREE.Vector3(), age: -k * (FW_LIFE / count) }
      }),
    [count]
  )
  useEffect(() => () => bursts.forEach(b => { b.geo.dispose(); b.material.dispose() }), [bursts])

  const reset = (b: (typeof bursts)[number]) => {
    // somewhere in the sky around (mostly above) the planet
    const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 1.2 - 0.1, Math.random() - 0.7).normalize()
    b.origin.copy(dir).multiplyScalar(2.3 + Math.random() * 0.9)
    b.material.color.set(PRISM[Math.floor(Math.random() * PRISM.length)])
    for (let i = 0; i < FW_PARTICLES; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(0.7 + Math.random() * 0.4)
      v.toArray(b.vel, i * 3)
    }
    b.age = 0
  }

  useFrame((_, dt) => {
    bursts.forEach(b => {
      b.age += dt
      if (b.age >= FW_LIFE) reset(b)
      if (b.age < 0) {
        b.material.opacity = 0
        return
      }
      const a = b.age
      const pos = b.geo.attributes.position as THREE.BufferAttribute
      const ease = 1 - Math.pow(1 - Math.min(a / FW_LIFE, 1), 2) // sparks slow down as they spread
      for (let i = 0; i < FW_PARTICLES; i++) {
        pos.setXYZ(
          i,
          b.origin.x + b.vel[i * 3] * ease,
          b.origin.y + b.vel[i * 3 + 1] * ease - 0.25 * a * a, // a little gravity
          b.origin.z + b.vel[i * 3 + 2] * ease
        )
      }
      pos.needsUpdate = true
      b.material.opacity = Math.max(0, 1 - a / FW_LIFE)
      b.material.size = 0.14 * (1 - (a / FW_LIFE) * 0.5)
    })
  })

  return (
    <>
      {bursts.map((b, i) => (
        <points key={i} geometry={b.geo} material={b.material} />
      ))}
    </>
  )
}

/* ---------- world composition ---------- */

const TREE_COLORS = ['#ff6fb5', '#b8f53a', '#ff8a3d', '#ffd23f', '#c084fc']
const FLOWER_COLORS = ['#ff3d9a', '#ffd23f', '#22d3ee', '#c084fc', '#ffffff', '#ff8a3d']

// Spots kept clear for the animals and pond
const RESERVED = [
  { lat: 35, lon: 20 },   // sitting cat
  { lat: 10, lon: 110 },  // bunny
  { lat: -20, lon: 200 }, // pond
  { lat: 25, lon: 290 },  // sleeping cat
  { lat: 47, lon: 327 },  // fox
  { lat: -21, lon: 76 },  // deer
  { lat: -13, lon: 153 }, // elephant
  { lat: 49, lon: 248 },  // bear
  { lat: 70, lon: 79 },   // sheep
  { lat: -12, lon: 322 }, // hedgehog
  { lat: -53, lon: 98 },  // squirrel
  { lat: -76, lon: 331 }, // turtle
  { lat: 9, lon: 257 },   // tiger
  { lat: 51, lon: 188 },  // lion
  { lat: -54, lon: 220 }, // snake
  { lat: 22, lon: 147 },  // December: Christmas tree clearing
]
// keep a clear lane around the planet for my walk with Cherry
const RUN_LANE = Math.sin(0.2)

function World({ spin, season }: { spin: number; season: Season }) {
  const g = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.12 * spin
  })

  const scatter = useMemo(() => {
    const rand = seeded(42)
    const clear = (lat: number, lon: number) =>
      RESERVED.every(r => surfaceNormal(lat, lon).angleTo(surfaceNormal(r.lat, r.lon)) > 0.42) &&
      Math.abs(surfaceNormal(lat, lon).dot(RUN_AXIS)) > RUN_LANE
    const pick = (n: number, minGap: number, taken: THREE.Vector3[]) => {
      const out: { lat: number; lon: number; turn: number; s: number; i: number }[] = []
      let guard = 0
      while (out.length < n && guard++ < 2000) {
        const lat = Math.asin(rand() * 2 - 1) * (180 / Math.PI)
        const lon = rand() * 360
        const v = surfaceNormal(lat, lon)
        if (!clear(lat, lon) || taken.some(t => t.angleTo(v) < minGap)) continue
        taken.push(v)
        out.push({ lat, lon, turn: rand() * Math.PI * 2, s: 1.15 + rand() * 0.4, i: out.length })
      }
      return out
    }
    const taken: THREE.Vector3[] = []
    return {
      trees: pick(16, 0.34, taken),
      rocks: pick(5, 0.2, taken),
      mushrooms: pick(8, 0.14, taken),
      flowers: pick(36, 0.08, taken),
    }
  }, [])

  // The owl perches on the first round tree
  const owlTree = scatter.trees.find(t => t.i % 3 !== 0)
  // a spider hangs under one round tree, songbirds perch on two others
  const roundTrees = scatter.trees.filter(t => t.i % 3 !== 0 && t !== owlTree)
  const spiderTree = roundTrees[0]
  const birdTrees = roundTrees.slice(1, 3)

  return (
    <group ref={g}>
      <Planet />

      {scatter.trees.map(t => (
        <OnPlanet key={`t${t.i}`} lat={t.lat} lon={t.lon} turn={t.turn} scale={t.s}>
          {t.i % 3 === 0 ? (
            <Pine color={t.i % 2 ? '#0f9d8a' : '#15803d'} />
          ) : (
            <RoundTree color={TREE_COLORS[t.i % TREE_COLORS.length]} />
          )}
          {t === owlTree && (
            <group position={[0, 0.38, 0]} scale={0.9}>
              <Owl />
            </group>
          )}
          {t === spiderTree && (
            <group position={[0.07, 0.2, 0.03]}>
              <DanglingSpider />
            </group>
          )}
          {birdTrees.includes(t) && (
            <group position={[0, 0.37, 0]}>
              <Songbird
                color={t === birdTrees[0] ? '#3b82f6' : '#e11d48'}
                belly={t === birdTrees[0] ? '#e0f2fe' : '#fecdd3'}
                seed={t.i}
              />
            </group>
          )}
        </OnPlanet>
      ))}
      {scatter.rocks.map(r => (
        <OnPlanet key={`r${r.i}`} lat={r.lat} lon={r.lon} turn={r.turn} scale={r.s}>
          <Rock />
        </OnPlanet>
      ))}
      {scatter.mushrooms.map(m => (
        <OnPlanet key={`m${m.i}`} lat={m.lat} lon={m.lon} turn={m.turn} scale={m.s}>
          <Mushroom />
        </OnPlanet>
      ))}
      {scatter.flowers.map(f => (
        <OnPlanet key={`f${f.i}`} lat={f.lat} lon={f.lon} turn={f.turn} scale={1.6}>
          <Flower color={FLOWER_COLORS[f.i % FLOWER_COLORS.length]} />
        </OnPlanet>
      ))}

      {/* my pets: two ginger cats and the white dog */}
      <OnPlanet lat={RESERVED[0].lat} lon={RESERVED[0].lon} turn={0.4} scale={1.2}>
        <SittingCat eye="#4ade80" />
      </OnPlanet>
      <OnPlanet lat={RESERVED[3].lat} lon={RESERVED[3].lon} turn={-0.8} scale={1.2}>
        <SleepingCat />
      </OnPlanet>
      <WalkingPair speed={spin} />

      {season === 'christmas' && (
        <OnPlanet lat={RESERVED[15].lat} lon={RESERVED[15].lon} turn={0.5} scale={1.6}>
          <ChristmasTree />
        </OnPlanet>
      )}
      <OnPlanet lat={RESERVED[1].lat} lon={RESERVED[1].lon} turn={-0.6} scale={1.1}>
        <Bunny />
      </OnPlanet>
      <OnPlanet lat={RESERVED[2].lat} lon={RESERVED[2].lon} scale={1.4}>
        <Pond />
        <Duck />
        <group position={[0.15, 0, -0.12]}>
          <Frog />
        </group>
      </OnPlanet>

      {/* wildlife */}
      {(
        [
          [Fox, 4, 0.95, 0.8],
          [Deer, 5, 1, -0.5],
          [Elephant, 6, 1.15, 2.2],
          [Bear, 7, 1, 1.2],
          [Sheep, 8, 1, -1.4],
          [Hedgehog, 9, 1.1, 0.6],
          [Squirrel, 10, 1.1, 2.6],
          [Turtle, 11, 1.2, -0.2],
          [Tiger, 12, 1, 1.8],
          [Lion, 13, 1.05, -2.3],
          [Snake, 14, 1.3, 0.9],
        ] as const
      ).map(([Animal, idx, scale, turn]) => (
        <OnPlanet key={idx} lat={RESERVED[idx].lat} lon={RESERVED[idx].lon} turn={turn} scale={scale}>
          <Animal />
        </OnPlanet>
      ))}

      <Cloud lat={40} lon={60} speed={0.05} />
      <Cloud lat={-15} lon={170} speed={0.04} />
      <Cloud lat={55} lon={260} speed={0.06} />
    </group>
  )
}

/** Moves the whole world through the page as the visitor scrolls. */
const planetPos = new THREE.Vector3()

function Choreographer({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const { viewport, size } = useThree()
  const isWide = size.width >= 1024

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const p = input.scroll
    const w = viewport.width
    const h = viewport.height

    // Hero: sits to the right on desktop, high and centred on mobile.
    // Afterwards it weaves from side to side behind the content.
    const heroX = isWide ? w * 0.27 : 0
    const heroY = isWide ? 0 : h * 0.24
    const heroT = THREE.MathUtils.smoothstep(p, 0, 0.12)
    const weaveX = Math.sin(p * Math.PI * 4 + 0.6) * w * (isWide ? 0.36 : 0.22)
    const tx = THREE.MathUtils.lerp(heroX, weaveX, heroT)
    const ty = THREE.MathUtils.lerp(heroY, Math.cos(p * Math.PI * 3) * h * 0.08, heroT)
    const baseScale = isWide ? (size.width < 1400 ? 0.78 : 0.95) : 0.6
    const ts = baseScale * THREE.MathUtils.lerp(1, 0.62, heroT)

    const k = 1 - Math.pow(0.001, dt) // frame-rate independent easing
    g.position.x += (tx - g.position.x) * k
    g.position.y += (ty - g.position.y) * k
    g.scale.setScalar(g.scale.x + (ts - g.scale.x) * k)

    // Pointer parallax + scroll turns the planet so new creatures come into view
    // momentum after a drag is released
    if (!input.dragging) {
      input.dragY += input.velY
      input.dragX = THREE.MathUtils.clamp(input.dragX + input.velX, -1.1, 1.1)
      const decay = Math.pow(0.04, dt)
      input.velY *= decay
      input.velX *= decay
    }
    const dragK = input.dragging ? 0.35 : k // follow the hand closely while dragging
    g.rotation.y += (input.mx * 0.4 + p * Math.PI * 2 + input.dragY - g.rotation.y) * dragK
    g.rotation.x += (0.25 - input.my * 0.25 + input.dragX - g.rotation.x) * dragK

    // remember where the planet sits on screen so pointer events can hit-test it
    const v = planetPos.setFromMatrixPosition(g.matrixWorld).project(state.camera)
    input.planet.x = ((v.x + 1) / 2) * size.width
    input.planet.y = ((1 - v.y) / 2) * size.height
    input.planet.r = ((1.55 * g.scale.x) / viewport.height) * size.height

    state.camera.position.x += (input.mx * 0.4 - state.camera.position.x) * k * 0.5
    state.camera.lookAt(0, 0, 0)
  })

  return <group ref={group}>{children}</group>
}

export default function WorldScene() {
  useInputTracking()

  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = typeof window !== 'undefined' && window.innerWidth < 768
  const speed = reduced ? 0.15 : 1
  const [season] = useState<Season>(getSeason)

  return (
    <Canvas
      dpr={[1, small ? 1.5 : 2]}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <hemisphereLight args={['#c4b5fd', '#0b3d1f', 0.9]} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#fff1d6" />
      <pointLight position={[-3, 1, -2]} intensity={25} color="#ff3d9a" />
      <pointLight position={[3, -2, 2]} intensity={12} color="#22d3ee" />

      <Choreographer>
        <World spin={speed} season={season} />
        <Bird color="#ff3d9a" radius={2.2} tilt={0.3} speed={0.5 * speed} phase={0} />
        <Bird color="#22d3ee" radius={2.35} tilt={-0.2} speed={0.45 * speed} phase={2} />
        <Bird color="#ffd23f" radius={2.1} tilt={0.5} speed={0.55 * speed} phase={4} />
        {['#ff8fc7', '#7dd3fc', '#fde047', '#c4b5fd'].map((c, i) => (
          <Butterfly key={c} color={c} seed={i} />
        ))}
        <Sparkles count={small ? 25 : 45} scale={[3.6, 3.6, 3.6]} size={3} speed={0.4 * speed} color="#fde047" opacity={0.9} />
        {season === 'newyear' && (
          <>
            <NewYearSign />
            {!reduced && <Fireworks count={small ? 3 : 5} />}
          </>
        )}
      </Choreographer>

      <Moon />
      <ShootingStar />
      <Stars radius={60} depth={40} count={small ? 1500 : 3500} factor={4} saturation={0.8} fade speed={speed} />
      <Sparkles count={small ? 40 : 80} scale={[16, 10, 6]} size={2.5} speed={0.2 * speed} color="#ffffff" opacity={0.6} />
      {season === 'christmas' && !reduced && <Snow count={small ? 200 : 420} />}
    </Canvas>
  )
}
