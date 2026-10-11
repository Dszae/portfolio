import React from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';

export const metadata = {
  title: "Astable Multivibrator LED Flasher: Hardware Circuit Case Study",
  description: "Technical case study of the NE555 Astable Multivibrator LED Flasher by Dipesh Sapkota: RC timing calculations, Proteus ISIS transient simulation, and physical breadboard hardware prototyping.",
  alternates: { canonical: '/projects/555-flasher' },
  openGraph: {
    type: 'article',
    title: 'NE555 Astable Multivibrator Hardware Prototype | Dipesh Sapkota',
    description: 'Hardware relaxation oscillator prototype engineered around the NE555 timer IC with RC timing calculations and Proteus transient analysis.',
    url: 'https://www.dipeshsapkota7.com.np/projects/555-flasher',
    images: [{ url: '/dipesh-sapkota.jpg', alt: 'Hardware project by Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astable Multivibrator LED Flasher Case Study | Dipesh Sapkota',
    description: 'Circuit analysis, RC timing calculations, and breadboard validation by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function AstableMultivibratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Astable Multivibrator LED Flasher: Circuit Analysis & Hardware Prototype',
    description: 'Technical breakdown of a relaxation oscillator circuit engineered using the NE555 timer IC in an astable multivibrator configuration.',
    author: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    publisher: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
    },
    url: 'https://www.dipeshsapkota7.com.np/projects/555-flasher',
    datePublished: '2024-11-20T00:00:00+05:45',
    dateModified: '2026-10-10T00:00:00+05:45',
  };

  return (
    <SiteLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24">
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Astable Multivibrator LED Flasher', path: '/projects/555-flasher' },
            ]}
          />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          {/* Navigation link */}
          <div className="mb-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Editorial Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/15 border border-[#065F46]/20 dark:border-[#34D399]/30 rounded-lg">
                Engineering Prototype
              </span>
              <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                Hardware &middot; Embedded Circuits
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
              Astable Multivibrator LED Flasher: Circuit Analysis &amp; Physical Breadboard Prototype
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
              A physical hardware relaxation oscillator circuit engineered around the classic NE555 precision timer IC in an astable multivibrator topology. Validating theoretical RC charge/discharge cycles, SPICE/Proteus transient simulation, and physical breadboard oscilloscope measurements.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm mb-8 font-mono text-xs">
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">IC Architecture</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Bipolar NE555 Timer</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Operating Frequency</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">1.5 Hz Oscillation</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Duty Cycle</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">~60% High / 40% Low</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Supply Rail</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">9.0 V DC (Decoupled)</strong>
              </div>
            </div>
          </header>

          {/* Deep Technical Content */}
          <article className="space-y-12 text-[#1E293B] dark:text-[#CBD5E1]">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                1. Relaxation Oscillator Fundamentals &amp; State Equations
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                An astable multivibrator lacks a stable resting state; it continuously alternates between HIGH and LOW output states without an external trigger. Inside the NE555 timer, three matched 5 kΩ resistors divide the DC supply rail (Vcc) into two internal threshold levels: 2/3 Vcc at the Threshold input (pin 6) and 1/3 Vcc at the Trigger input (pin 2).
              </p>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-[#090B0E] font-mono text-xs sm:text-sm text-slate-300 space-y-4">
                <div className="text-[#34D399] font-bold pb-2 border-b border-[#222933]">Circuit Timing Formulas:</div>
                
                <div>
                  <div className="text-slate-400">1. Charging Time (t_high): Output HIGH while C1 charges through (R1 + R2)</div>
                  <div className="text-[#34D399] pl-4 mt-1 font-semibold">
                    t_high = ln(2) × (R1 + R2) × C1 ≈ 0.693 × (R1 + R2) × C1
                  </div>
                </div>

                <div>
                  <div className="text-slate-400">2. Discharging Time (t_low): Output LOW while C1 discharges through R2</div>
                  <div className="text-[#34D399] pl-4 mt-1 font-semibold">
                    t_low = ln(2) × R2 × C1 ≈ 0.693 × R2 × C1
                  </div>
                </div>

                <div>
                  <div className="text-slate-400">3. Total Oscillation Period (T): Total cycle duration</div>
                  <div className="text-[#34D399] pl-4 mt-1 font-semibold">
                    T = t_high + t_low = 0.693 × (R1 + 2×R2) × C1
                  </div>
                </div>

                <div>
                  <div className="text-slate-400">4. Oscillation Frequency (f): Flashes per second</div>
                  <div className="text-[#34D399] pl-4 mt-1 font-semibold">
                    f = 1 / T = 1.44 / [ (R1 + 2×R2) × C1 ]
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                2. Component Sizing &amp; Decoupling Architecture
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                To yield a visible, rhythmic LED flash alternating at approximately 1.4 Hz, the timing network was calculated using a 10 µF electrolytic capacitor (C1), a 10 kΩ resistor (R1), and a 47 kΩ resistor (R2):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                <li>t_high = 0.693 × (10 kΩ + 47 kΩ) × 10 µF ≈ 0.395 seconds (LED 1 ON)</li>
                <li>t_low = 0.693 × 47 kΩ × 10 µF ≈ 0.325 seconds (LED 2 ON)</li>
                <li>Total Period (T) = 0.395 s + 0.325 s = 0.720 seconds → Frequency (f) ≈ 1.39 Hz</li>
              </ul>
              <p className="leading-relaxed text-base sm:text-lg">
                <strong>Critical Engineering Consideration (Pin 5 Bypass):</strong> The Control Voltage pin (pin 5) accesses the internal upper comparator ladder. A 100 nF ceramic disc decoupling capacitor was tied to ground to bypass supply rail transients, preventing false comparator switching caused by sudden LED turn-on current spikes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                3. Simulation &amp; Physical Breadboard Verification
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Prior to physical fabrication, a full schematic capture and transient domain simulation was executed in <strong>Proteus ISIS</strong>. The virtual oscilloscope confirmed clean square-wave outputs with &lt;100 ns rise times and verified the complementary sinking and sourcing configuration of output pin 3 driving dual anti-parallel indicator LEDs with current-limiting 470 Ω resistors.
              </p>
              <p className="leading-relaxed text-base sm:text-lg">
                Physical prototyping on a solderless breadboard validated the transient calculations within 4.2% component tolerance variance.
              </p>
            </section>
          </article>

          <div className="mt-16">
            <PagePagination
              prev={{ label: 'Sports Motion Reels', path: '/projects/sports-reels' }}
              next={{ label: 'Electrical Machinery Modeling', path: '/projects/motor-modeling' }}
            />
          </div>
        </div>
    </SiteLayout>
  );
}
