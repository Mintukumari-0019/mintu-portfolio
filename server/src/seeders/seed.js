// server/src/seeders/seed.js
import { Project, sequelize } from '../models/index.js';

const initialProjects = [
  {
    title: 'KahaniLand',
    subtitle: 'Kids Learning & Storytelling Platform',
    description:
      'An engaging, interactive learning and storytelling platform designed to make early education magical with vibrant visuals and playful experiences.',
    tags: ['React', 'Tailwind CSS', 'React Native', 'JavaScript'],
    demo: '#',
    github: 'https://github.com/Mintukumari-0019',
    featured: true,
    order: 1,
    theme: {
      gradient: 'from-indigo-600 via-purple-600 to-pink-500',
      glow: 'group-hover:shadow-indigo-500/20 group-hover:border-indigo-400',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      cardBg: 'bg-gradient-to-br from-white via-indigo-50/25 to-purple-50/20',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-500/10 text-indigo-600',
    },
  },
  {
    title: 'Healthcare Dashboard',
    subtitle: 'Clinical & Patient Analytics Suite',
    description:
      'A modern healthcare dashboard featuring real-time patient vitals, diagnosis history, intuitive charts, and dynamic health analytics.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    demo: '#',
    github: 'https://github.com/Mintukumari-0019',
    featured: false,
    order: 2,
    theme: {
      gradient: 'from-cyan-600 via-teal-600 to-blue-600',
      glow: 'group-hover:shadow-cyan-500/20 group-hover:border-cyan-400',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
      cardBg: 'bg-gradient-to-br from-white via-cyan-50/25 to-teal-50/15',
      border: 'border-cyan-100',
      iconBg: 'bg-cyan-500/10 text-cyan-600',
    },
  },
  {
    title: 'MoodyEats - Food Ordering System',
    subtitle: 'Full-Stack Food Delivery & Management',
    description:
      'Full-stack food ordering platform featuring secure JWT authentication, restaurant listings, dynamic menus, interactive cart, and REST API integration.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    demo: '#',
    github: 'https://github.com/Mintukumari-0019/moodyEats',
    featured: false,
    order: 3,
    theme: {
      gradient: 'from-amber-500 via-orange-600 to-rose-600',
      glow: 'group-hover:shadow-orange-500/20 group-hover:border-orange-400',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200/80',
      cardBg: 'bg-gradient-to-br from-white via-orange-50/25 to-rose-50/15',
      border: 'border-orange-100',
      iconBg: 'bg-orange-500/10 text-orange-600',
    },
  },
  {
    title: 'Developer Portfolio',
    subtitle: 'Containerized Personal Portfolio',
    description:
      'Modern, highly responsive portfolio showcasing full-stack capabilities, dockerized with multi-stage Nginx builds and smooth Framer Motion animations.',
    tags: ['React', 'Tailwind CSS', 'Docker', 'Vite'],
    demo: '#',
    github: 'https://github.com/Mintukumari-0019',
    featured: false,
    order: 4,
    theme: {
      gradient: 'from-blue-600 via-indigo-600 to-violet-600',
      glow: 'group-hover:shadow-blue-500/20 group-hover:border-blue-400',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      cardBg: 'bg-gradient-to-br from-white via-blue-50/25 to-indigo-50/15',
      border: 'border-blue-100',
      iconBg: 'bg-blue-500/10 text-blue-600',
    },
  },
  {
    title: 'Education / Exam Platform',
    subtitle: 'Interactive Learning & Examination Hub',
    description:
      'Interactive testing environment designed for high-clarity exam experiences, dynamic question rendering, and real-time score assessment.',
    tags: ['React', 'JavaScript', 'SQL', 'Node.js'],
    demo: '#',
    github: 'https://github.com/Mintukumari-0019',
    featured: false,
    order: 5,
    theme: {
      gradient: 'from-emerald-600 via-teal-600 to-indigo-600',
      glow: 'group-hover:shadow-emerald-500/20 group-hover:border-emerald-400',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      cardBg: 'bg-gradient-to-br from-white via-emerald-50/25 to-teal-50/15',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
    },
  },
];

export async function seedDatabase() {
  try {
    await sequelize.sync();
    const count = await Project.count();
    if (count === 0) {
      console.log('🌱 Seeding initial portfolio projects...');
      await Project.bulkCreate(initialProjects);
      console.log('✅ Projects seeded successfully!');
    } else {
      console.log(`ℹ️ Database already has ${count} projects. Skipping seed.`);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Allow direct execution: node src/seeders/seed.js
if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase().then(() => process.exit(0));
}
