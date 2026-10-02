// app/page.tsx
import React from 'react'

import SceneBackground from '@/components/three/SceneBackground'
import Splash     from '@/components/site/Splash'
import Nav        from '@/components/site/Nav'
import Hero       from '@/components/site/Hero'
import Marquee    from '@/components/site/Marquee'
import About      from '@/components/site/About'
import Skills     from '@/components/site/Skills'
import Experience from '@/components/site/Experience'
import Education  from '@/components/site/Education'
import Contact    from '@/components/site/Contact'
import ScrollToTop from '@/components/site/ScrollToTop'
import { earliestYear, splitRole } from '@/components/site/format'

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
  const [hero, about, skills, experience, education, footer] = await Promise.all([
    fetchHero(),
    fetchAbout(),
    fetchSkillsList(),
    fetchExperienceList(),
    fetchEducationList(),
    fetchFooterInfo()
  ])

  const name = hero.name || footer.name || 'Mrudula Didde'
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  // Derived numbers for the About stats
  const startYear  = earliestYear(experience.entries.map(e => e.year))
  const years      = startYear ? new Date().getFullYear() - startYear : 11
  const companies  = new Set(experience.entries.map(e => splitRole(e.role).company.toLowerCase()).filter(Boolean))
  const skillCount = skills.categories.reduce((n, c) => n + c.items.length, 0)

  const stats = [
    { value: `${years}+`,                label: 'Years building' },
    { value: String(companies.size),     label: 'Companies' },
    { value: String(skillCount),         label: 'Tools & tech' },
  ]

  return (
    <>
      <Splash name={name} />
      <SceneBackground />
      <Nav initials={initials} />

      <main className="relative z-10">
        <Hero
          name={name}
          roles={hero.normalRoles?.length ? hero.normalRoles : [hero.role || 'Frontend Engineer']}
          catchPhrase={hero.catchPhrase || about.subtitle}
          years={years}
          location={footer.contact.location}
        />

        <Marquee primary={hero.normalRoles ?? []} secondary={hero.memeRoles ?? []} />

        <About
          title={about.title}
          subtitle={about.subtitle}
          bio={about.bio}
          name={name}
          facts={(about.normalFacts ?? []).map(f => f.text)}
          factButton={about.buttonText?.normal || 'Random dev fact'}
          stats={stats}
          interests={(hero.normalRoles ?? []).filter(r => /nature|animal|travel|ui|ux/i.test(r))}
          current={experience.entries[0] ? splitRole(experience.entries[0].role) : undefined}
        />

        <Skills title={skills.title || 'Skills & Superpowers'} categories={skills.categories} />
        <Experience title={experience.title} entries={experience.entries} />
        <Education title={education.title} entries={education.entries} />
      </main>

      <div className="relative z-10">
        <Contact data={footer} />
      </div>

      <ScrollToTop />
    </>
  )
}
