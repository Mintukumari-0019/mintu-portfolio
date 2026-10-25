// src/components/layout/Footer.jsx
import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Mintukumari-0019', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mintu-kumari-78a04a267?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:mkmintukumari.0987@gmail.com', label: 'Email' },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800/60">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold tracking-tight text-white">
                MINTU
              </span>
              <span className="text-sm text-gray-500 border-l border-gray-700 pl-3">
                Software Developer
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Building modern, responsive, and user-friendly digital experiences with React and modern web technologies.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/60 text-gray-400 transition-all duration-300 hover:bg-indigo-600/20 hover:text-indigo-400"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Back to top */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Have a project in mind? Let's build something great together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Get in touch →
            </a>
            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white group"
            >
              <span className="p-1.5 rounded-lg bg-gray-800/60 group-hover:bg-gray-700 transition-colors">
                <ArrowUp size={14} />
              </span>
              Back to top
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-800/60 sm:flex-row">
          <p className="text-xs text-gray-500">
            © 2026 Mintu Kumari. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#home" className="hover:text-gray-300 transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
