import { supabaseAdmin } from './supabaseAdmin';

export const DEFAULT_CERTIFICATES = [
  { id: 1, title: "Graphic Design Masterclass", org: "Udemy", img: "/graphic-design.webp", category: "Design", credential_url: "" },
  { id: 2, title: "Motion Design with Figma", org: "Udemy", img: "/motion-design.webp", category: "Motion", credential_url: "" },
  { id: 3, title: "After Effects Course", org: "EDUCBA", img: "/after-effects.webp", category: "Video", credential_url: "" },
  { id: 4, title: "DaVinci Resolve 16: Color Correction", org: "Blackmagicdesign", img: "/davinci-resolve.webp", category: "Video", credential_url: "" },
  { id: 5, title: "Adobe Premiere Pro CC Masterclass", org: "Udemy", img: "/premiere-pro.webp", category: "Video", credential_url: "" },
  { id: 6, title: "Web Development Masterclass", org: "Udemy", img: "/web-development.webp", category: "Development", credential_url: "" },
  { id: 7, title: "Google Adwords Crash Course 2021", org: "Udemy", img: "/google-adwords.webp", category: "Marketing", credential_url: "" },
  { id: 8, title: "Design Principles, Typography & Color Theory", org: "Udemy", img: "/design-principles.webp", category: "Design", credential_url: "" }
];

export const DEFAULT_GALLERY_IMAGES = [
  { id: 1, title: "Participating in college cricket tournament", alt: "Students posing together outdoors with cricket bats", img: "/cricket.webp", category: "Sports", type: "image", video_url: "" },
  { id: 2, title: "Successfully conducted Yathartha", alt: "Yathartha event team posing on stage with medals and posters", img: "/yathartha.webp", category: "Events", type: "image", video_url: "" },
  { id: 3, title: "Celebrating incredible results of Clamphook with the team", alt: "Group gathered around a dining table under Nepal-themed wall art", img: "/clamphook.webp", category: "Team", type: "image", video_url: "" },
  { id: 4, title: "Attending boring lectures", alt: "Student sitting at a classroom desk during a lecture", img: "/lecture.webp", category: "Campus", type: "image", video_url: "" },
  { id: 5, title: "Deep in focus and exploring concepts", alt: "Student wearing a headset in front of video-editing software", img: "/exploring.webp", category: "Work", type: "image", video_url: "" },
  { id: 6, title: "Nagdhunga Surung Marga", alt: "Dipesh standing by a roadside with hills in the background", img: "/nagdhunga surung marga.webp", category: "Field Visit", type: "image", video_url: "" }
];

export const DEFAULT_PROJECTS = [
  {
    id: 1,
    slug: "sportivo",
    title: "Sportivo — Live Scores, Fixtures & Sports News",
    category: "dev",
    category_label: "Development",
    label: "Featured Project",
    type: "Live Sports Streaming Platform",
    description: "A focused real-time sports platform that brings live scores, upcoming fixtures, match discovery, and sports news into one responsive experience.",
    img: "/sportivo-preview.jpg",
    tech: ["Next.js", "React", "Node.js", "Tailwind CSS", "REST APIs"],
    live_url: "https://sportivo.dipeshsapkota7.com.np/",
    github_url: "https://github.com/dszae/sportivo",
    video_url: "",
    featured: true,
    status: "published"
  },
  {
    id: 2,
    slug: "git-visualizer",
    title: "Git Visualizer",
    category: "dev",
    category_label: "Development",
    label: "Featured Project",
    type: "Interactive Educational Tool",
    description: "An interactive, canvas-driven learning tool designed to demystify Git version control internals. Dynamically renders DAG commit trees in real time.",
    img: "/git-preview.jpg",
    tech: ["HTML5 Canvas", "JavaScript", "Git DAG", "CSS3"],
    live_url: "https://git-visualizer.dipeshsapkota7.com.np/",
    github_url: "https://github.com/dszae/git-visualizer",
    video_url: "",
    featured: true,
    status: "published"
  },
  {
    id: 3,
    slug: "ioe-admission-guide",
    title: "IOE Admission Guide",
    category: "dev",
    category_label: "Development",
    label: "Featured Project",
    type: "Web Application",
    description: "A comprehensive counseling and admissions portal built for Tribhuvan University engineering applicants with historical cutoff percentiles and predictive ranking.",
    img: "/ioe-preview.jpg",
    tech: ["React", "JavaScript", "Data Analytics", "Tailwind CSS"],
    live_url: "https://ioe-admission.dipeshsapkota7.com.np/",
    github_url: "https://github.com/dszae/ioe-admission-guide",
    video_url: "",
    featured: true,
    status: "published"
  },
  {
    id: 4,
    slug: "sports-reels",
    title: "Social Media Video Content",
    category: "media",
    category_label: "Creative Media",
    label: "Featured Work",
    type: "Instagram Video Collection",
    description: "A curated portfolio of polished short-form video content focused on public awareness, educational storytelling, and high-energy sports edits.",
    img: "/instagram-videos.png",
    tech: ["After Effects", "Instagram", "Motion Design", "Premiere Pro"],
    live_url: "https://instagram.com/dsz.ae",
    github_url: "",
    video_url: "https://instagram.com/dsz.ae",
    featured: true,
    status: "published"
  },
  {
    id: 5,
    slug: "555-flasher",
    title: "Astable Multivibrator LED Flasher",
    category: "exp",
    category_label: "Experiments",
    label: "Hardware Prototype",
    type: "Hardware Circuit Prototype",
    description: "Physical breadboard relaxation oscillator circuit built with the NE555 timer IC in an astable configuration with complementary output LEDs.",
    img: "/555-preview.jpg",
    tech: ["NE555 Timer IC", "Circuit Analysis", "Proteus ISIS", "Breadboard"],
    live_url: "",
    github_url: "",
    video_url: "",
    featured: false,
    status: "published"
  }
];

