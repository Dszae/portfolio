const content = `# Dipesh Sapkota | Portfolio & Web Applications

> Official portfolio of Dipesh Sapkota, a Computer Engineering student at IOE Thapathali, AI/ML enthusiast, video editor, and motion graphics designer in Nepal.

## Canonical pages
- [Homepage](https://www.dipeshsapkota7.com.np/): Professional background, skills, experience, projects, and contact details.
- [About](https://www.dipeshsapkota7.com.np/about): Biography and professional focus.
- [Contact](https://www.dipeshsapkota7.com.np/contact): Collaboration and freelance contact information.

## Projects
- [Sportivo](https://sportivo.dipeshsapkota7.com.np/): Live sports platform with match schedules, search, and stream switching.
- [IOE Entrance Preparation Portal](https://ioe-admission.dipeshsapkota7.com.np/): Engineering admission guides, cutoff analytics, and priority form tools.
- [Git Visualizer](https://git-visualizer.dipeshsapkota7.com.np/): Interactive learning tool for Git commands and version-control data flow.

## Skills
C, C++, Python, React, Next.js, embedded systems, circuit analysis, video editing, graphic design, and motion graphics.

## Other machine-readable resources
- [Portfolio markdown API](https://www.dipeshsapkota7.com.np/api/markdown)
- [API catalog](https://www.dipeshsapkota7.com.np/.well-known/api-catalog)
- [Agent card](https://www.dipeshsapkota7.com.np/.well-known/agent-card.json)
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
