'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCheck, FiCopy, FiMapPin } from 'react-icons/fi'
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import type { FooterData } from '@/lib/firestoreService'
import { Reveal } from './primitives'
import { prismAt } from './format'

export default function Contact({ data }: { data: FooterData }) {
  const [copied, setCopied] = useState(false)
  const { contact, social, copy } = data
  const year = new Date().getFullYear()

  const socials = [
    { href: social.github,    label: 'GitHub',    icon: FaGithub },
    { href: social.linkedin,  label: 'LinkedIn',  icon: FaLinkedinIn },
    { href: social.twitter,   label: 'X',         icon: FaXTwitter },
    { href: social.instagram, label: 'Instagram', icon: FaInstagram },
  ].filter(s => s.href)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <footer id="contact" className="relative overflow-hidden pb-10 pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="section-label mb-6">
            <span className="mr-3 inline-block h-px w-10 bg-prism-cyan align-middle" />
            {copy.headingNormal || "Let's connect"}
          </p>
          <h2 className="font-display font-extrabold leading-[0.9] tracking-tight text-[clamp(2.8rem,10vw,8.5rem)]">
            Let&apos;s build
            <br />
            something <span className="text-rainbow">wild.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal delay={0.1}>
            {copy.bioNormal && <p className="max-w-xl text-lg text-white/70">{copy.bioNormal}</p>}

            {contact.email && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <motion.a
                  href={`mailto:${contact.email}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="ring-rainbow rounded-full"
                >
                  <span className="flex items-center gap-3 rounded-full bg-ink-800 px-6 py-4 font-display text-base font-semibold sm:text-xl">
                    {contact.email}
                    <FiArrowUpRight />
                  </span>
                </motion.a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="glass grid h-14 w-14 place-items-center rounded-full transition-colors hover:bg-white/10"
                  aria-label="Copy email address"
                >
                  {copied ? <FiCheck className="text-prism-lime" size={20} /> : <FiCopy size={18} />}
                </button>
                <span role="status" className="sr-only">
                  {copied ? 'Email copied' : ''}
                </span>
              </div>
            )}

            {contact.location && (
              <p className="mt-6 flex items-center gap-2 text-white/60">
                <FiMapPin className="text-prism-pink" /> {contact.location}
              </p>
            )}

            {socials.length > 0 && (
              <ul className="mt-8 flex gap-3">
                {socials.map(({ href, label, icon: Icon }, i) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="glass grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:rotate-6 hover:text-ink"
                      onMouseEnter={e => (e.currentTarget.style.background = prismAt(i))}
                      onMouseLeave={e => (e.currentTarget.style.background = '')}
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          {copy.dmListNormal.length > 0 && (
            <Reveal delay={0.2}>
              <div className="glass rounded-3xl p-6 sm:p-8">
                <p className="font-display text-lg font-extrabold">{copy.dmTitleNormal || 'My DMs are open for:'}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {copy.dmListNormal.map((item, i) => (
                    <li
                      key={item}
                      className="rounded-full px-4 py-2 text-sm font-bold text-ink transition-transform hover:-rotate-3 hover:scale-105"
                      style={{ background: prismAt(i) }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{(copy.copyrightNormal || '© {year}').replace('{year}', String(year))}</p>
          {copy.footerTextNormal && <p className="font-mono text-xs">{copy.footerTextNormal}</p>}
        </div>
      </div>
    </footer>
  )
}
