// src/components/admin/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
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
  Shield,
  Search,
  MessageSquare,
  Check,
  Settings,
  HelpCircle,
  Sparkles,
  Inbox,
  SendHorizontal,
  ChevronRight,
  Filter,
  Activity,
  Layers,
} from 'lucide-react';

const ADMIN_PASSCODE = 'admin123';

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

const REPLY_TEMPLATES = [
  {
    label: '💼 Job / Hiring Opportunity',
    subject: 'Thank you for considering me - Mintu Kumari',
    body: (name) =>
      `Hi ${name},\n\nThank you for reaching out through my portfolio! I would love to learn more about the role and discuss how my skills in React, JavaScript, and full-stack development align with your team's goals.\n\nPlease feel free to suggest a convenient time for a quick call or interview.\n\nBest regards,\nMintu Kumari\nJunior Software Developer\nmkmintukumari.0987@gmail.com`,
  },
  {
    label: '🚀 Project Collaboration',
    subject: 'Re: Project Discussion - Mintu Kumari',
    body: (name) =>
      `Hi ${name},\n\nThanks for contacting me! Your project sounds very interesting. I would be delighted to collaborate and build high-performance web or mobile solutions for it.\n\nCould you share a bit more detail regarding the timeline, scope, and technical requirements?\n\nWarm regards,\nMintu Kumari\nmkmintukumari.0987@gmail.com`,
  },
  {
    label: '👋 Quick Acknowledgement',
    subject: 'Thank you for your message - Mintu Kumari',
    body: (name) =>
      `Hi ${name},\n\nThank you for getting in touch through my portfolio website! I have received your message and will review it closely.\n\nI will follow up with you shortly.\n\nBest regards,\nMintu Kumari\nSoftware Developer`,
  },
];

