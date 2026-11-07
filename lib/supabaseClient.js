import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://placeholder.supabase.co';
const defaultKey = 'placeholder-key';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultKey;

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

export const supabase = createClient(supabaseUrl, supabaseAnonKey || defaultKey, options);
