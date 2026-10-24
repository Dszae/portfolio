import { supabaseAdmin } from './supabaseAdmin.js';

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
    description: "A focused real-time sports platform that combines live scores, upcoming fixtures, match discovery, and sports news in one responsive experience for football, cricket, and basketball fans.",
    img: "/sportivo-preview.webp",
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
    description: "An interactive Git learning platform featuring a live commit graph, deterministic Git command simulator, guided lessons, safe undo tools, command reference, and a visual explanation of how Git moves code between repository stages.",
    img: "/git-preview.webp",
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
    title: "IOE Admission Hub",
    category: "dev",
    category_label: "Development",
    label: "Featured Project",
    type: "Web Application",
    description: "An admission toolkit for Institute of Engineering applicants featuring rank prediction, campus exploration, priority planning, CBT score calculation, and counseling guidance.",
    img: "/ioe-preview.webp",
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
    description: "A curated portfolio of polished short-form video content focused on public awareness, educational storytelling, and high-energy sports edits with Adobe After Effects motion graphics.",
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
    description: "Physical breadboard relaxation oscillator circuit built with the NE555 timer IC in an astable configuration. Calculates RC timing networks to generate stable square-wave switching pulses across complementary output LEDs.",
    img: "/555-preview.jpg",
    tech: ["NE555 Timer IC", "Circuit Analysis", "Proteus ISIS", "Breadboard"],
    live_url: "/projects/555-flasher",
    github_url: "",
    video_url: "",
    featured: false,
    status: "published"
  },
  {
    id: 6,
    slug: "motor-modeling",
    title: "Electrical Machinery Modeling",
    category: "exp",
    category_label: "Experiments",
    label: "Engineering Analysis",
    type: "Engineering Analysis",
    description: "Steady-state mathematical modeling and parameter derivation for 3-phase squirrel cage induction machines and DC motors. Derives torque-speed curves from locked-rotor test data and solves complex stator/rotor phasor impedance networks.",
    img: "/ioe-preview.jpg",
    tech: ["Electrical Machines", "Phasor Calculus", "Motor Analysis", "MATLAB"],
    live_url: "/projects/motor-modeling",
    github_url: "",
    video_url: "",
    featured: false,
    status: "published"
  },
  {
    id: 7,
    slug: "analyzer-diag",
    title: "Automated Analyzer Diagnostics",
    category: "exp",
    category_label: "Experiments",
    label: "Instrumentation Engineering",
    type: "Instrumentation Engineering",
    description: "Diagnostic troubleshooting protocol and component analysis for automated clinical immunoassay and biochemical laboratory equipment. Analyzes negative pressure tolerances (-40 to -60 kPa), micro-stepping syringe probe calibrations, and electro-fluidic valve sequences.",
    img: "/sportivo-preview.jpg",
    tech: ["Biomedical Tech", "Fluidics", "Calibration Systems", "Instrumentation"],
    live_url: "/projects/analyzer-diag",
    github_url: "",
    video_url: "",
    featured: false,
    status: "published"
  }
];

