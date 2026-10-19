
import { z } from 'zod';

export const MessageRoleSchema = z.enum(['system', 'user', 'assistant', 'tool']);

export const ChatMessageSchema = z.object({
  role: MessageRoleSchema,
  content: z.string().max(8000),
  name: z.string().optional(),
  tool_call_id: z.string().optional(),
});

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(20),
  conversationId: z.string().max(100).optional(),
});

export const AGENT_CONFIG = {
  DEFAULT_MODEL: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  MAX_TOOL_ITERATIONS: 5,
  MAX_INPUT_CHARS: 4000,
  REQUEST_TIMEOUT_MS: 30000,
  RATE_LIMIT_MAX_REQUESTS: 20, // 20 requests
  RATE_LIMIT_WINDOW_MS: 5 * 60 * 1000, // per 5 minutes
};

