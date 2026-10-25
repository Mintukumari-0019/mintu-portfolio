// src/components/sections/FAQ.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    question: 'What technologies and frameworks do you work with?',
    answer:
      'I specialize in React, JavaScript (ES6+), React Native, and Tailwind CSS on the frontend. On the backend and tooling side, I work with Node.js, Express, REST APIs, MongoDB, SQL, and Docker containerization.',
  },
  {
    question: 'Are you available for full-time or contract roles?',
    answer:
      'Yes! I am actively open to discussing full-time software developer opportunities, contract positions, and impactful frontend/full-stack projects.',
  },
  {
    question: 'Where can I see live demos of your work and projects?',
    answer:
      'You can explore my featured projects right in the Projects section above. Every project has GitHub source links and live demos when available, as well as on my GitHub profile.',
  },
  {
    question: 'Can you build both mobile and web applications?',
    answer:
      'Yes, I build responsive, cross-browser web applications with React & Vite, as well as cross-platform mobile apps with React Native.',
  },
  {
    question: 'Where can I download your resume?',
    answer:
      'You can easily view or download my latest resume directly from the About section using the "Download Resume" button, or contact me directly via email.',
  },
];

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-indigo-300 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 shadow-lg shadow-indigo-100/30'
          : 'border-indigo-100/80 bg-white/90 hover:border-indigo-200 hover:shadow-md'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-5 sm:p-6 text-left transition-colors cursor-pointer group"
      >
        <span className={`text-base font-bold transition-colors ${isOpen ? 'text-indigo-600' : 'text-gray-900 group-hover:text-indigo-600'}`}>
          {faq.question}
        </span>
        <div className={`p-2 rounded-xl transition-all duration-300 flex-shrink-0 ml-4 ${
          isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
        }`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-indigo-100/60 pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50/60">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-indigo-600" />
            Common Questions
          </div>
          <h2 className="heading-lg">Frequently Asked Questions</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto text-base">
            Quick answers about my skills, background, tech stack, and availability.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