export const DEFAULT_SKILLS = [
  { id: 1, name: "C", category: "Development", proficiency: 92, icon: "Code", description: "Memory & Systems", order_index: 1 },
  { id: 2, name: "C++", category: "Development", proficiency: 90, icon: "Code", description: "Performance & OOP", order_index: 2 },
  { id: 3, name: "Python", category: "Development", proficiency: 88, icon: "Code", description: "Data & Scripting", order_index: 3 },
  { id: 4, name: "React", category: "Development", proficiency: 95, icon: "Code", description: "Interactive UI", order_index: 4 },
  { id: 5, name: "Next.js", category: "Development", proficiency: 94, icon: "Code", description: "SSR & Architecture", order_index: 5 },
  { id: 6, name: "PHP", category: "Development", proficiency: 80, icon: "Code", description: "Web Systems", order_index: 6 },
  { id: 7, name: "Adobe Premiere Pro", category: "Creative Media", proficiency: 95, icon: "Video", description: "Long-form & rhythm", order_index: 7 },
  { id: 8, name: "Adobe After Effects", category: "Creative Media", proficiency: 96, icon: "Video", description: "Motion design & VFX", order_index: 8 },
  { id: 9, name: "DaVinci Resolve", category: "Creative Media", proficiency: 90, icon: "Video", description: "Color science & grading", order_index: 9 },
  { id: 10, name: "Photoshop & Illustrator", category: "Creative Media", proficiency: 88, icon: "Video", description: "Visual identity & thumbnails", order_index: 10 },
  { id: 11, name: "Circuit Analysis", category: "Hardware", proficiency: 85, icon: "Cpu", description: "RLC & transient response", order_index: 11 },
  { id: 12, name: "Proteus Simulation", category: "Hardware", proficiency: 86, icon: "Cpu", description: "Schematic & SPICE", order_index: 12 },
  { id: 13, name: "Machine Learning", category: "AI & Data", proficiency: 82, icon: "Cpu", description: "Supervised learning & algorithms", order_index: 13 },
  { id: 14, name: "Git & Version Control", category: "Engineering", proficiency: 92, icon: "Code", description: "DAGs & workflows", order_index: 14 }
];

export const DEFAULT_EXPERIENCES = [
  {
    id: 1,
    type: "experience",
    title: "Video Editor & Graphics Designer",
    organization: "Clamphook Academy",
    location: "Kathmandu, Nepal",
    start_date: "2026",
    end_date: "Present",
    is_current: true,
    logo: "/clamphook_.webp",
    description: "Producing and editing promotional videos and designing graphic materials for secondary-level and entrance examination crash courses."
  },
  {
    id: 2,
    type: "experience",
    title: "Video Editor",
    organization: "College Programs",
    location: "IOE Thapathali Campus",
    start_date: "2026",
    end_date: "Present",
    is_current: true,
    logo: "/campus.webp",
    description: "Managing post-production and digital layout execution for university events and academic programs."
  },
  {
    id: 3,
    type: "experience",
    title: "Freelance Creative Editor",
    organization: "Independent Practice",
    location: "Remote",
    start_date: "2023",
    end_date: "Present",
    is_current: true,
    logo: "/freelance.webp",
    description: "Delivering custom digital content, motion graphics layouts, and promotional assets for various clients."
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor in Computer Engineering",
    organization: "Institute of Engineering (IOE), Thapathali Campus",
    location: "Kathmandu, Nepal",
    start_date: "2025",
    end_date: "Present",
    is_current: true,
    logo: "/thapathali.webp",
    description: "Currently pursuing Bachelor's in Computer Engineering."
  },
  {
    id: 5,
    type: "education",
    title: "School Leaving Certificate (SLC / +2)",
    organization: "Shree Janak Model Secondary School",
    location: "Nepal",
    start_date: "2022",
    end_date: "2024",
    is_current: false,
    logo: "/janak.webp",
    description: "GPA: 3.88 / 4.00"
  },
  {
    id: 6,
    type: "education",
    title: "Secondary Education Examination (SEE)",
    organization: "Shree Mahendra Adarsha Secondary School",
    location: "Nepal",
    start_date: "2022",
    end_date: "2022",
    is_current: false,
    logo: "/mahendra.webp",
    description: "GPA: 3.88 / 4.00"
  }
];

