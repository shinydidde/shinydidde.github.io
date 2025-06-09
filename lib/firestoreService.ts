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
  socialLinks?: SocialLink[]
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
  description?: string
  timeline: TimelineItem[]
}

export interface EducationData {
  title: string
  description?: string
  education: EducationItem[]
}

export interface SkillsData {
  title: string
  description?: string
  logos: string[]
}

export interface Project {
  img: string
  desc: string
  url: string
}

export interface ProjectsData {
  title: string
  description?: string
  projects: Project[]
}

// Fetch personal info
export async function fetchPersonalInfo(): Promise<PersonalInfo> {
  const snap = await getDoc(doc(db, 'personal', 'info'))
  if (!snap.exists()) {
    return {
      name: '',
      position: '',
      img: '',
      socialLinks: []
    }
  }
  return snap.data() as PersonalInfo
}

// Fetch experience timeline
export async function fetchExperience(): Promise<ExperienceData> {
  const snap = await getDoc(doc(db, 'personal', 'experience'))
  if (!snap.exists()) {
    return { title: 'Experience', timeline: [] }
  }
  const raw = snap.data() as any
  return {
    title: raw.title || 'Experience',
    description: raw.description || '',
    timeline: raw.timeline || []
  }
}

// Fetch education
export async function fetchEducation(): Promise<EducationData> {
  const snap = await getDoc(doc(db, 'personal', 'experience'))
  if (!snap.exists()) {
    return { title: 'Education', education: [] }
  }
  const raw = snap.data() as any
  return {
    // If Firestore uses the same doc, flip title to “Education” if necessary
    title: raw.title === 'EXPERIENCE' ? 'Education' : raw.title || 'Education',
    description: raw.description || '',
    education: raw.education || []
  }
}

// Fetch skills (logos array)
export async function fetchSkills(): Promise<SkillsData> {
  const snap = await getDoc(doc(db, 'personal', 'skills'))
  if (!snap.exists()) {
    return { title: 'Skills', description: '', logos: [] }
  }
  const raw = snap.data() as any
  return {
    title: raw.title || 'Skills',
    description: raw.description || '',
    logos: raw.logos || []
  }
}

// Fetch projects
export async function fetchProjects(): Promise<ProjectsData> {
  const snap = await getDoc(doc(db, 'personal', 'portfolio'))
  if (!snap.exists()) {
    return { title: 'Portfolio', projects: [] }
  }
  const raw = snap.data() as any
  return {
    title: raw.title || 'Portfolio',
    description: raw.description || '',
    projects: raw.projects || []
  }
}
