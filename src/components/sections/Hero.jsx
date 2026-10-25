// src/components/sections/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Globe, Database, Layout, Smartphone, Terminal, Github } from 'lucide-react';

const floatingIcons = [
  { Icon: Code2, label: 'React', color: 'text-cyan-400', delay: 0 },
  { Icon: Globe, label: 'JavaScript', color: 'text-yellow-400', delay: 0.5 },
  { Icon: Layout, label: 'Tailwind', color: 'text-sky-400', delay: 1 },
  { Icon: Database, label: 'Node.js', color: 'text-green-400', delay: 1.5 },
  { Icon: Smartphone, label: 'React Native', color: 'text-blue-400', delay: 2 },
  { Icon: Terminal, label: 'SQL', color: 'text-purple-400', delay: 2.5 },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white"
    >
      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 border border-indigo-100/60 text-sm font-medium text-indigo-700"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-xl text-balance"
            >
              Hi, I'm <span className="text-indigo-600">Mintu Kumari.</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-700"
            >
              Software Developer building modern and user-friendly digital experiences.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-gray-500 max-w-lg leading-relaxed"
            >
              I enjoy transforming ideas into responsive web and mobile applications using modern technologies.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a href="#projects" className="btn-primary">
                View My Projects
                <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>
              <a
                href="https://github.com/Mintukumari-0019"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
                GitHub
              </a>
            </motion.div>
          </div>

          {/* Right - Floating Icons Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Center device mock */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-48 h-32 sm:w-56 sm:h-38 bg-gray-900 rounded-xl shadow-2xl border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10" />
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <div className="bg-gray-800/80 rounded-lg px-4 py-2 border border-gray-700/50">
                      <span className="text-xs font-mono text-emerald-400">{'<'}Code /&gt;</span>
                    </div>
                    <div className="mt-2 flex justify-center gap-1">
                      <span className="w-6 h-1 rounded-full bg-indigo-400/60" />
                      <span className="w-6 h-1 rounded-full bg-indigo-400/30" />
                      <span className="w-6 h-1 rounded-full bg-indigo-400/10" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating icons */}
              {floatingIcons.map(({ Icon, label, color, delay }, index) => {
                const angle = (index / floatingIcons.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 130;
                const x = Math.cos(angle) * radius + 50;
                const y = Math.sin(angle) * radius + 50;

                return (
                  <motion.div
                    key={label}
                    className={`absolute ${color}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + delay * 0.15,
                      type: 'spring',
                      stiffness: 200,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4 + index * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      }}
                      className="p-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100/60"
                    >
                      <Icon size={28} className={color} strokeWidth={1.8} />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Connecting lines (decorative) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" className="text-indigo-300" />
                <circle cx="100" cy="100" r="120" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-400/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-400/40 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Hero;