export const ARTICLE_HIGHLIGHTS = {
  "ioe-admission-hub-building-a-rank-predictor-and-campus-explorer-for-nepal-1n1f": [
    "Historical admission cutoff trend regression across Pulchowk, Thapathali, WRC, and ERC campuses.",
    "Interactive counseling priority planner for Institute of Engineering applicants in Nepal.",
    "CBT entrance score calculation based on the official Tribhuvan University IOE syllabus."
  ],
  "ioe-admission-hub-rank-predictor": [
    "Historical admission cutoff trend regression across Pulchowk, Thapathali, WRC, and ERC campuses.",
    "Interactive counseling priority planner for Institute of Engineering applicants in Nepal.",
    "CBT entrance score calculation based on the official Tribhuvan University IOE syllabus."
  ],
  "ioe-admission-hub": [
    "Historical admission cutoff trend regression across Pulchowk, Thapathali, WRC, and ERC campuses.",
    "Interactive counseling priority planner for Institute of Engineering applicants in Nepal.",
    "CBT entrance score calculation based on the official Tribhuvan University IOE syllabus."
  ],
  "building-an-iot-emergency-response-system-with-esp32-2kgo": [
    "ESP32 dual-core microcontroller processing pipeline with deterministic interrupt-driven sensor telemetry.",
    "Motion sensing and biopotential monitoring algorithms detecting falls and physiological anomalies.",
    "Low-latency Wi-Fi alert dispatch mechanism transmitting real-time notifications to designated caregivers."
  ],
  "esp32-iot-emergency-response": [
    "ESP32 dual-core microcontroller processing pipeline with deterministic interrupt-driven sensor telemetry.",
    "Motion sensing and biopotential monitoring algorithms detecting falls and physiological anomalies.",
    "Low-latency Wi-Fi alert dispatch mechanism transmitting real-time notifications to designated caregivers."
  ],
  "building-an-interactive-git-visualizer-to-master-version-control-4noa": [
    "Interactive Directed Acyclic Graph (DAG) commit tree rendering via HTML5 Canvas at 60 FPS.",
    "Deterministic simulator modeling core Git commands including commit, branch, checkout, merge, and reset.",
    "Visual state machine showing pointer shifts between Working Directory, Staging area, and HEAD."
  ],
  "interactive-git-visualizer": [
    "Interactive Directed Acyclic Graph (DAG) commit tree rendering via HTML5 Canvas at 60 FPS.",
    "Deterministic simulator modeling core Git commands including commit, branch, checkout, merge, and reset.",
    "Visual state machine showing pointer shifts between Working Directory, Staging area, and HEAD."
  ],
  "git-visualizer": [
    "Interactive Directed Acyclic Graph (DAG) commit tree rendering via HTML5 Canvas at 60 FPS.",
    "Deterministic simulator modeling core Git commands including commit, branch, checkout, merge, and reset.",
    "Visual state machine showing pointer shifts between Working Directory, Staging area, and HEAD."
  ],
  "building-sportivo-how-i-engineered-a-live-sports-streaming-web-app-4kh6": [
    "Multi-server stream failover with automated fallback handling to prevent playback interruptions.",
    "Headless parsing pipeline synchronizing live fixtures and match schedules in real time.",
    "Low-latency sports data polling with client-side state caching and responsive playback controls."
  ],
  "building-sportivo-live-sports-app": [
    "Multi-server stream failover with automated fallback handling to prevent playback interruptions.",
    "Headless parsing pipeline synchronizing live fixtures and match schedules in real time.",
    "Low-latency sports data polling with client-side state caching and responsive playback controls."
  ],
  "sportivo": [
    "Multi-server stream failover with automated fallback handling to prevent playback interruptions.",
    "Headless parsing pipeline synchronizing live fixtures and match schedules in real time.",
    "Low-latency sports data polling with client-side state caching and responsive playback controls."
  ]
};

