// src/components/sections/GitHubSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Clock, Code2, Sparkles, ExternalLink } from 'lucide-react';

const repos = [
  {
    name: 'kahani-land',
    description: 'Kids learning and storytelling platform with interactive interfaces and engaging animations.',
    language: 'JavaScript',
    stars: 12,
    forks: 4,
    updated: 'Recently',
    theme: {
      gradient: 'from-indigo-500 to-purple-600',
      cardBg: 'bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/20',
      border: 'border-indigo-100 hover:border-indigo-400',
      iconColor: 'text-indigo-600',
      langColor: 'bg-yellow-400',
    },
  },
  {
    name: 'healthcare-dashboard',
    description: 'Modern healthcare dashboard with patient analytics, diagnostic metrics, and reactive charts.',
    language: 'React',
    stars: 8,
    forks: 2,
    updated: 'Recently',
    theme: {
      gradient: 'from-cyan-500 to-blue-600',
      cardBg: 'bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/20',
      border: 'border-cyan-100 hover:border-cyan-400',
      iconColor: 'text-cyan-600',
      langColor: 'bg-cyan-400',
    },
  },
  {
    name: 'moodyEats',
    description: 'Full-stack food ordering platform with JWT authentication, cart management, and REST APIs.',
    language: 'Full Stack',
    stars: 5,
    forks: 1,
    updated: 'Recently',
    theme: {
      gradient: 'from-amber-500 to-orange-600',
      cardBg: 'bg-gradient-to-br from-amber-50/50 via-white to-orange-50/20',
      border: 'border-amber-100 hover:border-amber-400',
      iconColor: 'text-orange-600',
      langColor: 'bg-emerald-400',
    },
  },
  {
    name: 'mintu-portfolio',
    url: 'https://github.com/Mintukumari-0019/mintu-portfolio',
    description: 'Modern responsive portfolio website built with React, Tailwind CSS, Docker, and Nginx.',
    language: 'React + Docker',
    stars: 3,
    forks: 0,
    updated: 'Active',
    theme: {
      gradient: 'from-blue-600 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/20',
      border: 'border-blue-100 hover:border-blue-400',
      iconColor: 'text-blue-600',
      langColor: 'bg-blue-400',
    },
  },
];

const GitHubSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50/60">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-indigo-600" />
            Open Source & Repositories
          </div>
          <h2 className="heading-lg">Code, Repositories & Activity</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto text-base">
            Explore my open-source code repositories and ongoing projects on GitHub.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {repos.map((repo, index) => {
            const { theme } = repo;
            return (
              <motion.a
                key={repo.name}
                href={repo.url || `https://github.com/Mintukumari-0019/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl border ${theme.border} ${theme.cardBg} p-6 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-white shadow-xs border border-gray-100">
                        <Code2 size={18} className={theme.iconColor} />
                      </div>
                      <span className="font-mono text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      Public <ExternalLink size={10} />
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{repo.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-gray-100 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                    <span className={`w-2.5 h-2.5 rounded-full ${theme.langColor}`} />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                    <Star size={13} className="text-amber-500 fill-amber-500" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={13} /> {repo.forks}
                  </span>
                  <span className="flex items-center gap-1 ml-auto text-gray-400">
                    <Clock size={12} /> {repo.updated}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Mintukumari-0019"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gray-900 text-white font-semibold transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200/50"
          >
            <Github size={19} />
            Explore Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
