// Small helpers shared by server and client components.

export const PRISM = ['#ff3d9a', '#ff8a3d', '#ffd23f', '#b8f53a', '#22d3ee', '#8b5cf6'] as const
export const prismAt = (i: number) => PRISM[((i % PRISM.length) + PRISM.length) % PRISM.length]

/** "OLD COMPANY PVT LTD" -> "Old Company Pvt Ltd"; leaves mixed-case names alone. */
export function tidyCase(s: string) {
  if (s !== s.toUpperCase()) return s
  return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

/** "Principal Engineer @Isavari" -> { role: "Principal Engineer", company: "Isavari" } */
export function splitRole(raw: string) {
  const [role, ...rest] = raw.split('@')
  return { role: role.trim(), company: tidyCase(rest.join('@').trim()) }
}

/** Earliest 4-digit year referenced by strings like "Aug '14 – Mar '16". */
export function earliestYear(ranges: string[]) {
  const years = ranges.flatMap(r =>
    Array.from(r.matchAll(/'(\d{2})|\b((?:19|20)\d{2})\b/g), m => (m[2] ? +m[2] : 2000 + +m[1]))
  )
  return years.length ? Math.min(...years) : null
}
