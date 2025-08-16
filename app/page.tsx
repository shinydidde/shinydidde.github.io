// app/page.tsx
import React from 'react'

import Header            from '@/components/Header'
import HeroSection       from '@/components/HeroSection'
import AboutSection      from '@/components/AboutSection'
import SkillsSection     from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection   from '@/components/ProjectsSection'
import EducationSection  from '@/components/EducationSection'
import FooterSection     from '@/components/FooterSection'

import {
  fetchHero,
  fetchAbout,
  fetchSkillsList,
  fetchExperienceList,
  fetchProjectsList,
  fetchEducationList,
  fetchFooterInfo
} from '@/lib/firestoreService'

export default async function Home() {
  const heroData       = await fetchHero()
  const aboutData      = await fetchAbout()
  const skillsData     = await fetchSkillsList()
  const experienceData = await fetchExperienceList()
  const projectsData   = await fetchProjectsList()
  const educationData  = await fetchEducationList()
  const footerData     = await fetchFooterInfo()

  return (
    <div className="min-h-screen">
      <Header hero={heroData} />

      <main>
        <HeroSection       data={heroData} />
        <AboutSection      data={aboutData} />
        <SkillsSection     data={skillsData} />
        <ExperienceSection data={experienceData} />
        <ProjectsSection   data={projectsData} />
        <EducationSection  data={educationData} />
      </main>

      <FooterSection contact={footerData} />
    </div>
  )
}
