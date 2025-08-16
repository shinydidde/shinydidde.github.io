'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SocialIcon } from './ui/SocialIcon';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaLaughSquint,
  FaSkype,
  FaCode
} from 'react-icons/fa';
import { SiReact } from 'react-icons/si';
import { useMemeMode } from '@/contexts/MemeContext';

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
    headingMeme?: string;
    bioNormal?: string;
    bioMeme?: string;
    footerTextNormal?: string;
    footerTextMeme?: string;
    copyrightNormal?: string; // supports {year}
    copyrightMeme?: string;   // supports {year}
    nameSuffixMeme?: string;
    dmTitleNormal?: string;
    dmTitleMeme?: string;
    dmListNormal?: string[];
    dmListMeme?: string[];
  };
}>;

function withYear(s?: string, year?: number) {
  return (s ?? '').replace(/\{year\}/g, String(year ?? ''));
}

export default function FooterSection({ contact }: { contact: FooterData }) {
  const { isMemeMode } = useMemeMode();
  const year = new Date().getFullYear();

  const name = contact?.name ?? '';
  const avatar = contact?.avatar ?? '';
  const c = contact?.contact ?? {};
  const social = contact?.social ?? {};
  const copy = contact?.copy ?? {};

  const heading = isMemeMode ? (copy.headingMeme ?? '') : (copy.headingNormal ?? '');
  const bio = isMemeMode ? (copy.bioMeme ?? '') : (copy.bioNormal ?? '');
  const footerText = isMemeMode ? (copy.footerTextMeme ?? '') : (copy.footerTextNormal ?? '');
  const copyright = isMemeMode
    ? withYear(copy.copyrightMeme, year)
    : withYear(copy.copyrightNormal, year);

  const dmTitle = isMemeMode ? (copy.dmTitleMeme ?? '') : (copy.dmTitleNormal ?? '');
  const dmList = isMemeMode ? (copy.dmListMeme ?? []) : (copy.dmListNormal ?? []);

  const displayName = isMemeMode
    ? `${(name || 'YOU').toUpperCase()}${copy.nameSuffixMeme ?? ''}`
    : name;

  const socialLinks = [
    { name: 'GitHub', url: social.github, icon: 'github' as const },
    { name: 'LinkedIn', url: social.linkedin, icon: 'linkedin' as const },
    { name: 'Twitter', url: social.twitter, icon: 'twitter' as const },
    { name: 'Instagram', url: social.instagram, icon: 'instagram' as const }
  ].filter((s) => !!s.url);

  return (
    <footer
      className={`py-16 relative overflow-hidden ${
        isMemeMode ? 'bg-gradient-to-br from-green-900 to-blue-900' : 'bg-black text-white'
      }`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isMemeMode ? (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-green-700/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-700/20 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-900/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-900/20 blur-3xl" />
          </>
        )}
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left: avatar/name/bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              {avatar && (
                <div className="relative w-12 h-12">
                  <Image
                    src={avatar}
                    alt={`${name || 'Portfolio'} avatar`}
                    fill
                    className={`rounded-full border-2 object-cover ${
                      isMemeMode ? 'border-yellow-400' : 'border-pink-500'
                    }`}
                  />
                </div>
              )}
              {displayName && (
                <h2 className={`text-2xl font-bold ${isMemeMode ? 'text-yellow-300' : ''}`}>
                  {displayName}
                </h2>
              )}
            </div>

            {bio && (
              <p className={`mb-6 max-w-md ${isMemeMode ? 'text-blue-200' : 'text-gray-300'}`}>
                {bio}
              </p>
            )}

            {copyright && (
              <p className={isMemeMode ? 'text-blue-200' : 'text-gray-300'}>
                {copyright}
              </p>
            )}
          </motion.div>

          {/* Middle: contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            {heading && (
              <h3 className={`text-xl font-bold mb-6 ${isMemeMode ? 'text-yellow-300' : ''}`}>
                {heading}
              </h3>
            )}

            <ul className="space-y-4">
              {c.email && (
                <li className="flex items-center gap-3">
                  <FaEnvelope className={`text-2xl ${isMemeMode ? 'text-yellow-400' : 'text-pink-400'}`} />
                  <a
                    href={`mailto:${c.email}`}
                    className={`transition-colors hover:${isMemeMode ? 'text-yellow-400' : 'text-pink-400'}`}
                  >
                    {isMemeMode ? c.email.toUpperCase() : c.email}
                  </a>
                </li>
              )}

              {c.phone && (
                <li className="flex items-center gap-3">
                  <FaPhone className={`text-2xl ${isMemeMode ? 'text-yellow-400' : 'text-pink-400'}`} />
                  <span>{c.phone}</span>
                </li>
              )}

              {c.skype && (
                <li className="flex items-center gap-3">
                  <FaSkype className={`text-2xl ${isMemeMode ? 'text-yellow-400' : 'text-pink-400'}`} />
                  <span>{isMemeMode ? c.skype.toUpperCase() : c.skype}</span>
                </li>
              )}

              {c.location && (
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className={`text-2xl ${isMemeMode ? 'text-yellow-400' : 'text-pink-400'}`} />
                  <span>{isMemeMode ? c.location.toUpperCase() : c.location}</span>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Right: social & DM list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            {(socialLinks.length > 0 || dmTitle) && (
              <h3 className={`text-xl font-bold mb-6 ${isMemeMode ? 'text-yellow-300' : ''}`}>
                {isMemeMode ? 'STALK MY CHAOS' : 'Follow My Shenanigans'}
              </h3>
            )}

            {socialLinks.length > 0 && (
              <div className="flex gap-4 mb-8">
                {socialLinks.map((s) => (
                  <SocialIcon key={s.name} platform={s.icon} url={s.url!} memeMode={isMemeMode} />
                ))}
              </div>
            )}

            {dmTitle && (
              <p className={`${isMemeMode ? 'text-blue-200' : 'text-gray-300'} mb-4`}>
                {dmTitle}
              </p>
            )}

            {dmList.length > 0 && (
              <ul className={`${isMemeMode ? 'text-blue-200' : 'text-gray-300'} space-y-2`}>
                {dmList.map((line, i) => (
                  <li key={`${line}-${i}`} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isMemeMode ? 'bg-yellow-400' : 'bg-pink-500'}`} />
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className={`mt-16 pt-8 border-t ${
            isMemeMode ? 'border-blue-700 text-blue-200' : 'border-gray-800 text-gray-400'
          } text-center text-sm`}
        >
          <p>
            {isMemeMode ? (
              <>
                MADE WITH <FaLaughSquint className="inline text-yellow-400" />,{' '}
                <SiReact className="inline mx-1 text-blue-400" /> AND{' '}
                <FaCode className="inline mx-1 text-green-400" />
              </>
            ) : (
              <>
                Made with <FaHeart className="inline text-pink-500" />,{' '}
                <SiReact className="inline mx-1 text-purple-500" /> and{' '}
                <FaCode className="inline mx-1 text-yellow-500" />
              </>
            )}
          </p>

          {footerText && <p className="mt-2">{isMemeMode ? footerText.toUpperCase() : footerText}</p>}
        </motion.div>
      </div>
    </footer>
  );
}
