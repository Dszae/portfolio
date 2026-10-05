export const metadata = {
  title: "Blog & Articles - Dipesh Sapkota",
  description: "Technical write-ups and engineering articles authored by Dipesh Sapkota (dszae).",
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'Blog & Articles - Dipesh Sapkota',
    description: 'Technical write-ups and engineering articles authored by Dipesh Sapkota.',
    url: '/blog',
  },
};

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-32">
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