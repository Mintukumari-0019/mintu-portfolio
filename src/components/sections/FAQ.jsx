// src/components/sections/FAQ.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What technologies do you work with?',
    answer:
      'I primarily work with React, JavaScript, Tailwind CSS, and modern frontend tools. I also have experience with React Native, Node.js, SQL, and MongoDB.',
  },
  {
    question: 'Are you available for new opportunities?',
    answer:
      'Yes, I am currently open to new opportunities, including full-time roles, freelance projects, and collaborations.',
  },
  {
    question: 'Can I see your projects?',
    answer:
      'Absolutely! You can explore my featured projects in the Projects section above. I also have more work available on my GitHub profile.',
  },
  {
    question: 'Are you open to freelance or collaboration opportunities?',
    answer:
      'Yes, I am always open to interesting freelance projects, collaborations, and partnerships. Feel free to reach out via the contact form.',
  },
  {
    question: 'Where can I find your resume?',
    answer:
      'You can download my resume from the About section. If you need any additional information, feel free to contact me directly.',
  },
];

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-gray-100/80 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left transition-colors hover:text-indigo-600 group"
      >
        <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-indigo-500' : ''
          }`}
        />
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
            <p className="pb-4 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
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
          className="mb-12 text-center"
        >
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            FAQ
          </span>
          <h2 className="heading-lg">Frequently Asked Questions</h2>
        </motion.div>

        <div className="card-soft p-6 sm:p-8 divide-y divide-gray-100/80">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;