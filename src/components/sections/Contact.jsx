// src/components/sections/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, Send, Sparkles } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mkmintukumari.0987@gmail.com',
    href: 'mailto:mkmintukumari.0987@gmail.com',
    theme: {
      cardBg: 'bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/20',
      border: 'border-indigo-100 hover:border-indigo-400',
      iconBg: 'bg-indigo-100 text-indigo-700',
    },
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Mintukumari-0019',
    href: 'https://github.com/Mintukumari-0019',
    theme: {
      cardBg: 'bg-gradient-to-br from-slate-50/70 via-white to-indigo-50/20',
      border: 'border-slate-200 hover:border-slate-400',
      iconBg: 'bg-slate-100 text-slate-800',
    },
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'mintu-kumari-78a04a267',
    href: 'https://www.linkedin.com/in/mintu-kumari-78a04a267?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    theme: {
      cardBg: 'bg-gradient-to-br from-blue-50/70 via-white to-blue-50/20',
      border: 'border-blue-100 hover:border-blue-400',
      iconBg: 'bg-blue-100 text-blue-700',
    },
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '9341084631',
    href: 'https://wa.me/9341084631',
    theme: {
      cardBg: 'bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/20',
      border: 'border-emerald-100 hover:border-emerald-400',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white section-offset">
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
            Get In Touch
          </div>
          <h2 className="heading-lg">Let's Connect</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto text-base">
            Have an exciting opportunity, project idea, or simply want to talk tech? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5 items-start">
          {/* Contact methods */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const { theme } = method;
              return (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${theme.border} ${theme.cardBg} transition-all duration-300 shadow-xs hover:shadow-lg group`}
                >
                  <div className={`p-3 rounded-xl ${theme.iconBg} group-hover:scale-105 transition-transform flex-shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {method.label}
                    </p>
                    <p className="text-sm font-bold text-gray-800 mt-0.5 group-hover:text-indigo-600 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="rounded-3xl border border-indigo-100/90 bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/15 p-6 sm:p-9 shadow-xl shadow-indigo-100/30 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1.5">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-indigo-100 bg-white/90 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 shadow-xs transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-indigo-100 bg-white/90 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 shadow-xs transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-xl border border-indigo-100 bg-white/90 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 shadow-xs transition-all duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-300/50 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : submitted ? (
                  <span className="flex items-center gap-2 text-emerald-100 font-bold">
                    ✓ Message Sent Successfully!
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
