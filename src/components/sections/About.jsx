// src/components/sections/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Code2, GraduationCap, Download, FileText } from 'lucide-react';

const infoCards = [
  { icon: MapPin, label: 'Location', value: 'Bhopal, Madhya Pradesh' },
  { icon: Briefcase, label: 'Role', value: 'Software Developer' },
  { icon: Code2, label: 'Specialization', value: 'React & Frontend' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech in CSE (CGPA 7.93)' },
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
          className="mb-12 text-center"
        >
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            About Me
          </span>
          <h2 className="heading-lg">More About Me</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-100/50 to-purple-100/50 border border-gray-100/60 shadow-xl shadow-indigo-100/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-indigo-200/50 flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-5xl font-bold text-indigo-600">M</span>
                  </div>
                  <div className="mt-6 space-y-1">
                    <p className="text-lg font-semibold text-gray-800">Mintu Kumari</p>
                    <p className="text-sm text-gray-500">Software Developer</p>
                  </div>
                  <div className="mt-4 flex justify-center gap-3">
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">React</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">Tailwind</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">JS</span>
                  </div>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-indigo-200/30 blur-sm" />
              <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-purple-200/30 blur-sm" />
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
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm a Software Developer passionate about creating responsive, scalable and visually engaging applications. I enjoy working with React, JavaScript and modern frontend technologies while continuously learning and improving my development skills.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {infoCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="p-4 rounded-xl bg-gray-50/80 border border-gray-100/60 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50/30"
                  >
                    <div className="flex items-start gap-3">
                      <Icon size={18} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {card.label}
                        </p>
                        <p className="text-sm font-medium text-gray-800">{card.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/Mintu_Kumari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Mintu_Kumari_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200/50"
              >
                <Download size={18} />
                Download Resume
              </a>
              <a
                href="/Mintu_Kumari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-800 font-medium transition-all duration-300 hover:bg-gray-200 hover:shadow-md"
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
