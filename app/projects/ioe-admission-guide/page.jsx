export const metadata = {
  title: "IOE Admission Guide - Tribhuvan University Engineering Predictor by Dipesh Sapkota",
  description: "Discover the IOE Admission Guide built by Dipesh Sapkota (dszae) for Tribhuvan University engineering applicants featuring statistical rank prediction and counseling workflows.",
  alternates: { canonical: '/projects/ioe-admission-guide' },
  openGraph: {
    type: 'website',
    title: 'IOE Admission Guide by Dipesh Sapkota',
    description: 'Engineering admission guides, rank prediction, cutoff analytics, and counseling workflows.',
    url: '/projects/ioe-admission-guide',
  },
};

export default function IoeAdmissionProjectPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'IOE Entrance Preparation Portal',
    url: 'https://ioe-admission.dipeshsapkota7.com.np/',
    description: 'An engineering admission portal built by Dipesh Sapkota with rank prediction, cutoff analytics, and counseling tools.',
    applicationCategory: 'EducationalApplication',
    creator: { '@id': 'https://www.dipeshsapkota7.com.np/#person' },
    sameAs: 'https://github.com/dszae/ioe-admission-guide',
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-600 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
        Featured Web App
      </span>
      <h1 className="text-4xl font-bold mb-6">IOE Admission Guide & Rank Predictor</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
        Developed by <strong>Dipesh Sapkota</strong>, a Computer Engineering student at IOE Thapathali Campus, this web application serves as a comprehensive admission ecosystem for Tribhuvan University engineering aspirants.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Core Modules</h2>
      <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-700 dark:text-slate-300">
        <li>Statistical rank prediction based on historical cutoff trends.</li>
        <li>Step-by-step procedural IOE counseling and document checklists.</li>
        <li>Automated priority form generator for constituent engineering campuses.</li>
      </ul>

      <div className="flex flex-wrap gap-4">
        <a href="https://ioe-admission.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-xl hover:bg-cyan-500 transition-all">
          Explore Guide App
        </a>
        <a href="https://github.com/dszae/ioe-admission-guide" target="_blank" rel="noreferrer" className="px-6 py-3 border font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          GitHub Repository
        </a>
      </div>
    </main>
  );
}