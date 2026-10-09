import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: "IOE Admission Guide Project",
  description: "Explore the IOE Admission Guide by Dipesh Sapkota (dszae), with rank prediction, cutoff analytics, and counseling tools for applicants.",
  alternates: { canonical: '/projects/ioe-admission-guide' },
  openGraph: {
    type: 'website',
    title: 'IOE Admission Guide by Dipesh Sapkota',
    description: 'Engineering admission guides, rank prediction, cutoff analytics, and counseling workflows.',
    url: '/projects/ioe-admission-guide',
    images: [{ url: '/ioe-preview.jpg', alt: 'IOE Admission Guide project preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IOE Admission Guide by Dipesh Sapkota',
    description: 'Engineering admission tools created by Dipesh Sapkota, including rank prediction, cutoff analytics, and counseling workflows.',
    images: ['/ioe-preview.jpg'],
  },
};

export default function IoeAdmissionProjectPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'IOE Entrance Preparation Portal',
    url: 'https://www.dipeshsapkota7.com.np/projects/ioe-admission-guide',
    description: 'An engineering admission portal built by Dipesh Sapkota with rank prediction, cutoff analytics, and counseling tools.',
    applicationCategory: 'EducationalApplication',
    creator: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    sameAs: 'https://github.com/dszae/ioe-admission-guide',
  };

  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32 text-[#111827] dark:text-[#F9FAFB]">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: 'IOE Admission Guide', path: '/projects/ioe-admission-guide' }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#047857] dark:text-[#34D399] bg-[#047857]/10 dark:bg-[#34D399]/10 border border-[#047857]/20 dark:border-[#34D399]/20 rounded-full mb-4">
          Featured Web App
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">IOE Admission Guide & Rank Predictor</h1>
        <p className="text-base sm:text-lg text-[#334155] dark:text-[#A7B0BE] mb-6 leading-relaxed">
          Developed by <strong>Dipesh Sapkota</strong>, a Computer Engineering student at IOE Thapathali Campus, this web application serves as a comprehensive admission ecosystem for Tribhuvan University engineering aspirants.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Core Modules</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-[#334155] dark:text-[#A7B0BE]">
          <li>Statistical rank prediction based on historical cutoff trends.</li>
          <li>Step-by-step procedural IOE counseling and document checklists.</li>
          <li>Automated priority form generator for constituent engineering campuses.</li>
        </ul>

        <div className="flex flex-wrap gap-4">
          <a href="https://ioe-admission.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] font-semibold rounded-xl transition-all shadow-sm">
            Explore Guide App
          </a>
          <a href="https://github.com/dszae/ioe-admission-guide" target="_blank" rel="noreferrer" aria-label="View the IOE Admission Guide GitHub repository" className="px-6 py-3 border border-[#E2E8F0] dark:border-[#26352F] bg-[#FFFFFF] dark:bg-[#111B17] font-semibold rounded-xl hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] transition-all">
            GitHub Repository
          </a>
        </div>
      </main>
    </>
  );
}