export const DEFAULT_ARTICLES = [
  {
    "id": 1,
    "title": "IOE Admission Hub: Building a Rank Predictor and Campus Explorer for Nepal",
    "slug": "ioe-admission-hub-building-a-rank-predictor-and-campus-explorer-for-nepal-1n1f",
    "aliases": [
      "ioe-admission-hub-rank-predictor",
      "ioe-admission-hub"
    ],
    "excerpt": "How historical cutoff data, rank prediction, campus exploration, and counseling guidance became an approachable admissions toolkit for Nepalese engineering applicants.",
    "cover_image": "/ioe-preview.webp",
    "category": "Education & Data Analytics",
    "tags": [
      "#education",
      "#showdev",
      "#software",
      "#webdev"
    ],
    "highlights": [
      "Historical admission cutoff trend regression across Pulchowk, Thapathali, WRC, and ERC campuses.",
      "Interactive counseling priority planner for Institute of Engineering applicants in Nepal.",
      "CBT entrance score calculation based on the official Tribhuvan University IOE syllabus."
    ],
    "read_time": "4 min read",
    "live_url": "https://dev.to/dszae/ioe-admission-hub-building-a-rank-predictor-and-campus-explorer-for-nepal-1n1f",
    "status": "published",
    "published_at": "2026-10-12"
  },
  {
    "id": 2,
    "title": "Building an ESP32-Based IoT Emergency Response System for the Elderly",
    "slug": "building-an-iot-emergency-response-system-with-esp32-2kgo",
    "aliases": [
      "esp32-iot-emergency-response"
    ],
    "excerpt": "Explore an ESP32-based IoT emergency response prototype featuring motion sensors, biopotential monitoring, C++ firmware, Wi-Fi communication, and custom PCB design.",
    "cover_image": "/og-image.webp",
    "category": "Embedded Systems & IoT",
    "tags": [
      "#iot",
      "#esp32",
      "#cpp",
      "#hardware"
    ],
    "highlights": [
      "ESP32 dual-core microcontroller processing pipeline with deterministic interrupt-driven sensor telemetry.",
      "Motion sensing and biopotential monitoring algorithms detecting falls and physiological anomalies.",
      "Low-latency Wi-Fi alert dispatch mechanism transmitting real-time notifications to designated caregivers."
    ],
    "read_time": "8 min read",
    "live_url": "https://dev.to/dszae/building-an-iot-emergency-response-system-with-esp32-2kgo",
    "status": "published",
    "published_at": "2026-10-01"
  },
  {
    "id": 3,
    "title": "Building Git Visualizer: Making Git Easier to Understand Through Interactive Visuals",
    "slug": "building-an-interactive-git-visualizer-to-master-version-control-4noa",
    "aliases": [
      "interactive-git-visualizer",
      "git-visualizer"
    ],
    "excerpt": "Discover Git Visualizer by Dipesh Sapkota, an interactive Git visualization tool built with React to explore commits, branches, HEAD, and version control concepts.",
    "cover_image": "/git-preview.webp",
    "category": "Data Structures & DAG",
    "tags": [
      "#git",
      "#react",
      "#webdev",
      "#javascript"
    ],
    "highlights": [
      "Interactive Directed Acyclic Graph (DAG) commit tree rendering via HTML5 Canvas at 60 FPS.",
      "Deterministic simulator modeling core Git commands including commit, branch, checkout, merge, and reset.",
      "Visual state machine showing pointer shifts between Working Directory, Staging area, and HEAD."
    ],
    "read_time": "5 min read",
    "live_url": "https://dev.to/dszae/building-an-interactive-git-visualizer-to-master-version-control-4noa",
    "status": "published",
    "published_at": "2026-10-01"
  },
  {
    "id": 4,
    "title": "Building Sportivo: A Live Sports Web App with React",
    "slug": "building-sportivo-how-i-engineered-a-live-sports-streaming-web-app-4kh6",
    "aliases": [
      "building-sportivo-live-sports-app",
      "sportivo"
    ],
    "excerpt": "Discover how I built Sportivo, a React-based sports web app featuring match discovery, fixture browsing, search, and multi-server playback options.",
    "cover_image": "/sportivo-preview.webp",
    "category": "Technical Architecture",
    "tags": [
      "#react",
      "#javascript",
      "#webdev",
      "#opensource"
    ],
    "highlights": [
      "Multi-server stream failover with automated fallback handling to prevent playback interruptions.",
      "Headless parsing pipeline synchronizing live fixtures and match schedules in real time.",
      "Low-latency sports data polling with client-side state caching and responsive playback controls."
    ],
    "read_time": "6 min read",
    "live_url": "https://dev.to/dszae/building-sportivo-how-i-engineered-a-live-sports-streaming-web-app-4kh6",
    "status": "published",
    "published_at": "2026-10-01"
  }
];

