import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';

const licensingPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/image-licensing#webpage`,
  url: `${siteUrl}/image-licensing`,
  name: 'Image Licensing & Intellectual Property Rights | Dipesh Sapkota',
  description: 'Copyright policies, usage terms, attribution specifications, and licensing guidelines for photographs, graphics, and video media authored by Dipesh Sapkota.',
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
  title: 'Image Licensing & Asset Rights',
  description: 'Official copyright policies, usage permissions, attribution rules, and licensing terms for photography, case study diagrams, and media authored by Dipesh Sapkota.',
  alternates: { canonical: '/image-licensing' },
  openGraph: {
    title: 'Image Licensing & Rights | Dipesh Sapkota',
    description: 'Official copyright policies, usage permissions, attribution rules, and licensing terms for photography and visual media by Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/image-licensing',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Licensing & Asset Rights | Dipesh Sapkota',
    description: 'Usage terms, attribution rules, and editorial licensing for media created by Dipesh Sapkota.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function ImageLicensingPage() {
  return (
    <SiteLayout>
      <div className="w-full pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Image Licensing', path: '/image-licensing' }]} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(licensingPageJsonLd) }}
          />

          <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm">
            <header className="mb-8 border-b border-slate-200 dark:border-[#222933] pb-6">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                <span className="text-[#065F46] dark:text-[#34D399]">/</span> Image Licensing &amp; Rights
              </h1>
              <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                Official intellectual property framework governing photography, graphic assets, video productions, and technical schematics published across dipeshsapkota7.com.np.
              </p>
            </header>

            <div className="space-y-8 text-sm sm:text-base text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
              <section>
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#065F46] dark:bg-[#34D399]"></span>
                  1. Ownership &amp; Intellectual Property
                </h2>
                <p>
                  Unless explicitly credited otherwise, Dipesh Sapkota retains exclusive ownership and copyright of all visual assets hosted on this domain. This includes personal portrait photography, original UI design previews, interactive project demonstrations, architectural hardware schematics, and short-form video productions.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#065F46] dark:bg-[#34D399]"></span>
                  2. Permitted Editorial &amp; Educational Use
                </h2>
                <p className="mb-3">
                  Non-commercial editorial, academic, and journalistic entities are granted a limited license to reference and display selected visual assets under the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#475569] dark:text-[#94A3B8]">
                  <li>The image or screenshot is used directly in conjunction with a review, citation, or editorial mention of Dipesh Sapkota or his projects.</li>
                  <li>The asset is not altered, distorted, color-graded, cropped to remove attribution, or modified beyond standard responsive scaling.</li>
                  <li>Clear credit is displayed adjacent to the image: <em>&ldquo;Photo / Visual Asset: Dipesh Sapkota (dipeshsapkota7.com.np)&rdquo;</em>.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#065F46] dark:bg-[#34D399]"></span>
                  3. Expressly Prohibited Uses
                </h2>
                <p className="mb-3">
                  Without prior written authorization, the following actions are strictly prohibited:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#475569] dark:text-[#94A3B8]">
                  <li>Re-hosting visual assets on stock photography, wallpaper repositories, or asset resale platforms.</li>
                  <li>Ingestion into machine learning training corpuses or generative AI fine-tuning datasets without explicit commercial licensing agreements.</li>
                  <li>Using portrait imagery or project trademarks to falsely imply institutional endorsement, co-branding, or employment.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#065F46] dark:bg-[#34D399]"></span>
                  4. Commercial Licensing &amp; Media Inquiries
                </h2>
                <p className="mb-4">
                  For high-resolution uncompressed camera RAW files, commercial broadcast rights, conference print materials, or syndicated publication permissions, please submit an official inquiry:
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#065F46] text-white hover:bg-[#065F46]/90 dark:bg-[#34D399] dark:text-slate-950 dark:hover:bg-[#34D399]/90 transition-colors shadow-sm"
                  >
                    <span>Request Licensing Permission</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-slate-200 dark:border-[#222933] text-[#0F172A] dark:text-white hover:bg-slate-50 dark:hover:bg-[#181D24] transition-colors"
                  >
                    <span>About Dipesh Sapkota</span>
                  </Link>
                </div>
              </section>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-[#222933] flex justify-between items-center text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
              <span>Last updated: October 2026</span>
              <Link href="/" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                &larr; Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
