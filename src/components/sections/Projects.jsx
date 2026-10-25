// src/components/sections/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const GITHUB_PROFILE = 'https://github.com/Mintukumari-0019';

const projects = [
  {
    title: 'KahaniLand',
    description:
      'A kids learning and storytelling platform designed with engaging educational experiences and interactive interfaces.',
    tags: ['React', 'Tailwind CSS', 'React Native', 'JavaScript'],
    demo: '#',
    github: GITHUB_PROFILE,
    featured: true,
  },
  {
    title: 'Healthcare Dashboard',
    description:
      'A modern healthcare dashboard interface featuring patient information, diagnosis history, charts and analytics.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    demo: '#',
    github: GITHUB_PROFILE,
    featured: false,
  },
  {
    title: 'MoodyEats - Food Ordering System',
    description:
      'A full-stack food ordering website with secure user authentication, restaurant listings, menu management, cart, order placement, and REST API integration.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'CSS'],
    demo: '#',
    github: 'https://github.com/Mintukumari-0019/moodyEats',
    featured: false,
  },
  {
    title: 'Developer Portfolio',
    description:
      'A modern responsive portfolio website showcasing projects, skills and professional experience.',
    tags: ['React', 'Tailwind CSS'],
    demo: '#',
    github: GITHUB_PROFILE,
    featured: false,
  },
  {
    title: 'Education / Exam Platform',
    description:
      'An interactive educational platform designed for learning and examination experiences.',
    tags: ['React', 'JavaScript', 'SQL'],
    demo: '#',
    github: GITHUB_PROFILE,
    featured: false,
  },
];

const ProjectCard = ({ project, index, featured }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group card-soft overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/30 ${
        featured ? 'lg:col-span-2 lg:row-span-1' : ''
      }`}
    >
      <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-indigo-100/60 to-purple-100/60">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl font-bold text-indigo-300/60">{project.title[0]}</span>
            <div className="mt-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Project Preview</div>
          </div>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-indigo-600/80 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/30 hover:scale-110"
              aria-label="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/30 hover:scale-110"
            aria-label="View on GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
        <p className="mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100/60"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100/60">
          {project.demo && project.demo !== '#' && (
            <>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800 inline-flex items-center gap-1"
              >
                Live Demo <ExternalLink size={14} />
              </a>
              <span className="text-gray-300">|</span>
            </>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 inline-flex items-center gap-1"
          >
            GitHub <Github size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const featured = projects[0];
  const others = projects.slice(1);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white section-offset">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Portfolio
          </span>
          <h2 className="heading-lg">Things I've Built</h2>
        </motion.div>

        {/* Featured Project */}
        <div className="mb-10">
          <ProjectCard project={featured} index={0} featured />
        </div>

        {/* Other Projects */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index + 1} featured={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