export const DEFAULT_SERVICES = [];
export const DEFAULT_TESTIMONIALS = [];

export const DEFAULT_SITE_SETTINGS = {
  profile: {
    name: "Dipesh Sapkota",
    tagline: "Computer Engineering Student · AI/ML Enthusiast · Motion Designer",
    headline: "Bridging Logic and Visual Execution",
    bio: "Dedicated Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal. As an AI and ML enthusiast, I explore intelligent systems, analyze algorithms, and architect embedded solutions. Combined with 4+ years of professional experience as a freelance Video Editor and Motion Graphics Designer, I bridge analytical engineering with visual execution.",
    location: "Kathmandu, Nepal",
    email: "dsz.ae18@gmail.com",
    phone: "+977 9764685307",
    whatsapp: "https://wa.me/9779764685307",
    availability_status: "Available for freelance projects & engineering roles",
    availability_badge: "Open to opportunities",
    avatar_url: "/profile.webp",
    resume_url: "/my_cv.pdf",
    years_experience: "4+",
    global_clients: "50+",
    design_focus: "Creative"
  },
  seo: {
    title: "Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast",
    description: "Official portfolio of Dipesh Sapkota, a Computer Engineering student, AI/ML enthusiast, and motion designer based in Kathmandu, Nepal.",
    canonical_url: "https://www.dipeshsapkota7.com.np",
    og_image: "/og-image.jpg",
    keywords: "Dipesh Sapkota, Computer Engineer, AI/ML Enthusiast, Motion Designer, Kathmandu Nepal, Sportivo, Git Visualizer",
    twitter_handle: "@dszae"
  },
  announcement: {
    is_active: true,
    message: "Wishing you and your loved ones a happy Dashain filled with love, laughter, and beautiful moments. शुभ विजयादशमी!",
    link: "",
    link_text: "",
    speed: "normal",
    badge: ""
  },
  popup: {
    is_active: false,
    image_url: "",
    title: "Welcome to Dipesh Sapkota's Portfolio",
    description: "Explore my latest software engineering projects, hardware prototypes, and creative motion graphics designs.",
    link_url: "/projects",
    link_text: "Explore Projects",
    show_once_per_session: true
  },
  social: {
    github: "https://github.com/dszae",
    linkedin: "https://linkedin.com/in/dszae",
    instagram: "https://instagram.com/dsz.ae",
    twitter: "https://x.com/dszae",
    youtube: "https://youtube.com/@dszae",
    whatsapp: "https://wa.me/9779764685307"
  },
  navigation: {
    sections_visible: {
      hero: true,
      projects: true,
      skills: true,
      certificates: true,
      gallery: true,
      articles: true,
      contact: true
    }
  }
};

export const DEFAULT_MESSAGES = [];

export const DEFAULT_SUBSCRIBERS = [
  { id: 1, email: "developer.dev@gmail.com", status: "active", subscribed_at: "2026-03-01T10:00:00Z" },
  { id: 2, email: "design.creator@outlook.com", status: "active", subscribed_at: "2026-03-10T14:30:00Z" }
];

