// components/HeroSection.tsx
'use client';

import Image from 'next/image';
import { FaGithub, FaDownload } from 'react-icons/fa';
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

  return (
    <section id="about" className={`relative w-full min-h-screen flex items-center pt-24 pb-16 sm:pt-28 sm:pb-12 lg:pt-32 lg:min-h-[88vh] overflow-hidden ${isPlayfulMode ? 'bg-gradient-to-br from-green-100 to-blue-100' : 'bg-white'}`}>
      {/* Background */}
      <div className={`pointer-events-none absolute inset-0 ${isPlayfulMode ? '' : 'bg-white'}`}>
        {isPlayfulMode && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100" />
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_85%_45%,rgba(16,185,129,0.12),transparent_60%)]" />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.05fr_1fr] gap-4 sm:gap-8 lg:gap-16 items-start lg:items-center justify-center min-h-0">
          {/* TEXT */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left relative z-20 -mt-32 sm:-mt-16 lg:mt-0">
            <div className="space-y-2 sm:space-y-3">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] ${isPlayfulMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500' : 'text-gray-900'}`}>
                {isPlayfulMode ? 'CHAOS' : 'frontend'}
              </h1>
              <h2 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-mono ${isPlayfulMode ? 'text-blue-600' : 'text-gray-600'}`}>
                {isPlayfulMode ? '<WIZARD>' : '<engineer>'}
              </h2>
            </div>

            {/* Roles */}
            <div className="mb-6">
              <div className={`flex flex-wrap gap-2 justify-center lg:justify-start ${isPlayfulMode ? 'text-sm' : 'text-xs'}`}>
                {roles.slice(0, isPlayfulMode ? 4 : 6).map((role, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full border transition-colors duration-200 ${
                      isPlayfulMode
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className={`space-y-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 ${isPlayfulMode ? 'text-blue-700' : 'text-gray-700'}`}>
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
                    ? 'border-2 border-yellow-400 text-blue-700 hover:bg-yellow-100 shadow-[1px_1px_0_0_rgba(245,158,11,1)]'
                    : 'border border-gray-300 text-gray-800 hover:bg-gray-50'
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
                    ? 'text-green-600 hover:text-blue-600 hover:bg-green-100'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
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
                    ? 'border-2 border-yellow-400 text-blue-700 hover:bg-yellow-100 shadow-[2px_2px_0_0_rgba(245,158,11,1)] focus:ring-4 focus:ring-yellow-500/30'
                    : 'border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-500/20'
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
                    ? 'text-green-600 hover:text-blue-600'
                    : 'text-gray-600 hover:text-black'
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
      </div>
    </section>
  );
}
