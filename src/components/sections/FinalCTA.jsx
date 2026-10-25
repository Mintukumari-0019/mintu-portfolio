// src/components/sections/FinalCTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-20 lg:py-28 bg-indigo-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium backdrop-blur-sm border border-white/10 mb-6">
            <Sparkles size={14} className="text-yellow-300" />
            Ready to build
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Let's Build Something <span className="text-yellow-200">Great.</span>
          </h2>
          <p className="mt-4 text-lg text-indigo-100/80 max-w-lg mx-auto leading-relaxed">
            I'm always interested in learning, building and connecting with people working on exciting ideas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-indigo-700 font-medium transition-all duration-300 hover:bg-indigo-50 hover:shadow-xl hover:shadow-black/10 active:scale-[0.98]"
            >
              View Projects
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-500/30 backdrop-blur-sm text-white font-medium border border-white/20 transition-all duration-300 hover:bg-indigo-500/40 hover:border-white/30 active:scale-[0.98]"
            >
              Let's Connect
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;