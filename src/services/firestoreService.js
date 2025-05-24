import { db } from './firebase'

// Reference to personal info document
export const personalInfoRef = db.collection('personal').doc('info')

// Reference to experience document (which contains all other sections)
export const experienceDataRef = db.collection('experience').doc('data') // Adjust doc ID if different

export async function fetchPersonalInfo() {
  const doc = await db.collection('personal').doc('info').get()
  return doc.exists ? doc.data() : {}
}

export async function fetchExperience() {
  const doc = await db.collection('personal').doc('experience').get()
  return doc.exists ? doc.data() : { title: 'Experience', timeline: [] }
}

export async function fetchSkills() {
  const doc = await db.collection('personal').doc('skills').get()
  const data = doc.exists ? doc.data() : {}
  return { title: 'Skills', logos: data.logos || [], description: data.description || '' }
}

export async function fetchProjects() {
  const doc = await db.collection('personal').doc('portfolio').get()
  const data = doc.exists ? doc.data() : {}
  return { title: 'Portfolio', projects: data.projects || [], description: data.description || '' }
}

export async function fetchEducation() {
  const doc = await db.collection('personal').doc('experience').get()
  const data = doc.exists ? doc.data() : {}
  return { title: 'Education', education: data.education || [], description: data.description || '' }
}
