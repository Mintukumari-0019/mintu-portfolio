// src/components/sections/Interests.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, BookOpen, BarChart3, Sparkles, Palette } from 'lucide-react';

const interests = [
  {
    icon: Layout,
    title: 'Interactive Web Applications',
    description: 'Building engaging, stateful dynamic web applications that delight users.',
    theme: {
      gradient: 'from-indigo-500 to-blue-600',
      cardBg: 'bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/30',
      border: 'border-indigo-100 hover:border-indigo-400',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-200',
    },
  },
  {
    icon: Smartphone,
    title: 'Responsive User Interfaces',
    description: 'Crafting pixel-perfect layouts that adapt seamlessly from mobile to wide monitors.',
    theme: {
      gradient: 'from-cyan-500 to-blue-600',
      cardBg: 'bg-gradient-to-br from-cyan-50/50 via-white to-sky-50/30',
      border: 'border-cyan-100 hover:border-cyan-400',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-200',
    },
  },
  {
    icon: BookOpen,
    title: 'Educational Platforms',
    description: 'Creating accessible, gamified tools that make learning intuitive and inspiring.',
    theme: {
      gradient: 'from-purple-500 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/30',
      border: 'border-purple-100 hover:border-purple-400',
      iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-200',
    },
  },
  {
    icon: BarChart3,
    title: 'Dashboard Experiences',
    description: 'Architecting clear, data-driven analytics suites with charts and real-time updates.',
    theme: {
      gradient: 'from-emerald-500 to-teal-600',
      cardBg: 'bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30',
      border: 'border-emerald-100 hover:border-emerald-400',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-200',
    },
  },
  {
    icon: Sparkles,
    title: 'Creative Digital Products',
    description: 'Merging creative interactive design with engineering to produce unique web solutions.',
    theme: {
      gradient: 'from-amber-500 to-rose-500',
      cardBg: 'bg-gradient-to-br from-amber-50/50 via-white to-rose-50/30',
      border: 'border-amber-100 hover:border-amber-400',
      iconBg: 'bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-md shadow-amber-200',
    },
  },
  {
    icon: Palette,
    title: 'Design-Driven Development',
    description: 'Bringing Figma concepts to life with exact typography, color harmony, and motion.',
    theme: {
      gradient: 'from-pink-500 to-rose-600',
      cardBg: 'bg-gradient-to-br from-pink-50/50 via-white to-rose-50/30',
      border: 'border-pink-100 hover:border-pink-400',
      iconBg: 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md shadow-pink-200',
    },
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
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-indigo-600" />
            Special Focus Areas
          </div>
          <h2 className="heading-lg">What I Love Building</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
            Domains and interactive paradigms where I invest my engineering energy.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((item, index) => {
            const Icon = item.icon;
            const { theme } = item;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl border ${theme.border} ${theme.cardBg} p-6 sm:p-7 text-center transition-all duration-300 shadow-sm hover:shadow-xl`}
              >
                <div className={`inline-flex p-4 rounded-2xl ${theme.iconBg} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={24} />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Interests;
