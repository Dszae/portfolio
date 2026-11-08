import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://placeholder.supabase.co';
const defaultKey = 'placeholder-key';

const supabaseUrl = process.env.SUPABASE_URL || defaultUrl;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || defaultKey;

const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

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

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || defaultKey, options);
