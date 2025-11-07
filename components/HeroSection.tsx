// components/HeroSection.tsx
'use client';

import Image from 'next/image';
import { FaGithub, FaDownload, FaCode, FaReact, FaJs, FaNode, FaPython, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiFirebase, SiGit, SiGraphql, SiMongodb, SiPostgresql, SiRedux, SiWebpack, SiJest, SiCypress } from 'react-icons/si';
import React from 'react';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

interface HeroData {
  name?: string;
  normalRoles?: string[];
  memeRoles?: string[];
  catchPhrase?: string;
  bio?: string;
  normalFacts?: string[] | Array<{text: string, icon: string}>;
  memeFacts?: string[] | Array<{text: string, icon: string}>;
  title?: string;
  subtitle?: string;
  [key: string]: unknown; // Allow additional properties from merged data
}

export default function HeroSection({ data = {} }: { data?: HeroData }) {
  const { isPlayfulMode } = usePlayfulMode();

  const name = data.name || 'Mrudula Didde';

  // Calculate experience from August 2014
  const calculateExperience = () => {
    const startDate = new Date('2014-08-01');
    const currentDate = new Date();

    const years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();

    let totalMonths = years * 12 + months;

    if (currentDate.getDate() < startDate.getDate()) {
      totalMonths -= 1;
    }

    const totalYears = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    if (totalYears > 0 && remainingMonths > 0) {
      return `${totalYears} years ${remainingMonths} months`;
    } else if (totalYears > 0) {
      return `${totalYears} years`;
    } else {
      return `${totalMonths} months`;
    }
  };

  const experience = calculateExperience();
  const roles = isPlayfulMode ? (data.memeRoles || [
    "Bug Creator Extraordinaire",
    "Stack Overflow Connoisseur",
    "console.log() Wizard",
    "CSS Battle Veteran",
    "Wildlife Coder",
    "Digital Nomad"
  ]) : (data.normalRoles || [
    "Web Developer",
    "Tech Lead",
    "Nature Lover",
    "Animal Advocate",
    "Travel Enthusiast",
    "UI/UX Magician"
  ]);

  const bio = data.bio;

  // Professional Skills Data (for normal mode)
  const skillCategories = [
    {
      title: "Frontend Frameworks",
      skills: [
        { name: "React", icon: FaReact, level: "Expert" },
        { name: "Next.js", icon: SiNextdotjs, level: "Expert" },
        { name: "Vue.js", icon: SiVuedotjs, level: "Advanced" },
        { name: "TypeScript", icon: SiTypescript, level: "Expert" },
      ]
    },
    {
      title: "Languages & Core",
      skills: [
        { name: "JavaScript", icon: FaJs, level: "Expert" },
        { name: "TypeScript", icon: SiTypescript, level: "Expert" },
        { name: "Python", icon: FaPython, level: "Advanced" },
        { name: "HTML/CSS", icon: FaCode, level: "Expert" },
      ]
    },
    {
      title: "Backend & Infrastructure",
      skills: [
        { name: "Node.js", icon: FaNode, level: "Advanced" },
        { name: "Firebase", icon: SiFirebase, level: "Expert" },
        { name: "Docker", icon: FaDocker, level: "Intermediate" },
        { name: "AWS", icon: FaAws, level: "Intermediate" },
      ]
    },
    {
      title: "State Management & Tools",
      skills: [
        { name: "Redux", icon: SiRedux, level: "Expert" },
        { name: "GraphQL", icon: SiGraphql, level: "Advanced" },
        { name: "Git", icon: SiGit, level: "Expert" },
        { name: "Webpack", icon: SiWebpack, level: "Advanced" },
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MongoDB", icon: SiMongodb, level: "Advanced" },
        { name: "PostgreSQL", icon: SiPostgresql, level: "Intermediate" },
      ]
    },
    {
      title: "Testing & Quality",
      skills: [
        { name: "Jest", icon: SiJest, level: "Advanced" },
        { name: "Cypress", icon: SiCypress, level: "Advanced" },
      ]
    },
    {
      title: "Styling & Design",
      skills: [
        { name: "Tailwind CSS", icon: SiTailwindcss, level: "Expert" },
        { name: "CSS/SASS", icon: FaCode, level: "Expert" },
        { name: "UI/UX Design", icon: FaCode, level: "Advanced" },
      ]
    }
  ];

  const professionalMetrics = [
    { label: "Years of Experience", value: experience },
    { label: "Technologies Mastered", value: "20+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Lighthouse Score", value: "90+" },
  ];

  return (
    <section
      id="about"
      className={
        isPlayfulMode
          ? "relative w-full overflow-hidden min-h-screen flex items-center pt-24 pb-16 sm:pt-28 sm:pb-12 lg:pt-32"
          : "relative w-full overflow-hidden py-24 sm:py-28 lg:py-32"
      }
    >

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6">
        {isPlayfulMode ? (
          <div className="flex flex-col lg:grid lg:grid-cols-[1.05fr_1fr] gap-4 sm:gap-8 lg:gap-16 items-start lg:items-center justify-center min-h-0">
            {/* TEXT */}
            <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left relative z-20 -mt-32 sm:-mt-16 lg:mt-0">
              <div className="space-y-2 sm:space-y-3">
              {/* Name - Bigger than FRONTEND */}
              <div className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-2 ${isPlayfulMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-vibrant-pink via-vibrant-green to-vibrant-yellow' : 'text-slate-900'}`}>
                {name}
              </div>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] ${isPlayfulMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-vibrant-pink via-vibrant-green to-vibrant-yellow' : 'text-slate-900'}`}>
                {isPlayfulMode ? 'CHAOS' : 'FRONTEND'}
              </h1>
              <h2 className={`text-lg sm:text-xl md:text-3xl lg:text-4xl font-mono ${isPlayfulMode ? 'text-vibrant-yellow' : 'text-slate-600'}`}>
                {isPlayfulMode ? '<WIZARD>' : '<ENGINEER>'}
              </h2>
              {/* Experience Display */}
              <div className={`text-sm sm:text-base md:text-lg font-medium flex items-center justify-center lg:justify-start gap-2 ${isPlayfulMode ? 'text-vibrant-orange' : 'text-slate-500'}`}>
                {isPlayfulMode ? (
                  <>
                    <FaCode className="w-4 h-4" />
                    <span>{experience} of creating beautiful disasters</span>
                  </>
                ) : (
                  <span>{experience} of experience</span>
                )}
              </div>
            </div>

            {/* Roles */}
            <div className="mb-6">
              <div className={`flex flex-wrap gap-2 justify-center lg:justify-start ${isPlayfulMode ? 'text-sm' : 'text-xs'}`}>
                {roles.slice(0, isPlayfulMode ? 4 : 6).map((role, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full border transition-colors duration-200 ${
                      isPlayfulMode
                        ? 'bg-vibrant-pink/20 border-vibrant-pink/40 text-vibrant-pink'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className={`space-y-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 ${isPlayfulMode ? 'text-vibrant-cyan' : 'text-slate-700'}`}>
              {isPlayfulMode ? (
                <>
                  <p>I turn caffeine into chaos-resistant code with React magic and TypeScript wizardry!</p>
                  <p>Performance obsessed, bug squashing, clean code creating maniac!</p>
                </>
              ) : bio ? (
                <div dangerouslySetInnerHTML={{ __html: bio }} />
              ) : (
                <p>Frontend Architect & Tech Lead with 10+ years building scalable, high-performance React, Next.js & Vue applications. At QuestDot, I drove the adoption of TypeScript micro-frontends and CI/CD pipelines—boosting delivery speed by 50% and maintaining Lighthouse scores above 90.</p>
              )}
            </div>

            {/* Mobile: Circular buttons side by side */}
            <div className="flex sm:hidden justify-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none ${
                  isPlayfulMode
                    ? 'border-2 border-vibrant-yellow text-vibrant-orange hover:bg-vibrant-yellow/20 shadow-[1px_1px_0_0_rgba(255,212,59,1)]'
                    : 'border border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
                title="Download Resume"
              >
                <FaDownload className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/shinydidde"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isPlayfulMode
                    ? 'text-vibrant-cyan hover:text-vibrant-green hover:bg-vibrant-cyan/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>

            {/* Desktop: Regular buttons */}
            <div className="hidden sm:flex flex-row flex-wrap gap-3 lg:gap-4 items-center justify-center lg:justify-start">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 lg:px-7 py-3 lg:py-3.5 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none ${
                  isPlayfulMode
                    ? 'border-2 border-vibrant-yellow text-vibrant-orange hover:bg-vibrant-yellow/20 shadow-[2px_2px_0_0_rgba(255,212,59,1)] focus:ring-4 focus:ring-vibrant-yellow/30'
                    : 'border border-slate-300 text-slate-800 hover:bg-slate-50 focus:ring-4 focus:ring-slate-500/20'
                }`}
              >
                <FaDownload className="w-4 h-4" />
                <span>{isPlayfulMode ? 'GRAB MY ' : 'Download '}Resume</span>
              </a>

              <a
                href="https://github.com/shinydidde"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 text-base font-medium py-3 transition-colors duration-200 ${
                  isPlayfulMode
                    ? 'text-vibrant-cyan hover:text-vibrant-green'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FaGithub className="w-5 h-5" />
                {isPlayfulMode ? 'CODE CHAOS →' : 'GitHub →'}
              </a>
            </div>
          </div>

          {/* PORTRAIT - MOBILE OPTIMIZED */}
          <div className="order-1 lg:order-2 relative w-full mx-auto -mt-8 sm:mt-0">
            {/* Mobile: Full seamless portrait */}
            <div className="block sm:hidden relative w-full max-w-[280px] mx-auto h-[350px]">
              <Image
                src={isPlayfulMode
                  ? "https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fcolor1.png?alt=media&token=670494ad-e1a3-44b1-9301-bb327d951064"
                  : "https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fblack1.png?alt=media&token=bda1c889-d836-4ffd-840b-0a092d449492"
                }
                alt={`${name} - Web Developer`}
                fill
                className={`object-cover object-center scale-[1.15] contrast-[1.1] brightness-[0.95] hero-image-shine ${isPlayfulMode ? '' : 'grayscale'}`}
                style={{
                  WebkitMaskImage: isPlayfulMode
                    ? 'linear-gradient(to bottom, black 40%, transparent 95%, transparent 100%)'
                    : 'linear-gradient(to bottom, black 30%, transparent 85%, transparent 100%)',
                  maskImage: isPlayfulMode
                    ? 'linear-gradient(to bottom, black 40%, transparent 95%, transparent 100%)'
                    : 'linear-gradient(to bottom, black 30%, transparent 85%, transparent 100%)',
                }}
                priority
              />
            </div>

            {/* Tablet and up: Full portrait */}
            <div className="hidden sm:block relative w-full max-w-[400px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[600px] mx-auto">
              <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
                <Image
                  src={isPlayfulMode
                    ? "https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fcolor1.png?alt=media&token=670494ad-e1a3-44b1-9301-bb327d951064"
                    : "https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fblack1.png?alt=media&token=bda1c889-d836-4ffd-840b-0a092d449492"
                  }
                  alt={`${name} - Web Developer`}
                  fill
                  className={`object-cover object-center scale-[1.35] contrast-[1.1] brightness-[0.95] hero-image-shine ${isPlayfulMode ? '' : 'grayscale'}`}
                  style={{
                    WebkitMaskImage: isPlayfulMode
                      ? 'linear-gradient(to bottom, black 50%, transparent 95%, transparent 100%)'
                      : 'linear-gradient(to bottom, black 40%, transparent 85%, transparent 100%)',
                    maskImage: isPlayfulMode
                      ? 'linear-gradient(to bottom, black 50%, transparent 95%, transparent 100%)'
                      : 'linear-gradient(to bottom, black 40%, transparent 85%, transparent 100%)',
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        ) : (
          /* NORMAL MODE - PROFESSIONAL LAYOUT */
          <div className="space-y-12">
            {/* Top Section: Intro and Portrait */}
            <div className="flex flex-col lg:grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-16 items-start lg:items-center">
              {/* PORTRAIT - First on mobile */}
              <div className="order-1 lg:order-2 relative w-full mx-auto lg:mx-0">
                {/* Mobile: Full seamless portrait */}
                <div className="block sm:hidden relative w-full max-w-[280px] mx-auto h-[350px]">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fblack1.png?alt=media&token=bda1c889-d836-4ffd-840b-0a092d449492"
                    alt={`${name} - Web Developer`}
                    fill
                    className="object-cover object-center scale-[1.15] contrast-[1.1] brightness-[0.95] hero-image-shine grayscale"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 85%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 30%, transparent 85%, transparent 100%)',
                    }}
                    priority
                  />
                </div>

                {/* Tablet and up: Full portrait */}
                <div className="hidden sm:block relative w-full max-w-[400px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[600px] mx-auto">
                  <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/images%2Fblack1.png?alt=media&token=bda1c889-d836-4ffd-840b-0a092d449492"
                      alt={`${name} - Web Developer`}
                      fill
                      className="object-cover object-center scale-[1.35] contrast-[1.1] brightness-[0.95] hero-image-shine grayscale"
                      style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 85%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 40%, transparent 85%, transparent 100%)',
                      }}
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* TEXT - Second on mobile */}
              <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left relative z-20 -mt-32 sm:-mt-16 lg:mt-0">
                <div className="space-y-2 sm:space-y-3">
                  {/* Name - Bigger than FRONTEND */}
                  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-slate-900 mb-2">
                    {name}
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                    FRONTEND
                  </h1>
                  <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-mono text-slate-600">
                    &lt;ENGINEER&gt;
                  </h2>
                  <div className="text-base md:text-lg font-medium text-slate-500 flex items-center justify-center lg:justify-start gap-2">
                    <span>{experience} of experience</span>
                  </div>
                </div>

                {/* Roles */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {roles.slice(0, 6).map((role, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full border bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <div className="space-y-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 text-slate-700">
                  {bio ? (
                    <div dangerouslySetInnerHTML={{ __html: bio }} />
                  ) : (
                    <p>Frontend Architect & Tech Lead with 10+ years building scalable, high-performance React, Next.js & Vue applications. At QuestDot, I drove the adoption of TypeScript micro-frontends and CI/CD pipelines—boosting delivery speed by 50% and maintaining Lighthouse scores above 90.</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-row flex-wrap gap-3 lg:gap-4 items-center justify-center lg:justify-start pt-2">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 lg:px-7 py-3 lg:py-3.5 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 border border-slate-300 text-slate-800 hover:bg-slate-50 focus:ring-4 focus:ring-slate-500/20 focus:outline-none"
                  >
                    <FaDownload className="w-4 h-4" />
                    <span>Download Resume</span>
                  </a>
                  <a
                    href="https://github.com/shinydidde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-base font-medium py-3 transition-colors duration-200 text-slate-600 hover:text-slate-900"
                  >
                    <FaGithub className="w-5 h-5" />
                    GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
              {professionalMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
                  <div className="text-xs md:text-sm text-slate-600">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Professional Skills Showcase */}
            <div className="space-y-6 pt-8 border-t border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Core Competencies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {skillCategories.slice(0, 4).map((category, catIndex) => (
                  <div key={catIndex} className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-2">{category.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => {
                        const IconComponent = skill.icon;
                        return (
                          <div
                            key={skillIndex}
                            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all group"
                          >
                            <IconComponent className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                            <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                            <span className="text-xs text-slate-500 ml-1">({skill.level})</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Skills Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
                {skillCategories.slice(4).map((category, catIndex) => (
                  <div key={catIndex} className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-2">{category.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => {
                        const IconComponent = skill.icon;
                        return (
                          <div
                            key={skillIndex}
                            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all group"
                          >
                            <IconComponent className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                            <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
