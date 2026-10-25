// server/src/routes/auth.js
import express from 'express';
import {
  isPasscodeConfigured,
  verifyPasscode,
  createToken,
  isRateLimited,
  recordFailedAttempt,
  clearFailedAttempts,
} from '../utils/auth.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  // Fail securely if admin passcode is not configured on the server
  if (!isPasscodeConfigured()) {
    console.error('[AUTH ERROR] Login attempt rejected: ADMIN_PASSCODE environment variable is not configured.');
    return res.status(503).json({
      success: false,
      message: 'Admin authentication is not configured on this server. Please configure ADMIN_PASSCODE.',
    });
  }

  const { passcode } = req.body || {};
  const clientIp = req.ip || req.socket?.remoteAddress || 'unknown';

  if (!passcode || typeof passcode !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Passcode is required.',
    });
  }

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many failed login attempts. Please try again in 15 minutes.',
    });
  }

  if (!verifyPasscode(passcode.trim())) {
    recordFailedAttempt(clientIp);
    return res.status(401).json({
      success: false,
      message: 'Incorrect passcode. Please try again.',
    });
  }

  clearFailedAttempts(clientIp);

  try {
    const token = createToken();
    return res.json({
      success: true,
      message: 'Authentication successful.',
      token,
    });
  } catch (err) {
    // Log generic error in plain ASCII without leaking passcodes, secrets, or tokens
    console.error('[AUTH ERROR] Token generation failed during login.');
    return res.status(500).json({
      success: false,
      message: 'Authentication service configuration error.',
    });
  }
});

// GET /api/auth/verify (test token validity)
router.get('/verify', requireAdmin, (req, res) => {
  res.json({
    success: true,
    authenticated: true,
    expiresAt: new Date(req.admin.exp).toISOString(),
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
});

export default router;
