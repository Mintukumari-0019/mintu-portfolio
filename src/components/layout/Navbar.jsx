// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Github, ExternalLink, FileText, Download } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const GITHUB_URL = 'https://github.com/Mintukumari-0019';
const RESUME_URL = '/Mintu_Kumari_Resume.pdf';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight text-gray-900">
                MINTU
              </span>
              <span className="hidden sm:inline text-sm font-medium text-gray-500 border-l border-gray-300 pl-3">
                Software Developer
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/60"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="Mintu_Kumari_Resume.pdf"
                className="px-3.5 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/60 inline-flex items-center gap-1.5"
                aria-label="Resume"
              >
                <FileText size={16} />
                <span>Resume</span>
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/60 inline-flex items-center gap-1.5"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="#contact"
                className="ml-4 px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200/50"
              >
                Let's Connect
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-40 w-[280px] bg-white shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="text-lg font-bold text-gray-900">MINTU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 rounded-xl transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 group"
                  >
                    {link.label}
                    <ChevronRight size={18} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
                  </a>
                ))}
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Mintu_Kumari_Resume.pdf"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 rounded-xl transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 group"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText size={18} />
                    Resume
                  </span>
                  <Download size={16} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 rounded-xl transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 group"
                >
                  <span className="flex items-center gap-2.5">
                    <Github size={18} />
                    GitHub
                  </span>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </a>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <a
                    href="#contact"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl transition-all duration-300 hover:bg-indigo-700"
                  >
                    Let's Connect
                  </a>
                </div>
              </nav>

              <div className="p-6 border-t border-gray-100">
                <p className="text-xs text-gray-400">© 2026 Mintu Kumari</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
