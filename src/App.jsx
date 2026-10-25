// src/App.jsx
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import ProfessionalSnapshot from './components/sections/ProfessionalSnapshot';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import GitHubSection from './components/sections/GitHubSection';
import Skills from './components/sections/Skills';
import Journey from './components/sections/Journey';
import Interests from './components/sections/Interests';
import Values from './components/sections/Values';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';
import FinalCTA from './components/sections/FinalCTA';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <main>
        <Hero />
        <ProfessionalSnapshot />
        <About />
        <Experience />
        <Projects />
        <GitHubSection />
        <Skills />
        <Journey />
        <Interests />
        <Values />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
