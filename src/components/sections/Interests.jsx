// src/components/sections/Interests.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, BookOpen, BarChart3, Sparkles, Palette } from 'lucide-react';

const interests = [
  {
    icon: Layout,
    title: 'Interactive Web Applications',
    description: 'Building engaging, dynamic web experiences.',
  },
  {
    icon: Smartphone,
    title: 'Responsive User Interfaces',
    description: 'Crafting interfaces that work seamlessly across devices.',
  },
  {
    icon: BookOpen,
    title: 'Educational Platforms',
    description: 'Creating tools that make learning accessible and fun.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Experiences',
    description: 'Designing clear, data-driven dashboard interfaces.',
  },
  {
    icon: Sparkles,
    title: 'Creative Digital Products',
    description: 'Merging creativity with technology to build digital solutions.',
  },
  {
    icon: Palette,
    title: 'Design-Driven Development',
    description: 'Bringing design vision to life with clean code.',
  },
];

const Interests = () => {
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
            Interests
          </span>
          <h2 className="heading-lg">What I Love Building</h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="card-soft p-5 sm:p-6 text-center transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/20 group"
              >
                <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600 mb-4 transition-all duration-300 group-hover:bg-indigo-100 group-hover:scale-105">
                  <Icon size={24} />
                </div>
                <h4 className="text-base font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Interests;