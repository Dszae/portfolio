import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: "Contact",
  description: "Get in touch with Dipesh Sapkota (dszae) for freelance projects, collaborations, and technical discussions in Kathmandu, Nepal.",
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact Dipesh Sapkota',
    description: 'Contact Dipesh Sapkota for freelance projects, collaborations, and technical discussions.',
    url: '/contact',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dipesh Sapkota',
    description: 'Contact Dipesh Sapkota for freelance projects, collaborations, and technical discussions.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
        <h1 className="text-4xl font-bold mb-6">Contact Dipesh Sapkota</h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
          I am open for freelance web development projects, video editing collaborations, and technical discussions. Reach out via email or phone.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
          For image permission or licensing inquiries, contact me by email.
        </p>

        <div className="space-y-4 mb-10 text-slate-700 dark:text-slate-300">
          <p><strong>Email:</strong> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com" target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">dsz.ae18@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+9779764685307" className="text-sky-600 dark:text-sky-400 hover:underline">9764685307</a></p>
          <p><strong>Location:</strong> Kathmandu, Nepal</p>
        </div>

        <div>
          <Link href="/" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">&larr; Back to Home</Link>
        </div>
      </main>
    </>
  );
}
