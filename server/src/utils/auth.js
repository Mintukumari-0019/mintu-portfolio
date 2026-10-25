// server/src/utils/auth.js
import crypto from 'crypto';

// 24 hours session duration
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;

// Rate limiting store for login attempts (in-memory)
const failedAttempts = new Map(); // ip -> { count, lastAttempt }

// Ephemeral random secret generated once per process lifetime for development/test fallback.
// NOTE: When this fallback is used, tokens automatically invalidate when the server process restarts.
const EPHEMERAL_DEV_SECRET = crypto.randomBytes(32).toString('hex');

export function isPasscodeConfigured() {
  const passcode = process.env.ADMIN_PASSCODE;
  return typeof passcode === 'string' && passcode.trim().length > 0;
}

export function getSecret() {
  const jwtSecret = process.env.ADMIN_JWT_SECRET;
  const hasJwtSecret = typeof jwtSecret === 'string' && jwtSecret.trim().length > 0;

  if (process.env.NODE_ENV === 'production') {
    // In production, strictly require a separately configured ADMIN_JWT_SECRET.
    // Never fall back to ADMIN_PASSCODE, a default password, or any predictable secret.
    if (!hasJwtSecret) {
      return null;
    }
    return jwtSecret.trim();
  }

  // In non-production environments (development / test):
  if (hasJwtSecret) {
    return jwtSecret.trim();
  }

  // Development fallback: unguessable ephemeral random secret generated in memory.
  // Tokens become invalid after a server restart.
  return EPHEMERAL_DEV_SECRET;
}

export function verifyPasscode(inputPasscode) {
  if (!isPasscodeConfigured()) {
    return false;
  }

  if (typeof inputPasscode !== 'string' || !inputPasscode.trim()) {
    return false;
  }

  const configuredPasscode = process.env.ADMIN_PASSCODE.trim();

  // Hash both with SHA-256 to ensure fixed 32-byte buffers for timingSafeEqual
  const hashInput = crypto.createHash('sha256').update(inputPasscode).digest();
  const hashExpected = crypto.createHash('sha256').update(configuredPasscode).digest();

  return crypto.timingSafeEqual(hashInput, hashExpected);
}

export function createToken(expiresInMs = TOKEN_EXPIRY_MS) {
  const secret = getSecret();
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET is not configured in production environment.');
  }

  const payload = {
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + expiresInMs,
    nonce: crypto.randomBytes(16).toString('hex'),
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;

  const secret = getSecret();
  if (!secret) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  if (!payloadB64 || !signature) return null;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  const sigBuf = Buffer.from(signature, 'utf8');
  const expBuf = Buffer.from(expectedSignature, 'utf8');

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const jsonStr = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(jsonStr);

    if (payload.role !== 'admin') return null;
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

export function isRateLimited(ip) {
  const record = failedAttempts.get(ip);
  if (!record) return false;

  // Reset after 15 minutes of inactivity
  if (Date.now() - record.lastAttempt > 15 * 60 * 1000) {
    failedAttempts.delete(ip);
    return false;
  }

  return record.count >= 5;
}

export function recordFailedAttempt(ip) {
  const record = failedAttempts.get(ip) || { count: 0, lastAttempt: Date.now() };
  record.count += 1;
  record.lastAttempt = Date.now();
  failedAttempts.set(ip, record);
}

export function clearFailedAttempts(ip) {
  failedAttempts.delete(ip);
}
