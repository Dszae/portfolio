import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Image Licensing',
  description: 'Copyright and licensing information for photographs published on Dipesh Sapkota’s website.',
  alternates: { canonical: '/image-licensing' },
};

export default function ImageLicensingPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-6 py-32 text-[#111827] dark:text-[#F9FAFB]">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Image Licensing', path: '/image-licensing' }]} />
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">Image Licensing</h1>
        <p className="text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-4">
          The portrait of Dipesh Sapkota on this website is copyrighted by Dipesh Sapkota. All rights are reserved. No open license is granted to copy, modify, or redistribute the image.
        </p>
        <p className="text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-8">
          To request permission to use the portrait, contact Dipesh Sapkota through the <Link href="/contact" className="text-[#065F46] dark:text-[#34D399] font-medium hover:underline">contact page</Link>.
        </p>
        <Link href="/" className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">&larr; Back to Home</Link>
      </main>
    </>
  );
}
