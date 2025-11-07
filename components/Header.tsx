// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/shinydidde', icon: FaGithub },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mruduladidde', icon: FaLinkedin },
  { name: 'Twitter', href: 'https://twitter.com/mruduladidde', icon: FaTwitter },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isPlayfulMode, togglePlayfulMode } = usePlayfulMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isPlayfulMode
          ? (isScrolled
              ? 'bg-vibrant-pink/10 backdrop-blur-md shadow-lg py-4 border-b-2 border-vibrant-cyan'
              : 'bg-transparent py-6'
            )
          : (isScrolled
              ? 'bg-gradient-to-br from-vibrant-pink/5 via-vibrant-cyan/5 to-vibrant-yellow/5 backdrop-blur-md shadow-lg py-4 border-b border-gray-200'
              : 'bg-transparent py-6'
            )
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative">
            <Link href="#" className="group" aria-label="Home">
              <div className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                isPlayfulMode
                  ? 'group-hover:scale-110'
                  : 'group-hover:opacity-80'
              }`}>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
                {isPlayfulMode && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-vibrant-yellow rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xs">✨</span>
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_ITEMS.map((item, index) => {
              const colors = [
                { active: 'text-vibrant-pink', hover: 'text-vibrant-cyan', focus: 'focus:ring-vibrant-pink' },
                { active: 'text-vibrant-cyan', hover: 'text-vibrant-yellow', focus: 'focus:ring-vibrant-cyan' },
                { active: 'text-vibrant-green', hover: 'text-vibrant-blue', focus: 'focus:ring-vibrant-green' },
                { active: 'text-vibrant-orange', hover: 'text-vibrant-red', focus: 'focus:ring-vibrant-orange' },
                { active: 'text-vibrant-red', hover: 'text-vibrant-purple', focus: 'focus:ring-vibrant-red' }
              ];
              const color = colors[index % colors.length];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium text-sm tracking-wide transition-all duration-300 focus:outline-none rounded-sm px-2 py-1 ${
                      isPlayfulMode
                      ? (activeSection === item.href.substring(1)
                          ? `${color.active} hover:${color.hover} focus:ring-2 ${color.focus} focus:ring-offset-2`
                          : `${color.active} hover:${color.hover} focus:ring-2 ${color.focus} focus:ring-offset-2`
                        )
                      : (activeSection === item.href.substring(1)
                          ? 'text-black hover:text-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                          : 'text-gray-700 hover:text-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                        )
                  }`}
                >
                  {isPlayfulMode ? item.name.toUpperCase() : item.name}
                  {activeSection === item.href.substring(1) && (
                    <div className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      isPlayfulMode ? 'bg-gradient-to-r from-vibrant-pink via-vibrant-cyan via-vibrant-yellow to-vibrant-orange' : 'bg-black'
                    }`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Social Links & Mode Toggle */}
          <div className="hidden md:flex gap-4 items-center">
            {SOCIAL_LINKS.map((social, index) => {
              const Icon = social.icon;
              const socialColors = [
                { base: 'text-vibrant-pink', hover: 'text-vibrant-cyan', focus: 'focus:ring-vibrant-pink' },
                { base: 'text-vibrant-cyan', hover: 'text-vibrant-green', focus: 'focus:ring-vibrant-cyan' },
                { base: 'text-vibrant-green', hover: 'text-vibrant-yellow', focus: 'focus:ring-vibrant-green' }
              ];
              const color = socialColors[index % socialColors.length];

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-all duration-300 focus:outline-none rounded-sm p-1 ${
                    isPlayfulMode
                      ? `${color.base} hover:${color.hover} hover:scale-110 focus:ring-2 ${color.focus} focus:ring-offset-2`
                      : 'text-gray-600 hover:text-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                  }`}
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}

            {/* Mode Toggle */}
            <button
              onClick={togglePlayfulMode}
              className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isPlayfulMode
                  ? 'bg-gradient-to-r from-vibrant-red via-vibrant-orange via-vibrant-yellow to-vibrant-cyan hover:from-vibrant-orange hover:via-vibrant-yellow hover:to-vibrant-cyan shadow-lg hover:shadow-xl hover:scale-110 focus:ring-vibrant-red'
                  : 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 border-2 border-gray-300 hover:border-gray-400'
              }`}
              aria-label={isPlayfulMode ? 'Switch to professional mode' : 'Switch to playful mode'}
              title={isPlayfulMode ? 'Go Professional 🎯' : 'Get Playful 🎉'}
            >
              <div className="w-3 h-3 rounded-full bg-gray-400" />
            </button>
          </div>

          {/* Mobile Menu Button & Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Mode Toggle */}
            <button
              onClick={togglePlayfulMode}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isPlayfulMode
                  ? 'bg-gradient-to-r from-vibrant-red via-vibrant-orange via-vibrant-yellow to-vibrant-cyan hover:from-vibrant-orange hover:via-vibrant-yellow hover:to-vibrant-cyan shadow-lg hover:shadow-xl hover:scale-110 focus:ring-vibrant-red'
                  : 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 border-2 border-gray-300 hover:border-gray-400'
              }`}
              aria-label={isPlayfulMode ? 'Switch to professional mode' : 'Switch to playful mode'}
            >
              <div className="w-3 h-3 rounded-full bg-gray-400" />
            </button>

            {/* Hamburger Menu */}
            <button
              className={`transition-all duration-300 ${
                isPlayfulMode
                  ? 'text-vibrant-orange hover:text-vibrant-red hover:scale-110'
                  : 'text-gray-700 hover:text-black'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-sm shadow-lg ${
        isPlayfulMode
          ? 'bg-gradient-to-r from-vibrant-pink/20 via-vibrant-cyan/20 via-vibrant-yellow/20 via-vibrant-orange/20 to-vibrant-red/20 border-t-2 border-vibrant-purple'
          : 'bg-white/95 border-t border-gray-200'
        }`}>
          <nav className="px-6 py-4">
            <div className="space-y-4">
              {NAV_ITEMS.map((item, index) => {
                const colors = [
                  { active: 'text-vibrant-pink', hover: 'text-vibrant-cyan', focus: 'focus:ring-vibrant-pink' },
                  { active: 'text-vibrant-cyan', hover: 'text-vibrant-yellow', focus: 'focus:ring-vibrant-cyan' },
                  { active: 'text-vibrant-green', hover: 'text-vibrant-blue', focus: 'focus:ring-vibrant-green' },
                  { active: 'text-vibrant-orange', hover: 'text-vibrant-red', focus: 'focus:ring-vibrant-orange' },
                  { active: 'text-vibrant-red', hover: 'text-vibrant-purple', focus: 'focus:ring-vibrant-red' }
                ];
                const color = colors[index % colors.length];

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleMobileNavClick}
                    className={`block text-lg font-medium transition-all duration-300 focus:outline-none rounded-sm px-2 py-2 ${
                      isPlayfulMode
                      ? (activeSection === item.href.substring(1)
                          ? `${color.active} hover:${color.hover} focus:ring-2 ${color.focus} focus:ring-offset-2`
                          : `${color.active} hover:${color.hover} focus:ring-2 ${color.focus} focus:ring-offset-2`
                        )
                      : (activeSection === item.href.substring(1)
                          ? 'text-black hover:text-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                          : 'text-gray-700 hover:text-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                        )
                    }`}
                  >
                    {isPlayfulMode ? item.name.toUpperCase() : item.name}
                  </Link>
                );
              })}

              {/* Mobile Social Links */}
                <div className={`pt-4 ${isPlayfulMode ? 'border-t-2 border-vibrant-purple' : 'border-t border-gray-200'}`}>
                <div className="flex justify-center gap-6">
                  {SOCIAL_LINKS.map((social, index) => {
                    const Icon = social.icon;
                    const socialColors = [
                      { base: 'text-vibrant-pink', hover: 'text-vibrant-cyan', focus: 'focus:ring-vibrant-pink' },
                      { base: 'text-vibrant-cyan', hover: 'text-vibrant-green', focus: 'focus:ring-vibrant-cyan' },
                      { base: 'text-vibrant-green', hover: 'text-vibrant-yellow', focus: 'focus:ring-vibrant-green' }
                    ];
                    const color = socialColors[index % socialColors.length];

                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-all duration-300 focus:outline-none rounded-sm p-2 ${
                          isPlayfulMode
                            ? `${color.base} hover:${color.hover} hover:scale-110 focus:ring-2 ${color.focus} focus:ring-offset-2`
                            : 'text-gray-600 hover:text-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                        }`}
                        aria-label={social.name}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
