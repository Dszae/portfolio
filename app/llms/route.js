const content = `# Dipesh Sapkota | Portfolio & Web Applications

> Official portfolio of Dipesh Sapkota (dszae), Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal, AI/ML enthusiast, video editor, and motion graphics designer.

## Primary Profile & Identity
- Name: Dipesh Sapkota
- Alias / Handle: dszae / dsz.ae / DszAe18
- Profession: Computer Engineering Student & Freelance Video Editor / Motion Graphics Designer
- Campus: Institute of Engineering (IOE), Thapathali Campus, Kathmandu, Nepal
- Primary Portrait Image: https://www.dipeshsapkota7.com.np/dipesh-sapkota.jpg
- Official Website: https://www.dipeshsapkota7.com.np/
- Profiles & Socials: GitHub (https://github.com/dszae), LinkedIn (https://linkedin.com/in/dszae), DEV Community (https://dev.to/dszae), YouTube (https://www.youtube.com/@dszae), X (https://x.com/DszAe18), Instagram (https://instagram.com/dsz.ae), Facebook (https://facebook.com/dsz.ae), TikTok (https://tiktok.com/@dsz_ae)

## Canonical Pages & Dedicated Sitelinks
- [Homepage](https://www.dipeshsapkota7.com.np/): System overview, primary hero section, downloadable curriculum vitae, and direct collaboration channels.
- [About Me](https://www.dipeshsapkota7.com.np/about): Detailed personal biography, academic journey at IOE Thapathali, 4+ years of freelance experience, 50+ clients, and creative design philosophy.
- [Technical Proficiency & Skills](https://www.dipeshsapkota7.com.np/skills): Core skills in C/C++, Python, React.js, PHP, video editing (Premiere Pro, DaVinci Resolve), motion graphics (After Effects), and engineering hardware (Proteus, circuit analysis).
- [Resume & Journey](https://www.dipeshsapkota7.com.np/resume): Comprehensive work experience at Clamphook Academy and university programs, academic milestones (IOE Thapathali, Janak Model Secondary, Mahendra Adarsha), and downloadable PDF CV.
- [Projects Archive](https://www.dipeshsapkota7.com.np/projects): Interactive live software and engineering projects, including Sportivo, IOE Admission Guide, Git Visualizer, and embedded circuit systems.
- [Visual Archive & Gallery](https://www.dipeshsapkota7.com.np/gallery): High-resolution photo archive documenting campus life, Yathartha National Tech Exhibition, creative media sessions, and engineering field visits.
- [Certifications](https://www.dipeshsapkota7.com.np/certificates): Verified certificates from Udemy, Blackmagic Design, and EDUCBA in Graphic Design, Color Correction, After Effects, and Web Development.
- [Contact](https://www.dipeshsapkota7.com.np/contact): Direct contact details (Kathmandu, Nepal; phone: +977 9764685307; email: dsz.ae18@gmail.com) and direct inquiry messaging.

## Flagship Projects
- [Sportivo](https://sportivo.dipeshsapkota7.com.np/): High-performance live sports streaming platform with real-time match schedule scraping and multi-server stream switching.
- [IOE Admission Guide](https://ioe-admission.dipeshsapkota7.com.np/): Engineering admission ecosystem for Tribhuvan University applicants with rank prediction and automated priority form generation.
- [Git Visualizer](https://git-visualizer.dipeshsapkota7.com.np/): Interactive visual learning tool mapping Git version control commands and repository data flow.

## Machine-Readable Resources & Feeds
- [Sitemap](https://www.dipeshsapkota7.com.np/sitemap.xml)
- [Robots Policy](https://www.dipeshsapkota7.com.np/robots.txt)
- [API Catalog](https://www.dipeshsapkota7.com.np/.well-known/api-catalog)
- [Agent Card](https://www.dipeshsapkota7.com.np/.well-known/agent-card.json)
`;

export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
