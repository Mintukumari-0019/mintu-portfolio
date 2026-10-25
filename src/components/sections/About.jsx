// src/components/sections/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Code2, GraduationCap, Download, FileText, Sparkles } from 'lucide-react';

const infoCards = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bhopal, Madhya Pradesh',
    theme: {
      gradient: 'from-blue-500 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/30',
      border: 'border-blue-100 hover:border-blue-400',
      iconBg: 'bg-blue-100 text-blue-700',
    },
  },
  {
    icon: Briefcase,
    label: 'Current Role',
    value: 'Software Developer',
    theme: {
      gradient: 'from-purple-500 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/30',
      border: 'border-purple-100 hover:border-purple-400',
      iconBg: 'bg-purple-100 text-purple-700',
    },
  },
  {
    icon: Code2,
    label: 'Specialization',
    value: 'React & Frontend',
    theme: {
      gradient: 'from-cyan-500 to-teal-600',
      cardBg: 'bg-gradient-to-br from-cyan-50/70 via-white to-teal-50/30',
      border: 'border-cyan-100 hover:border-cyan-400',
      iconBg: 'bg-cyan-100 text-cyan-700',
    },
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.Tech in CSE (CGPA 7.93)',
    theme: {
      gradient: 'from-emerald-500 to-teal-600',
      cardBg: 'bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30',
      border: 'border-emerald-100 hover:border-emerald-400',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white section-offset">
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
            Background
          </div>
          <h2 className="heading-lg">More About Me</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
            Passionate about modern software design, scalable frontend systems, and continuous growth.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left - Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 border border-indigo-500/20 shadow-2xl p-8 flex items-center justify-center text-white">
              {/* Background ambient light */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl" />

              <div className="relative z-10 text-center">
                <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-2xl shadow-indigo-500/40">
                  <div className="w-full h-full rounded-full bg-gray-900/90 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-6xl font-black bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent">
                      M
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-1">
                  <p className="text-2xl font-bold text-white tracking-tight">Mintu Kumari</p>
                  <p className="text-sm font-medium text-indigo-300">Junior Software Developer</p>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {['React.js', 'React Native', 'JavaScript', 'Tailwind', 'Docker'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md text-white rounded-full border border-white/15 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 leading-relaxed font-normal">
              I'm a Software Developer passionate about creating responsive, high-performance, and visually engaging digital products. I specialize in the modern React ecosystem, component architecture, and clean code principles, backed by a strong problem-solving foundation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoCards.map((card, index) => {
                const Icon = card.icon;
                const { theme } = card;
                return (
                  <div
                    key={card.label}
                    className={`p-4 sm:p-5 rounded-2xl border ${theme.border} ${theme.cardBg} transition-all duration-300 hover:shadow-lg flex items-start gap-3.5`}
                  >
                    <div className={`p-2.5 rounded-xl ${theme.iconBg} flex-shrink-0 mt-0.5`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {card.label}
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">{card.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 pt-3">
              <a
                href="/Mintu_Kumari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Mintu_Kumari_Resume.pdf"
                className="btn-primary shadow-md shadow-indigo-200"
              >
                <Download size={18} />
                Download Resume
              </a>
              <a
                href="/Mintu_Kumari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FileText size={18} />
                View Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