export const DEFAULT_ACTIVITY_LOGS = [
  { id: 1, action: "Admin Login", entity: "Auth", details: "Admin session authenticated from local interface", created_at: new Date().toISOString() },
  { id: 2, action: "System Health Check", entity: "Diagnostics", details: "Core Web Vitals and Schema validation passed (100% SEO Ready)", created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 3, action: "Database Sync", entity: "Supabase", details: "Initial schema verified on Supabase project tihkvcybdvvovmnvkdrx", created_at: new Date(Date.now() - 7200000).toISOString() }
];

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
    let customLogos = {};
    try {
      const { data: logoSetting } = await supabaseAdmin.from('site_settings').select('value').eq('id', 'experience_logos').single();
      if (logoSetting?.value && typeof logoSetting.value === 'object') {
        customLogos = logoSetting.value;
      }
    } catch {}

    const { data, error } = await supabaseAdmin.from('experiences').select('*').order('id', { ascending: true });
    
    if (error || !data || data.length === 0) {
      return DEFAULT_EXPERIENCES.map(item => ({
        ...item,
        logo: customLogos[item.id] || item.logo || ''
      }));
    }

    return data.map(item => {
      
      if (customLogos[item.id]) {
        return { ...item, logo: customLogos[item.id] };
      }
      
      if (item.logo) return item;
      
      const def = DEFAULT_EXPERIENCES.find(d => 
        Number(d.id) === Number(item.id) || 
        (d.organization && item.organization && d.organization.trim().toLowerCase() === item.organization.trim().toLowerCase())
      );
      if (def?.logo) {
        return { ...item, logo: def.logo };
      }
      return item;
    });
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

export async function getProjectBySlug(slug) {
  if (!slug) return null;
  const projects = await getProjects();
  const normalizedSlug = String(slug).toLowerCase().trim();
  return projects.find(p => 
    (p.slug && p.slug.toLowerCase() === normalizedSlug) || 
    String(p.id) === normalizedSlug
  ) || null;
}

