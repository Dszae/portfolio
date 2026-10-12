import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';
import MathFormula from '@/components/MathFormula';

export const metadata = {
  title: "Automated Analyzer Diagnostics: Clinical Instrumentation Case Study",
  description: "Engineering analysis and diagnostic methodology for automated clinical biochemistry and immunoassay analyzers by Dipesh Sapkota: pneumatic fluidics, micro-stepping syringe calibration, and capacitive liquid level sensing.",
  alternates: { canonical: '/projects/analyzer-diag' },
  openGraph: {
    type: 'article',
    title: 'Automated Analyzer Diagnostics Case Study | Dipesh Sapkota',
    description: 'Electromechanical diagnostics protocol and calibration analysis for clinical automated analyzers.',
    url: 'https://www.dipeshsapkota7.com.np/projects/analyzer-diag',
    images: [{ url: '/dipesh-sapkota.jpg', alt: 'Biomedical Engineering Instrumentation by Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automated Analyzer Diagnostics | Dipesh Sapkota',
    description: 'Fluidics verification, pressure transducer tolerances, and calibration by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function AnalyzerDiagnosticsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Automated Analyzer Diagnostics: Instrumentation Engineering & Calibration Protocol',
    description: 'Diagnostic troubleshooting protocol and electromechanical calibration methodologies for automated clinical immunoassay and biochemical laboratory instruments.',
    author: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    publisher: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
    },
    url: 'https://www.dipeshsapkota7.com.np/projects/analyzer-diag',
    datePublished: '2025-02-10T00:00:00+05:45',
    dateModified: '2026-10-10T00:00:00+05:45',
  };

  return (
    <SiteLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24">
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Automated Analyzer Diagnostics', path: '/projects/analyzer-diag' },
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
                Instrumentation Engineering
              </span>
              <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                Biomedical Fluidics &middot; Electromechanics
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
              Automated Analyzer Diagnostics: Clinical Instrumentation, Fluidic Calibration &amp; Fault Isolation
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
              A comprehensive technical analysis and diagnostic troubleshooting protocol engineered for automated clinical immunoassay and biochemical laboratory instruments. Analyzing micro-stepping syringe probe calibrations (±1.0 µL), negative pressure vacuum dynamics (-40 to -60 kPa), and capacitive liquid level sensing.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm mb-8 font-mono text-xs">
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Vacuum Tolerance</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">-40 to -60 kPa Window</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Dosing Precision</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">±1.0 µL Repeatability</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Sensing Modality</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Capacitive LLD Circuit</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Fault Coverage</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">12 Core Subsystems</strong>
              </div>
            </div>
          </header>

          <figure className="mb-12 overflow-hidden rounded-2xl border border-slate-200 dark:border-[#222933] bg-[#173338] shadow-lg">
            <Image
              src="/engineering-analyzer-diagnostics.svg"
              alt="Project documentation illustration of an automated clinical analyzer with sample carousel, probes, tubing, and vacuum readout"
              width={1200}
              height={675}
              priority
              className="h-auto w-full"
            />
            <figcaption className="border-t border-white/10 bg-[#173338] px-5 py-3 text-xs text-[#D8F8EA] sm:px-6">
              Instrumentation documentation: sample carousel, probe path, fluidic tubing, and vacuum diagnostic readout.
            </figcaption>
          </figure>

          {/* Deep Technical Content */}
          <article className="space-y-12 text-[#1E293B] dark:text-[#CBD5E1]">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                1. Pneumatic &amp; Negative Pressure Fluidics Architecture
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Automated clinical analyzers rely on precise fluidic paths to aspirate patient serum, dispense enzymatic reagents, and flush reaction cuvettes. Vacuum waste manifolds operate within a strict negative pressure tolerance window of <strong>-40 to -60 kPa</strong> monitored by analog piezoresistive pressure transducers.
              </p>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-[#090B0E] font-mono text-xs sm:text-sm text-slate-300 space-y-3">
                <div className="text-[#34D399] font-bold pb-2 border-b border-[#222933]">Fluidic Pressure Diagnostics:</div>
                <div>&bull; <strong>Pressure &gt; -40 kPa (Insufficient Vacuum):</strong> Causes incomplete cuvette aspiration, reagent carryover contamination, and liquid accumulation in the wash station.</div>
                <div>&bull; <strong>Pressure &lt; -60 kPa (Excessive Vacuum):</strong> Leads to cavitation, air micro-bubbles in sample lines, and premature fatigue of silicone pinch valves.</div>
                <div>&bull; <strong>Leak Rate Protocol:</strong> System vacuum decay must remain &lt; 1.5 kPa over a 60-second dwell test with all solenoid pinch valves isolated.</div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                2. Micro-Stepping Syringe Displacement &amp; Volumetric Calibration
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Precision sample dosing relies on lead-screw stepper motors operating at 1/16 microstepping resolution coupled to a glass syringe cylinder. Aspiration volumes range from 2.0 µL (concentrated serum) up to 250 µL (diluent buffer).
              </p>
              <p className="leading-relaxed text-base sm:text-lg">
                The displacement protocol maps commanded motor step pulses (<MathFormula math="N_{steps}" />) directly to dispensed volumetric fluid:
              </p>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-[#222933] bg-[#090B0E] text-[#34D399] space-y-3">
                <div className="font-bold text-slate-300 font-sans text-xs">Syringe Dispense Volume Formulation:</div>
                <MathFormula math="V = N_{steps} \cdot \left(\frac{P_{pitch}}{200 \cdot M}\right) \cdot \left(\frac{\pi D_{syringe}^2}{4}\right)" block />
                <div className="text-xs text-slate-400 pt-3 border-t border-[#222933] space-y-1 font-sans">
                  <div>• <MathFormula math="N_{steps}" />: Commanded electrical step pulses sent to the lead-screw motor</div>
                  <div>• <MathFormula math="P_{pitch}" />: Lead-screw linear thread pitch (advance per 360° turn)</div>
                  <div>• <MathFormula math="M = 16" />: Microstepping resolution division factor (3,200 pulses/revolution)</div>
                  <div>• <MathFormula math="D_{syringe}" />: Inner bore diameter of the precision glass syringe cylinder</div>
                </div>
              </div>
              <p className="leading-relaxed text-base sm:text-lg">
                Gravimetric balance verification with deionized water achieved repeatability within ±1.0 µL with a coefficient of variation (CV) under 0.8%.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                3. Capacitive Liquid Level Detection (LLD)
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                To minimize probe contamination, the sample needle must not submerge deeper than 2.0 mm into patient serum. The probe functions as one plate of a dynamic capacitor driven by a high-frequency (100 kHz) AC oscillator.
              </p>
              <p className="leading-relaxed text-base sm:text-lg">
                Upon contacting the ionic liquid meniscus, the effective capacitance rises abruptly by 5 to 15 pF. An analog phase-locked comparator trips an interrupt signal to the Z-axis motor controller within 8 milliseconds, immediately halting downward probe travel and initiating sample draw.
              </p>
            </section>
          </article>

          <div className="mt-16">
            <PagePagination
              prev={{ label: 'Electrical Machinery Modeling', path: '/projects/motor-modeling' }}
              next={{ label: 'All Featured Projects', path: '/projects' }}
            />
          </div>
        </div>
    </SiteLayout>
  );
}
