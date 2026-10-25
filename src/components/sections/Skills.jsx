// src/components/sections/Skills.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Sparkles,
  Layers,
  Cpu,
  Smartphone,
  Server,
  Database,
  Wrench,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

// Tech SVG Icons
const TechIcons = {
  React: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1.6" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#0ea5e9" />
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <rect width="24" height="24" rx="5" fill="#F7DF1E" />
      <path
        d="M13 16.5c.3.5.7.8 1.4.8.7 0 1.1-.3 1.1-.8 0-.5-.4-.7-1.2-1l-.4-.2c-1.3-.5-2.2-1.2-2.2-2.5 0-1.3 1-2.3 2.6-2.3 1.1 0 2 .4 2.6 1.4l-1.3.8c-.3-.5-.7-.7-1.3-.7-.5 0-.9.3-.9.7 0 .4.3.6 1.1.9l.4.2c1.5.6 2.4 1.2 2.4 2.6 0 1.5-1.2 2.4-2.8 2.4-1.6 0-2.6-.8-3-1.8l1.3-.6zM8 10.5h1.8v6.2c0 .9-.5 1.4-1.4 1.4-.4 0-.8-.1-1.1-.3l.3-1.4c.2.1.4.2.6.2.3 0 .4-.2.4-.6v-5.5z"
        fill="#000"
      />
    </svg>
  ),
  HTML5: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#E34F26">
      <path d="M4 2l1.6 18 6.4 1.8 6.4-1.8L20 2H4zm13.3 5.4H9.1l.2 2.2h7.8l-.6 6.8-4.5 1.2-4.5-1.2-.3-3.6h2.2l.2 1.8 2.4.6 2.4-.6.3-3.2H6.9L6.3 5.2h11.2l-.2 2.2z" />
    </svg>
  ),
  CSS3: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#1572B6">
      <path d="M4 2l1.6 18 6.4 1.8 6.4-1.8L20 2H4zm13.3 5.4H9.1l.2 2.2h7.8l-.6 6.8-4.5 1.2-4.5-1.2-.3-3.6h2.2l.2 1.8 2.4.6 2.4-.6.3-3.2H6.9L6.3 5.2h11.2l-.2 2.2z" />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#06B6D4">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
    </svg>
  ),
  MaterialUI: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#007FFF">
      <path d="M0 2.475v10.39l3 1.733V7.67l6 3.465 6-3.465v6.928L12 16.333l-3-1.733v3.465l3 1.732 9-5.197V4.207L12 9.405 3 4.207V2.475z" />
    </svg>
  ),
  ReactNative: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="3" stroke="#0284c7" strokeWidth="1.8" />
      <circle cx="12" cy="18" r="1" fill="#0284c7" />
      <ellipse cx="12" cy="9.5" rx="4.5" ry="1.8" stroke="#0ea5e9" strokeWidth="1.2" />
      <ellipse cx="12" cy="9.5" rx="4.5" ry="1.8" stroke="#0ea5e9" strokeWidth="1.2" transform="rotate(60 12 9.5)" />
      <ellipse cx="12" cy="9.5" rx="4.5" ry="1.8" stroke="#0ea5e9" strokeWidth="1.2" transform="rotate(120 12 9.5)" />
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#22c55e">
      <path d="M12 2L3 7.2v9.6L12 22l9-5.2V7.2L12 2zm6.7 13.7L12 19.6l-6.7-3.9V8.3L12 4.4l6.7 3.9v7.4z" />
      <path d="M12 6.8L6.8 9.8v4.4l5.2 3 5.2-3V9.8L12 6.8z" opacity="0.35" />
    </svg>
  ),
  Express: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#475569">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-4v-1.5h4v1.5zm1.8-4.2l-2.4 2.4-1.1-1.1 1.3-1.3H7.5V11h5.1l-1.3-1.3 1.1-1.1 2.4 2.4c.3.3.3.8 0 1.2z" />
    </svg>
  ),
  RestAPI: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  JWT: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#c026d3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#16a34a">
      <path d="M12 22s-6.3-4.2-6.3-10.2c0-3.8 2.8-7 6.3-9.8 3.5 2.8 6.3 6 6.3 9.8 0 6-6.3 10.2-6.3 10.2zm-.6-17.5c-2.7 2.4-4.8 5-4.8 7.5 0 4.1 3.8 7.3 5.1 8.3V4.5h-.3z" />
    </svg>
  ),
  SQL: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#0284c7">
      <path d="M12 3C7.58 3 4 4.34 4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6c0-1.66-3.58-3-8-3zm0 2c3.87 0 6 1.05 6 1s-2.13 1-6 1-6-1.05-6-1 2.13-1 6-1zm6 13c0 .05-2.13 1-6 1s-6-.95-6-1v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V18zm0-4c0 .05-2.13 1-6 1s-6-.95-6-1v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V14zm0-4c0 .05-2.13 1-6 1s-6-.95-6-1V7.77c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V10z" />
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#F05032">
      <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0l-2 2 2.6 2.6c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l2.5 2.5c.6-.2 1.3 0 1.8.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.4-2.1L12.7 10v4.4c.2.1.4.3.5.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.4-.4.6-.5V9.9c.2-.1.4-.3.6-.5.6-.6.7-1.4.4-2.1l-2.5-2.5-4.3 4.3c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5 0-2.2z" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#1e293b">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  VSCode: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#0284c7">
      <path d="M17.6 2.1l-8 7.3-4.4-3.4L2 7.7l4.3 4.3L2 16.3l3.2 1.7 4.4-3.4 8 7.3 4.4-2.1V4.2l-4.4-2.1zm0 4.9v10l-6.2-5 6.2-5z" />
    </svg>
  ),
  Postman: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#ea580c">
      <path d="M13.5 2C7.7 2 3 6.7 3 12.5S7.7 23 13.5 23 24 18.3 24 12.5 19.3 2 13.5 2zm5 11.2l-4.8 2.8c-.3.2-.7.2-1 0l-2.4-1.4v2.8c0 .4-.3.7-.7.7s-.7-.3-.7-.7v-4.4c0-.4.3-.7.7-.7.2 0 .4.1.5.2l3.3 1.9 4.1-2.4c.4-.2.9-.1 1.1.3.2.4.1.9-.3 1.1-.1.2-.1.2-.1.2z" />
    </svg>
  ),
  Vite: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <path d="M19.7 3.3L12.5 17 9.8 12.4l7.1-8.3-9.5 2L12 1.8 4.3 3.3 2 15.5l10 7.5 10-7.5L19.7 3.3z" fill="#9333ea" />
      <path d="M12.5 17l7.2-13.7-2.6-.8-7.1 8.3 2.5 6.2z" fill="#eab308" />
    </svg>
  ),
  AndroidStudio: () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#16a34a">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zM15.53 2.16l1.3-1.3c.2-.2.2-.51 0-.71s-.51-.2-.71 0l-1.48 1.48C13.62 1.23 12.83 1 12 1s-1.62.23-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0s-.2.51 0 .71l1.3 1.3C6.73 3.25 5.5 5.2 5.5 7.5h13c0-2.3-1.23-4.25-2.97-5.34zM9 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  ),
};

