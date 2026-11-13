import Link from 'next/link';
import AdminAuthShell from '@/components/AdminAuthShell';
import AdminRecoverForm from '@/components/AdminRecoverForm';
import { isEmailResetAvailable, RESET_TOKEN_TTL_MS } from '@/lib/adminPasswordReset';
import { WINDOW_MS } from '@/lib/loginRateLimit';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { absolute: 'Reset password | Dipesh Sapkota Admin' },
};

const STEPS = [
  {
    title: 'Generate a new password hash',
    body: 'Run this in the project folder and enter the new password when asked',
    command: 'npm run admin:credentials',
  },
  {
    title: 'Save the hash where the site reads it',
    body: 'Paste the printed ADMIN_PASSWORD_HASH line into .env.local, then store the same value as a Worker secret',
    command: 'npx wrangler secret put ADMIN_PASSWORD_HASH',
  },
  {
    title: 'Deploy and sign in',
    body: 'The new password works as soon as the deploy finishes. Every older session is signed out',
    command: 'npm run deploy:cloudflare',
  },
];

const BACK_LINK =
  'inline-flex h-10 items-center rounded-lg border border-white/10 bg-[#232325] px-4 text-sm font-medium text-[#ededed] transition-colors duration-150 hover:border-white/20 hover:bg-[#2a2a2d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]';

function DeploymentSteps() {
  return (
    <ol className="space-y-6">
      {STEPS.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#19191b] text-xs tabular-nums text-[#a1a1a6]" aria-hidden="true">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium leading-6 text-[#ededed]">{step.title}</h3>
            <p className="mt-1 text-[13px] leading-5 text-[#a1a1a6]">{step.body}</p>
            <code className="mt-3 block overflow-x-auto rounded-lg border border-white/[0.08] bg-[#0f0f10] px-3 py-2 font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[13px] leading-5 text-[#ededed]">
              {step.command}
            </code>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function AdminForgotPasswordPage() {
  const emailReset = await isEmailResetAvailable();
  const lockMinutes = WINDOW_MS / 60000;

  if (!emailReset) {
    return (
      <AdminAuthShell
        wide
        title="Reset the password"
        description="Reset by email is not set up on this server yet. Until it is, the password can be changed by someone with access to the deployment"
      >
        <div className="mt-8">
          <DeploymentSteps />
        </div>
        <p className="mt-8 border-t border-white/[0.08] pt-6 text-[13px] leading-5 text-[#a1a1a6]">
          Locked out after too many attempts? The lock lifts on its own {lockMinutes} minutes after the first failed attempt, with no reset needed
        </p>
        <Link href="/admin/login" className={`mt-6 ${BACK_LINK}`}>Back to sign in</Link>
      </AdminAuthShell>
    );
  }

  return (
    <AdminAuthShell
      wide
      title="Reset the password"
      description="Enter the admin username or email. A reset link goes to the owner's inbox, never to an address typed here"
    >
      <AdminRecoverForm linkMinutes={RESET_TOKEN_TTL_MS / 60000} />

      <p className="mt-6 text-[13px] leading-5 text-[#a1a1a6]">
        Locked out after too many attempts? The lock lifts on its own {lockMinutes} minutes after the first failed attempt, with no reset needed
      </p>

      <details className="group mt-6 border-t border-white/[0.08] pt-6">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded text-[13px] font-medium text-[#ededed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] [&::-webkit-details-marker]:hidden">
          <svg className="h-4 w-4 shrink-0 text-[#85858b] transition-transform duration-150 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
          No access to the inbox? Reset from the deployment
        </summary>
        <div className="mt-6">
          <DeploymentSteps />
        </div>
      </details>

      <Link href="/admin/login" className={`mt-8 ${BACK_LINK}`}>Back to sign in</Link>
    </AdminAuthShell>
  );
}