export const DEFAULT_SKILLS = [
  { id: 1, name: "JavaScript / TypeScript", category: "Programming", proficiency: 92, icon: "SiJavascript", order_index: 1 },
  { id: 2, name: "React / Next.js", category: "Web Development", proficiency: 95, icon: "SiNextdotjs", order_index: 2 },
  { id: 3, name: "Tailwind CSS", category: "Web Development", proficiency: 94, icon: "SiTailwindcss", order_index: 3 },
  { id: 4, name: "Node.js & REST APIs", category: "Backend", proficiency: 85, icon: "SiNodedotjs", order_index: 4 },
  { id: 5, name: "Adobe After Effects", category: "Motion & Media", proficiency: 96, icon: "SiAdobeaftereffects", order_index: 5 },
  { id: 6, name: "DaVinci Resolve & Premiere Pro", category: "Motion & Media", proficiency: 90, icon: "SiAdobepremierepro", order_index: 6 },
  { id: 7, name: "C / C++ & Data Structures", category: "Engineering", proficiency: 86, icon: "SiCplusplus", order_index: 7 },
  { id: 8, name: "Proteus & Circuit Simulation", category: "Engineering", proficiency: 82, icon: "Cpu", order_index: 8 },
  { id: 9, name: "Git & Version Control", category: "Tools", proficiency: 90, icon: "SiGit", order_index: 9 },
  { id: 10, name: "Supabase & PostgreSQL", category: "Backend", proficiency: 84, icon: "SiSupabase", order_index: 10 }
];

export const DEFAULT_EXPERIENCES = [
  {
    id: 1,
    type: "education",
    title: "Bachelor in Computer Engineering",
    organization: "Tribhuvan University (IOE)",
    location: "Kathmandu, Nepal",
    start_date: "2021",
    end_date: "Present",
    is_current: true,
    description: "Focusing on software architecture, embedded systems, computer networks, digital signal processing, and engineering mathematics."
  },
  {
    id: 2,
    type: "experience",
    title: "Lead Frontend & Motion Designer",
    organization: "Freelance / Independent",
    location: "Remote",
    start_date: "2022",
    end_date: "Present",
    is_current: true,
    description: "Crafting modern interactive web applications with Next.js, and producing cinematic motion graphics for commercial brand campaigns."
  },
  {
    id: 3,
    type: "experience",
    title: "Media Lead & Event Organizer",
    organization: "Yathartha Tech Festival",
    location: "Thapathali Campus, IOE",
    start_date: "2023",
    end_date: "2024",
    is_current: false,
    description: "Led the video production, social media promotions, visual branding, and event coverage for the annual national technology festival."
  }
];