const allSkills = [
  // Frontend
  {
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'UI Library',
    tag: 'Core Stack',
    icon: TechIcons.React,
    bgGlow: 'hover:border-cyan-300 hover:shadow-cyan-100/50',
    featured: true,
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'ES6+ Language',
    tag: 'Core Stack',
    icon: TechIcons.JavaScript,
    bgGlow: 'hover:border-yellow-300 hover:shadow-yellow-100/50',
    featured: true,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'Utility Styling',
    tag: 'Styling',
    icon: TechIcons.Tailwind,
    bgGlow: 'hover:border-sky-300 hover:shadow-sky-100/50',
    featured: true,
  },
  {
    name: 'HTML5',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'Semantic Markup',
    tag: 'Web Standards',
    icon: TechIcons.HTML5,
    bgGlow: 'hover:border-orange-300 hover:shadow-orange-100/50',
    featured: false,
  },
  {
    name: 'CSS3',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'Responsive Styling',
    tag: 'Layout & FX',
    icon: TechIcons.CSS3,
    bgGlow: 'hover:border-blue-300 hover:shadow-blue-100/50',
    featured: false,
  },
  {
    name: 'Material UI',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'Component Library',
    tag: 'Design System',
    icon: TechIcons.MaterialUI,
    bgGlow: 'hover:border-indigo-300 hover:shadow-indigo-100/50',
    featured: false,
  },

  // Mobile
  {
    name: 'React Native',
    category: 'mobile',
    categoryLabel: 'Mobile',
    role: 'Cross-Platform',
    tag: 'Core Stack',
    icon: TechIcons.ReactNative,
    bgGlow: 'hover:border-blue-400 hover:shadow-blue-100/50',
    featured: true,
  },
  {
    name: 'Android Studio',
    category: 'mobile',
    categoryLabel: 'Mobile',
    role: 'Mobile Tooling',
    tag: 'Emulation & Build',
    icon: TechIcons.AndroidStudio,
    bgGlow: 'hover:border-emerald-300 hover:shadow-emerald-100/50',
    featured: false,
  },

  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Runtime Environment',
    tag: 'Core Stack',
    icon: TechIcons.NodeJS,
    bgGlow: 'hover:border-green-300 hover:shadow-green-100/50',
    featured: true,
  },
  {
    name: 'Express.js',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Web Framework',
    tag: 'Server & Routes',
    icon: TechIcons.Express,
    bgGlow: 'hover:border-slate-300 hover:shadow-slate-100/50',
    featured: true,
  },
  {
    name: 'RESTful APIs',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'API Architecture',
    tag: 'Integration',
    icon: TechIcons.RestAPI,
    bgGlow: 'hover:border-indigo-300 hover:shadow-indigo-100/50',
    featured: true,
  },
  {
    name: 'JWT Auth',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Security & Auth',
    tag: 'Token Security',
    icon: TechIcons.JWT,
    bgGlow: 'hover:border-fuchsia-300 hover:shadow-fuchsia-100/50',
    featured: false,
  },

  // Database
  {
    name: 'MongoDB',
    category: 'database',
    categoryLabel: 'Database',
    role: 'NoSQL Database',
    tag: 'Core Stack',
    icon: TechIcons.MongoDB,
    bgGlow: 'hover:border-green-300 hover:shadow-green-100/50',
    featured: true,
  },
  {
    name: 'SQL / MySQL',
    category: 'database',
    categoryLabel: 'Database',
    role: 'Relational DB',
    tag: 'Queries & Schemas',
    icon: TechIcons.SQL,
    bgGlow: 'hover:border-cyan-300 hover:shadow-cyan-100/50',
    featured: true,
  },

  // Tools
  {
    name: 'Git',
    category: 'tools',
    categoryLabel: 'Tools',
    role: 'Version Control',
    tag: 'VCS',
    icon: TechIcons.Git,
    bgGlow: 'hover:border-orange-300 hover:shadow-orange-100/50',
    featured: true,
  },
  {
    name: 'GitHub',
    category: 'tools',
    categoryLabel: 'Tools',
    role: 'Collaboration',
    tag: 'Cloud Repos',
    icon: TechIcons.GitHub,
    bgGlow: 'hover:border-slate-400 hover:shadow-slate-100/50',
    featured: true,
  },
  {
    name: 'Postman',
    category: 'tools',
    categoryLabel: 'Tools',
    role: 'API Testing',
    tag: 'Dev Testing',
    icon: TechIcons.Postman,
    bgGlow: 'hover:border-orange-300 hover:shadow-orange-100/50',
    featured: false,
  },
  {
    name: 'VS Code',
    category: 'tools',
    categoryLabel: 'Tools',
    role: 'Primary IDE',
    tag: 'Environment',
    icon: TechIcons.VSCode,
    bgGlow: 'hover:border-sky-300 hover:shadow-sky-100/50',
    featured: false,
  },
  {
    name: 'Vite',
    category: 'tools',
    categoryLabel: 'Tools',
    role: 'Fast Bundler',
    tag: 'Build Tool',
    icon: TechIcons.Vite,
    bgGlow: 'hover:border-purple-300 hover:shadow-purple-100/50',
    featured: false,
  },
];

