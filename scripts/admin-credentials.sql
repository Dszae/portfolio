-- Run once in the Supabase SQL editor to enable password reset by email.
--
-- One private row holding the password hash set by an email reset and the hash
-- of the pending reset token. Row level security is on and there are no
-- policies, so only the service role (the server) can read or write it.
CREATE TABLE IF NOT EXISTS public.admin_credentials (
    id TEXT PRIMARY KEY DEFAULT 'owner',
    password_hash TEXT,
    env_fingerprint TEXT,
    password_updated_at TIMESTAMPTZ,
    reset_token_hash TEXT,
    reset_expires_at TIMESTAMPTZ,
    reset_requested_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_credentials FROM anon, authenticated;

-- Make the new table visible to the API straight away.
NOTIFY pgrst, 'reload schema';
