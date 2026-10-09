import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CertificatesGrid from '@/components/CertificatesGrid';

export const metadata = {
  title: 'Certificates & Professional Credentials',
  description: 'Explore verified professional certifications in Graphic Design, Motion Design, After Effects, DaVinci Resolve, Web Development, and Google AdWords achieved by Dipesh Sapkota (dszae).',
  alternates: { canonical: '/certificates' },
  openGraph: {
    type: 'website',
    title: 'Certificates & Credentials | Dipesh Sapkota',
    description: 'Accredited coursework and certificates in software design, video post-production, color grading, and web engineering.',
    url: '/certificates',
    images: [{ url: '/graphic-design.webp', width: 800, height: 600, alt: 'Graphic Design Masterclass certificate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certificates | Dipesh Sapkota',
    description: 'Accredited coursework and certifications in design, video, and web engineering.',
    images: ['/graphic-design.webp'],
  },
};

const CERTIFICATES = [
  {
    id: 1,
    title: 'Graphic Design Masterclass',
    org: 'Udemy',
    img: '/graphic-design.webp',
    category: 'Design & Visuals',
    skills: 'Photoshop, Illustrator, InDesign, Branding',
    description: 'Comprehensive mastery of design theory, layout composition, vector graphics, photo manipulation, and print-ready asset preparation.',
  },
  {
    id: 2,
    title: 'Motion Design with Figma',
    org: 'Udemy',
    img: '/motion-design.webp',
    category: 'Motion Graphics',
    skills: 'UI Motion, Smart Animate, Micro-interactions',
    description: 'Advanced prototyping, timing functions, smart animations, and interactive component flows for modern user interface design.',
  },
  {
    id: 3,
    title: 'After Effects Course',
    org: 'EDUCBA',
    img: '/after-effects.webp',
    category: 'Motion Graphics',
    skills: 'VFX, Keyframing, Compositing, Kinetic Text',
    description: 'Professional visual effects workflow, shape layer animation, mask tracking, 3D space cameras, and kinetic typography rendering.',
  },
  {
    id: 4,
    title: 'DaVinci Resolve 16: Color Correction',
    org: 'Blackmagic Design',
    img: '/davinci-resolve.webp',
    category: 'Video Production',
    skills: 'Color Grading, Scopes, LUTs, Node Workflows',
    description: 'Official color science curriculum covering primary and secondary grading, qualifier isolations, noise reduction, and cinematic color delivery.',
  },
  {
    id: 5,
    title: 'Adobe Premiere Pro CC Masterclass',
    org: 'Udemy',
    img: '/premiere-pro.webp',
    category: 'Video Production',
    skills: 'Non-Linear Editing, Multicam, Audio Finishing',
    description: 'Professional non-linear video editing, audio equalization, multicam sync, timeline speed ramping, and modern codec export settings.',
  },
  {
    id: 6,
    title: 'Web Development Masterclass',
    org: 'Udemy',
    img: '/web-development.webp',
    category: 'Software Engineering',
    skills: 'HTML5, CSS3, JavaScript, Full Stack Basics',
    description: 'Foundation web architecture covering semantic markup, modern CSS grid/flexbox responsive layouts, DOM programming, and web API integration.',
  },
  {
    id: 7,
    title: 'Google Adwords Crash Course 2021',
    org: 'Udemy',
    img: '/google-adwords.webp',
    category: 'Digital Marketing',
    skills: 'PPC Campaigns, Keyword Bidding, Analytics',
    description: 'Paid search strategy, ad copy optimization, negative keyword targeting, conversion funnel tracking, and campaign performance metrics.',
  },
  {
    id: 8,
    title: 'Design Principles, Typography & Color Theory',
    org: 'Udemy',
    img: '/design-principles.webp',
    category: 'Design & Visuals',
    skills: 'Visual Hierarchy, Typography, Color Harmonies',
    description: 'Deep dive into Gestalt principles, typographic scale, kerning, color psychology, and contrast ratios for digital interfaces and editorial design.',
  },
];

const siteUrl = 'https://www.dipeshsapkota7.com.np';

const certificatesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Certificates & Professional Credentials | Dipesh Sapkota',
  url: `${siteUrl}/certificates`,
  description: 'Verified professional certifications in Graphic Design, Motion Design, After Effects, DaVinci Resolve, Web Development, and Google AdWords achieved by Dipesh Sapkota.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Certifications',
    numberOfItems: CERTIFICATES.length,
    itemListElement: CERTIFICATES.map((cert, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EducationalOccupationalCredential',
        name: cert.title,
        description: cert.description,
        credentialCategory: 'Certificate of Completion',
        recognizedBy: {
          '@type': 'Organization',
          name: cert.org,
        },
        image: `${siteUrl}${cert.img}`,
      },
    })),
  },
};

export default function CertificatesPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-32">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Certificates', path: '/certificates' },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(certificatesJsonLd) }}
        />

        <header className="mb-12">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
            Continuous Learning & Mastery
          </span>
          <h1 className="text-4xl font-bold mb-4">Certificates & Professional Credentials</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A verified record of completed courses and technical specializations across creative design, cinematic video post-production, motion graphics, and web development.
          </p>
        </header>

        <CertificatesGrid certificates={CERTIFICATES} />

        <div className="mt-16 flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/skills"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
          >
            Explore Technical Skills
          </Link>
          <Link
            href="/resume"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Curriculum Vitae
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Browse Projects
          </Link>
          <Link
            href="/gallery"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Visual Archive
          </Link>
        </div>
      </main>
    </>
  );
}

