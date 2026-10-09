import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: "Articles",
  description: "Technical write-ups and engineering articles authored by Dipesh Sapkota (dszae).",
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'Blog & Articles - Dipesh Sapkota',
    description: 'Technical write-ups and engineering articles authored by Dipesh Sapkota.',
    url: '/blog',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles by Dipesh Sapkota',
    description: 'Engineering and software development articles written by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-32">
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Articles', path: '/blog' }]} />
      <h1 className="text-4xl font-bold mb-6">Articles by Dipesh Sapkota</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
        Read my technical articles published on Hashnode covering web engineering and development:
      </p>
      <ul className="space-y-4">
        <li>
          <a href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app" target="_blank" rel="noreferrer" className="text-sky-500 hover:underline text-lg font-medium">
            Building Sportivo: How I Engineered a Real-Time Live Sports Streaming Web App &rarr;
          </a>
        </li>
        <li>
          <a href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control" target="_blank" rel="noreferrer" className="text-sky-500 hover:underline text-lg font-medium">
            How I Built an Interactive Git Visualizer to Master Version Control &rarr;
          </a>
        </li>
      </ul>
    </main>
  );
}
