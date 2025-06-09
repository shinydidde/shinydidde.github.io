// app/page.tsx
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ContactSection from '../components/ContactSection'
import AboutSection from '../components/AboutSection'
import ExperienceSection from '../components/ExperienceSection'
import SkillsSection from '../components/SkillsSection'
import ProjectsSection from '../components/ProjectsSection'
import EducationSection from '../components/EducationSection'
import FooterSection from '../components/FooterSection'

import {
  fetchPersonalInfo,
  fetchExperience,
  fetchSkills,
  fetchProjects,
  fetchEducation,
  PersonalInfo
} from '../lib/firestoreService'

export default async function Home() {
  // Fetch all data from Firestore
  const personalInfo: PersonalInfo = await fetchPersonalInfo()
  const experienceData = await fetchExperience()
  const skillsData = await fetchSkills()
  const projectsData = await fetchProjects()
  const educationData = await fetchEducation()

  return (
    <>
      <Header personalInfo={personalInfo} />

      <main className="space-y-32 py-4 lg:py-8">
        <HeroSection
          personalInfo={{
            name: personalInfo.name,
            position: personalInfo.position,
            img: personalInfo.img,
            socialLinks: personalInfo.socialLinks || []
          }}
        />

        <AboutSection
          personalInfo={{
            title: personalInfo.title || '',
            subtitle: personalInfo.subtitle || '',
            description: personalInfo.description || ''
          }}
        />

        <ExperienceSection data={experienceData} />

        <SkillsSection data={skillsData} />

        <ProjectsSection data={projectsData} />

        <EducationSection data={educationData} />
        <ContactSection personalInfo={personalInfo} />

      </main>

      <FooterSection
        personalInfo={{
          name: personalInfo.name,
          email: personalInfo.email,
          socialLinks: personalInfo.socialLinks || [],
          resume: personalInfo.resume,
          logoUrl: personalInfo.logoUrl || ''
        }}
      />
    </>
  )
}
