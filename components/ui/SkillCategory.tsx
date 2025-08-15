// components/ui/SkillCategory.tsx
'use client';

import { motion } from 'framer-motion';
import { JSX } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
}

interface SkillCategoryProps {
  category: {
    name: string;
    skills: Skill[];
  };
  index: number;
  memeMode?: boolean;
}

export function SkillCategory({ category, index, memeMode = false }: SkillCategoryProps) {
  const getCategoryEmoji = () => {
    if (memeMode) {
      return category.name === 'Bug Creation' ? '🐛' :
             category.name === 'Debugging' ? '🔍' : '🤡';
    }
    return category.name === 'Frontend' ? '💅' :
           category.name === 'Backend' ? '⚙️' : '🛠️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={`p-6 rounded-xl border-2 ${memeMode
        ? 'border-yellow-400 bg-white shadow-[4px_4px_0_0_rgba(255,215,0,1)] hover:shadow-[8px_8px_0_0_rgba(59,130,246,1)]'
        : 'border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(168,85,247,1)]'} transition-all`}
    >
      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${memeMode ? 'text-red-500' : ''}`}>
        <span className="text-2xl">
          {getCategoryEmoji()}
        </span>
        {category.name}
      </h3>
      <div className="space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="text-lg">{skill.icon}</span>
                <span>{skill.name}</span>
              </span>
              <span className={`text-sm font-bold ${memeMode ? 'text-blue-500' : ''}`}>
                {skill.level}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${memeMode
                  ? 'bg-gradient-to-r from-green-400 to-blue-500'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
