// src/components/sections/ProfessionalSnapshot.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Code, FolderGit2, Sparkles, Award } from 'lucide-react';

const stats = [
  {
    label: 'Years of Dev Experience',
    value: 1,
    suffix: '+',
    icon: Briefcase,
    theme: {
      gradient: 'from-indigo-600 to-blue-600',
      cardBg: 'bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/20',
      border: 'border-indigo-100 hover:border-indigo-400',
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
  },
  {
    label: 'Modern Technologies',
    value: 10,
    suffix: '+',
    icon: Code,
    theme: {
      gradient: 'from-purple-600 to-pink-600',
      cardBg: 'bg-gradient-to-br from-purple-50/60 via-white to-pink-50/20',
      border: 'border-purple-100 hover:border-purple-400',
      iconBg: 'bg-purple-50 text-purple-600',
    },
  },
  {
    label: 'Shipped Projects',
    value: 5,
    suffix: '+',
    icon: FolderGit2,
    theme: {
      gradient: 'from-cyan-600 to-teal-600',
      cardBg: 'bg-gradient-to-br from-cyan-50/60 via-white to-teal-50/20',
      border: 'border-cyan-100 hover:border-cyan-400',
      iconBg: 'bg-cyan-50 text-cyan-600',
    },
  },
  {
    label: 'Current Tech Role',
    value: 1,
    suffix: '',
    subtext: 'Software Developer',
    icon: Award,
    theme: {
      gradient: 'from-emerald-600 to-teal-600',
      cardBg: 'bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/20',
      border: 'border-emerald-100 hover:border-emerald-400',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
  },
];

const Counter = ({ target, suffix, theme, subtext }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className={`text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
        {count}
        {suffix}
      </div>
      {subtext && (
        <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          {subtext}
        </span>
      )}
    </div>
  );
};

const ProfessionalSnapshot = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-14 bg-gradient-to-b from-white via-indigo-50/20 to-white border-y border-indigo-100/60">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const { theme } = stat;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border ${theme.border} ${theme.cardBg} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between text-center`}
              >
                <div className={`p-3 rounded-xl ${theme.iconBg} mb-3`}>
                  <Icon size={20} />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} theme={theme} subtext={stat.subtext} />
                <div className="mt-2 text-xs sm:text-sm font-medium text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSnapshot;
