// app/components/SkillsSection.tsx
'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import DoodleSection from './DoodleSection'
import type { SkillsListData, SkillCategory } from '../lib/firestoreService'

import {
  SiAngular, SiReact, SiNextdotjs, SiVuedotjs, SiSvelte,
  SiHtml5, SiCss3, SiJavascript, SiJquery, SiNodedotjs,
  SiFirebase, SiMysql, SiNpm, SiGit, SiGithub, SiDocker,
  SiAmazon, SiGoogletagmanager, SiGoogleanalytics,
  SiCloudflare, SiGodaddy, SiMailchimp, SiWordpress,
  SiGhost, SiJira, SiLess
} from 'react-icons/si'
import type { IconType } from 'react-icons'

interface SkillsSectionProps {
  data: SkillsListData
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState(0)

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  }

  const iconMap: Record<string, IconType> = {
    Angular: SiAngular, React: SiReact, 'Next.js': SiNextdotjs,
    'Vue.js': SiVuedotjs, Svelte: SiSvelte, HTML5: SiHtml5,
    CSS3: SiCss3, JavaScript: SiJavascript, jQuery: SiJquery,
    'Node.js': SiNodedotjs, Firebase: SiFirebase, MySQL: SiMysql,
    npm: SiNpm, Git: SiGit, GitHub: SiGithub, Docker: SiDocker,
    AWS: SiAmazon, 'Google Tag Manager': SiGoogletagmanager,
    'Google Analytics': SiGoogleanalytics, Cloudflare: SiCloudflare,
    GoDaddy: SiGodaddy, Mailchimp: SiMailchimp, WordPress: SiWordpress,
    Ghost: SiGhost, Jira: SiJira, Less: SiLess,
  }

  const tabs = data.categories.map((cat: SkillCategory) => cat.type)

  return (
    <DoodleSection bgImage="/images/skills-bg.avif">
      {/* header */}
      <motion.div
        id="skills"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-12 px-4"
      >
        <motion.h2 variants={item} className="text-4xl font-sketch text-teal mb-2">
          {data.title}
        </motion.h2>
        <motion.div
          variants={item}
          className="w-16 h-1 bg-gradient-to-r from-magenta to-lime mx-auto mb-8 rounded-full"
        />
      </motion.div>

      {/* tabs */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center space-x-4 mb-8 px-4 overflow-x-auto no-scrollbar"
      >
        {tabs.map((tab, i) => (
          <motion.button
            key={tab}
            variants={item}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-2 font-sketch text-lg rounded-full transition ${activeTab === i
              ? 'bg-magenta text-white shadow-lg'
              : 'bg-paper/60 text-teal hover:bg-paper/80'
              }`}
            whileHover={{ scale: 1.05 }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* icons grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4"
      >
        {data.categories[activeTab].items.map((skill) => {
          const Icon = iconMap[skill.name]
          return (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ scale: 1.03, rotate: [0, 15, -15, 0] }}
              transition={{
                type: 'tween',
                duration: 0.6,
                ease: 'easeInOut'
              }}
              className="
        flex flex-col items-center p-4
        rounded-2xl border-2 border-dashed border-magenta/60
        bg-paper/60 backdrop-blur-xs
        "
            >
              {Icon
                ? <Icon size={48} className="mb-2 text-magenta" />
                : <span className="mb-2 text-xl text-teal">{skill.name}</span>
              }
              <span className="mt-1 text-sm font-medium text-gray-800">
                {skill.name}
              </span>
            </motion.div>
          )
        })}
      </motion.div>
    </DoodleSection >
  )
}