export const DEFAULT_ARTICLES = [
  {
    id: 1,
    title: "Engineering Motion: Why 60fps Physics-Based Animation Matters on the Web",
    slug: "engineering-motion-web-animation",
    excerpt: "Exploring the boundary between UI interactivity and cinematic feel using springs, requestAnimationFrame, and GPU compositing.",
    content: "When users interact with web interfaces, their perception of speed and polish is defined by tactile responsiveness...",
    cover_image: "/motion-design.webp",
    category: "Design & Tech",
    tags: ["Animation", "Performance", "Next.js"],
    read_time: "5 min read",
    status: "published",
    published_at: "2026-03-15"
  },
  {
    id: 2,
    title: "Demystifying Git DAGs: How Branches Actually Work Under the Hood",
    slug: "demystifying-git-dags",
    excerpt: "A deep dive into blobs, trees, commit objects, and pointers that power modern distributed version control.",
    content: "Git is often taught through memorized commands: commit, push, pull, rebase. But underneath lies a purely mathematical directed acyclic graph...",
    cover_image: "/git-preview.jpg",
    category: "Engineering",
    tags: ["Git", "Data Structures", "Open Source"],
    read_time: "8 min read",
    status: "published",
    published_at: "2026-02-20"
  }
];

export const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "Modern Web Application Development",
    description: "Blazing-fast, SEO-optimized, accessible web applications built with Next.js, React, Tailwind CSS, and headless backends.",
    price_range: "$500 – $2,500+",
    features: ["Next.js App Router & SSR", "Mobile-first responsive design", "SEO & Structured Schema", "Speed & Core Web Vitals optimization"],
    icon: "Code",
    is_active: true
  },
  {
    id: 2,
    title: "Motion Graphics & Cinematic Video Editing",
    description: "High-impact short-form video reels, promotional edits, and motion graphic assets designed for modern digital audiences.",
    price_range: "$200 – $1,200+",
    features: ["After Effects 2D/3D motion", "DaVinci Resolve color grading", "Sound design & rhythm matching", "Vertical reels (9:16) & widescreen"],
    icon: "Video",
    is_active: true
  },
  {
    id: 3,
    title: "Technical Consulting & Architecture",
    description: "Guidance on technical strategy, frontend performance refactoring, search engine optimization, and full-stack architecture.",
    price_range: "Hourly / Custom",
    features: ["Audit & performance profiling", "AI search & LLM cataloging", "Database schema planning", "Deployment pipeline setup"],
    icon: "Cpu",
    is_active: true
  }
];

export const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    client_name: "Yathartha Organizing Committee",
    client_role: "Executive Board",
    company: "IOE Thapathali Campus",
    avatar: "/yathartha.webp",
    text: "Dipesh delivered exceptional promotional videos and visual assets that drove record attendance across our tech festival. Highly creative and reliable.",
    rating: 5,
    project_name: "Yathartha Festival"
  },
  {
    id: 2,
    client_name: "Clamphook Team",
    client_role: "Product Lead",
    company: "Clamphook",
    avatar: "/clamphook.webp",
    text: "Superb attention to detail both in software implementation and motion graphics. The visual execution exceeded our expectations.",
    rating: 5,
    project_name: "Branding & Media"
  }
];

export const DEFAULT_SITE_SETTINGS = {
  profile: {
    name: "Dipesh Sapkota",
    tagline: "Computer Engineering Student · Full-Stack Developer · Motion Designer",
    bio: "Passionate computer engineering student combining engineering logic with visual aesthetics. Building responsive web applications and crafting cinematic motion graphics.",
    location: "Kathmandu, Nepal",
    email: "contact@dipeshsapkota7.com.np",
    availability_status: "Available for freelance projects & engineering roles",
    availability_badge: "Open to opportunities",
    avatar_url: "/profile.webp",
    resume_url: "/Dipesh_Sapkota_Resume.pdf"
  },
  seo: {
    title: "Dipesh Sapkota | Computer Engineering & Full-Stack Developer",
    description: "Official portfolio of Dipesh Sapkota, a Computer Engineering student, full-stack web developer, and motion designer based in Kathmandu, Nepal.",
    canonical_url: "https://www.dipeshsapkota7.com.np",
    og_image: "/og-image.jpg",
    keywords: "Dipesh Sapkota, Computer Engineer, Next.js Developer, Motion Designer, Kathmandu Nepal, Sportivo, Git Visualizer",
    twitter_handle: "@dszae"
  },
  announcement: {
    is_active: true,
    message: "🚀 Explore my latest project: Sportivo live sports platform and new 2026 motion reels!",
    link: "/projects/sportivo",
    link_text: "Check it out"
  },
  social: {
    github: "https://github.com/dszae",
    linkedin: "https://linkedin.com/in/dipesh-sapkota",
    instagram: "https://instagram.com/dsz.ae",
    twitter: "https://x.com/dszae",
    youtube: "https://youtube.com/@dszae"
  },
  navigation: {
    sections_visible: {
      hero: true,
      projects: true,
      skills: true,
      certificates: true,
      gallery: true,
      articles: true,
      testimonials: true,
      contact: true
    }
  }
};

