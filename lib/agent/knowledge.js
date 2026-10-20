
import {
  DEFAULT_PROJECTS,
  DEFAULT_SKILLS,
  DEFAULT_CERTIFICATES,
  DEFAULT_EXPERIENCES,
  DEFAULT_ARTICLES,
  DEFAULT_SITE_SETTINGS
} from '../dataService.js';
import { supabaseAdmin } from '../supabaseAdmin.js';

let cachedKnowledgeBase = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; 

export async function getKnowledgeBase() {
  const now = Date.now();
  if (cachedKnowledgeBase && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedKnowledgeBase;
  }

  let projects = DEFAULT_PROJECTS;
  let skills = DEFAULT_SKILLS;
  let certificates = DEFAULT_CERTIFICATES;
  let experiences = DEFAULT_EXPERIENCES;
  let articles = DEFAULT_ARTICLES;
  let settings = DEFAULT_SITE_SETTINGS;

  try {
    const [pRes, sRes, cRes, eRes, aRes, stRes] = await Promise.all([
      supabaseAdmin.from('projects').select('*'),
      supabaseAdmin.from('skills').select('*'),
      supabaseAdmin.from('certificates').select('*'),
      supabaseAdmin.from('experiences').select('*'),
      supabaseAdmin.from('articles').select('*'),
      supabaseAdmin.from('site_settings').select('*')
    ]);

    if (pRes.data && pRes.data.length > 0) projects = pRes.data;
    if (sRes.data && sRes.data.length > 0) skills = sRes.data;
    if (cRes.data && cRes.data.length > 0) certificates = cRes.data;
    if (eRes.data && eRes.data.length > 0) experiences = eRes.data;
    if (aRes.data && aRes.data.length > 0) articles = aRes.data;
    if (stRes.data && stRes.data.length > 0) {
      const merged = { ...DEFAULT_SITE_SETTINGS };
      stRes.data.forEach(item => {
        if (item.id && item.value) merged[item.id] = { ...merged[item.id], ...item.value };
      });
      settings = merged;
    }
  } catch {
  }

  const chunks = [];

chunks.push({
    id: 'bio-primary',
    category: 'profile',
    title: 'Dipesh Sapkota - Biography & Education',
    url: 'https://www.dipeshsapkota7.com.np/about',
    tags: ['about', 'bio', 'education', 'thapathali', 'ioe', 'nepal', 'background', 'contact'],
    content: `Dipesh Sapkota is a Computer Engineering undergraduate student at the Institute of Engineering (IOE), Thapathali Campus, Tribhuvan University in Kathmandu, Nepal (enrolled 2022 - present, graduation expected 2026).
Core interests: Artificial Intelligence, Machine Learning, Computer Engineering, Software Development, Embedded Systems, and Creative Digital Media.
Tagline: "Computer Engineering Student · AI/ML Enthusiast · Motion Designer".
Location: Kathmandu, Nepal (UTC+5:45).
Professional Summary: Over 4+ years of hands-on experience as a freelance Video Editor & Motion Graphics Designer with 50+ clients globally, bridging technical engineering logic with visual storytelling.
Availability: Open for software engineering internships, technical collaborations, and select freelance creative projects.
Contact Email: dsz.ae18@gmail.com
Phone: +977 9764685307
GitHub: https://github.com/dszae
LinkedIn: https://linkedin.com/in/dipesh-sapkota
Twitter/X: https://x.com/dszae
Instagram: https://instagram.com/dsz.ae
WhatsApp: https://wa.me/9779764685307`
  });

experiences.forEach((exp, idx) => {
    chunks.push({
      id: `timeline-${exp.id || idx}`,
      category: 'experience',
      title: `${exp.title} at ${exp.organization}`,
      url: 'https://www.dipeshsapkota7.com.np/resume',
      tags: ['experience', 'resume', 'career', 'education', exp.type, exp.organization.toLowerCase()],
      content: `Role/Degree: ${exp.title}
Organization: ${exp.organization}
Location: ${exp.location || 'Kathmandu, Nepal'}
Period: ${exp.start_date} — ${exp.is_current ? 'Present' : (exp.end_date || '')}
Type: ${exp.type === 'education' ? 'Academic Education' : 'Professional Experience'}
Description: ${exp.description || 'Hands-on engineering, creative execution, and academic milestones.'}`
    });
  });

const devSkills = skills.filter(s => (s.category || '').toLowerCase().includes('dev') || (s.category || '').toLowerCase().includes('software'));
  const mediaSkills = skills.filter(s => (s.category || '').toLowerCase().includes('media') || (s.category || '').toLowerCase().includes('creative') || (s.category || '').toLowerCase().includes('design'));
  const hardwareSkills = skills.filter(s => (s.category || '').toLowerCase().includes('hard') || (s.category || '').toLowerCase().includes('eng'));

  chunks.push({
    id: 'skills-overview',
    category: 'skills',
    title: 'Technical Skills & Competencies Overview',
    url: 'https://www.dipeshsapkota7.com.np/skills',
    tags: ['skills', 'programming', 'software', 'tools', 'technologies', 'stack', 'languages'],
    content: `Programming & Software: ${skills.map(s => s.name).join(', ')}
Software & Web Development: C, C++, Python, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, REST APIs, HTML5 Canvas, Git, GitHub.
Creative Media & Motion: Adobe Premiere Pro, Adobe After Effects, DaVinci Resolve, Figma, Motion Graphics, Sound Design, Color Grading.
Hardware & Engineering: Circuit Analysis, Proteus Simulation, Breadboard Prototyping, NE555 Timer IC, DC Motor Control, Embedded Systems.`
  });

  skills.forEach((skill, idx) => {
    chunks.push({
      id: `skill-${skill.id || idx}`,
      category: 'skills',
      title: `Skill: ${skill.name} (${skill.category || 'General'})`,
      url: 'https://www.dipeshsapkota7.com.np/skills',
      tags: ['skill', skill.name.toLowerCase(), (skill.category || '').toLowerCase()],
      content: `Technology: ${skill.name}
Category: ${skill.category || 'Competency'}
Application: ${skill.description || 'Core engineering and technical competency utilized across academic and client projects.'}`
    });
  });

projects.forEach((proj) => {
    const techList = Array.isArray(proj.tech) ? proj.tech.join(', ') : (proj.tech || '');
    chunks.push({
      id: `project-${proj.slug || proj.id}`,
      category: 'projects',
      title: `Project: ${proj.title}`,
      url: `https://www.dipeshsapkota7.com.np/projects/${proj.slug}`,
      tags: ['project', proj.slug, proj.category, ...(Array.isArray(proj.tech) ? proj.tech.map(t => t.toLowerCase()) : [])],
      content: `Project Name: ${proj.title}
Slug: ${proj.slug}
Type: ${proj.type || 'Software System'}
Category: ${proj.category_label || proj.category || 'Development'}
Technologies: ${techList}
Overview: ${proj.description}
Live Demo URL: ${proj.live_url || 'N/A'}
GitHub Repository: ${proj.github_url || 'N/A'}
Internal URL: https://www.dipeshsapkota7.com.np/projects/${proj.slug}`
    });
  });

articles.forEach((art) => {
    chunks.push({
      id: `article-${art.slug || art.id}`,
      category: 'articles',
      title: `Article: ${art.title}`,
      url: `https://www.dipeshsapkota7.com.np/blog/${art.slug}`,
      tags: ['article', 'blog', art.slug, art.category ? art.category.toLowerCase() : 'tech'],
      content: `Article Title: ${art.title}
Category: ${art.category || 'Technical Writeup'}
Reading Time: ${art.read_time || '5 min read'}
Summary: ${art.excerpt || art.description || ''}
Full URL: https://www.dipeshsapkota7.com.np/blog/${art.slug}`
    });
  });

chunks.push({
    id: 'certifications-summary',
    category: 'certificates',
    title: 'Accredited Certifications & Credentials',
    url: 'https://www.dipeshsapkota7.com.np/certificates',
    tags: ['certificates', 'credentials', 'certifications', 'accreditations', 'udemy'],
    content: `Verified certifications held by Dipesh Sapkota:
${certificates.map(c => `- ${c.title} (Issued by: ${c.org}, Category: ${c.category})`).join('\n')}`
  });

  cachedKnowledgeBase = chunks;
  lastCacheTime = now;
  return chunks;
}

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9_#+.-]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1);
}

export async function retrievePortfolioContext(query, options = {}) {
  const { category, topK = 6 } = options;
  const chunks = await getKnowledgeBase();
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return chunks.slice(0, topK);
  }

  const scored = chunks.map(chunk => {
    let score = 0;
    const chunkTokens = tokenize(`${chunk.title} ${chunk.content} ${(chunk.tags || []).join(' ')}`);
    const chunkSet = new Set(chunkTokens);

if (category && chunk.category !== category) {
      return { chunk, score: -1 };
    }

    queryTokens.forEach(token => {
      
      if (chunk.title.toLowerCase().includes(token)) score += 6;
      
      if (chunk.tags && chunk.tags.some(tag => tag.toLowerCase().includes(token))) score += 4;
      
      if (chunkSet.has(token)) score += 2;
    });

if (chunk.content.toLowerCase().includes(query.toLowerCase())) {
      score += 10;
    }

    return { chunk, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(item => item.chunk);
}

