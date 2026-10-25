// server/src/server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import { seedDatabase } from './seeders/seed.js';

import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';
import healthRouter from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? CLIENT_URL : true,
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: "Mintu's Portfolio Backend API",
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      projects: '/api/projects',
      contact: '/api/contact',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.url} not found`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Initialize database and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected successfully (${sequelize.getDialect()})`);

    // Sync database schema
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');

    // Auto-seed initial projects if empty
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Portfolio backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database or start server:', error);
    process.exit(1);
  }
}

startServer();
