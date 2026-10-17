import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';

const articlesPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/blog#articlespage`,
  url: `${siteUrl}/blog`,
  name: 'Articles | Dipesh Sapkota',
  description: 'Technical write-ups, architecture case studies, and engineering articles authored by Dipesh Sapkota.',
  creator: { '@id': personId },
  isPartOf: {
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Dipesh Sapkota',
    url: `${siteUrl}/`,
  },
  inLanguage: 'en',
};

export const metadata = {
  title: "Articles",
  description: "Technical write-ups and engineering articles authored by Dipesh Sapkota (dszae).",
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'Blog & Articles - Dipesh Sapkota',
    description: 'Technical write-ups and engineering articles authored by Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/blog',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles by Dipesh Sapkota',
    description: 'Engineering, AI/ML, and intelligent systems articles written by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
    creator: '@DszAe18',
    site: '@DszAe18',
  },
};

export default function BlogPage() {
  return (
    <SiteLayout>
      <div className="w-full pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Articles', path: '/blog' }]} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesPageJsonLd) }}
          />
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
            <span className="text-[#065F46] dark:text-[#34D399]">/</span> Articles &amp; Write-Ups
          </h1>
          <p className="text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] mb-10 leading-relaxed max-w-2xl">
            In-depth engineering articles, architectural case studies, and technical write-ups covering AI/ML, distributed systems, and modern web applications.
          </p>

          <ul className="space-y-6">
            {/* DEV Community Featured Publication */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  DEV Community
                </span>
                <span className="card-meta">@dszae</span>
              </div>
              <a 
                href="https://dev.to/dszae" 
                target="_blank" 
                rel="me noopener noreferrer" 
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                My DEV Community profile &rarr;
              </a>
              <p className="card-description">
                Follow technical notes, AI/ML engineering insights, and practical developer tutorials on my official DEV Community author profile.
              </p>
            </li>

            {/* Sportivo Engineering Deep Dive */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Technical Architecture
                </span>
                <span className="card-meta">Full Case Study</span>
              </div>
              <a
                href="https://dev.to/dszae/building-sportivo-how-i-engineered-a-live-sports-streaming-web-app-4kh6"
                target="_blank"
                rel="noopener noreferrer"
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                Building Sportivo: Engineering a Real-Time Live Sports Streaming Web App &rarr;
              </a>
              <p className="card-description mb-4">
                Comprehensive technical case study documenting multi-server stream switching, headless DOM parsing, schedule synchronization, and resilient fallback handling.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a href="/projects/sportivo" className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">
                  Read Local Case Study &rarr;
                </a>
                <a href="https://sportivo.dipeshsapkota7.com.np/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  Live Platform &rarr;
                </a>
              </div>
            </li>

            {/* Git Visualizer Technical Article */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Data Structures &amp; DAG
                </span>
                <span className="card-meta">Interactive Canvas</span>
              </div>
              <a
                href="https://dev.to/dszae/building-an-interactive-git-visualizer-to-master-version-control-4noa"
                target="_blank"
                rel="noopener noreferrer"
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                How I Built an Interactive Git Visualizer to Master Version Control &rarr;
              </a>
              <p className="card-description mb-4">
                Deep dive into graph theory, directed acyclic graphs (DAG), Canvas rendering performance, and interactive state models for version control pedagogy.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a href="/projects/git-visualizer" className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">
                  Read Local Case Study &rarr;
                </a>
                <a href="https://git-visualizer.dipeshsapkota7.com.np/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  Live Application &rarr;
                </a>
              </div>
            </li>

            {/* IOE Admission Hub Article */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Data &amp; Education
                </span>
                <span className="card-meta">Product Case Study</span>
              </div>
              <a
                href="https://dev.to/dszae/ioe-admission-hub-building-a-rank-predictor-and-campus-explorer-for-nepal-1n1f"
                target="_blank"
                rel="noopener noreferrer"
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                IOE Admission Hub: Building a Rank Predictor and Campus Explorer for Nepal &rarr;
              </a>
              <p className="card-description mb-4">
                How historical cutoff data, rank prediction, campus exploration, and counseling guidance became a practical admissions toolkit for Nepalese engineering applicants.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a href="/projects/ioe-admission-guide" className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">
                  Read Local Case Study &rarr;
                </a>
                <a href="https://ioe-admission.dipeshsapkota7.com.np/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  Live Portal &rarr;
                </a>
              </div>
            </li>

            {/* NE555 Hardware Prototype Case Study */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Hardware Engineering
                </span>
                <span className="card-meta">Circuit Prototype</span>
              </div>
              <a
                href="/projects/555-flasher"
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                Astable Multivibrator LED Flasher: Hardware Circuit Case Study &rarr;
              </a>
              <p className="card-description mb-4">
                Physical breadboard relaxation oscillator circuit built with the NE555 timer IC in an astable configuration, with RC timing calculations and Proteus ISIS transient simulation.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a href="/projects/555-flasher" className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">
                  Read Circuit Analysis &rarr;
                </a>
              </div>
            </li>

            {/* Electrical Machinery Modeling Case Study */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Electromechanical Modeling
                </span>
                <span className="card-meta">MATLAB &amp; Phasor Calculus</span>
              </div>
              <a
                href="/projects/motor-modeling"
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                Electrical Machinery Modeling: Induction &amp; DC Machine Analysis &rarr;
              </a>
              <p className="card-description mb-4">
                Steady-state mathematical modeling and parameter derivation for 3-phase squirrel cage induction machines, locked-rotor analysis, and MATLAB torque-speed simulations.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a href="/projects/motor-modeling" className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">
                  Read Machine Analysis &rarr;
                </a>
              </div>
            </li>

            {/* Automated Analyzer Diagnostics Case Study */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Instrumentation Engineering
                </span>
                <span className="card-meta">Fluidics &amp; Diagnostics</span>
              </div>
              <a
                href="/projects/analyzer-diag"
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                Automated Clinical Analyzer Diagnostics &amp; Calibration Protocol &rarr;
              </a>
              <p className="card-description mb-4">
                Diagnostic troubleshooting protocol for automated clinical immunoassay and biochemical instruments: negative pressure tolerances (-40 to -60 kPa) and micro-stepping syringe probe calibrations.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <a href="/projects/analyzer-diag" className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">
                  Read Diagnostic Protocol &rarr;
                </a>
              </div>
            </li>

            {/* ESP32 Emergency Response Article */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Embedded Systems
                </span>
                <span className="card-meta">IoT &amp; Hardware</span>
              </div>
              <a
                href="https://dev.to/dszae/building-an-iot-emergency-response-system-with-esp32-2kgo"
                target="_blank"
                rel="noopener noreferrer"
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                Building an IoT Emergency Response System with ESP32 &rarr;
              </a>
              <p className="card-description">
                A practical embedded-systems build exploring ESP32-based sensing, emergency communication, and connected response workflows.
              </p>
            </li>

            {/* Portfolio Launch Article */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Portfolio Build
                </span>
                <span className="card-meta">Design &amp; Development</span>
              </div>
              <a
                href="https://dev.to/dszae/launching-my-digital-portfolio-bridging-code-creative-media-bi6"
                target="_blank"
                rel="noopener noreferrer"
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                Launching My Digital Portfolio: Bridging Code &amp; Creative Media &rarr;
              </a>
              <p className="card-description">
                The story behind building a portfolio that brings software engineering, creative media, motion, and visual storytelling into one experience.
              </p>
            </li>
          </ul>

          <PagePagination
            prev={{ label: 'Featured Projects', path: '/projects' }}
            next={{ label: 'Certificates & Credentials', path: '/certificates' }}
          />
        </div>
      </div>
    </SiteLayout>
  );
}
