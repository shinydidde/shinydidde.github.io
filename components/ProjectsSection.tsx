// components/ProjectsSection.tsx
'use client';

import { motion } from 'framer-motion';
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
      className={`py-20 relative overflow-hidden ${
        isPlayfulMode ? 'bg-gradient-to-br from-green-100 to-blue-100' : 'bg-gradient-to-br from-pink-50 to-purple-50'
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isPlayfulMode ? (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-green-200 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-200 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-100 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-100 blur-3xl" />
          </>
        )}
      </div>

      <div className="container mx-auto px-6">
        {/* Section header (title from Firestore) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isPlayfulMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500' : ''
            }`}
          >
            {isPlayfulMode ? 'BUGGY ' : ''}
            {title}
          </h2>
          <p className={`text-lg ${isPlayfulMode ? 'text-blue-600' : 'text-gray-600'} max-w-2xl mx-auto`}>
            {isPlayfulMode
              ? 'A collection of my questionable creations and accidents'
              : 'A collection of my favorite creations and experiments'}
          </p>
        </motion.div>

        {/* Filter buttons (tags inferred from Firestore) */}
        {filters.length > 1 && (
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
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  filter === tag
                    ? isPlayfulMode
                      ? 'bg-green-400 text-black shadow-md'
                      : 'bg-black text-white shadow-md'
                    : isPlayfulMode
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag === 'all' ? (isPlayfulMode ? 'All Chaos' : 'All Projects') : tag}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Projects grid (from Firestore) */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className={`text-lg mb-6 ${isPlayfulMode ? 'text-blue-600' : 'text-gray-600'}`}>
            {isPlayfulMode
              ? "Want to see more disasters? I've got bugs for days!"
              : "Want to see more? I've got side projects for days!"}
          </p>
          <motion.a
            href="#contact"
            className={`inline-block px-8 py-3 rounded-full font-bold border-2 transition-all ${
              isPlayfulMode
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black border-yellow-400 shadow-[4px_4px_0_0_rgba(245,158,11,1)] hover:from-blue-500 hover:to-green-400 hover:shadow-[8px_8px_0_0_rgba(59,130,246,1)]'
                : 'bg-white text-black border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(168,85,247,1)]'
            }`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlayfulMode ? "Let's Break Things" : "Let's Talk Projects"}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
