// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronRight,
  Github,
  FileText,
  Download,
  Sparkles,
  Send,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Wrench,
  Mail,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home', id: 'home', icon: Home },
  { label: 'About', href: '#about', id: 'about', icon: User },
  { label: 'Experience', href: '#experience', id: 'experience', icon: Briefcase },
  { label: 'Projects', href: '#projects', id: 'projects', icon: FolderGit2 },
  { label: 'Skills', href: '#skills', id: 'skills', icon: Wrench },
  { label: 'Contact', href: '#contact', id: 'contact', icon: Mail },
];

const GITHUB_URL = 'https://github.com/Mintukumari-0019';
const RESUME_URL = '/Mintu_Kumari_Resume.pdf';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container-custom">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`transition-all duration-300 rounded-2xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 ${
              isScrolled
                ? 'bg-white/85 backdrop-blur-xl border border-indigo-100/90 shadow-lg shadow-indigo-100/30'
                : 'bg-white/60 backdrop-blur-md border border-white/60 shadow-xs'
            }`}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white font-black flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 group-hover:shadow-indigo-300 transition-all duration-300">
                <span className="text-base tracking-wider">MK</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Mintu Kumari
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Software Developer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-gray-50/80 p-1.5 rounded-xl border border-gray-100/80">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-white rounded-lg shadow-xs border border-indigo-100/80"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="Mintu_Kumari_Resume.pdf"
                className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-200/80 hover:border-indigo-200 rounded-xl transition-all duration-200 inline-flex items-center gap-1.5 shadow-xs"
                aria-label="Download Resume"
              >
                <Download size={14} className="text-indigo-600" />
                <span>Resume</span>
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-gray-700 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-200/80 hover:border-indigo-200 rounded-xl transition-all duration-200 inline-flex items-center shadow-xs"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
              </a>

              <a
                href="#contact"
                className="ml-1 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-1.5"
              >
                <span>Connect</span>
                <Send size={12} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 border border-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
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
            className="fixed inset-0 z-50 bg-gray-950/40 backdrop-blur-sm lg:hidden"
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
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[300px] sm:w-[340px] bg-white shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-indigo-50 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black flex items-center justify-center shadow-md shadow-indigo-200">
                    <span className="text-sm">MK</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Mintu Kumari</h3>
                    <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available to Hire
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-5 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
                  Navigation
                </p>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-200 ${
                          isActive
                            ? 'text-indigo-600 translate-x-0.5'
                            : 'text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-0.5'
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="Mintu_Kumari_Resume.pdf"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-gray-800 bg-white border border-gray-200 shadow-xs hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                <Download size={14} className="text-indigo-600" />
                Download Resume
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-gray-800 bg-white border border-gray-200 shadow-xs hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                <Github size={14} />
                Visit GitHub
              </a>

              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all"
              >
                <span>Let's Connect</span>
                <Send size={13} />
              </a>

              <p className="text-center text-[11px] text-gray-400 pt-2">
                © 2026 Mintu Kumari • All rights reserved
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
