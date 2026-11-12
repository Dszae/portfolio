
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { ChatRequestSchema, AGENT_CONFIG } from '@/lib/agent/types';
import { checkRateLimit } from '@/lib/agent/rateLimiter';
import { runAgentOrchestration } from '@/lib/agent/orchestrator';
import { OPENAI_TOOLS } from '@/lib/agent/tools';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function getRuntimeEnv() {
  let cfEnv = {};
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = await getCloudflareContext({ async: true });
    if (ctx && ctx.env) {
      cfEnv = ctx.env;
    }
  } catch {
    // Local Node or non-Cloudflare environment
  }
  return {
    ...process.env,
    ...cfEnv,
    AI: cfEnv.AI || (typeof globalThis !== 'undefined' && globalThis.__env__ && globalThis.__env__.AI)
  };
}

export async function GET(request) {
  const env = await getRuntimeEnv();
  const openAiKey = (env.OPENAI_API_KEY || '').replace(/['"]/g, '').trim();
  const geminiKey = (env.GEMINI_API_KEY || env.GOOGLE_API_KEY || '').replace(/['"]/g, '').trim();
  const groqKey = (env.GROQ_API_KEY || '').replace(/['"]/g, '').trim();
  const hasWorkersAi = Boolean(env.AI);

  const hasKey = Boolean(openAiKey && !openAiKey.startsWith('sk-placeholder') && openAiKey.length > 25);
  const hasGemini = Boolean(geminiKey && geminiKey.length > 15);
  const hasGroq = Boolean(groqKey && groqKey.length > 10);
  
  const engine = hasWorkersAi
    ? 'cloudflare_workers_ai'
    : hasGemini
      ? 'google_gemini_flash'
      : hasGroq
        ? 'groq_llama_3.3_70b'
        : hasKey
          ? 'openai_tool_calling'
          : 'grounded_portfolio_engine';
  const activeModel = hasWorkersAi
    ? '@cf/meta/llama-3.1-8b-instruct-fp8'
    : hasGemini
      ? (env.GEMINI_MODEL || 'gemini-2.5-flash')
      : hasGroq
        ? (env.GROQ_MODEL || 'llama-3.3-70b-versatile')
        : AGENT_CONFIG.DEFAULT_MODEL;

  let probe = null;
  const urlObj = new URL(request.url);

  return NextResponse.json({
    service: 'Dipesh Sapkota Portfolio AI Agent',
    status: 'online',
    model: activeModel,
    engine,
    probe,
    tools_available: OPENAI_TOOLS.map(t => t.function.name),
    rate_limits: {
      max_requests: AGENT_CONFIG.RATE_LIMIT_MAX_REQUESTS,
      window_minutes: AGENT_CONFIG.RATE_LIMIT_WINDOW_MS / (60 * 1000)
    }
  });
}

export async function POST(request) {
  
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const clientIp = forwardedFor.split(',')[0].trim() || request.headers.get('x-real-ip') || '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  const rateHeaders = {
    'X-RateLimit-Limit': String(rateCheck.limit),
    'X-RateLimit-Remaining': String(rateCheck.remaining),
    'X-RateLimit-Reset': String(rateCheck.resetInSeconds),
  };

  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please wait before asking more questions.',
        retryAfter: rateCheck.resetInSeconds
      },
      {
        status: 429,
        headers: {
          ...rateHeaders,
          'Retry-After': String(rateCheck.resetInSeconds)
        }
      }
    );
  }

let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
  }

  const parseResult = ChatRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid message structure', details: parseResult.error.flatten() },
      { status: 400 }
    );
  }

  const { messages } = parseResult.data;

  try {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    supabaseAdmin.from('activity_logs').insert({
      action: 'ai_query',
      entity: 'visitor_event',
      details: JSON.stringify({
        query: (lastUserMsg?.content || '').slice(0, 100)
      }),
      created_at: new Date().toISOString()
    }).then(() => {}).catch(() => {});
  } catch {}

const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const sseWriter = {
    sendEvent: (type, data) => {
      try {
        const payload = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
        writer.write(encoder.encode(payload));
      } catch (err) {
        console.error('SSE send error:', err);
      }
    }
  };

(async () => {
    try {
      const env = await getRuntimeEnv();
      await runAgentOrchestration(messages, sseWriter, env);
    } catch (err) {
      console.error('Orchestration top-level error:', err);
      sseWriter.sendEvent('error', { message: err.message || 'An unexpected error occurred.' });
    } finally {
      try {
        await writer.close();
      } catch {}
    }
  })();

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform, max-age=0',
      'Connection': 'keep-alive',
      ...rateHeaders
    }
  });
}

