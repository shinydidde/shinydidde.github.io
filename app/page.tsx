// app/page.tsx
import React from 'react'

import Header            from '@/components/Header'
import HeroSection       from '@/components/HeroSection'
import SkillsSection     from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import EducationSection  from '@/components/EducationSection'
import FooterSection     from '@/components/FooterSection'

import {
  fetchHero,
  fetchAbout,
  fetchSkillsList,
  fetchExperienceList,
  fetchEducationList,
  fetchFooterInfo
} from '@/lib/firestoreService'

export default async function Home() {
  // Run all Firestore calls in parallel for faster loading
  const [
    heroData,
    aboutData,
    skillsData,
    experienceData,
    educationData,
    footerData
  ] = await Promise.all([
    fetchHero(),
    fetchAbout(),
    fetchSkillsList(),
    fetchExperienceList(),
    fetchEducationList(),
    fetchFooterInfo()
  ])

  // Merge about data into hero data
  const enhancedHeroData = { ...heroData, ...aboutData }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <HeroSection       data={enhancedHeroData} />
        <SkillsSection     data={skillsData} />
        <ExperienceSection data={experienceData} />
        <EducationSection  data={educationData} />
      </main>

      <FooterSection contact={footerData} />
    </div>
  )
}