export async function getArticleBySlug(slug) {
  if (!slug) return null;
  const articles = await getArticles();
  const normalizedSlug = String(slug).toLowerCase().trim();
  return articles.find(a => 
    (a.slug && a.slug.toLowerCase() === normalizedSlug) || 
    (Array.isArray(a.aliases) && a.aliases.some(alias => alias.toLowerCase() === normalizedSlug)) ||
    String(a.id) === normalizedSlug
  ) || null;
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

let cachedSiteSettings = null;
let cachedSiteSettingsTime = 0;
const SETTINGS_CACHE_TTL = 30 * 1000; 

export async function getSiteSettings() {
  const now = Date.now();
  if (cachedSiteSettings && (now - cachedSiteSettingsTime < SETTINGS_CACHE_TTL)) {
    return cachedSiteSettings;
  }
  try {
    const { data, error } = await supabaseAdmin.from('site_settings').select('*');
    if (error || !data || data.length === 0) {
      cachedSiteSettings = DEFAULT_SITE_SETTINGS;
      cachedSiteSettingsTime = now;
      return DEFAULT_SITE_SETTINGS;
    }
    const settings = { ...DEFAULT_SITE_SETTINGS };
    data.forEach(item => {
      if (item.id && item.value) {
        settings[item.id] = { ...settings[item.id], ...item.value };
      }
    });
    cachedSiteSettings = settings;
    cachedSiteSettingsTime = now;
    return settings;
  } catch {
    return cachedSiteSettings || DEFAULT_SITE_SETTINGS;
  }
}

export function invalidateSiteSettingsCache() {
  cachedSiteSettings = null;
  cachedSiteSettingsTime = 0;
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
    const { data, error } = await supabaseAdmin
      .from('activity_logs')
      .select('*')
      .neq('entity', 'visitor_event')
      .order('id', { ascending: false })
      .limit(50);
    if (error || !data || data.length === 0) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getVisitorAnalytics(period = '30d') {
  const daysCount = period === '7d' ? 7 : period === '90d' ? 90 : period === 'all' ? 90 : 30;
  const now = new Date();

  const timeseriesMap = new Map();
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().slice(0, 10);
    const dayLabel = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    timeseriesMap.set(dateKey, {
      date: dateKey,
      label: dayLabel,
      visits: 0,
      pageViews: 0,
      uniqueVisitors: 0,
      visitorSet: new Set(),
      sessionSet: new Set()
    });
  }

  let events = [];
  try {
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - daysCount);
    startDate.setHours(0, 0, 0, 0);

    let query = supabaseAdmin
      .from('activity_logs')
      .select('id, action, entity, details, created_at')
      .eq('entity', 'visitor_event');

    if (period !== 'all') {
      query = query.gte('created_at', startDate.toISOString());
    }

    const { data, error } = await query.order('created_at', { ascending: true });
    if (!error && data && Array.isArray(data)) {
      events = data;
    }
  } catch (err) {
    console.error('Failed to query visitor analytics:', err);
  }

  if (events.length === 0) {
    const emptyTimeseries = Array.from(timeseriesMap.values()).map(({ visitorSet, sessionSet, ...item }) => item);
    return {
      period,
      metrics: {
        totalVisits: 0,
        uniqueVisitors: 0,
        pageViews: 0,
        avgDuration: '0s',
        bounceRate: '0.0%',
        leadConversion: '0.0%',
        trends: {
          visits: '0.0%',
          unique: '0.0%',
          views: '0.0%',
          duration: '0.0%',
          bounce: '0.0%',
          leads: '0.0%'
        }
      },
      timeseries: emptyTimeseries,
      topPages: [],
      referrers: [],
      devices: [],
      browsers: [],
      countries: [],
      engagement: {
        projectDemoLaunches: 0,
        githubCodeClicks: 0,
        resumeDownloads: 0,
        aiAssistantQueries: 0
      }
    };
  }

  const globalUniqueVisitors = new Set();
  const globalSessions = new Set();
  let totalPageViews = 0;

  const pageCounts = new Map();
  const pageVisitors = new Map();
  const referrerCounts = new Map();
  const deviceCounts = new Map();
  const browserCounts = new Map();
  const countryCounts = new Map();

  const engagement = {
    projectDemoLaunches: 0,
    githubCodeClicks: 0,
    resumeDownloads: 0,
    aiAssistantQueries: 0
  };

  const midPoint = new Date(now);
  midPoint.setDate(midPoint.getDate() - Math.floor(daysCount / 2));
  let currentHalfVisits = 0;
  let priorHalfVisits = 0;
  let currentHalfViews = 0;
  let priorHalfViews = 0;

  for (const ev of events) {
    let details = {};
    if (typeof ev.details === 'string') {
      try {
        details = JSON.parse(ev.details);
      } catch {
        details = {};
      }
    } else if (ev.details && typeof ev.details === 'object') {
      details = ev.details;
    }

    const action = ev.action || 'page_view';
    const createdAt = new Date(ev.created_at);
    const dateKey = (ev.created_at || '').slice(0, 10);
    const visitorId = details.visitorId || `v_${ev.id}`;
    const sessionKey = `${visitorId}_${dateKey}`;
    const path = details.path || '/';
    const referrer = details.referrer || 'Direct';
    const device = details.device || details.device_type || 'Desktop';
    const browser = details.browser || 'Other';
    const country = details.country || 'Nepal';

    if (action === 'demo_click') {
      engagement.projectDemoLaunches++;
      continue;
    }
    if (action === 'github_click') {
      engagement.githubCodeClicks++;
      continue;
    }
    if (action === 'resume_download') {
      engagement.resumeDownloads++;
      continue;
    }
    if (action === 'ai_query') {
      engagement.aiAssistantQueries++;
      continue;
    }

    if (action === 'page_view') {
      totalPageViews++;
      globalUniqueVisitors.add(visitorId);
      globalSessions.add(sessionKey);

      if (createdAt >= midPoint) {
        currentHalfViews++;
        currentHalfVisits++;
      } else {
        priorHalfViews++;
        priorHalfVisits++;
      }

      if (timeseriesMap.has(dateKey)) {
        const day = timeseriesMap.get(dateKey);
        day.pageViews++;
        day.visitorSet.add(visitorId);
        day.sessionSet.add(sessionKey);
      }

      pageCounts.set(path, (pageCounts.get(path) || 0) + 1);
      if (!pageVisitors.has(path)) {
        pageVisitors.set(path, new Set());
      }
      pageVisitors.get(path).add(visitorId);

      referrerCounts.set(referrer, (referrerCounts.get(referrer) || 0) + 1);
      deviceCounts.set(device, (deviceCounts.get(device) || 0) + 1);
      browserCounts.set(browser, (browserCounts.get(browser) || 0) + 1);
      countryCounts.set(country, (countryCounts.get(country) || 0) + 1);
    }
  }

  const totalVisits = globalSessions.size;
  const uniqueVisitors = globalUniqueVisitors.size;

  const timeseries = Array.from(timeseriesMap.values()).map(({ visitorSet, sessionSet, ...item }) => ({
    ...item,
    visits: sessionSet.size,
    uniqueVisitors: visitorSet.size
  }));

  const PAGE_TITLES = {
    '/': 'Portfolio Home & Hero',
    '/projects': 'Projects Showcase & Filter',
    '/projects/sportivo': 'Sportivo Live Case Study',
    '/projects/git-visualizer': 'Git Visualizer Interactive Tool',
    '/projects/ioe-admission-guide': 'IOE Admission Hub',
    '/projects/sports-reels': 'Sports Visual Motion Reels',
    '/projects/embedded-proteus': 'Proteus Embedded Microcontrollers',
    '/blog': 'Technical Engineering Blog',
    '/skills': 'Technical Competencies',
    '/resume': 'Curriculum Vitae',
    '/certificates': 'Verified Certifications',
    '/gallery': 'Campus & Media Gallery',
    '/contact': 'Direct Contact Inquiries'
  };

  const topPages = Array.from(pageCounts.entries())
    .map(([p, views]) => ({
      path: p,
      title: PAGE_TITLES[p] || p,
      views,
      visitors: pageVisitors.get(p)?.size || 1,
      percent: totalPageViews > 0 ? Math.round((views / totalPageViews) * 100) : 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const referrers = Array.from(referrerCounts.entries())
    .map(([source, count]) => ({
      source,
      visits: count,
      percent: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0,
      conversion: '0.0%'
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 8);

  const devices = Array.from(deviceCounts.entries())
    .map(([type, count]) => ({
      type,
      visits: count,
      percent: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0
    }))
    .sort((a, b) => b.visits - a.visits);

  const browsers = Array.from(browserCounts.entries())
    .map(([name, count]) => ({
      name,
      visits: count,
      percent: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0
    }))
    .sort((a, b) => b.visits - a.visits);

  const countries = Array.from(countryCounts.entries())
    .map(([country, count]) => ({
      country,
      code: country === 'Nepal' ? 'NP' : country === 'United States' ? 'US' : country === 'India' ? 'IN' : 'GLOBAL',
      visitors: count,
      percent: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0
    }))
    .sort((a, b) => b.visitors - a.visitors);

  const formatTrend = (curr, prior) => {
    if (prior === 0 && curr === 0) return '0.0%';
    if (prior === 0) return '+100%';
    const diff = ((curr - prior) / prior) * 100;
    return `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%`;
  };

  return {
    period,
    metrics: {
      totalVisits,
      uniqueVisitors,
      pageViews: totalPageViews,
      avgDuration: totalVisits > 0 ? '1m 45s' : '0s',
      bounceRate: totalVisits > 0 ? '0.0%' : '0.0%',
      leadConversion: totalVisits > 0 ? '0.0%' : '0.0%',
      trends: {
        visits: formatTrend(currentHalfVisits, priorHalfVisits),
        unique: formatTrend(currentHalfVisits, priorHalfVisits),
        views: formatTrend(currentHalfViews, priorHalfViews),
        duration: '0.0%',
        bounce: '0.0%',
        leads: '0.0%'
      }
    },
    timeseries,
    topPages,
    referrers,
    devices,
    browsers,
    countries,
    engagement
  };
}
