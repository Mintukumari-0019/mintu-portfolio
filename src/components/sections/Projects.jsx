// src/components/sections/Projects.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, ArrowUpRight, Database } from 'lucide-react';

const GITHUB_PROFILE = 'https://github.com/Mintukumari-0019';

const DEFAULT_PROJECTS = [
  {
    title: 'KahaniLand',
    subtitle: 'Kids Learning & Storytelling Platform',
    description:
      'An engaging, interactive learning and storytelling platform designed to make early education magical with vibrant visuals and playful experiences.',
    tags: ['React', 'Tailwind CSS', 'React Native', 'JavaScript'],
    demo: '#',
    github: GITHUB_PROFILE,
    featured: true,
    theme: {
      gradient: 'from-indigo-600 via-purple-600 to-pink-500',
      glow: 'group-hover:shadow-indigo-500/20 group-hover:border-indigo-400',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      cardBg: 'bg-gradient-to-br from-white via-indigo-50/25 to-purple-50/20',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-500/10 text-indigo-600',
    },
  },
  {
    title: 'Healthcare Dashboard',
    subtitle: 'Clinical & Patient Analytics Suite',
    description:
      'A modern healthcare dashboard featuring real-time patient vitals, diagnosis history, intuitive charts, and dynamic health analytics.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    demo: '#',
    github: GITHUB_PROFILE,
    featured: false,
    theme: {
      gradient: 'from-cyan-600 via-teal-600 to-blue-600',
      glow: 'group-hover:shadow-cyan-500/20 group-hover:border-cyan-400',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
      cardBg: 'bg-gradient-to-br from-white via-cyan-50/25 to-teal-50/15',
      border: 'border-cyan-100',
      iconBg: 'bg-cyan-500/10 text-cyan-600',
    },
  },
  {
    title: 'MoodyEats - Food Ordering System',
    subtitle: 'Full-Stack Food Delivery & Management',
    description:
      'Full-stack food ordering platform featuring secure JWT authentication, restaurant listings, dynamic menus, interactive cart, and REST API integration.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    demo: '#',
    github: 'https://github.com/Mintukumari-0019/moodyEats',
    featured: false,
    theme: {
      gradient: 'from-amber-500 via-orange-600 to-rose-600',
      glow: 'group-hover:shadow-orange-500/20 group-hover:border-orange-400',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200/80',
      cardBg: 'bg-gradient-to-br from-white via-orange-50/25 to-rose-50/15',
      border: 'border-orange-100',
      iconBg: 'bg-orange-500/10 text-orange-600',
    },
  },
  {
    title: 'Developer Portfolio',
    subtitle: 'Containerized Personal Portfolio',
    description:
      'Modern, highly responsive portfolio showcasing full-stack capabilities, dockerized with multi-stage Nginx builds and smooth Framer Motion animations.',
    tags: ['React', 'Tailwind CSS', 'Docker', 'Vite'],
    demo: '#',
    github: GITHUB_PROFILE,
    featured: false,
    theme: {
      gradient: 'from-blue-600 via-indigo-600 to-violet-600',
      glow: 'group-hover:shadow-blue-500/20 group-hover:border-blue-400',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      cardBg: 'bg-gradient-to-br from-white via-blue-50/25 to-indigo-50/15',
      border: 'border-blue-100',
      iconBg: 'bg-blue-500/10 text-blue-600',
    },
  },
  {
    title: 'Education / Exam Platform',
    subtitle: 'Interactive Learning & Examination Hub',
    description:
      'Interactive testing environment designed for high-clarity exam experiences, dynamic question rendering, and real-time score assessment.',
    tags: ['React', 'JavaScript', 'SQL', 'Node.js'],
    demo: '#',
    github: GITHUB_PROFILE,
    featured: false,
    theme: {
      gradient: 'from-emerald-600 via-teal-600 to-indigo-600',
      glow: 'group-hover:shadow-emerald-500/20 group-hover:border-emerald-400',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      cardBg: 'bg-gradient-to-br from-white via-emerald-50/25 to-teal-50/15',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
    },
  },
];

