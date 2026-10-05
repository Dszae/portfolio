import Link from 'next/link';

export const metadata = {
  title: "About Dipesh Sapkota - Computer Engineer & Video Editor",
  description: "Learn more about Dipesh Sapkota (dszae), Computer Engineering student at IOE Thapathali Campus and professional video editor in Kathmandu, Nepal.",
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    title: 'About Dipesh Sapkota - Computer Engineer & Video Editor',
    description: 'Learn about Dipesh Sapkota, a Computer Engineering student, AI/ML enthusiast, video editor, and motion graphics designer in Nepal.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-32">
      <h1 className="text-4xl font-bold mb-6">About Dipesh Sapkota</h1>
      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        Hello! I am <strong>Dipesh Sapkota</strong>, a dedicated Computer Engineering student at <strong>IOE Thapathali Campus</strong> in Kathmandu, Nepal. Recognized online as <strong>dszae</strong>, I specialize in software development, AI/ML exploration, and high-end multimedia production.
      </p>
      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        With over 4 years of professional experience as a freelance video editor, motion graphics artist, and graphic designer, I bridge the gap between rigorous logical programming and visually stunning digital execution.
      </p>
      <div className="mt-8">
        <Link href="/" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">&larr; Back to Home</Link>
      </div>
    </main>
  );
}