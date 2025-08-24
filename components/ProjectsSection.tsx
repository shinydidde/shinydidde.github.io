// components/ProjectsSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ProjectCard } from './ui/ProjectCard';
import { useMemo, useState } from 'react';
import { usePlayfulMode } from '@/contexts/PlayfulContext';

/* ---------- Firestore payload ---------- */
export type ProjectsData = Readonly<{
  title?: string;
  items?: ReadonlyArray<{
    image?: string;
    title?: string;
    link?: string;
    description?: string;
  }>;
}>;

/* ---------- UI model ---------- */
type UIProject = Readonly<{
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  featured: boolean;
}>;

/* Infer simple tech tags from title/description so filters work without hard-coding */
const TAG_PATTERNS: Record<string, RegExp> = {
  react: /\breact(\.js)?\b/i,
  angular: /\bangular(\.js)?\b/i,
  vue: /\bvue(\.js)?\b/i,
  next: /\bnext(\.js)?\b/i,
  nuxt: /\bnuxt(\.js)?\b/i,
  bootstrap: /\bbootstrap\b/i,
  firebase: /\bfirebase\b/i,
  'material ui': /\bmaterial\s*ui\b/i,
  node: /\bnode(\.js)?\b/i,
};

function inferTags(text: string): string[] {
  const tags: string[] = [];
  for (const [key, rx] of Object.entries(TAG_PATTERNS)) {
    if (rx.test(text)) tags.push(key);
  }
  return tags;
}

/* Map Firestore items → UI projects (with sensible fallbacks) */
function toUIProjects(data?: ProjectsData): UIProject[] {
  const items = data?.items ?? [];
  return items.map((raw, idx) => {
    const title = (raw.title ?? 'Untitled').trim();
    const desc = (raw.description ?? '').trim();
    const text = `${title} ${desc}`;
    const tags = inferTags(text);
    return {
      id: idx + 1,
      title,
      description: desc,
      tags,
      image: raw.image ?? '/placeholder.png',
      link: raw.link ?? '#',
      featured: idx < 3, // lightweight heuristic
    };
  });
}

export default function ProjectsSection({ data }: { data: ProjectsData }) {
  const { isPlayfulMode } = usePlayfulMode();
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Build UI once from Firestore
  const { title, projects, filters } = useMemo(() => {
    const projects = toUIProjects(data);
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    const filters = ['all', ...Array.from(tagSet).sort()];
    return { title: data?.title ?? 'Featured Projects', projects, filters };
  }, [data]);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(filter.toLowerCase()));
  }, [filter, projects]);

  return (
    <section
      id="projects"
      className={`relative ${
        isPlayfulMode ? 'py-16 bg-gradient-to-br from-green-100 to-blue-100 overflow-hidden' : 'py-20 bg-white'
      }`}
    >
      {/* Background elements - only for playful mode */}
      {isPlayfulMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-green-200 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-200 blur-3xl" />
        </div>
      )}

      <div className={`mx-auto px-6 ${isPlayfulMode ? 'container max-w-7xl' : 'max-w-6xl'}`}>
        {/* Section header */}
        {isPlayfulMode ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              BUGGY {title}
            </h2>
            <p className="text-lg text-blue-600 max-w-2xl mx-auto">
              A collection of my questionable creations and accidents
            </p>
          </motion.div>
        ) : (
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              Featured Work
            </h2>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-4"></div>
            <p className="text-base text-gray-600 font-light max-w-xl mx-auto leading-relaxed">
              Selected projects showcasing technical expertise and problem-solving
            </p>
          </div>
        )}

        {/* Filter buttons */}
        {filters.length > 1 && (
          isPlayfulMode ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {filters.map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-all ${
                    filter === tag
                      ? 'bg-green-400 text-black shadow-md rounded-full'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tag === 'all' ? 'All Chaos' : tag}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="mb-16">
              <div className="flex flex-wrap justify-center gap-3">
                {filters.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={`px-6 py-3 text-sm font-medium capitalize transition-all duration-200 ${
                      filter === tag
                        ? 'text-gray-900 border-b-2 border-gray-900'
                        : 'text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    {tag === 'all' ? 'All Projects' : tag}
                  </button>
                ))}
              </div>
            </div>
          )
        )}

        {/* Projects grid */}
        {isPlayfulMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <ProjectCard project={project} isHovered={hoveredProject === project.id} playfulMode={isPlayfulMode} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Professional Projects Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Project Image */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Hover overlay with project data */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white p-4 space-y-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm opacity-90 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-1 mt-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-white/20 rounded backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Project
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {isPlayfulMode && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <p className="text-lg mb-6 text-blue-600">
              Want to see more disasters? I&apos;ve got bugs for days!
            </p>
            <motion.a
              href="#contact"
              className="inline-block px-8 py-3 font-semibold transition-all bg-gradient-to-r from-green-400 to-blue-500 text-black border-yellow-400 border-2 shadow-[4px_4px_0_0_rgba(245,158,11,1)] hover:from-blue-500 hover:to-green-400 hover:shadow-[8px_8px_0_0_rgba(59,130,246,1)] rounded-full"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              Let&apos;s Break Things
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
