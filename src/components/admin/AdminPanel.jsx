// src/components/admin/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Mail,
  FolderGit2,
  Database,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowLeft,
  RefreshCw,
  Plus,
  ExternalLink,
  Github,
  AlertCircle,
  X,
  Send,
  Eye,
  Shield,
  Layers,
} from 'lucide-react';

const ADMIN_PASSCODE = 'admin123'; // Default passcode

const COLOR_THEMES = [
  {
    name: 'Indigo & Purple',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    cardBg: 'bg-gradient-to-br from-white via-indigo-50/25 to-purple-50/20',
    border: 'border-indigo-100',
    iconBg: 'bg-indigo-500/10 text-indigo-600',
  },
  {
    name: 'Cyan & Blue',
    gradient: 'from-cyan-600 via-teal-600 to-blue-600',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    cardBg: 'bg-gradient-to-br from-white via-cyan-50/25 to-teal-50/15',
    border: 'border-cyan-100',
    iconBg: 'bg-cyan-500/10 text-cyan-600',
  },
  {
    name: 'Amber & Rose',
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200/80',
    cardBg: 'bg-gradient-to-br from-white via-orange-50/25 to-rose-50/15',
    border: 'border-orange-100',
    iconBg: 'bg-orange-500/10 text-orange-600',
  },
  {
    name: 'Emerald & Teal',
    gradient: 'from-emerald-600 via-teal-600 to-indigo-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    cardBg: 'bg-gradient-to-br from-white via-emerald-50/25 to-teal-50/15',
    border: 'border-emerald-100',
    iconBg: 'bg-emerald-500/10 text-emerald-600',
  },
];

