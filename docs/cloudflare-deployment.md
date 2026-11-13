# Cloudflare deployment

This Next.js app needs a Cloudflare Worker. Its API routes, proxy, timed page revalidation, and admin-triggered `revalidatePath` calls cannot be deployed as a static Pages `dist` directory.

## One-time Cloudflare setup

The Cloudflare cache resources are ready: the `next-portfolio-cache` R2 bucket, the `next-portfolio-tags` D1 database in APAC, and its revalidation table. The D1 database ID is configured in `wrangler.jsonc`.

To recreate these resources in another Cloudflare account:

```powershell
npx wrangler d1 create next-portfolio-tags
npx wrangler r2 bucket create next-portfolio-cache
npx wrangler d1 execute next-portfolio-tags --remote --file=cloudflare/d1/0001_create_revalidations.sql
```

Copy the new D1 database ID into `wrangler.jsonc` at `d1_databases[0].database_id`.

## Cloudflare Workers Builds

Connect the repository as a **Worker** in Workers & Pages, then set:

| Setting | Value |
| --- | --- |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npm run deploy:cloudflare` |
| Root directory | `/` |

Do not use the Pages command `wrangler pages deploy dist`. The OpenNext deploy command reads the Worker entry point and assets from `.open-next`, configured in `wrangler.jsonc`.

Add the runtime variables and secrets used by the app in the Worker settings under **Settings > Variables and Secrets**. Values in `.env.local` are not automatically copied to Cloudflare. The app reads `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, `OPENAI_API_KEY`, `GEMINI_API_KEY` (or `GOOGLE_API_KEY`), `GROQ_API_KEY`, and `WEB3FORMS_ACCESS_KEY`. The AI model name variables are optional. Set any variables required during static generation as build variables as well. Generate `ADMIN_PASSWORD_HASH` with `npm run admin:credentials` and store it with `npx wrangler secret put ADMIN_PASSWORD_HASH`. The older plain-text `ADMIN_PASSWORD` is still read when no hash is set, and should be removed once the hash is in place. Password reset by email also needs `ADMIN_EMAIL` and `RESEND_API_KEY` (or `WEB3FORMS_ACCESS_KEY`) as Worker secrets, plus the `admin_credentials` table created by `scripts/admin-credentials.sql`.

After the first Worker deployment, attach the existing domain to the Worker in Cloudflare. The Worker name configured in `wrangler.jsonc` is `portfolio`.
