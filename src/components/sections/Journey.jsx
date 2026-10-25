// src/components/sections/Journey.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Milestone } from 'lucide-react';

const journeySteps = [
  {
    year: '2022',
    title: 'Foundational Computer Science & Programming',
    description: 'Began journey into computer science, mastering core algorithms, data structures, and programming fundamentals.',
    theme: {
      gradient: 'from-blue-600 to-cyan-600',
      cardBg: 'bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/20',
      border: 'border-blue-100 hover:border-blue-400',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      dotColor: 'bg-blue-500 ring-blue-200',
    },
  },
  {
    year: '2024',
    title: 'Frontend Development & Real-World Projects',
    description: 'Specialized in modern JavaScript and React. Built responsive interactive web applications and personal projects.',
    theme: {
      gradient: 'from-indigo-600 to-blue-600',
      cardBg: 'bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/20',
      border: 'border-indigo-100 hover:border-indigo-400',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      dotColor: 'bg-indigo-500 ring-indigo-200',
    },
  },
  {
    year: '2025',
    title: 'Full-Stack Architecture & Mobile Systems',
    description: 'Expanded into React Native, Node.js, Express, MongoDB, containerization concepts, and scalable application architecture.',
    theme: {
      gradient: 'from-purple-600 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/20',
      border: 'border-purple-100 hover:border-purple-400',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
      dotColor: 'bg-purple-500 ring-purple-200',
    },
  },
  {
    year: '2026',
    title: 'Professional Software Developer',
    description: 'Contributing professionally as a Junior Software Developer at TechnoVani Private Limited, delivering production-grade applications.',
    theme: {
      gradient: 'from-emerald-600 to-teal-600',
      cardBg: 'bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/25',
      border: 'border-emerald-200 hover:border-emerald-400',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-500 ring-emerald-200',
    },
  },
];

const Journey = () => {
  return (
    <section id="journey" className="py-20 lg:py-28 bg-white section-offset">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">
            <Milestone size={14} className="text-indigo-600" />
            Progression
          </div>
          <h2 className="heading-lg">My Development Journey</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
            How I grew from learning fundamentals to engineering production applications.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 sm:pl-10 border-l-2 border-indigo-200/80 space-y-8">
            {journeySteps.map((step, index) => {
              const { theme } = step;
              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Colored Timeline Dot */}
                  <div
                    className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ${theme.dotColor} ring-4 border-2 border-white shadow-sm`}
                  />

                  <div className={`p-6 sm:p-7 rounded-2xl border ${theme.border} ${theme.cardBg} shadow-sm hover:shadow-xl transition-all duration-300 group`}>
                    <div className="flex flex-wrap items-center gap-3 mb-2.5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${theme.badgeBg}`}>
                        {step.year}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pl-1">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
