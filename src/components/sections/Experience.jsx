// src/components/sections/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, CheckCircle2, Sparkles, Briefcase } from 'lucide-react';

const responsibilities = [
  'Developing responsive, modern React applications with component-driven architecture.',
  'Building reusable, accessible UI component libraries and modular systems.',
  'Creating pixel-perfect responsive layouts optimized for mobile and desktop screens.',
  'Integrating RESTful APIs, handling asynchronous state and data flow seamlessly.',
  'Managing version control and team code collaboration via Git and GitHub workflows.',
  'Collaborating closely with cross-functional team members to deliver sprint goals.',
  'Debugging, performance profiling, and optimizing application load times.',
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 bg-gray-50/60 section-offset">
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
            Career Milestones
          </div>
          <h2 className="heading-lg">Current Experience</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
            Professional roles where I apply modern software engineering principles in production.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative pl-8 sm:pl-10 border-l-2 border-indigo-300/80"
          >
            {/* Timeline pulsing dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-200 animate-pulse" />

            <div className="relative rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 p-6 sm:p-9 shadow-xl shadow-indigo-100/40 overflow-hidden">
              {/* Top gradient stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600" />

              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">TechnoVani Private Limited</h3>
                    <p className="text-base font-semibold text-indigo-600">Junior Software Developer</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-sm font-semibold text-indigo-800 border border-indigo-200 shadow-xs">
                  <Calendar size={14} />
                  2026 — Present
                </div>
              </div>

              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-indigo-900/60">
                Key Contributions & Responsibilities
              </div>

              <ul className="space-y-3">
                {responsibilities.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3 text-sm text-gray-700 p-2 rounded-xl transition-colors hover:bg-white/80"
                  >
                    <CheckCircle2 size={18} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
