import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://tihkvcybdvvovmnvkdrx.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpaGt2Y3liZHZ2b3ZtbnZrZHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MTUyODMsImV4cCI6MjEwNzk5MTI4M30.uyorIqosjVLDQKd7H46YKY_z7BhRTKkRHfIA4NBqfiw';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || defaultUrl;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultKey;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || defaultKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
