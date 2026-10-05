import Link from 'next/link';

export const metadata = {
  title: "Contact",
  description: "Get in touch with Dipesh Sapkota (dszae) for freelance projects, collaborations, and technical discussions in Kathmandu, Nepal.",
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact Dipesh Sapkota',
    description: 'Contact Dipesh Sapkota for freelance projects, collaborations, and technical discussions.',
    url: '/contact',
    images: [{ url: '/og-image.webp', width: 640, height: 640, alt: 'Dipesh Sapkota portrait' }],
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-32">
      <h1 className="text-4xl font-bold mb-6">Contact Dipesh Sapkota</h1>
      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
        I am open for freelance web development projects, video editing collaborations, and technical discussions. Reach out via email or phone.
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
  );
}
