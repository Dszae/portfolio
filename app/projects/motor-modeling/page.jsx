import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';
import MathFormula from '@/components/MathFormula';

export const metadata = {
  title: "Electrical Machinery Modeling: Induction & DC Machine Analysis Case Study",
  description: "Engineering case study of electrical machinery modeling by Dipesh Sapkota: 3-phase induction machine parameter derivation, locked-rotor analysis, and MATLAB torque-speed simulations.",
  alternates: { canonical: '/projects/motor-modeling' },
  openGraph: {
    type: 'article',
    title: 'Electrical Machinery Modeling | Dipesh Sapkota',
    description: 'Steady-state mathematical modeling and parameter derivation for 3-phase squirrel cage induction machines and DC motors.',
    url: 'https://www.dipeshsapkota7.com.np/projects/motor-modeling',
    images: [{ url: '/dipesh-sapkota.jpg', alt: 'Engineering Machinery Modeling by Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electrical Machinery Modeling | Dipesh Sapkota',
    description: 'Phasor calculus, torque-slip analysis, and parameter derivation by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function MotorModelingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Electrical Machinery Modeling: Equivalent Circuit Parameter Derivation & Simulation',
    description: 'Mathematical analysis and steady-state simulation of 3-phase induction machines and DC motors conducted as part of electrical engineering coursework at IOE Thapathali Campus.',
    author: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    publisher: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
    },
    url: 'https://www.dipeshsapkota7.com.np/projects/motor-modeling',
    datePublished: '2025-01-15T00:00:00+05:45',
    dateModified: '2026-10-10T00:00:00+05:45',
  };

  return (
    <SiteLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24">
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Electrical Machinery Modeling', path: '/projects/motor-modeling' },
            ]}
          />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          {/* Navigation link */}
          <div className="mb-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Editorial Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/15 border border-[#065F46]/20 dark:border-[#34D399]/30 rounded-lg">
                Engineering Analysis
              </span>
              <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                Electromechanical Systems &middot; IOE Thapathali
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
              Electrical Machinery Modeling: Equivalent Circuit Parameter Derivation &amp; Torque-Slip Simulation
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
              Rigorous mathematical derivation, phasor calculus, and steady-state modeling for 3-phase squirrel cage induction machines and separately excited DC machines. Deriving equivalent parameters from locked-rotor bench tests and modeling breakdown pull-out torque limits.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm mb-8 font-mono text-xs">
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Machine Class</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">3-Phase Squirrel Cage</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Modeling Tool</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">MATLAB &amp; Numerical Phasors</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Empirical Match</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">±3.5% Bench Test Margin</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Analysis Focus</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Torque-Speed &amp; Breakdown</strong>
              </div>
            </div>
          </header>

          <figure className="mb-12 overflow-hidden rounded-2xl border border-slate-200 dark:border-[#222933] bg-[#102022] shadow-lg">
            <Image
              src="/engineering-motor-model.svg"
              alt="Project documentation illustration of an induction motor cross-section and torque-speed analysis plot"
              width={1200}
              height={675}
              priority
              className="h-auto w-full"
            />
            <figcaption className="border-t border-white/10 bg-[#0F1D20] px-5 py-3 text-xs text-[#B8D3CA] sm:px-6">
              Analysis documentation: machine cross-section paired with the modeled torque-speed response.
            </figcaption>
          </figure>

          {/* Deep Technical Content */}
          <article className="space-y-12 text-[#1E293B] dark:text-[#CBD5E1]">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                1. Equivalent Circuit Representation of the Induction Machine
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                The per-phase steady-state model of an induction motor transforms electromagnetic stator-rotor coupling into a generalized equivalent transformer circuit with a slip-dependent mechanical load resistance: <MathFormula math="R_2' \cdot \frac{1 - s}{s}" />.
              </p>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-[#090B0E] font-mono text-xs sm:text-sm text-slate-300 space-y-4">
                <div className="text-[#34D399] font-bold pb-2 border-b border-[#222933] font-sans">Thevenin Stator &amp; Torque Formulations:</div>

                <div>
                  <div className="text-slate-400 font-sans text-xs">1. Thevenin Equivalent Stator Voltage:</div>
                  <div className="text-[#34D399] pl-2 mt-1">
                    <MathFormula math="V_{th} = V_{phase} \cdot \left| \frac{jX_m}{R_1 + j(X_1 + X_m)} \right|" block />
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-sans text-xs">2. Thevenin Stator Impedance:</div>
                  <div className="text-[#34D399] pl-2 mt-1">
                    <MathFormula math="Z_{th} = R_{th} + jX_{th} = \frac{jX_m \cdot (R_1 + jX_1)}{R_1 + j(X_1 + X_m)}" block />
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-sans text-xs">3. Electromagnetic Developed Torque:</div>
                  <div className="text-[#34D399] pl-2 mt-1">
                    <MathFormula math="T_{em} = \frac{3 \cdot V_{th}^2 \cdot (R_2'/s)}{\omega_s \cdot \left[ (R_{th} + R_2'/s)^2 + (X_{th} + X_2')^2 \right]}" block />
                  </div>
                  <div className="text-xs text-slate-500 pl-4 mt-1 font-sans">Where <MathFormula math="\omega_s" /> is synchronous angular speed in rad/s, and <MathFormula math="s" /> is rotor slip.</div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                2. Test Protocol: No-Load &amp; Blocked-Rotor Extraction
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Equivalent circuit parameters were extracted from empirical laboratory datasets conducted on a 3-phase test motor:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                <li><strong>No-Load Test:</strong> Uncoupled motor driven at rated voltage (<MathFormula math="V_{nl}, I_{nl}, P_{nl}" />). Stator copper loss is subtracted to isolate core loss resistance (<MathFormula math="R_c" />) and magnetizing reactance (<MathFormula math="X_m" />).</li>
                <li><strong>Blocked-Rotor Test:</strong> Rotor locked mechanically (slip <MathFormula math="s = 1" />), driven under reduced voltage (<MathFormula math="V_{br}" />) to rated current (<MathFormula math="I_{br}" />). Active power (<MathFormula math="P_{br}" />) isolates equivalent resistance (<MathFormula math="R_{eq} = R_1 + R_2'" />) and leakage reactance (<MathFormula math="X_{eq} = X_1 + X_2'" />).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                3. Breakdown Torque Analysis &amp; MATLAB Validation
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Differentiating electromagnetic torque (<MathFormula math="T_{em}" />) with respect to slip (<MathFormula math="s" />) yields the breakdown slip (<MathFormula math="s_{max}" />) where peak pull-out torque occurs:
              </p>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-[#222933] bg-[#090B0E] text-[#34D399]">
                <div className="text-xs font-mono text-slate-400 mb-2">Maximum Torque Breakdown Slip:</div>
                <MathFormula math="s_{max} = \frac{R_2'}{\sqrt{R_{th}^2 + (X_{th} + X_2')^2}}" block />
              </div>
              <p className="leading-relaxed text-base sm:text-lg">
                Simulation plots confirmed that while adding rotor resistance shifts <MathFormula math="s_{max}" /> toward starting slip (<MathFormula math="s = 1" />), the absolute magnitude of maximum breakdown torque (<MathFormula math="T_{max}" />) remains invariant. Computed torque-speed curves correlated with physical dynamometer laboratory bench test results within ±3.5% accuracy.
              </p>
            </section>
          </article>

          <div className="mt-16">
            <PagePagination
              prev={{ label: 'NE555 LED Flasher', path: '/projects/555-flasher' }}
              next={{ label: 'Automated Analyzer Diagnostics', path: '/projects/analyzer-diag' }}
            />
          </div>
        </div>
    </SiteLayout>
  );
}
