import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';
import { getCertificates, getGalleryImages } from '@/lib/dataService';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = {
  title: 'Portfolio Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const auth = await isAuthenticated();
  if (!auth) {
    redirect('/admin/login');
  }

  const [certificates, gallery] = await Promise.all([
    getCertificates(),
    getGalleryImages(),
  ]);

  return (
    <AdminDashboard
      initialCertificates={certificates}
      initialGallery={gallery}
    />
  );
}