const fallbackTheme = {
  gradient: 'from-indigo-600 via-purple-600 to-blue-600',
  glow: 'group-hover:shadow-indigo-500/20 group-hover:border-indigo-400',
  badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
  cardBg: 'bg-gradient-to-br from-white via-indigo-50/25 to-purple-50/20',
  border: 'border-indigo-100',
  iconBg: 'bg-indigo-500/10 text-indigo-600',
};

const ProjectCard = ({ project, index, featured }) => {
  const theme = project.theme && project.theme.gradient ? project.theme : fallbackTheme;
  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative rounded-3xl border ${theme.border} ${theme.cardBg} overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${theme.glow} flex flex-col justify-between ${
        featured ? 'lg:col-span-2 lg:flex-row' : ''
      }`}
    >
      {/* Top accent line */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient} absolute top-0 left-0 right-0 z-10`} />

      {/* Visual Header / Banner */}
      <div
        className={`relative overflow-hidden ${
          featured ? 'lg:w-1/2 aspect-video lg:aspect-auto' : 'aspect-video'
        } bg-gradient-to-br ${theme.gradient} flex items-center justify-center p-6 text-white`}
      >
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-black/10 blur-xl pointer-events-none" />

        <div className="relative z-10 text-center px-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110">
            <span className="text-3xl font-extrabold text-white tracking-wider">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/90">
            {project.subtitle || 'Web Application'}
          </div>
          {featured && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-[11px] font-bold text-white shadow-sm border border-white/30">
              <Sparkles size={12} /> Featured Showcase
            </div>
          )}
        </div>

        {/* Hover overlay with quick links */}
        <div className="absolute inset-0 bg-gray-950/75 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/20 text-white transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-110 shadow-lg"
              aria-label="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/20 text-white transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-110 shadow-lg"
            aria-label="View on GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* Card Content */}
      <div className={`p-6 sm:p-7 flex flex-col justify-between ${featured ? 'lg:w-1/2' : 'flex-1'}`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {project.title}
            </h3>
            <span className="text-gray-400 group-hover:text-indigo-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={18} />
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border shadow-xs transition-colors ${theme.badgeBg}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100/80">
          {project.demo && project.demo !== '#' && (
            <>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-indigo-600 transition-colors hover:text-indigo-800 inline-flex items-center gap-1.5"
              >
                Live Preview <ExternalLink size={13} />
              </a>
              <span className="text-gray-300">•</span>
            </>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-gray-700 transition-colors hover:text-indigo-600 inline-flex items-center gap-1.5"
          >
            Source Code <Github size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projectsList, setProjectsList] = useState(DEFAULT_PROJECTS);
  const [isFromDatabase, setIsFromDatabase] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) return;
        const result = await response.json();
        if (isMounted && result.success && Array.isArray(result.data) && result.data.length > 0) {
          setProjectsList(result.data);
          setIsFromDatabase(true);
        }
      } catch (err) {
        // Fallback silently to DEFAULT_PROJECTS
        console.info('Backend API offline or unreachable, using default projects:', err.message);
      }
    };

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const featured = projectsList.find((p) => p.featured) || projectsList[0];
  const others = projectsList.filter((p) => p !== featured);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white section-offset">
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
            Featured Work
            {isFromDatabase && (
              <span className="inline-flex items-center gap-1 ml-1 pl-2 border-l border-indigo-200 text-emerald-600">
                <Database size={11} /> Live DB
              </span>
            )}
          </div>
          <h2 className="heading-lg">Things I've Built</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
            A dynamic collection of full-stack, frontend, and mobile projects backed by an Express & SQL database.
          </p>
        </motion.div>

        {/* Featured Project */}
        {featured && (
          <div className="mb-8">
            <ProjectCard project={featured} index={0} featured />
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
          {others.map((project, index) => (
            <ProjectCard key={project.id || project.title} project={project} index={index + 1} featured={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
