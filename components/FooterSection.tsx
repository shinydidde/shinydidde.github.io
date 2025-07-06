// app/components/FooterSection.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import DoodleSection from './DoodleSection';
import type { ContactData } from '../lib/firestoreService';

// React Icons
import { HiOutlineMail, HiOutlinePhone, HiOutlineChatAlt2, HiArrowSmUp } from 'react-icons/hi';

interface FooterSectionProps {
  contact: ContactData;
}

export default function FooterSection({ contact }: FooterSectionProps) {
  const containerVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden:  { y: 20, opacity: 0 },
    visible: { y: 0,  opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <DoodleSection bgImage="/images/footer-bg.avif" divider={false}>
      <motion.footer
        id="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="py-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.h2 variants={itemVariants} className="text-3xl font-sketch text-center mb-8">
          {contact.heading}
        </motion.h2>

        {/* Contact Methods */}
        <motion.div
          variants={itemVariants}
          className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
        >
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex flex-col items-center space-y-2 text-teal hover:text-magenta transition"
            >
              <HiOutlineMail size={32} />
              <span className="font-sketch">{contact.email}</span>
            </a>
          )}
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="flex flex-col items-center space-y-2 text-teal hover:text-magenta transition"
            >
              <HiOutlinePhone size={32} />
              <span className="font-sketch">{contact.phone}</span>
            </a>
          )}
          {contact.skype && (
            <a
              href={`skype:${contact.skype}?call`}
              className="flex flex-col items-center space-y-2 text-teal hover:text-magenta transition"
            >
              <HiOutlineChatAlt2 size={32} />
              <span className="font-sketch">{contact.skype}</span>
            </a>
          )}
        </motion.div>

        {/* Footer Text */}
        <motion.p variants={itemVariants} className="text-center italic mb-6 text-gray-700">
          {contact.footerText}
        </motion.p>

        {/* Back to Top */}
        <motion.div variants={itemVariants} className="text-center">
          <a
            href="#home"
            className="inline-flex items-center space-x-2 font-sketch text-teal hover:text-magenta transition"
          >
            <span>Back to top</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7 7 7m-7-7v18"
              />
            </svg>
          </a>
        </motion.div>
      </motion.footer>
      {/* Floating “Back to Top” */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
        whileHover={{ scale: 1.1 }}
        className="
          fixed bottom-6 right-6 z-50
          bg-magenta text-white p-3 rounded-full shadow-lg
          hover:bg-lime transition-colors
        "
        aria-label="Back to Top"
      >
        <HiArrowSmUp size={24} />
      </motion.button>
    </DoodleSection>
  );
}
