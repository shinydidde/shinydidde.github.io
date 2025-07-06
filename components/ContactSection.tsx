// app/components/ContactSection.tsx
'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import DoodleSection from './DoodleSection';
import type { ContactData } from '../lib/firestoreService';

interface ContactSectionProps {
  data: ContactData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    try {
      await new Promise(r => setTimeout(r, 1500));
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // to iterate labels/fields
  const fields: Array<keyof typeof form> = ['name', 'email', 'message'];

  return (
    <DoodleSection bgImage="/images/contact-bg.avif">
      <div id="contact" className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Form */}
          <motion.div variants={item} className="p-8 md:p-12">
            <h2 className="text-3xl font-sketch text-teal mb-2">{data.heading}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-magenta to-lime mb-6 rounded-full" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map(field => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>

                  {field === 'message' ? (
                    <textarea
                      id={field}
                      name={field}
                      rows={5}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal transition"
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal transition"
                    />
                  )}
                </div>
              ))}

              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-lime to-magenta text-white font-sketch rounded-full shadow-lg hover:shadow-2xl transition"
                whileHover={{ scale: 1.05 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {status === 'success' && (
                <motion.p variants={item} className="text-green-600 font-medium">
                  Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p variants={item} className="text-red-600 font-medium">
                  Oops, something went wrong.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={item} className="p-8 md:p-12 bg-teal/20">
            <h3 className="text-2xl font-sketch text-magenta mb-6">{data.heading}</h3>
            <div className="space-y-6 text-gray-800">
              <div className="flex items-center">
                <Image src="/icons/mail.svg" alt="Email" width={24} height={24} />
                <a href={`mailto:${data.email}`} className="ml-3 underline">
                  {data.email}
                </a>
              </div>
              <div className="flex items-center">
                <Image src="/icons/phone.svg" alt="Phone" width={24} height={24} />
                <span className="ml-3">{data.phone}</span>
              </div>
              <div className="flex items-center">
                <Image src="/icons/skype.svg" alt="Skype" width={24} height={24} />
                <span className="ml-3">{data.skype}</span>
              </div>
            </div>
            <p className="mt-8 text-gray-700 italic">{data.footerText}</p>
          </motion.div>
        </motion.div>
      </div>
    </DoodleSection>
  );
}
