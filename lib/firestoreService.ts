// lib/firestoreService.ts
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  position: string
  title?: string
  subtitle?: string
  description?: string
  img: string
  email?: string
  phone?: string
  skype?: string
  location?: string
  resume?: string
  logoUrl?: string
  socialLinks: SocialLink[]
}

export interface TimelineItem {
  year: string
  title: string
  content: string
}

export interface EducationItem {
  year: string
  title: string
  content: string
  desc: string
}

export interface ExperienceData {
  title: string
  description: string
  timeline: TimelineItem[]
}

export interface EducationData {
  title: string
  description: string
  education: EducationItem[]
}

export interface SkillsData {
  title: string
  description: string
  logos: string[]
}

export interface Project {
  img: string
  desc: string
  url: string
}

export interface ProjectsData {
  title: string
  description: string
  projects: Project[]
}

// Helper to safely extract a string field
function getString(field: unknown): string {
  return typeof field === 'string' ? field : ''
}

// Helper to safely extract an array of strings
function getStringArray(field: unknown): string[] {
  return Array.isArray(field) ? field.filter(item => typeof item === 'string') : []
}

// Helper to safely extract a TimelineItem[] from raw DocumentData
function parseTimeline(raw: unknown): TimelineItem[] {
  if (!Array.isArray(raw)) return []
  return raw.map(item => {
    const o = item as Record<string, unknown>
    return {
      year: getString(o.year),
      title: getString(o.title),
      content: getString(o.content),
    }
  })
}

// Helper to safely extract EducationItem[]
function parseEducation(raw: unknown): EducationItem[] {
  if (!Array.isArray(raw)) return []
  return raw.map(item => {
    const o = item as Record<string, unknown>
    return {
      year: getString(o.year),
      title: getString(o.title),
      content: getString(o.content),
      desc: getString(o.desc),
    }
  })
}

// Fetch personal info
export async function fetchPersonalInfo(): Promise<PersonalInfo> {
  const snap = await getDoc(doc(db, 'personal', 'info'))
  const defaultInfo: PersonalInfo = {
    name: '',
    position: '',
    img: '',
    socialLinks: []
  }
  if (!snap.exists()) return defaultInfo

  const data = snap.data()
  const social =
    Array.isArray(data.socialLinks)
      ? data.socialLinks.filter(link => typeof link === 'object').map(link => {
          const o = link as Record<string, unknown>
          return {
            name: getString(o.name),
            url: getString(o.url),
            icon: getString(o.icon),
          }
        })
      : []

  return {
    name:    getString(data.name),
    position:getString(data.position),
    title:   getString(data.title),
    subtitle:getString(data.subtitle),
    description: getString(data.description),
    img:     getString(data.img),
    email:   getString(data.email),
    phone:   getString(data.phone),
    skype:   getString(data.skype),
    location:getString(data.location),
    resume:  getString(data.resume),
    logoUrl: getString(data.logoUrl),
    socialLinks: social,
  }
}

// Fetch experience timeline
export async function fetchExperience(): Promise<ExperienceData> {
  const snap = await getDoc(doc(db, 'personal', 'experience'))
  if (!snap.exists()) {
    return { title: 'Experience', description: '', timeline: [] }
  }
  const data = snap.data()
  return {
    title:       getString(data.title) || 'Experience',
    description: getString(data.description),
    timeline:    parseTimeline(data.timeline),
  }
}

// Fetch education
export async function fetchEducation(): Promise<EducationData> {
  const snap = await getDoc(doc(db, 'personal', 'experience'))
  if (!snap.exists()) {
    return { title: 'Education', description: '', education: [] }
  }
  const data = snap.data()
  const title = getString(data.title)
  return {
    title:       title === 'EXPERIENCE' ? 'Education' : title || 'Education',
    description: getString(data.description),
    education:   parseEducation(data.education),
  }
}

// Fetch skills (logos array)
export async function fetchSkills(): Promise<SkillsData> {
  const snap = await getDoc(doc(db, 'personal', 'skills'))
  if (!snap.exists()) {
    return { title: 'Skills', description: '', logos: [] }
  }
  const data = snap.data()
  return {
    title:       getString(data.title) || 'Skills',
    description: getString(data.description),
    logos:       getStringArray(data.logos),
  }
}

// Fetch projects
export async function fetchProjects(): Promise<ProjectsData> {
  const snap = await getDoc(doc(db, 'personal', 'portfolio'))
  if (!snap.exists()) {
    return { title: 'Portfolio', description: '', projects: [] }
  }
  const data = snap.data()
  const rawProjects = Array.isArray(data.projects) ? data.projects : []
  const projects: Project[] = rawProjects.map(item => {
    const o = item as Record<string, unknown>
    return {
      img:  getString(o.img),
      desc: getString(o.desc),
      url:  getString(o.url),
    }
  })
  return {
    title:       getString(data.title) || 'Portfolio',
    description: getString(data.description),
    projects,
  }
}
