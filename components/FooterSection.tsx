'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SocialIcon } from './ui/SocialIcon';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaCoffee, FaLaughSquint, FaSkype } from 'react-icons/fa';
import { SiReact } from 'react-icons/si';
import { useMemeMode } from '@/contexts/MemeContext';

interface ContactInfo {
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  skype?: string;
  heading?: string;
  footerText?: string;
}

export default function FooterSection({ contact = {} }: { contact?: Partial<ContactInfo> }) {
  const { isMemeMode } = useMemeMode();
  const currentYear = new Date().getFullYear();

  // Provide default values
  const safeContact = {
    name: 'Your Name',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/me.png?alt=media&token=0ff61f87-58db-408c-8496-589ce987f5ea',
    email: 'example@example.com',
    phone: '+0000000000',
    location: 'Earth',
    github: '#',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    skype: 'your-skype',
    heading: "Let's Connect!",
    footerText: "This website consumes cookies. Not the edible kind, sadly.",
    ...contact
  };

  const socialLinks = [
    { name: 'GitHub', url: safeContact.github, icon: 'github' as const },
    { name: 'LinkedIn', url: safeContact.linkedin, icon: 'linkedin' as const },
    { name: 'Twitter', url: safeContact.twitter, icon: 'twitter' as const },
    { name: 'Instagram', url: safeContact.instagram, icon: 'instagram' as const },
  ];

  return (
    <footer className={`py-16 relative overflow-hidden ${
      isMemeMode
        ? 'bg-gradient-to-br from-green-900 to-blue-900'
        : 'bg-black text-white'
    }`}>
      {/* Background elements */}
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
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src={safeContact.avatar}
                  alt={`${safeContact.name} avatar`}
                  fill
                  className={`rounded-full border-2 object-cover ${
                    isMemeMode ? 'border-yellow-400' : 'border-pink-500'
                  }`}
                />
              </div>
              <h2 className={`text-2xl font-bold ${
                isMemeMode ? 'text-yellow-300' : ''
              }`}>
                {isMemeMode ? `${safeContact.name?.toUpperCase() || 'YOU'} (MEME LORD)` : safeContact.name}
              </h2>
            </div>
            <p className={`mb-6 max-w-md ${
              isMemeMode ? 'text-blue-200' : 'text-gray-300'
            }`}>
              {isMemeMode
                ? "BUILDING BUGGY EXPERIENCES WITH A SIDE OF CHAOS AND TOO MUCH COFFEE."
                : "Building digital experiences with a side of memes and too much coffee."}
            </p>
            <p className={isMemeMode ? 'text-blue-200' : 'text-gray-300'}>
              {isMemeMode
                ? `© ${currentYear} ALL RIGHTS RESERVED (UNLESS YOU'RE A RECRUITER WITH PIZZA).`
                : `© ${currentYear} All rights reserved. Unless you're a recruiter with an awesome opportunity, then some rights may be waived.`}
            </p>
          </motion.div>

          {/* Middle column - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h3 className={`text-xl font-bold mb-6 ${
              isMemeMode ? 'text-yellow-300' : ''
            }`}>
              {isMemeMode ? "LET'S CHAOS!" : safeContact.heading}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FaEnvelope className={`text-2xl ${
                  isMemeMode ? 'text-yellow-400' : 'text-pink-400'
                }`} />
                <a
                  href={`mailto:${safeContact.email}`}
                  className={`hover:${
                    isMemeMode ? 'text-yellow-400' : 'text-pink-400'
                  } transition-colors`}
                >
                  {isMemeMode ? safeContact.email?.toUpperCase() : safeContact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className={`text-2xl ${
                  isMemeMode ? 'text-yellow-400' : 'text-pink-400'
                }`} />
                <span>{safeContact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaSkype className={`text-2xl ${
                  isMemeMode ? 'text-yellow-400' : 'text-pink-400'
                }`} />
                <span>{isMemeMode ? safeContact.skype?.toUpperCase() : safeContact.skype}</span>
              </li>
              {safeContact.location && (
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className={`text-2xl ${
                    isMemeMode ? 'text-yellow-400' : 'text-pink-400'
                  }`} />
                  <span>{isMemeMode ? safeContact.location.toUpperCase() : safeContact.location}</span>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Right column - Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h3 className={`text-xl font-bold mb-6 ${
              isMemeMode ? 'text-yellow-300' : ''
            }`}>
              {isMemeMode ? "STALK MY CHAOS" : "Follow My Shenanigans"}
            </h3>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.name}
                  platform={social.icon}
                  url={social.url || '#'}
                  memeMode={isMemeMode}
                />
              ))}
            </div>
            <p className={`mb-4 ${
              isMemeMode ? 'text-blue-200' : 'text-gray-300'
            }`}>
              {isMemeMode ? "P.S. MY DMS ARE OPEN FOR:" : "P.S. My DMs are open for:"}
            </p>
            <ul className={`space-y-2 ${
              isMemeMode ? 'text-blue-200' : 'text-gray-300'
            }`}>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  isMemeMode ? 'bg-yellow-400' : 'bg-pink-500'
                }`} />
                {isMemeMode ? "JOB OFFERS (PIZZA INCLUDED)" : "Job opportunities"}
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  isMemeMode ? 'bg-yellow-400' : 'bg-pink-500'
                }`} />
                {isMemeMode ? "MEME COLLABORATIONS" : "Collaboration ideas"}
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  isMemeMode ? 'bg-yellow-400' : 'bg-pink-500'
                }`} />
                {isMemeMode ? "BUG HUNTING PARTNERS" : "Meme exchanges"}
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  isMemeMode ? 'bg-yellow-400' : 'bg-pink-500'
                }`} />
                {isMemeMode ? "COFFEE DONATIONS" : "Coffee recommendations"}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Footer bottom */}
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
                MADE WITH <FaLaughSquint className="inline text-yellow-400" />,
                <SiReact className="inline mx-1 text-blue-400" />,
                AND <FaCoffee className="inline mx-1 text-green-400" />
              </>
            ) : (
              <>
                Made with <FaHeart className="inline text-pink-500" />,
                <SiReact className="inline mx-1 text-purple-500" />,
                and <FaCoffee className="inline mx-1 text-yellow-500" />
              </>
            )}
          </p>
          <p className="mt-2">
            {isMemeMode
              ? safeContact.footerText?.toUpperCase() || "THIS WEBSITE CONSUMES COOKIES. STILL NOT THE EDIBLE KIND, SADLY."
              : safeContact.footerText || "This website consumes cookies. Not the edible kind, sadly."}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
