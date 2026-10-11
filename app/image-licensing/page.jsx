import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Image Licensing',
  description: 'Copyright and licensing information for photographs published on Dipesh Sapkota’s website.',
  alternates: { canonical: '/image-licensing' },
  openGraph: {
    title: 'Image Licensing | Dipesh Sapkota',
    description: 'Copyright and licensing information for photographs published on Dipesh Sapkota’s website.',
    url: 'https://www.dipeshsapkota7.com.np/image-licensing',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota' }],
  },
};

export default function ImageLicensingPage() {
  return (
    <SiteLayout>
      <div className="w-full pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto w-full">
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Image Licensing', path: '/image-licensing' }]} />
          
          <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
              <span className="text-[#065F46] dark:text-[#34D399]">/</span> Image Licensing &amp; Rights
            </h1>
            <p className="text-base text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-4">
              All visual assets, including the portrait photograph and project media published on this domain, are copyrighted by <strong className="text-[#0F172A] dark:text-white">Dipesh Sapkota</strong>.
            </p>
            <p className="text-base text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
              All rights are reserved. No open license is granted to reproduce, modify, crawl for model training, or redistribute these media files without explicit written consent.
            </p>
            <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed mb-8">
              To request formal licensing permission for editorial, academic, or institutional use, submit a direct inquiry via the <Link href="/contact" className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">contact channel</Link>.
            </p>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
