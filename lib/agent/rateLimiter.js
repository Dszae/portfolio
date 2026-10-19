
import { AGENT_CONFIG } from './types.js';

const rateLimitMap = new Map();

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      record.timestamps = record.timestamps.filter(t => now - t < AGENT_CONFIG.RATE_LIMIT_WINDOW_MS);
      if (record.timestamps.length === 0) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export function checkRateLimit(identifier = 'anonymous') {
  const now = Date.now();
  const windowMs = AGENT_CONFIG.RATE_LIMIT_WINDOW_MS;
  const maxRequests = AGENT_CONFIG.RATE_LIMIT_MAX_REQUESTS;

  let record = rateLimitMap.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    rateLimitMap.set(identifier, record);
  }

record.timestamps = record.timestamps.filter(t => now - t < windowMs);

  const remaining = Math.max(0, maxRequests - record.timestamps.length);
  const oldestTimestamp = record.timestamps[0] || now;
  const resetInSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);

  if (record.timestamps.length >= maxRequests) {
    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      resetInSeconds: Math.max(1, resetInSeconds)
    };
  }

  record.timestamps.push(now);

  return {
    allowed: true,
    limit: maxRequests,
    remaining: remaining - 1,
    resetInSeconds: Math.max(1, resetInSeconds)
  };
}

