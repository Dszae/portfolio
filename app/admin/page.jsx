import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';
import {
  getCertificates,
  getGalleryImages,
  getProjects,
  getArticles,
  getSkills,
  getExperiences,
  getServices,
  getTestimonials,
  getSiteSettings,
  getContactMessages,
  getSubscribers,
  getActivityLogs
} from '@/lib/dataService';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = {
  title: 'Portfolio Control Center | Dipesh Sapkota',
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

  const [
    certificates,
    gallery,
    projects,
    articles,
    skills,
    experiences,
    services,
    testimonials,
    settings,
    messages,
    subscribers,
    activityLogs
  ] = await Promise.all([
    getCertificates(),
    getGalleryImages(),
    getProjects(),
    getArticles(),
    getSkills(),
    getExperiences(),
    getServices(),
    getTestimonials(),
    getSiteSettings(),
    getContactMessages(),
    getSubscribers(),
    getActivityLogs()
  ]);

  return (
    <AdminDashboard
      initialCertificates={certificates}
      initialGallery={gallery}
      initialProjects={projects}
      initialArticles={articles}
      initialSkills={skills}
      initialExperiences={experiences}
      initialServices={services}
      initialTestimonials={testimonials}
      initialSettings={settings}
      initialMessages={messages}
      initialSubscribers={subscribers}
      initialActivityLogs={activityLogs}
    />
  );
}
