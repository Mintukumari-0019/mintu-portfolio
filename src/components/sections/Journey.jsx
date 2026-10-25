// src/components/sections/Journey.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const journeySteps = [
  {
    year: '2022',
    title: 'Started learning programming and computer science.',
    description: 'Began my journey into the world of code with foundational concepts.',
  },
  {
    year: '2024',
    title: 'Worked on frontend development and personal projects.',
    description: 'Built real-world projects, honing React and UI development skills.',
  },
  {
    year: '2025',
    title: 'Expanded knowledge of React, modern UI development and application architecture.',
    description: 'Deepened expertise in component-based architecture and state management.',
  },
  {
    year: '2026',
    title: 'Working professionally as a Junior Software Developer.',
    description: 'Contributing to production applications at TechnoVani Private Limited.',
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
          className="mb-12 text-center"
        >
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Journey
          </span>
          <h2 className="heading-lg">My Development Journey</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 border-l-2 border-indigo-200/60 space-y-10">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                    index === journeySteps.length - 1 ? 'bg-indigo-600' : 'bg-indigo-300'
                  }`}
                />
                <div className="card-soft p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-indigo-600">{step.year}</span>
                    <span className="w-px h-4 bg-gray-200" />
                    <span className="text-sm font-medium text-gray-700">{step.title}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;