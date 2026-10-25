// src/components/sections/Values.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, BookOpen, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing readable and maintainable code.',
  },
  {
    icon: Smartphone,
    title: 'Responsive First',
    description: 'Building experiences that work across devices.',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: 'Always exploring better tools and techniques.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description: 'Turning complex requirements into simple solutions.',
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
          className="mb-12 text-center"
        >
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Values
          </span>
          <h2 className="heading-lg">How I Work</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="card-soft p-6 text-center transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/20"
              >
                <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
                  <Icon size={24} />
                </div>
                <h4 className="text-base font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Values;