import React from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';

export const metadata = {
  title: "Sports Highlight Motion Reels: Creative Media & Motion Engineering Case Study",
  description: "Technical case study of Sports Highlight Motion Reels by Dipesh Sapkota (dszae): 120fps optical-flow retiming, -14 LUFS multi-layer sound design, DaVinci Resolve color science, and 9:16 mobile framing.",
  alternates: { canonical: '/projects/sports-reels' },
  openGraph: {
    type: 'article',
    title: 'Sports Highlight Motion Reels Case Study | Dipesh Sapkota',
    description: 'A deep-dive technical breakdown of athletic short-form motion editing, sound architecture, and cinematic color transformation.',
    url: 'https://www.dipeshsapkota7.com.np/projects/sports-reels',
    images: [{ url: '/dipesh-sapkota.jpg', alt: 'Sports Highlight Motion Reels by Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sports Highlight Motion Reels Case Study | Dipesh Sapkota',
    description: 'Explore the velocity physics, acoustics, and color science behind athletic motion reels edited by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function SportsReelsCaseStudyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Sports Highlight Motion Reels: Kinetic Pacing, Sound Architecture & Color Science',
    description: 'Technical methodology behind short-form sports highlight video editing, optical flow interpolation, sound design acoustics, and color science.',
    author: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    publisher: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
    },
    url: 'https://www.dipeshsapkota7.com.np/projects/sports-reels',
    datePublished: '2025-06-15T00:00:00+05:45',
    dateModified: '2026-10-10T00:00:00+05:45',
    keywords: [
      'Sports Highlight Editing',
      'Optical Flow Speed Ramping',
      'DaVinci Resolve Color Grading',
      'Premiere Pro',
      'After Effects',
      'Sound Design LUFS',
      'Motion Graphics',
      'Video Production'
    ],
  };

  return (
    <SiteLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24">
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Sports Highlight Motion Reels', path: '/projects/sports-reels' },
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
                Featured Media Case Study
              </span>
              <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                Creative Media &middot; Motion Engineering
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
              Sports Highlight Motion Reels: Kinetic Pacing, Sound Architecture &amp; Color Science
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
              A comprehensive technical case study on engineering high-impact athletic reels for commercial clients, sports academies, and social audiences. Dissecting velocity curve mathematics, optical-flow frame reconstruction, psychoacoustic sound design, and color pipeline calibration.
            </p>

            {/* Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm mb-8 font-mono text-xs">
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Role</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Lead Video Editor &amp; Motion Designer</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Capture Standard</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">120 FPS UHD / 1/250s Shutter</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Audio Standard</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">-14.0 LUFS / -1.0 dB True Peak</strong>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Color Transform</span>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">DaVinci Wide Gamut &rarr; Rec.709</strong>
              </div>
            </div>

            {/* Tool Stack Tags */}
            <div className="flex flex-wrap gap-2">
              {['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve Studio', 'Optical Flow Retiming', 'Multi-Layer Sound Design', 'iZotope RX Audio', 'Dynamic 9:16 Framing'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-[#16221D] text-[#334155] dark:text-[#CBD5E1] border border-slate-200 dark:border-[#26372F]"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>

          {/* Interactive NLE Simulation Monitor */}
          <section className="mb-14" aria-labelledby="nle-monitor-heading">
            <div className="rounded-2xl border border-slate-200 dark:border-[#26372F] bg-[#0A100D] p-5 sm:p-6 shadow-xl overflow-hidden font-mono text-slate-200">
              <div className="flex items-center justify-between border-b border-[#26372F] pb-3 mb-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="font-bold text-red-400 uppercase tracking-wider">Multi-Track NLE Timeline Monitor</span>
                </div>
                <div className="text-[#34D399] font-bold text-xs sm:text-sm">TIMECODE: 00:01:24:18</div>
              </div>

              {/* Scope & Curve Graph */}
              <div className="relative py-4 flex flex-col items-center justify-center">
                <div className="w-full relative h-28 sm:h-32 flex items-center justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" fill="none">
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#1F2E27" strokeDasharray="4 4" />
                    <line x1="0" y1="50" x2="500" y2="50" stroke="#1F2E27" strokeDasharray="4 4" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="#1F2E27" strokeDasharray="4 4" />

                    {/* Speed Ramp Bezier Curve */}
                    <path
                      d="M 10 80 Q 100 80 140 30 T 250 15 T 360 40 Q 400 80 490 80"
                      stroke="#34D399"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M 10 80 Q 100 80 140 30 T 250 15 T 360 40 Q 400 80 490 80 L 490 95 L 10 95 Z"
                      fill="url(#caseEmeraldGlow)"
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient id="caseEmeraldGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>

                    {/* Keyframe Nodes */}
                    <circle cx="140" cy="30" r="5" fill="#34D399" />
                    <circle cx="250" cy="15" r="6" fill="#FFFFFF" stroke="#34D399" strokeWidth="2.5" />
                    <circle cx="360" cy="40" r="5" fill="#34D399" />
                  </svg>

                  <div className="absolute top-1 text-[11px] bg-[#162920] border border-[#34D399]/50 text-[#34D399] px-2.5 py-1 rounded shadow">
                    Speed Ramp Curve: 800% Velocity &rarr; 20% Optical Flow Impact Deceleration
                  </div>
                </div>

                <div className="flex items-center justify-between w-full text-[11px] text-slate-400 mt-3 px-2">
                  <span>Interpolation: Bidirectional Optical Vector Field</span>
                  <span className="text-[#34D399]">Loudness Target: -14.0 LUFS</span>
                  <span className="hidden sm:inline">Color Pipeline: Rec.709 Tone Curve</span>
                </div>
              </div>

              {/* Multi-Track DAW Layers */}
              <div className="space-y-2 pt-4 border-t border-[#26372F] text-[11px]">
                <div className="flex items-center gap-3">
                  <span className="w-8 text-slate-400 font-bold">V2</span>
                  <div className="flex-1 h-5 rounded bg-[#1C2C23] border border-[#34D399]/40 flex items-center px-2.5 text-[#34D399] font-semibold text-[10px] sm:text-xs">
                    Lower-Third Kinetic Typography &amp; Match Tracking Overlays
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 text-slate-400 font-bold">V1</span>
                  <div className="flex-1 h-5 rounded bg-[#162B21] border border-[#34D399]/30 flex items-center px-2.5 text-[#34D399] font-medium text-[10px] sm:text-xs">
                    Master Footage (4K 120 FPS Capture Retimed via Speed Ramps)
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 text-slate-400 font-bold">A1</span>
                  <div className="flex-1 h-5 rounded bg-[#11221B] border border-[#26372F] flex items-center px-2.5 text-slate-300 text-[10px] sm:text-xs">
                    Diegetic Foley: Leather Ball Strikes, Turf Impact, Sneaker Traction
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 text-slate-400 font-bold">A2</span>
                  <div className="flex-1 h-5 rounded bg-[#101F18] border border-[#26372F] flex items-center px-2.5 text-slate-300 text-[10px] sm:text-xs">
                    Stadium Atmosphere: Stereo Reverb Bed, Crowd Roar &amp; Riser Transitions
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 text-slate-400 font-bold">A3</span>
                  <div className="flex-1 h-5 rounded bg-[#0D1A14] border border-[#26372F] flex items-center px-2.5 text-slate-400 text-[10px] sm:text-xs">
                    Soundtrack Stem with Dynamic EQ Sidechain Ducking (-3.5dB on Hits)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Deep Technical Article Breakdown */}
          <article className="space-y-12 text-[#1E293B] dark:text-[#CBD5E1]">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#065F46]/10 dark:bg-[#34D399]/15 text-[#065F46] dark:text-[#34D399] text-sm flex items-center justify-center font-mono font-bold">
                  01
                </span>
                The Kinetic Pacing Problem: Why Raw Sports Footage Fails Short-Form Retention
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Modern sports audiences on vertical platforms (Instagram Reels, TikTok, YouTube Shorts) consume media with aggressive cognitive filters. Standard linear broadcast highlights—even when high-definition—suffer from monotonous pacing: steady camera pans, predictable ball trajectories, and generic crowd noise.
              </p>
              <p className="leading-relaxed text-base sm:text-lg">
                To engineer reels that achieve a <strong>+85% viewer retention curve</strong> through the final frame, the editing pipeline must establish non-linear kinetic pacing. This means compressing dead air (such as an athlete setting up a penalty kick or dribbling in midfield) to 800% velocity, followed by a dramatic, sub-frame deceleration to 20% speed at the exact instant of ball strike or pivot.
              </p>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-[#26372F] bg-slate-50 dark:bg-[#111B17] text-sm">
                <strong className="text-[#065F46] dark:text-[#34D399] block mb-1">Core Editing Thesis:</strong>
                Speed is only perceived in contrast to slowness. Velocity ramping creates an elastic tension-and-release rhythm that commands involuntary visual attention.
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#065F46]/10 dark:bg-[#34D399]/15 text-[#065F46] dark:text-[#34D399] text-sm flex items-center justify-center font-mono font-bold">
                  02
                </span>
                Velocity Physics &amp; Optical Flow Vector Interpolation
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Capturing athletic movement requires cameras operating at a minimum of <strong>120 frames per second (fps)</strong> with a shutter speed locked at 1/250s or 1/500s. A high shutter speed eliminates rotational motion blur, preserving crisp silhouette definition of the athlete and ball.
              </p>
              <p className="leading-relaxed text-base sm:text-lg">
                However, when decelerating footage to extreme slow-motion (e.g., 10%–20% on a 60fps sequence), standard editing software attempts to either duplicate frames (causing visible stepping/stutter) or blend frames together (causing hazy double-vision artifacts). To eliminate this, my pipeline employs <strong>Bidirectional Optical Flow Motion Vector Estimation</strong>:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#121A17]">
                  <h3 className="font-mono text-xs uppercase font-bold text-[#065F46] dark:text-[#34D399] mb-2">Nearest Neighbor / Frame Blending</h3>
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#A7B0BE] leading-relaxed">
                    Duplicates adjacent frames or averages pixel luma across temporal steps. Results in jerky motion judder and transparent ghosting around high-contrast athletic borders. Unacceptable for commercial broadcast delivery.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-[#065F46]/30 dark:border-[#34D399]/40 bg-emerald-50/50 dark:bg-[#162921]/60">
                  <h3 className="font-mono text-xs uppercase font-bold text-[#065F46] dark:text-[#34D399] mb-2">Optical Flow Motion Estimation</h3>
                  <p className="text-xs sm:text-sm text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
                    {"Tracks pixel velocity vectors v⃗(x, y) between frame n and n+1, synthesizing intermediate in-between frames mathematically. Produces glassy, butter-smooth 1000fps-style deceleration without artificial distortion."}
                  </p>
                </div>
              </div>

              <p className="leading-relaxed text-base sm:text-lg">
                Velocity transition handles are keyframed using asymmetric cubic bezier curves in After Effects and DaVinci Resolve. The acceleration ramp is steep (reaching maximum rate in &lt;180ms), while the decelerating tail is cushioned with an exponential decay curve to let the viewer absorb the athletic apex.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#065F46]/10 dark:bg-[#34D399]/15 text-[#065F46] dark:text-[#34D399] text-sm flex items-center justify-center font-mono font-bold">
                  03
                </span>
                Sound Architecture: The 4-Layer Acoustic Design Pipeline
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                In athletic video, <strong>visuals convey information, but sound conveys physical impact</strong>. Raw camera microphone audio is uniformly thin, reverberant, and distorted. In my workflow, 100% of the game audio is replaced or heavily bolstered by a custom four-layer Foley architecture:
              </p>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#121A17] flex items-start gap-3">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold">Layer 1:</span>
                  <div>
                    <strong className="text-[#0F172A] dark:text-[#F9FAFB] block">Diegetic Mechanical Foley</strong>
                    <span className="text-[#475569] dark:text-[#A7B0BE]">
                      Synthesized tactile samples: boot-on-leather thuds, basketball backboard vibrations, net swishes, sneaker traction squeaks on hardwood, and referee whistles tuned to peak clarity around 3.2 kHz.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#121A17] flex items-start gap-3">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold">Layer 2:</span>
                  <div>
                    <strong className="text-[#0F172A] dark:text-[#F9FAFB] block">Spatial Stadium Atmosphere Bed</strong>
                    <span className="text-[#475569] dark:text-[#A7B0BE]">
                      Stereo crowd presence with convolution reverb matching the specific physical arena dimensions. Dynamic swells automated to rise right before a goal or dunk.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#121A17] flex items-start gap-3">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold">Layer 3:</span>
                  <div>
                    <strong className="text-[#0F172A] dark:text-[#F9FAFB] block">Non-Diegetic Psychoacoustic Accents</strong>
                    <span className="text-[#475569] dark:text-[#A7B0BE]">
                      50 Hz sub-bass rumble drops timed with the instant of impact, customized whoosh rises synced with velocity acceleration, and subtle tape-stop artifacts on transition cut points.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#121A17] flex items-start gap-3">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold">Layer 4:</span>
                  <div>
                    <strong className="text-[#0F172A] dark:text-[#F9FAFB] block">Master Bus &amp; Loudness Compliance (-14 LUFS)</strong>
                    <span className="text-[#475569] dark:text-[#A7B0BE]">
                      Sidechain ducking reduces music bed amplitude by -3.5 dB whenever high-impact Foley triggers. Master chain: FabFilter Pro-Q dynamic EQ &rarr; SSL G-Master Bus Compressor (2:1 ratio, 30ms attack, auto release) &rarr; True Peak Limiter set to -1.0 dBFS, mastering accurately to -14.0 LUFS integrated loudness to prevent mobile clipping.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#065F46]/10 dark:bg-[#34D399]/15 text-[#065F46] dark:text-[#34D399] text-sm flex items-center justify-center font-mono font-bold">
                  04
                </span>
                Color Science in DaVinci Resolve: Studio Node Tree Pipeline
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Sports footage is rarely shot under controlled studio lighting. Matches transition from harsh midday sunlight into stadium floodlights, creating extreme dynamic range variances, sodium-vapor color casts, and blown-out highlights on white jerseys.
              </p>
              <p className="leading-relaxed text-base sm:text-lg">
                In DaVinci Resolve Studio, I establish a sequential node tree utilizing a scene-referred color management workflow:
              </p>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-[#0E1612] font-mono text-xs sm:text-sm text-slate-300 space-y-3">
                <div className="text-[#34D399] font-bold pb-2 border-b border-[#26372F]">
                  DaVinci Resolve Node Tree Architecture:
                </div>
                <div><strong>Node 01 [Exposure &amp; Offset]:</strong> Camera balance recovery using linear offset wheel without altering color ratios.</div>
                <div><strong>Node 02 [Color Space Transform (CST)]:</strong> Source camera log profile &rarr; DaVinci Wide Gamut / Intermediate.</div>
                <div><strong>Node 03 [Primary Curve Tone Mapping]:</strong> Custom S-curve extending shadow detail while rolling off specular stadium highlights.</div>
                <div><strong>Node 04 [Grass &amp; Turf Isolation]:</strong> Hue vs Hue / Hue vs Sat qualifier pulling turf to vibrant emerald tones without spilling into warm athlete skin tones (vector angle 55&deg; preserved).</div>
                <div><strong>Node 05 [Skin Tone Qualifier]:</strong> Dedicated secondary qualifier balancing melanin vectors along the skin-tone line regardless of floodlight tint.</div>
                <div><strong>Node 06 [Film Halation &amp; Grain]:</strong> Subtle 35mm optical halation applied to high-contrast stadium edges for cinematic richness.</div>
                <div><strong>Node 07 [Output CST]:</strong> Master conversion from DaVinci Wide Gamut &rarr; Rec.709 / Gamma 2.4 delivery standard.</div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#065F46]/10 dark:bg-[#34D399]/15 text-[#065F46] dark:text-[#34D399] text-sm flex items-center justify-center font-mono font-bold">
                  05
                </span>
                Spatial Composition &amp; Safe-Zone Architecture for Vertical 9:16
              </h2>
              <p className="leading-relaxed text-base sm:text-lg">
                Broadcasting sports originally formatted in widescreen 16:9 onto vertical 9:16 smartphone displays requires more than simple center-cropping. Center crops consistently cut off the ball during rapid counter-attacks or isolate athlete limbs at awkward margins.
              </p>
              <p className="leading-relaxed text-base sm:text-lg">
                I deploy <strong>Dynamic Smooth Pan Trajectory Tracking</strong> using Mocha Pro planar trackers and After Effects motion tracking. The 9:16 frame anticipates the ball vector, moving ahead of the athlete&apos;s sprint rather than lagging behind.
              </p>
              <p className="leading-relaxed text-base sm:text-lg">
                Furthermore, all visual assets, scores, and kinetic captions respect platform safe zones: maintaining a 15% margin on the right edge (avoiding TikTok/Reels engagement icons) and a 20% margin on the bottom (avoiding captions and audio marquee tags).
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#065F46]/10 dark:bg-[#34D399]/15 text-[#065F46] dark:text-[#34D399] text-sm flex items-center justify-center font-mono font-bold">
                  06
                </span>
                Measured Production Outcomes &amp; Client Impact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#121A17] text-center">
                  <div className="text-3xl font-bold text-[#065F46] dark:text-[#34D399] font-mono mb-1">50+</div>
                  <div className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">Delivered Reels Packages</div>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#121A17] text-center">
                  <div className="text-3xl font-bold text-[#065F46] dark:text-[#34D399] font-mono mb-1">87%</div>
                  <div className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">Average View-Through Rate</div>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#121A17] text-center">
                  <div className="text-3xl font-bold text-[#065F46] dark:text-[#34D399] font-mono mb-1">100%</div>
                  <div className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">-14 LUFS Audio Compliance</div>
                </div>
              </div>
              <p className="leading-relaxed text-base sm:text-lg">
                These motion edit architectures have powered official promotional reels for sports academies, inter-college tournament highlights, and athlete personal branding reels, consistently outperforming standard broadcast cuts in algorithmic reach and audience retention.
              </p>
            </section>
          </article>

          {/* Bottom Pagination */}
          <div className="mt-16">
            <PagePagination
              prev={{ label: 'IOE Admission Guide', path: '/projects/ioe-admission-guide' }}
              next={{ label: 'Sportivo Case Study', path: '/projects/sportivo' }}
            />
          </div>
        </div>
    </SiteLayout>
  );
}
