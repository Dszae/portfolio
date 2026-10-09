import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata = {
  title: 'Visual Archive & Photo Gallery',
  description: 'Explore the visual archive of Dipesh Sapkota (dszae) documenting engineering student life at IOE Thapathali Campus, tech exhibitions (Yathartha), and digital media production in Nepal.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    type: 'website',
    title: 'Visual Archive & Photo Gallery | Dipesh Sapkota',
    description: 'Visual moments of campus life, robotics events, creative media, and milestone celebrations of Dipesh Sapkota.',
    url: '/gallery',
    images: [{ url: '/yathartha.webp', width: 1200, height: 675, alt: 'Yathartha event team visual archive' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Archive | Dipesh Sapkota',
    description: 'Campus life, robotics events, and creative media moments of Dipesh Sapkota.',
    images: ['/yathartha.webp'],
  },
};

const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Participating in College Cricket Tournament',
    alt: 'Students posing together outdoors with cricket bats',
    img: '/cricket.webp',
    category: 'Campus Life',
    description: 'Taking part in inter-batch collegiate sports and recreational tournaments alongside classmates at IOE Thapathali Campus in Kathmandu.',
  },
  {
    id: 2,
    title: 'Successfully Conducted Yathartha Tech Exhibition',
    alt: 'Yathartha event team posing on stage with medals and posters',
    img: '/yathartha.webp',
    category: 'Events & Exhibitions',
    description: 'Organizing committee celebrating on stage following the successful execution of Yathartha, the premier annual national tech exhibition featuring robotics competitions and student engineering projects.',
  },
  {
    id: 3,
    title: 'Celebrating Academic Results with the Clamphook Team',
    alt: 'Group gathered around a dining table under Nepal-themed wall art',
    img: '/clamphook.webp',
    category: 'Work & Team',
    description: 'Gathering with the instructional and production team at Clamphook Academy to celebrate outstanding entrance examination performance by students.',
  },
  {
    id: 4,
    title: 'Everyday Engineering Lectures',
    alt: 'Student sitting at a classroom desk during a lecture',
    img: '/lecture.webp',
    category: 'Campus Life',
    description: 'Classroom sessions, theoretical engineering lectures, and coursework discussions at Thapathali Campus, Institute of Engineering.',
  },
  {
    id: 5,
    title: 'Deep Focus & Creative Concept Exploration',
    alt: 'Student wearing a headset in front of video-editing software',
    img: '/exploring.webp',
    category: 'Creative Media',
    description: 'In the editing studio with headphones, color grading, cutting timelines, and experimenting with audio synchronization for video projects.',
  },
  {
    id: 6,
    title: 'Nagdhunga Surung Marga Roadside',
    alt: 'Dipesh standing by a roadside with hills in the background',
    img: '/nagdhunga surung marga.webp',
    category: 'Exploration',
    description: 'Road trip and engineering field visit around the Nagdhunga Tunnel road construction site in the hills of Kathmandu Valley, Nepal.',
  },
];

const siteUrl = 'https://www.dipeshsapkota7.com.np';

const galleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Visual Archive & Photo Gallery | Dipesh Sapkota',
  url: `${siteUrl}/gallery`,
  description: 'Visual moments of campus life, robotics events, creative media, and milestone celebrations of Dipesh Sapkota.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Visual Archive Items',
    numberOfItems: GALLERY_IMAGES.length,
    itemListElement: GALLERY_IMAGES.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'ImageObject',
        name: item.title,
        caption: item.description,
        contentUrl: `${siteUrl}${item.img}`,
        thumbnailUrl: `${siteUrl}${item.img}`,
      },
    })),
  },
};

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-32">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/gallery' },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
        />

        <header className="mb-12">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
            Visual Archive & Memories
          </span>
          <h1 className="text-4xl font-bold mb-4">Photo Gallery & Visual Archive</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A visual documentation of engineering studies at IOE Thapathali Campus, robotics exhibitions, creative studio workflows, and team milestones in Nepal.
          </p>
        </header>

        <GalleryGrid images={GALLERY_IMAGES} />

        <div className="mt-16 flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/skills"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
          >
            Explore Skills
          </Link>
          <Link
            href="/certificates"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            View Certifications
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Browse Projects
          </Link>
          <Link
            href="/resume"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Curriculum Vitae
          </Link>
        </div>
      </main>
    </>
  );
}

