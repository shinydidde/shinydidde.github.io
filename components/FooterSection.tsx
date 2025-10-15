'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SocialIcon } from './ui/SocialIcon';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

export type FooterData = Readonly<{
  name?: string;
  avatar?: string;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    skype?: string;
  };
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  copy?: {
    headingNormal?: string;
    headingPlayful?: string;
    bioNormal?: string;
    bioPlayful?: string;
    footerTextNormal?: string;
    footerTextPlayful?: string;
    copyrightNormal?: string; // supports {year}
    copyrightPlayful?: string;   // supports {year}
    nameSuffixPlayful?: string;
    dmTitleNormal?: string;
    dmTitlePlayful?: string;
    dmListNormal?: string[];
    dmListPlayful?: string[];
  };
}>;

function withYear(s?: string, year?: number) {
  return (s ?? '').replace(/\{year\}/g, String(year ?? ''));
}

export default function FooterSection({ contact }: { contact: FooterData }) {
  const { isPlayfulMode } = usePlayfulMode();
  const year = new Date().getFullYear();

  const name = contact?.name ?? '';
  const avatar = contact?.avatar ?? '';
  const c = contact?.contact ?? {};
  const social = contact?.social ?? {};
  const copy = contact?.copy ?? {};

  const heading = isPlayfulMode ? (copy.headingPlayful ?? '') : (copy.headingNormal ?? '');
  const bio = isPlayfulMode ? (copy.bioPlayful ?? '') : (copy.bioNormal ?? '');
  const copyright = isPlayfulMode
    ? withYear(copy.copyrightPlayful, year)
    : withYear(copy.copyrightNormal, year);

  const displayName = isPlayfulMode
    ? `${(name || 'YOU').toUpperCase()}${copy.nameSuffixPlayful ?? ''}`
    : name;

  const socialLinks = [
    { name: 'GitHub', url: social.github, icon: 'github' as const },
    { name: 'LinkedIn', url: social.linkedin, icon: 'linkedin' as const },
    { name: 'Twitter', url: social.twitter, icon: 'twitter' as const },
    { name: 'Instagram', url: social.instagram, icon: 'instagram' as const }
  ].filter((s) => !!s.url);

  return (
    <footer
      className={`relative ${
        isPlayfulMode ? 'py-16 bg-gradient-to-br from-vibrant-pink/20 via-vibrant-cyan/20 via-vibrant-yellow/20 via-vibrant-orange/20 to-vibrant-red/20 overflow-hidden' : 'py-12 bg-gradient-to-br from-vibrant-pink/5 via-vibrant-cyan/5 to-vibrant-yellow/5 text-gray-800'
      }`}
    >
      {/* Background blobs - only for playful mode */}
      {isPlayfulMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-vibrant-pink/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-vibrant-cyan/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-vibrant-yellow/20 blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-vibrant-orange/20 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-vibrant-red/20 blur-3xl" />
          <div className="absolute top-3/4 right-1/3 w-24 h-24 rounded-full bg-vibrant-purple/20 blur-3xl" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {isPlayfulMode ? (
          /* Playful Footer - Keep Original */
          <div className="flex flex-col md:flex-row justify-center md:justify-between gap-8 md:gap-12 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6 flex-wrap">
                {avatar && (
                  <div className="relative w-12 h-12">
                    <Image
                      src={avatar}
                      alt={`${name || 'Portfolio'} avatar`}
                      fill
                      className="rounded-full border-2 border-vibrant-pink object-cover"
                    />
                  </div>
                )}
                {displayName && (
                  <h2 className="text-2xl font-bold text-vibrant-pink">
                    {displayName}
                  </h2>
                )}
              </div>
              {bio && <p className="mb-6 max-w-md text-vibrant-cyan">{bio}</p>}
              {copyright && <p className="text-vibrant-cyan">{copyright}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              {heading && (
                <h3 className="text-xl font-bold mb-6 text-vibrant-yellow">{heading}</h3>
              )}
              <ul className="space-y-4 text-sm sm:text-base items-center md:items-start">
                {c.email && (
                  <li className="flex items-center justify-center md:justify-start gap-3">
                    <FaEnvelope className="text-2xl text-vibrant-orange" />
                    <a href={`mailto:${c.email}`} className="transition-colors hover:text-vibrant-orange">
                      {c.email.toUpperCase()}
                    </a>
                  </li>
                )}
                {c.phone && (
                  <li className="flex items-center justify-center md:justify-start gap-3">
                    <FaPhone className="text-2xl text-vibrant-red" />
                    <span>{c.phone}</span>
                  </li>
                )}
                {c.location && (
                  <li className="flex items-center justify-center md:justify-start gap-3">
                    <FaMapMarkerAlt className="text-2xl text-vibrant-purple" />
                    <span>{c.location.toUpperCase()}</span>
                  </li>
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h3 className="text-xl font-bold mb-6 text-vibrant-green">STALK MY CHAOS</h3>
              {socialLinks.length > 0 && (
                <div className="flex gap-4 flex-wrap justify-center">
                  {socialLinks.map((s) => (
                    <SocialIcon key={s.name} platform={s.icon} url={s.url!} playfulMode={true} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        ) : (
          /* Minimal Professional Footer - Responsive */
          <div className="text-center space-y-4 md:space-y-6">
            {/* Contact Info - Stack on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm text-gray-800 px-2">
              {c.email && (
                <a href={`mailto:${c.email}`} className="hover:text-gray-600 transition-colors break-all">
                  {c.email}
                </a>
              )}
              {c.phone && <span className="whitespace-nowrap">{c.phone}</span>}
              {c.location && <span className="whitespace-nowrap">{c.location}</span>}
            </div>

            {/* Social Links - Responsive sizing */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center gap-3 sm:gap-4 px-2">
                {socialLinks.map((s) => (
                  <SocialIcon key={s.name} platform={s.icon} url={s.url!} playfulMode={false} />
                ))}
              </div>
            )}

            {/* Copyright - Responsive text size */}
            <div className="pt-3 md:pt-4 border-t border-gray-300">
              <p className="text-xs sm:text-sm text-gray-600 px-4 text-center">
                {copyright || `© ${year} ${name}. All rights reserved.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
