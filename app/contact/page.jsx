import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: "Contact & Collaboration",
  description: "Get in touch with Dipesh Sapkota (dszae) for freelance engineering projects, video editing collaborations, and technical discussions in Kathmandu, Nepal.",
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact Dipesh Sapkota | Engineering & Creative Media',
    description: 'Direct contact channels and form for freelance projects, collaborations, and inquiries.',
    url: '/contact',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dipesh Sapkota',
    description: 'Get in touch with Dipesh Sapkota for freelance projects, collaborations, and discussions.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

const siteUrl = 'https://www.dipeshsapkota7.com.np';

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Dipesh Sapkota',
  url: `${siteUrl}/contact`,
  description: 'Direct contact channels for freelance engineering projects, video editing, and technical inquiries.',
  mainEntity: {
    '@type': 'Person',
    name: 'Dipesh Sapkota',
    email: 'dsz.ae18@gmail.com',
    telephone: '+9779764685307',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kathmandu',
      addressCountry: 'NP',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-32">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
        />

        <div className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-10 md:p-14 backdrop-blur shadow-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
                Let&apos;s Connect
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                I am open for freelance web development projects, video editing commissions, engineering collaborations, and technical discussions. Send a message or reach out through my direct contact channels.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-mono text-xs uppercase text-slate-500 dark:text-slate-400">Location</h2>
                    <p className="font-semibold text-slate-900 dark:text-white">Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-mono text-xs uppercase text-slate-500 dark:text-slate-400">Phone</h2>
                    <a href="tel:+9779764685307" className="font-semibold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                      +977 9764685307
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-mono text-xs uppercase text-slate-500 dark:text-slate-400">Email</h2>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      dsz.ae18@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <h2 className="text-xl font-bold mb-4">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link href="/projects" className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
            Browse Projects
          </Link>
          <Link href="/resume" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            View Resume & CV
          </Link>
          <Link href="/" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
