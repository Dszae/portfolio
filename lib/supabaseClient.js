import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://placeholder.supabase.co';
const defaultKey = 'placeholder-key';

function cleanEnv(val) {
  if (!val) return '';
  const trimmed = String(val).trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

const options = {};

if (typeof WebSocket === 'undefined' && typeof globalThis.WebSocket === 'undefined') {
  class DummyWebSocket {
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
  }
  options.realtime = { transport: DummyWebSocket };
}

let cachedClient = null;
let cachedSignature = null;

export function getSupabaseClient() {
  const url = cleanEnv(process.env.SUPABASE_URL) || defaultUrl;
  const key = cleanEnv(process.env.SUPABASE_ANON_KEY) || defaultKey;
  const signature = `${url}::${key}`;

  if (cachedClient && cachedSignature === signature) {
    return cachedClient;
  }

  cachedClient = createClient(url, key, options);
  cachedSignature = signature;
  return cachedClient;
}

export const supabase = new Proxy({}, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = client[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