const AdminPanel = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Vertical Navigation State: 'messages' | 'projects' | 'guide' | 'system'
  const [activeSection, setActiveSection] = useState('messages');
  const [messageFilter, setMessageFilter] = useState('all'); // 'all' | 'unread' | 'replied' | 'pending'
  const [searchQuery, setSearchQuery] = useState('');

  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverHealth, setServerHealth] = useState(null);

  // Reply Modal State
  const [replyTargetMessage, setReplyTargetMessage] = useState(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replyFeedback, setReplyFeedback] = useState(null);

  // Add Project Modal State
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
      setAuthError('Incorrect passcode. Try: admin123');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('portfolio_admin_auth');
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [healthRes, msgRes, projRes] = await Promise.all([
        fetch('/api/health'),
        fetch('/api/contact'),
        fetch('/api/projects'),
      ]);

      if (healthRes.ok) setServerHealth(await healthRes.json());
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        if (msgData.success) setMessages(msgData.data);
      }
      if (projRes.ok) {
        const projData = await projRes.json();
        if (projData.success) setProjects(projData.data);
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
    if (!window.confirm('Delete this message permanently from database?')) return;
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
    if (!window.confirm('Delete this project from database?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  // Open Reply Modal for a Message
  const openReplyModal = (msg) => {
    setReplyTargetMessage(msg);
    setReplySubject(`Re: Inquiry regarding Portfolio - Mintu Kumari`);
    setReplyText(
      `Hi ${msg.name},\n\nThank you for reaching out through my portfolio website! I have received your message regarding:\n"${msg.message.slice(0, 80)}${msg.message.length > 80 ? '...' : ''}"\n\nI would be very happy to discuss this further.\n\nBest regards,\nMintu Kumari\nJunior Software Developer\nmkmintukumari.0987@gmail.com`
    );
    setReplyFeedback(null);
  };

  const applyTemplate = (tmpl) => {
    if (!replyTargetMessage) return;
    setReplySubject(tmpl.subject);
    setReplyText(tmpl.body(replyTargetMessage.name));
  };

  // Send Reply and Record in Database
  const submitReply = async (e) => {
    e.preventDefault();
    if (!replyTargetMessage) return;

    setIsSendingReply(true);
    setReplyFeedback(null);

    try {
      const res = await fetch(`/api/contact/${replyTargetMessage.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: replySubject,
          replyText: replyText,
        }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setReplyFeedback({
          type: 'success',
          text: result.emailSent
            ? '✅ Email sent directly to ' + replyTargetMessage.email + ' & recorded in DB!'
            : '✅ Reply recorded in database! (Use Gmail button below to send personal email)',
        });

        // Update local message state
        setMessages((prev) =>
          prev.map((m) =>
            m.id === replyTargetMessage.id
              ? {
                  ...m,
                  isReplied: true,
                  replyText: replyText,
                  repliedAt: new Date().toISOString(),
                  isRead: true,
                }
              : m
          )
        );

        setTimeout(() => {
          setReplyTargetMessage(null);
          setReplyFeedback(null);
        }, 2200);
      } else {
        throw new Error(result.message || 'Failed to record reply');
      }
    } catch (err) {
      setReplyFeedback({
        type: 'error',
        text: 'Error saving reply: ' + err.message,
      });
    } finally {
      setIsSendingReply(false);
    }
  };

  // 1-Click Open in Gmail Web / Mail Client
  const openInGmailClient = () => {
    if (!replyTargetMessage) return;
    const to = encodeURIComponent(replyTargetMessage.email);
    const sub = encodeURIComponent(replySubject);
    const body = encodeURIComponent(replyText);

    // Open direct web Gmail composer in new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${sub}&body=${body}`;
    window.open(gmailUrl, '_blank');
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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/20">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Admin Console</h2>
            <p className="text-xs text-slate-400 mt-1.5">
              Secure portal for Mintu's Portfolio & Messages
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Passcode
                </label>
                <span className="text-[11px] text-indigo-400 font-mono">Default: admin123</span>
              </div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm"
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
              className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={14} /> Return to Portfolio
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Filter messages
  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (messageFilter === 'unread') return !m.isRead;
    if (messageFilter === 'replied') return m.isReplied;
    if (messageFilter === 'pending') return !m.isReplied;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;
  const pendingReplyCount = messages.filter((m) => !m.isReplied).length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col md:flex-row">
      {/* ======================================================== */}
      {/* 1. VERTICAL SIDEBAR (LEFT NAVIGATION)                    */}
      {/* ======================================================== */}
      <aside className="w-full md:w-72 bg-slate-900 text-white flex-shrink-0 flex flex-col justify-between border-r border-slate-800 shadow-xl z-20">
        <div>
          {/* Brand & User Profile */}
          <div className="p-6 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-500/30">
                MK
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Mintu Kumari</h2>
                <span className="text-xs text-indigo-300 font-medium">Portfolio Admin</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{serverHealth?.database?.dialect?.toUpperCase() || 'SQLITE'} Database Live</span>
            </div>
          </div>

          {/* Vertical Menu Navigation */}
          <nav className="p-4 space-y-1.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Management
            </div>

            {/* Inquiries */}
            <button
              onClick={() => setActiveSection('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSection === 'messages'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox size={18} />
                <span>Client Inquiries</span>
              </div>
              <div className="flex items-center gap-1.5">
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-xs">
                    {unreadCount} new
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300">
                  {messages.length}
                </span>
              </div>
            </button>

            {/* Projects */}
            <button
              onClick={() => setActiveSection('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSection === 'projects'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderGit2 size={18} />
                <span>Portfolio Projects</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300">
                {projects.length}
              </span>
            </button>

            {/* Add New Project */}
            <button
              onClick={() => setIsAddProjectOpen(true)}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold text-indigo-300 hover:bg-indigo-950/60 hover:text-white border border-indigo-500/20 transition-all cursor-pointer"
            >
              <Plus size={18} className="text-indigo-400" />
              <span>Add New Project</span>
            </button>

            <div className="pt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Communication & System
            </div>

            {/* Reply System Guide */}
            <button
              onClick={() => setActiveSection('guide')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSection === 'guide'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <SendHorizontal size={18} />
              <span>How to Reply Guide</span>
            </button>

            {/* System Health */}
            <button
              onClick={() => setActiveSection('system')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSection === 'system'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Activity size={18} />
              <span>System Health</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-2">
          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN WORKSPACE CONTENT AREA                           */}
      {/* ======================================================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 capitalize flex items-center gap-2">
              {activeSection === 'messages' && 'Client Inquiries & Messages'}
              {activeSection === 'projects' && 'Portfolio Projects Management'}
              {activeSection === 'guide' && 'Email & Reply System Guide'}
              {activeSection === 'system' && 'Database & Server Diagnostics'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live SQLite database integrated with Mintu's portfolio
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-6 sm:p-8 max-w-6xl w-full">
          {/* ======================================================== */}
          {/* SECTION: MESSAGES                                        */}
          {/* ======================================================== */}
          {activeSection === 'messages' && (
            <div className="space-y-6">
              {/* Vertical Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Total Received</span>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">{messages.length}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Unread</span>
                  <div className="text-2xl font-black text-indigo-600 mt-0.5">{unreadCount}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Pending Reply</span>
                  <div className="text-2xl font-black text-amber-600 mt-0.5">{pendingReplyCount}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Replied</span>
                  <div className="text-2xl font-black text-emerald-600 mt-0.5">
                    {messages.filter((m) => m.isReplied).length}
                  </div>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, or message..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {['all', 'unread', 'pending', 'replied'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setMessageFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                        messageFilter === f
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vertical Message Cards List */}
              <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
                    <Mail size={40} className="mx-auto text-slate-300 mb-3" />
                    <h4 className="text-base font-bold text-slate-700">No Messages Found</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      {messages.length === 0
                        ? 'Visitors who submit the portfolio contact form will appear here.'
                        : 'No messages matched your search query or filter.'}
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((msg) => (
                    <motion.div
                      layout
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-2xl border transition-all shadow-xs ${
                        !msg.isRead
                          ? 'bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/20 border-indigo-200 shadow-md shadow-indigo-100/40 ring-1 ring-indigo-300/40'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      {/* Message Card Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                            {msg.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-base font-bold text-slate-900">{msg.name}</h4>
                              {!msg.isRead && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-xs">
                                  NEW
                                </span>
                              )}
                              {msg.isReplied ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                  <Check size={10} /> Replied
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                  Pending Reply
                                </span>
                              )}
                            </div>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs font-semibold text-indigo-600 hover:underline inline-block mt-0.5"
                            >
                              {msg.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Clock size={13} />
                          <span>{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Client Inquiry Text Bubble */}
                      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-wrap mt-3">
                        {msg.message}
                      </div>

                      {/* Previous Reply Box (if replied) */}
                      {msg.isReplied && msg.replyText && (
                        <div className="mt-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                          <div className="flex items-center justify-between font-bold text-emerald-800 text-[11px]">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              Your Reply (Sent on {msg.repliedAt ? new Date(msg.repliedAt).toLocaleDateString() : 'Recently'}):
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap leading-relaxed font-normal text-slate-700 bg-white/70 p-2.5 rounded-lg border border-emerald-100">
                            {msg.replyText}
                          </p>
                        </div>
                      )}

                      {/* Vertical Message Actions Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3.5 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openReplyModal(msg)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                          >
                            <Send size={13} />
                            <span>{msg.isReplied ? 'Send Another Reply' : 'Reply to ' + msg.name}</span>
                          </button>

                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                              msg.email
                            )}&su=${encodeURIComponent('Re: Inquiry regarding Portfolio')}&body=${encodeURIComponent(
                              `Hi ${msg.name},\n\nThank you for reaching out through my portfolio website!\n\nBest regards,\nMintu Kumari`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold transition-colors"
                          >
                            <ExternalLink size={13} />
                            <span>Open Gmail Draft</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          {!msg.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(msg.id)}
                              className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: PROJECTS (VERTICAL STACK)                       */}
          {/* ======================================================== */}
          {activeSection === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Active Database Projects</h3>
                  <p className="text-xs text-slate-500">
                    Projects stored in SQLite and loaded dynamically onto your portfolio
                  </p>
                </div>
                <button
                  onClick={() => setIsAddProjectOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black flex items-center justify-center text-base shadow-sm flex-shrink-0">
                        {proj.title.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-base font-bold text-slate-900">{proj.title}</h4>
                          {proj.featured && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              Featured Showcase
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-indigo-600 mt-0.5">{proj.subtitle}</p>
                        <p className="text-xs text-slate-600 mt-1 max-w-2xl line-clamp-2">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {Array.isArray(proj.tags) &&
                            proj.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl border border-slate-200 transition-colors"
                          title="View Repository"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {proj.demo && proj.demo !== '#' && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl border border-slate-200 transition-colors"
                          title="View Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: REPLY GUIDE & EMAIL SETUP                       */}
          {/* ======================================================== */}
          {activeSection === 'guide' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                    <SendHorizontal size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      How to Reply to Inquiries from Your Portfolio
                    </h3>
                    <p className="text-xs text-slate-500">
                      Two flexible methods built into your admin console
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                  {/* Option A */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                      Option 1: 1-Click Gmail Draft (Zero Setup)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Click the <strong>"Open Gmail Draft"</strong> or <strong>"Reply"</strong> button on any message card. It immediately pre-fills a professional response with the client's email, subject line, and greeting in your Gmail web or mail app. You just click send from your personal Gmail address!
                    </p>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      ✓ Works instantly right now
                    </span>
                  </div>

                  {/* Option B */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                      Option 2: Direct Automated Email via SMTP
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If you want the server to send emails directly in the background without opening Gmail, add your Gmail App Password into <code className="bg-slate-200 px-1.5 py-0.5 rounded text-[11px]">server/.env</code>:
                    </p>
                    <div className="bg-slate-900 text-slate-200 p-3 rounded-xl text-[11px] font-mono leading-relaxed">
                      SMTP_HOST=smtp.gmail.com<br />
                      SMTP_PORT=587<br />
                      SMTP_USER=mkmintukumari.0987@gmail.com<br />
                      SMTP_PASS=your_16_digit_app_password
                    </div>
                  </div>
                </div>
              </div>

              {/* Ready-to-use Email Templates */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  Ready-to-Use Response Templates (Included in Composer)
                </h4>
                <div className="space-y-3 pt-2">
                  {REPLY_TEMPLATES.map((tmpl) => (
                    <div key={tmpl.label} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-xs font-bold text-indigo-600">{tmpl.label}</span>
                      <p className="text-xs text-slate-600 whitespace-pre-wrap font-mono mt-1 bg-white p-3 rounded-lg border border-slate-200">
                        {tmpl.body('[Client Name]')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: SYSTEM DIAGNOSTICS                              */}
          {/* ======================================================== */}
          {activeSection === 'system' && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                    <Database size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Database & Server Status</h3>
                    <p className="text-xs text-slate-500">Live configuration and connectivity diagnostics</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Database Engine</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {serverHealth?.database?.dialect?.toUpperCase() || 'SQLITE (Local File)'}
                    </p>
                    <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
                      Status: {serverHealth?.database?.status || 'Active'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Server Port</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">Port 5000 (Express Node.js)</p>
                    <span className="text-xs text-slate-500 font-medium mt-1 inline-block">
                      Frontend Port: 3000 (Vite)
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Server Uptime</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {Math.round(serverHealth?.uptime || 0)} seconds
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">System Time</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {serverHealth?.timestamp ? new Date(serverHealth.timestamp).toLocaleString() : 'Live'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ======================================================== */}
      {/* 3. MODAL: INTERACTIVE REPLY COMPOSER                     */}
      {/* ======================================================== */}
      <AnimatePresence>
        {replyTargetMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <Send size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Reply to {replyTargetMessage.name}
                    </h3>
                    <p className="text-xs text-indigo-600 font-semibold">{replyTargetMessage.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => setReplyTargetMessage(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Feedback Alert */}
              {replyFeedback && (
                <div
                  className={`mt-4 p-3.5 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                    replyFeedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  {replyFeedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{replyFeedback.text}</span>
                </div>
              )}

              {/* Client Original Message Quote */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-700 block mb-1">Original Inquiry:</span>
                <p className="italic font-normal whitespace-pre-wrap line-clamp-3">
                  "{replyTargetMessage.message}"
                </p>
              </div>

              {/* Quick Template Selector */}
              <div className="mt-4">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Choose a Ready-to-Use Response Template:
                </label>
                <div className="flex flex-wrap gap-2">
                  {REPLY_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.label}
                      type="button"
                      onClick={() => applyTemplate(tmpl)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors cursor-pointer"
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={submitReply} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={replySubject}
                    onChange={(e) => setReplySubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Response Message
                  </label>
                  <textarea
                    rows={7}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans"
                  />
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={openInGmailClient}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    <ExternalLink size={14} className="text-indigo-600" />
                    <span>Open in Gmail Draft</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setReplyTargetMessage(null)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSendingReply}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send size={14} />
                      <span>{isSendingReply ? 'Saving & Sending...' : 'Send & Save in DB'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 4. MODAL: ADD NEW PROJECT                                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isAddProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Add Project to Portfolio</h3>
                <button
                  onClick={() => setIsAddProjectOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    placeholder="Describe the application features, tech stack, and goals..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
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
                    placeholder="e.g. React, Node.js, SQLite, Tailwind"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    id="featuredProjCheckbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="featuredProjCheckbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Featured Showcase Project
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer"
                  >
                    Save Project
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
