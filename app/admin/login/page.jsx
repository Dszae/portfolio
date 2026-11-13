import { redirect } from 'next/navigation';
import { isAuthenticated, SESSION_TTL_SECONDS } from '@/lib/adminAuth';
import { MAX_FAILED_ATTEMPTS, WINDOW_MS } from '@/lib/loginRateLimit';
import AdminAuthShell from '@/components/AdminAuthShell';
import AdminLoginForm from '@/components/AdminLoginForm';

export const metadata = {
  title: { absolute: 'Sign in | Dipesh Sapkota Admin' },
};

export default async function AdminLoginPage({ searchParams }) {
  if (await isAuthenticated()) {
    redirect('/admin');
  }

  const { reason } = await searchParams;

  return (
    <AdminAuthShell title="Sign in" description="Manage the projects, articles, gallery and inbox of dipeshsapkota7.com.np">
      <AdminLoginForm
        reason={typeof reason === 'string' ? reason : ''}
        sessionHours={SESSION_TTL_SECONDS / 3600}
        maxAttempts={MAX_FAILED_ATTEMPTS}
        lockMinutes={WINDOW_MS / 60000}
      />
    </AdminAuthShell>
  );
}
