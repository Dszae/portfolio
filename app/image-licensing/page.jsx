import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Image Licensing',
  description: 'Copyright and licensing information for photographs published on Dipesh Sapkota’s website.',
  alternates: { canonical: '/image-licensing' },
};

export default function ImageLicensingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-32">
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Image Licensing', path: '/image-licensing' }]} />
      <h1 className="text-4xl font-bold mb-6">Image Licensing</h1>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        The portrait of Dipesh Sapkota on this website is copyrighted by Dipesh Sapkota. All rights are reserved. No open license is granted to copy, modify, or redistribute the image.
      </p>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
        To request permission to use the portrait, contact Dipesh Sapkota through the <Link href="/contact" className="text-sky-600 dark:text-sky-400 hover:underline">contact page</Link>.
      </p>
      <Link href="/" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">&larr; Back to Home</Link>
    </main>
  );
}
