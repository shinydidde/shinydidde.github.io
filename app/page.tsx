// app/page.tsx
import React from 'react'

import Header            from '@/components/Header'
import HeroSection       from '@/components/HeroSection'
import AboutSection      from '@/components/AboutSection'
import SkillsSection     from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection   from '@/components/ProjectsSection'
import EducationSection from '@/components/EducationSection'
// import ContactSection    from '@/components/ContactSection'
import FooterSection     from '@/components/FooterSection'

import {
  fetchHero,
  fetchAbout,
  fetchSkillsList,
  fetchExperienceList,
  fetchProjectsList,
  fetchContactInfo,
  fetchEducationList
} from '@/lib/firestoreService'

export default async function Home() {
  // fetch all new-structure docs
  const heroData       = await fetchHero()
  const aboutData      = await fetchAbout()
  const skillsData     = await fetchSkillsList()
  const experienceData = await fetchExperienceList()
  const projectsData   = await fetchProjectsList()
  const contactData    = await fetchContactInfo()
  const educationData  = await fetchEducationList();

  return (
    <div className="min-h-screen">
      {/* only pass hero to Header */}
      <Header hero={heroData} />

      <main className="space-y-32">
        <HeroSection       data={heroData} />
        <AboutSection      data={aboutData} />
        <SkillsSection     data={skillsData} />
        <ExperienceSection data={experienceData} />
        <ProjectsSection   data={projectsData} />
        <EducationSection data={educationData} />
        {/* <ContactSection    data={contactData} /> */}
      </main>

      {/* only pass contact to Footer */}
      <FooterSection contact={contactData} />
    </div>
  )
}
