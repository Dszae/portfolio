import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Resume & Curriculum Vitae',
  description: 'Official resume of Dipesh Sapkota (dszae). Computer Engineering student at IOE Thapathali Campus and video editor with work experience at Clamphook Academy in Nepal.',
  alternates: { canonical: '/resume' },
  openGraph: {
    type: 'profile',
    title: 'Resume & Curriculum Vitae | Dipesh Sapkota',
    description: 'Academic background, professional video editing experience, and technical projects of Dipesh Sapkota.',
    url: '/resume',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota resume' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Dipesh Sapkota',
    description: 'Academic background and professional experience of Dipesh Sapkota.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'Resume & Curriculum Vitae | Dipesh Sapkota',
  url: 'https://www.dipeshsapkota7.com.np/resume',
  description: 'Official resume of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus.',
  mainEntity: {
    '@type': 'Person',
    name: 'Dipesh Sapkota',
    jobTitle: ['Computer Engineering Student', 'Video Editor', 'Graphic Designer'],
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Institute of Engineering (IOE), Thapathali Campus',
    },
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'Shree Janak Model Secondary School' },
      { '@type': 'EducationalOrganization', name: 'Shree Mahendra Adarsha Secondary School' },
    ],
  },
};

const EXPERIENCE = [
  {
    period: '2026 - Present',
    role: 'Video Editor & Graphics Designer',
    company: 'Clamphook Academy',
    location: 'Kathmandu, Nepal',
    desc: 'Leading digital media post-production, creating high-impact promotional video campaigns, motion design overlays, and visual assets for secondary-level and engineering entrance examination crash courses.',
    logo: '/clamphook_.webp',
  },
  {
    period: '2026 - Present',
    role: 'Video Editor',
    company: 'College Programs & Events',
    location: 'Kathmandu, Nepal',
    desc: 'Managing post-production, multi-camera audio syncing, and visual layout execution for university events, robotics exhibitions, and student council activities.',
    logo: '/campus.webp',
  },
  {
    period: '2023 - Present',
    role: 'Independent Freelancer',
    company: 'Digital Content Creation',
    location: 'Remote / Nepal',
    desc: 'Delivering tailored digital media, graphic layouts, motion assets, and commercial video edits for educational content creators and local business clients.',
    logo: '/freelance.webp',
  },
];

const EDUCATION = [
  {
    period: '2025 - Present',
    degree: 'Bachelor in Computer Engineering',
    institution: 'Institute of Engineering (IOE), Thapathali Campus',
    location: 'Kathmandu, Nepal',
    desc: 'Undergraduate engineering coursework focusing on algorithms, object-oriented programming in C++, electric circuits, instrumentation, and computer architecture.',
    logo: '/thapathali.webp',
  },
  {
    period: '2022 - 2024',
    degree: 'School Leaving Certificate (SLC) - Science Stream',
    institution: 'Shree Janak Model Secondary School',
    location: 'Nepal',
    desc: 'Major in Physics, Chemistry, and Higher Mathematics. Graduated with GPA 3.88 / 4.00.',
    logo: '/janak.webp',
  },
  {
    period: '2022',
    degree: 'Secondary Education Examination (SEE)',
    institution: 'Shree Mahendra Adarsha Secondary School',
    location: 'Nepal',
    desc: 'Completed secondary education with distinction. Graduated with GPA 3.88 / 4.00.',
    logo: '/mahendra.webp',
  },
];

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Resume', path: '/resume' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
            Curriculum Vitae
          </span>
          <h1 className="text-4xl font-bold mb-3">Dipesh Sapkota</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Computer Engineering Student &bull; Video Editor &bull; AI/ML Enthusiast
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/my_cv.pdf"
            download="Dipesh_Sapkota_CV.pdf"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download PDF CV
          </a>
          <a
            href="/my_cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            View in Browser
          </a>
        </div>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full inline-block"></span>
          Professional Experience
        </h2>
        <div className="space-y-6">
          {EXPERIENCE.map((item) => (
            <article key={item.period + item.company} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <Image src={item.logo} alt={item.company} width={40} height={40} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold">{item.role}</h3>
                    <span className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full">{item.period}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{item.company} &bull; {item.location}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full inline-block"></span>
          Education & Academic Background
        </h2>
        <div className="space-y-6">
          {EDUCATION.map((item) => (
            <article key={item.degree} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <Image src={item.logo} alt={item.institution} width={40} height={40} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold">{item.degree}</h3>
                    <span className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full">{item.period}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{item.institution} &bull; {item.location}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link href="/skills" className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
          Technical Skills
        </Link>
        <Link href="/projects" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          Featured Projects
        </Link>
        <Link href="/contact" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          Contact for Hire
        </Link>
      </div>
    </main>
    </>
  );
}
