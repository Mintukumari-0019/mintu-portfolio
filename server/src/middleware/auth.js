// server/src/middleware/auth.js
import { verifyToken } from '../utils/auth.js';

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Admin authentication token required.',
    });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization format. Expected "Bearer <token>".',
    });
  }

  const adminPayload = verifyToken(token);

  if (!adminPayload) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token. Please log in again.',
    });
  }

  req.admin = adminPayload;
  next();
}
