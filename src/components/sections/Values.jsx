// src/components/sections/Values.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, BookOpen, Lightbulb, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing readable, well-structured, and easily maintainable code following modern best practices.',
    theme: {
      gradient: 'from-indigo-500 to-blue-600',
      cardBg: 'bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/20',
      border: 'border-indigo-100 hover:border-indigo-400',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-200',
      badgeBg: 'bg-indigo-50 text-indigo-700',
    },
  },
  {
    icon: Smartphone,
    title: 'Responsive First',
    description: 'Engineering fluid, intuitive user experiences that perform flawlessly on every screen size.',
    theme: {
      gradient: 'from-purple-500 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/20',
      border: 'border-purple-100 hover:border-purple-400',
      iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-200',
      badgeBg: 'bg-purple-50 text-purple-700',
    },
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: 'Constantly exploring cutting-edge libraries, architecture patterns, and backend ecosystems.',
    theme: {
      gradient: 'from-amber-500 to-orange-600',
      cardBg: 'bg-gradient-to-br from-amber-50/50 via-white to-orange-50/20',
      border: 'border-amber-100 hover:border-amber-400',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-200',
      badgeBg: 'bg-amber-50 text-amber-700',
    },
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description: 'Breaking down complex engineering requirements into elegant, high-impact technical solutions.',
    theme: {
      gradient: 'from-emerald-500 to-teal-600',
      cardBg: 'bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/20',
      border: 'border-emerald-100 hover:border-emerald-400',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-200',
      badgeBg: 'bg-emerald-50 text-emerald-700',
    },
  },
];

const Values = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
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
            Core Philosophy
          </div>
          <h2 className="heading-lg">How I Work</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
            Guiding engineering principles that define my day-to-day development workflow.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => {
            const Icon = item.icon;
            const { theme } = item;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl border ${theme.border} ${theme.cardBg} p-7 text-center transition-all duration-300 shadow-sm hover:shadow-xl`}
              >
                {/* Top color bar */}
                <div className={`h-1 w-12 mx-auto rounded-full bg-gradient-to-r ${theme.gradient} mb-6`} />

                <div className={`inline-flex p-4 rounded-2xl ${theme.iconBg} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={26} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Values;