const AdminPanel = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('messages'); // 'messages' | 'projects'
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverHealth, setServerHealth] = useState(null);

  // New Project Modal
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    tags: '',
    demo: '#',
    github: 'https://github.com/Mintukumari-0019',
    featured: false,
    selectedTheme: 0,
  });

  const handleAuth = (e) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('portfolio_admin_auth');
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Health
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setServerHealth(healthData);
      }

      // Fetch Messages
      const msgRes = await fetch('/api/contact');
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        if (msgData.success) {
          setMessages(msgData.data);
        }
      }

      // Fetch Projects
      const projRes = await fetch('/api/projects');
      if (projRes.ok) {
        const projData = await projRes.json();
        if (projData.success) {
          setProjects(projData.data);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await fetch(`/api/contact/${id}/read`, { method: 'PATCH' });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
        );
      }
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const themeConfig = COLOR_THEMES[projectForm.selectedTheme];
      const tagsArray = projectForm.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: projectForm.title,
        subtitle: projectForm.subtitle,
        description: projectForm.description,
        tags: tagsArray,
        demo: projectForm.demo,
        github: projectForm.github,
        featured: projectForm.featured,
        theme: {
          ...themeConfig,
          glow: `group-hover:shadow-${themeConfig.gradient.includes('indigo') ? 'indigo' : 'cyan'}-500/20`,
        },
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsAddProjectOpen(false);
        setProjectForm({
          title: '',
          subtitle: '',
          description: '',
          tags: '',
          demo: '#',
          github: 'https://github.com/Mintukumari-0019',
          featured: false,
          selectedTheme: 0,
        });
        fetchData();
      } else {
        alert('Failed to save project. Please check fields.');
      }
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/20">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
            <p className="text-sm text-slate-400 mt-1">
              Enter your passcode to manage projects & messages
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Passcode (Default: <code className="text-indigo-400">admin123</code>)
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 font-medium flex items-center gap-1.5">
                <AlertCircle size={14} /> {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Unlock Dashboard
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Portfolio
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-indigo-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors inline-flex items-center gap-1.5 text-xs font-bold"
              >
                <ArrowLeft size={16} />
                <span>Portfolio</span>
              </button>

              <div className="h-6 w-px bg-slate-200 mx-1" />

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
                  MK
                </div>
                <h1 className="text-base font-bold text-slate-900 hidden sm:inline">
                  Admin Console
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <Database size={11} /> {serverHealth?.database?.dialect || 'SQLite'} Connected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-slate-200"
                title="Refresh Data"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>

              <button
                onClick={handleLogout}
                className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="p-5 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-white to-indigo-50/20 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Inquiries
              </p>
              <h3 className="text-3xl font-black text-indigo-700 mt-1">{messages.length}</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {unreadCount > 0 ? (
                  <span className="text-indigo-600 font-bold">{unreadCount} unread</span>
                ) : (
                  'All caught up'
                )}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-100 text-indigo-700">
              <Mail size={24} />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50/60 via-white to-cyan-50/20 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Database Projects
              </p>
              <h3 className="text-3xl font-black text-cyan-700 mt-1">{projects.length}</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Rendered dynamically</p>
            </div>
            <div className="p-3.5 rounded-xl bg-cyan-100 text-cyan-700">
              <FolderGit2 size={24} />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/20 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Backend Server
              </p>
              <h3 className="text-xl font-black text-emerald-700 mt-2">Active • Port 5000</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Uptime: {Math.round(serverHealth?.uptime || 0)}s
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        {/* Tabs and Actions Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Mail size={16} />
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-black">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <FolderGit2 size={16} />
              <span>Projects</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700 font-bold">
                {projects.length}
              </span>
            </button>
          </div>

          {activeTab === 'projects' && (
            <button
              onClick={() => setIsAddProjectOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Project</span>
            </button>
          )}
        </div>

        {/* Tab 1: Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <Mail size={40} className="mx-auto text-slate-300 mb-3" />
                <h4 className="text-base font-bold text-slate-700">No Messages Yet</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  When visitors submit your portfolio's contact form, their inquiries will appear here in real-time.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    msg.isRead
                      ? 'bg-white border-slate-200 shadow-xs'
                      : 'bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/20 border-indigo-200 shadow-md shadow-indigo-100/30'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-base font-bold text-slate-900">{msg.name}</h4>
                        {!msg.isRead ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-xs">
                            NEW
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500">
                            Read
                          </span>
                        )}
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs font-semibold text-indigo-600 hover:underline mt-0.5 block"
                      >
                        {msg.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock size={13} />
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 bg-white/80 p-4 rounded-xl border border-slate-100 leading-relaxed font-normal whitespace-pre-wrap">
                    {msg.message}
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
                    <a
                      href={`mailto:${msg.email}?subject=Reply to your inquiry regarding Portfolio`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <Send size={13} /> Reply via Email
                    </a>

                    <div className="flex items-center gap-2">
                      {!msg.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Projects */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{proj.title}</h4>
                      <p className="text-xs font-medium text-indigo-600">{proj.subtitle}</p>
                    </div>
                    {proj.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {Array.isArray(proj.tags) &&
                      proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
                      >
                        <Github size={13} /> Repo
                      </a>
                    )}
                    {proj.demo && proj.demo !== '#' && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
                      >
                        <ExternalLink size={13} /> Demo
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal: Add New Project */}
      <AnimatePresence>
        {isAddProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Add Project to Database</h3>
                <button
                  onClick={() => setIsAddProjectOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. AI Content Studio"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Subtitle / Category
                  </label>
                  <input
                    type="text"
                    value={projectForm.subtitle}
                    onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                    placeholder="e.g. Full-Stack Web App"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Describe what the application does, tech stack, and key features..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    placeholder="e.g. React, Node.js, Tailwind, SQLite"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      GitHub URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={projectForm.github}
                      onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Live Demo URL
                    </label>
                    <input
                      type="text"
                      value={projectForm.demo}
                      onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                      placeholder="#"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Card Color Theme
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_THEMES.map((th, idx) => (
                      <button
                        type="button"
                        key={th.name}
                        onClick={() => setProjectForm({ ...projectForm, selectedTheme: idx })}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left flex items-center gap-2 cursor-pointer transition-all ${
                          projectForm.selectedTheme === idx
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${th.gradient}`} />
                        <span>{th.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Set as Featured Showcase Project
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer"
                  >
                    Save Project to Database
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
