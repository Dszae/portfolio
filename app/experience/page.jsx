export const metadata = {
  title: "Experience & Education",
  description: "Experience and education of Dipesh Sapkota, a Computer Engineering student at IOE Thapathali Campus and video editor at Clamphook Academy in Nepal.",
  alternates: { canonical: '/experience' },
  openGraph: {
    type: 'profile',
    title: 'Experience & Education - Dipesh Sapkota',
    description: 'Professional experience and academic background of Dipesh Sapkota at IOE Thapathali Campus and Clamphook Academy.',
    url: '/experience',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience & Education - Dipesh Sapkota',
    description: 'Experience and education of Dipesh Sapkota, Computer Engineering student at IOE Thapathali and video editor at Clamphook Academy.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function ExperiencePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-32">
      <h1 className="text-4xl font-bold mb-6">Experience & Education</h1>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-sky-500 mb-4">Professional Experience</h2>
        <h3 className="text-xl font-bold">Video Editor & Graphics Designer - Clamphook Academy</h3>
        <p className="text-sm text-slate-500 mb-2">2026 - Present</p>
        <p className="text-slate-700 dark:text-slate-300">Producing promotional videos and design assets for entrance examination crash courses.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-sky-500 mb-4">Education</h2>
        <h3 className="text-xl font-bold">Bachelor in Computer Engineering - IOE Thapathali Campus</h3>
        <p className="text-sm text-slate-500 mb-2">2025 - Present | Kathmandu, Nepal</p>
      </section>
    </main>
  );
}