const categories = [
  { id: 'all', label: 'All Technologies', count: allSkills.length },
  { id: 'frontend', label: 'Frontend', count: allSkills.filter((s) => s.category === 'frontend').length },
  { id: 'backend', label: 'Backend & APIs', count: allSkills.filter((s) => s.category === 'backend').length },
  { id: 'mobile', label: 'Mobile App', count: allSkills.filter((s) => s.category === 'mobile').length },
  { id: 'database', label: 'Databases', count: allSkills.filter((s) => s.category === 'database').length },
  { id: 'tools', label: 'Tools & DevOps', count: allSkills.filter((s) => s.category === 'tools').length },
];

const highlights = [
  {
    title: 'Modern Frontend & UI',
    desc: 'Crafting responsive, accessible and interactive user interfaces using React, Tailwind CSS and modern JavaScript.',
    icon: Layers,
    color: 'from-blue-500/10 to-indigo-500/10 text-indigo-600',
  },
  {
    title: 'Full-Stack & REST APIs',
    desc: 'Designing clean server architectures, secure JWT authentication, and structured endpoints with Node.js and Express.',
    icon: Server,
    color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600',
  },
  {
    title: 'Cross-Platform Mobile',
    desc: 'Building intuitive Android and mobile experiences with React Native, reusable components, and shared business logic.',
    icon: Smartphone,
    color: 'from-purple-500/10 to-pink-500/10 text-purple-600',
  },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredSkills =
    activeTab === 'all' ? allSkills : allSkills.filter((skill) => skill.category === activeTab);

  return (
    <section id="skills" className="py-20 lg:py-28 bg-gradient-to-b from-white via-indigo-50/20 to-white section-offset">
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-indigo-600" />
            Technologies & Expertise
          </div>
          <h2 className="heading-lg">My Tech Stack</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
            Technologies, frameworks, and developer tools I leverage to build robust, scalable web and mobile solutions.
          </p>
        </motion.div>

        {/* Featured Core Stack Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-xs font-medium text-indigo-300 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Primary Daily Drivers
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                MERN Stack & React Native Specialist
              </h3>
              <p className="mt-1 text-sm text-gray-300 max-w-xl leading-relaxed">
                Specialized in building full-stack applications with React, React Native, Node.js, Express, and MongoDB / SQL.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {['React.js', 'React Native', 'JavaScript', 'Node.js', 'Tailwind', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-white/20 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((category) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'text-white shadow-md shadow-indigo-200/50'
                    : 'text-gray-600 bg-white border border-gray-100 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-indigo-600 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
                <span
                  className={`relative z-10 text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-indigo-700/80 text-indigo-100' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tech Stack Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group bg-white p-5 rounded-2xl border border-gray-100/90 shadow-sm transition-all duration-300 flex flex-col justify-between ${skill.bgGlow}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-gray-50/90 group-hover:bg-indigo-50/60 transition-colors flex items-center justify-center">
                        <Icon />
                      </div>
                      <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 group-hover:bg-indigo-50/70 group-hover:text-indigo-600 px-2 py-0.5 rounded-full transition-colors border border-gray-100/60">
                        {skill.categoryLabel}
                      </span>
                    </div>

                    <h4 className="font-semibold text-gray-900 text-base tracking-tight group-hover:text-indigo-600 transition-colors">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">{skill.role}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50/80 px-2 py-0.5 rounded-md">
                      {skill.tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Capability Cards / Highlights */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-soft p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <Icon size={22} />
                </div>
                <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