export const DEFAULT_MESSAGES = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    subject: "Project Collaboration — Next.js Application",
    message: "Hi Dipesh, I saw your Sportivo and Git Visualizer projects and was very impressed. We are looking for a developer to help build an interactive web dashboard for our startup.",
    is_read: false,
    reply_status: "unreplied",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 2,
    name: "Sunita Thapa",
    email: "sunita.t@techfest.org",
    subject: "Motion Graphics Reel for Event Promo",
    message: "Hello Dipesh, we love your After Effects video work from Yathartha. Would you be available for a freelance promotional teaser next month?",
    is_read: true,
    reply_status: "replied",
    created_at: new Date(Date.now() - 3600000 * 28).toISOString()
  }
];

export const DEFAULT_SUBSCRIBERS = [
  { id: 1, email: "developer.dev@gmail.com", status: "active", subscribed_at: "2026-03-01T10:00:00Z" },
  { id: 2, email: "design.creator@outlook.com", status: "active", subscribed_at: "2026-03-10T14:30:00Z" }
];

export const DEFAULT_ACTIVITY_LOGS = [
  { id: 1, action: "Admin Login", entity: "Auth", details: "Admin session authenticated from local interface", created_at: new Date().toISOString() },
  { id: 2, action: "System Health Check", entity: "Diagnostics", details: "Core Web Vitals and Schema validation passed (100% SEO Ready)", created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 3, action: "Database Sync", entity: "Supabase", details: "Initial schema verified on Supabase project tihkvcybdvvovmnvkdrx", created_at: new Date(Date.now() - 7200000).toISOString() }
];

// Helper database queries with resilient fallbacks
export async function getCertificates() {
  try {
    const { data, error } = await supabaseAdmin.from('certificates').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_CERTIFICATES;
    return data;
  } catch {
    return DEFAULT_CERTIFICATES;
  }
}

export async function getGalleryImages() {
  try {
    const { data, error } = await supabaseAdmin.from('gallery_images').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_GALLERY_IMAGES;
    return data;
  } catch {
    return DEFAULT_GALLERY_IMAGES;
  }
}

export async function getProjects() {
  try {
    const { data, error } = await supabaseAdmin.from('projects').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_PROJECTS;
    return data;
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function getSkills() {
  try {
    const { data, error } = await supabaseAdmin.from('skills').select('*').order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_SKILLS;
    return data;
  } catch {
    return DEFAULT_SKILLS;
  }
}

export async function getExperiences() {
  try {
    const { data, error } = await supabaseAdmin.from('experiences').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_EXPERIENCES;
    return data;
  } catch {
    return DEFAULT_EXPERIENCES;
  }
}

export async function getArticles() {
  try {
    const { data, error } = await supabaseAdmin.from('articles').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_ARTICLES;
    return data;
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export async function getServices() {
  try {
    const { data, error } = await supabaseAdmin.from('services').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_SERVICES;
    return data;
  } catch {
    return DEFAULT_SERVICES;
  }
}

export async function getTestimonials() {
  try {
    const { data, error } = await supabaseAdmin.from('testimonials').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_TESTIMONIALS;
    return data;
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}

export async function getSiteSettings() {
  try {
    const { data, error } = await supabaseAdmin.from('site_settings').select('*');
    if (error || !data || data.length === 0) return DEFAULT_SITE_SETTINGS;
    const settings = { ...DEFAULT_SITE_SETTINGS };
    data.forEach(item => {
      if (item.id && item.value) {
        settings[item.id] = { ...settings[item.id], ...item.value };
      }
    });
    return settings;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function getContactMessages() {
  try {
    const { data, error } = await supabaseAdmin.from('contact_messages').select('*').order('id', { ascending: false });
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getSubscribers() {
  try {
    const { data, error } = await supabaseAdmin.from('newsletter_subscribers').select('*').order('id', { ascending: false });
    if (error || !data || data.length === 0) return DEFAULT_SUBSCRIBERS;
    return data;
  } catch {
    return DEFAULT_SUBSCRIBERS;
  }
}

export async function getActivityLogs() {
  try {
    const { data, error } = await supabaseAdmin.from('activity_logs').select('*').order('id', { ascending: false }).limit(50);
    if (error || !data || data.length === 0) return DEFAULT_ACTIVITY_LOGS;
    return data;
  } catch {
    return DEFAULT_ACTIVITY_LOGS;
  }
}
