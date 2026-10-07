import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Official Profile',
  description: 'Meet Dipesh Sapkota (dszae), a Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal. Explore his software projects, technical interests, and creative work.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    title: 'About Dipesh Sapkota | Official Profile',
    description: 'Dipesh Sapkota (dszae) studies Computer Engineering at IOE Thapathali and builds software projects in Nepal.',
    url: '/about',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dipesh Sapkota | Official Profile',
    description: 'Meet Dipesh Sapkota (dszae), Computer Engineering student at IOE Thapathali in Nepal.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://www.dipeshsapkota7.com.np/about#profile-page',
  url: 'https://www.dipeshsapkota7.com.np/about',
  name: 'About Dipesh Sapkota',
  isPartOf: { '@id': 'https://www.dipeshsapkota7.com.np/#website' },
  mainEntity: { '@id': 'https://www.dipeshsapkota7.com.np/#person' },
  primaryImageOfPage: { '@id': 'https://www.dipeshsapkota7.com.np/#primary-image' },
  inLanguage: 'en',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-32 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />

      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-3">Official profile</p>
        <h1 className="text-4xl font-bold mb-6">About Dipesh Sapkota</h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          I am <strong>Dipesh Sapkota</strong>, known online as <strong>dszae</strong>. I study Computer Engineering at the <strong>Institute of Engineering, Thapathali Campus</strong> in Kathmandu, Nepal. This is my official website for my engineering studies, software projects, and creative work.
        </p>
      </header>

      <figure className="flex flex-col items-center gap-3">
        <Image
          src="/dipesh-sapkota.jpg"
          alt="Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal"
          width={627}
          height={627}
          priority
          className="h-auto w-full max-w-sm rounded-2xl"
        />
        <figcaption className="text-sm text-slate-600 dark:text-slate-400">
          Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus.
        </figcaption>
      </figure>

      <section aria-labelledby="engineering-work">
        <h2 id="engineering-work" className="text-2xl font-semibold mb-3">Engineering and software projects</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          I build practical tools alongside my computer engineering studies, with interests in software development, AI and machine learning, and embedded systems. Projects on this site include:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-slate-700 dark:text-slate-300">
          <li><Link href="/projects/ioe-admission-guide" className="text-sky-600 dark:text-sky-400 hover:underline">IOE Admission Guide</Link> — rank prediction, cutoff information, and counseling tools for engineering applicants.</li>
          <li><Link href="/projects/git-visualizer" className="text-sky-600 dark:text-sky-400 hover:underline">Git Visualizer</Link> — an interactive way to explore Git commands and version-control workflows.</li>
          <li><Link href="/projects/sportivo" className="text-sky-600 dark:text-sky-400 hover:underline">Sportivo</Link> — a live sports application with match schedules and stream selection.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
          I publish the source code for these projects on my <a href="https://github.com/dszae" rel="me noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">GitHub profile</a>.
        </p>
      </section>

      <section aria-labelledby="creative-work">
        <h2 id="creative-work" className="text-2xl font-semibold mb-3">Video editing and motion graphics</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Alongside engineering, I work as a video editor and motion graphics designer. My portfolio includes freelance media work and video and design work for Clamphook Academy.
        </p>
        <Link href="/experience" className="inline-block mt-4 text-sky-600 dark:text-sky-400 font-semibold hover:underline">View my experience and education &rarr;</Link>
      </section>

      <section aria-labelledby="profiles-and-writing">
        <h2 id="profiles-and-writing" className="text-2xl font-semibold mb-3">Profiles and writing</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          I use the name <strong>dszae</strong> on my developer profiles. My project articles and public profiles connect this website to the same engineering work and author identity.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li><a href="https://dev.to/dszae" rel="me noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">DEV Community — Dipesh Sapkota</a></li>
          <li><a href="https://linkedin.com/in/dszae" rel="me noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">LinkedIn — Dipesh Sapkota</a></li>
          <li><a href="https://github.com/dszae" rel="me noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">GitHub — dszae</a></li>
          <li><Link href="/blog" className="text-sky-600 dark:text-sky-400 hover:underline">Articles by Dipesh Sapkota</Link></li>
        </ul>
      </section>

      <Link href="/" className="inline-block text-sky-600 dark:text-sky-400 font-semibold hover:underline">&larr; Back to home</Link>
    </main>
  );
}
