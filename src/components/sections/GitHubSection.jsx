// src/components/sections/GitHubSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Clock, Code2 } from 'lucide-react';

const repos = [
  {
    name: 'kahani-land',
    description: 'Kids learning and storytelling platform with interactive interfaces.',
    language: 'JavaScript',
    stars: 12,
    forks: 4,
    updated: '2 days ago',
  },
  {
    name: 'healthcare-dashboard',
    description: 'Modern healthcare dashboard with patient analytics and charts.',
    language: 'JavaScript',
    stars: 8,
    forks: 2,
    updated: '1 week ago',
  },
  {
    name: 'food-delivery-web',
    description: 'Responsive food delivery web application with clean UI.',
    language: 'JavaScript',
    stars: 5,
    forks: 1,
    updated: '3 weeks ago',
  },
  {
    name: 'developer-portfolio',
    description: 'Modern responsive portfolio website built with React and Tailwind.',
    language: 'JavaScript',
    stars: 3,
    forks: 0,
    updated: '1 month ago',
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
          className="mb-12 text-center"
        >
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Code
          </span>
          <h2 className="heading-lg">Code, Projects & Learning</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Explore my open-source work and personal projects on GitHub.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="card-soft p-5 sm:p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Code2 size={18} className="text-indigo-500" />
                  <span className="font-mono text-sm font-semibold text-gray-800">{repo.name}</span>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  Public
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{repo.description}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {repo.updated}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/Mintukumari-0019"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-200/50"
          >
            <Github size={18} />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
