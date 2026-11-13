import Link from 'next/link';
import AdminAuthShell from '@/components/AdminAuthShell';
import AdminResetForm from '@/components/AdminResetForm';
import { checkResetToken } from '@/lib/adminPasswordReset';
import { MIN_PASSWORD_LENGTH } from '@/lib/adminPassword';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { absolute: 'New password | Dipesh Sapkota Admin' },
  referrer: 'no-referrer',
};

const PRIMARY_LINK =
  'mt-8 inline-flex h-10 items-center rounded-lg bg-[#ededed] px-4 text-sm font-medium text-[#141415] transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]';

export default async function AdminResetPasswordPage({ searchParams }) {
  const { token } = await searchParams;
  const value = typeof token === 'string' ? token : '';

  // Opening the link only checks it. The token is used up when the new password is saved.
  if (!(await checkResetToken(value))) {
    return (
      <AdminAuthShell
        title="This link no longer works"
        description="Reset links work once and expire 15 minutes after they are sent. Request a new one to continue"
      >
        <Link href="/admin/forgot-password" className={PRIMARY_LINK}>Request a new link</Link>
      </AdminAuthShell>
    );
  }

  return (
    <AdminAuthShell title="Choose a new password" description="For the admin account of dipeshsapkota7.com.np">
      <AdminResetForm token={value} minLength={MIN_PASSWORD_LENGTH} />
    </AdminAuthShell>
  );
}
