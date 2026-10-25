// src/components/sections/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, CheckCircle2 } from 'lucide-react';

const responsibilities = [
  'Developing responsive React applications',
  'Building reusable UI components',
  'Creating responsive layouts',
  'Integrating APIs',
  'Working with Git/GitHub',
  'Collaborating with team members',
  'Debugging and improving applications',
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
          className="mb-12 text-center"
        >
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Experience
          </span>
          <h2 className="heading-lg">Current Experience</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative pl-8 border-l-2 border-indigo-200/60"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100" />

            <div className="card-elevated p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">TechnoVani Private Limited</h3>
                  <p className="text-base font-medium text-indigo-600">Junior Software Developer</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-sm font-medium text-indigo-700 border border-indigo-100/60">
                  <Calendar size={14} />
                  2026 — Present
                </div>
              </div>

              <ul className="space-y-2.5">
                {responsibilities.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
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