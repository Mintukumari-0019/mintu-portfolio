// server/src/routes/health.js
import express from 'express';
import { sequelize } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await sequelize.authenticate();
    dbStatus = 'connected';
  } catch (err) {
    dbStatus = `error: ${err.message}`;
  }

  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      dialect: sequelize.getDialect(),
    },
  });
});

export default router;
