
import { z } from 'zod';
import { retrievePortfolioContext, getKnowledgeBase } from './knowledge.js';
import { DEFAULT_PROJECTS, DEFAULT_ARTICLES, DEFAULT_SITE_SETTINGS } from '../dataService.js';
import { supabaseAdmin } from '../supabaseAdmin.js';

export const ToolSchemas = {
  search_portfolio: z.object({
    query: z.string().min(1).max(200).describe('Search term or question about Dipesh, his skills, projects, or background.'),
    category: z.enum(['profile', 'projects', 'skills', 'articles', 'experience', 'certificates']).optional().describe('Optional category filter.')
  }),

  search_projects: z.object({
    query: z.string().max(100).optional().describe('Keyword to search in project titles or descriptions.'),
    technology: z.string().max(50).optional().describe('Specific technology filter, e.g. "React", "Python", "Next.js", "After Effects", "C++".'),
    category: z.enum(['dev', 'media', 'exp', 'all']).optional().describe('Category: dev (Development), media (Creative Media), exp (Hardware/Experiments).')
  }),

  get_project_details: z.object({
    project_id: z.string().min(1).max(100).describe('Project slug (e.g. "sportivo", "git-visualizer", "ioe-admission-guide", "555-flasher", "motor-modeling").')
  }),

  get_project_demo: z.object({
    project_id: z.string().min(1).max(100).describe('Project slug to retrieve live demo, interactive playground, or video link for.')
  }),

  search_articles: z.object({
    query: z.string().min(1).max(100).describe('Topic or keyword in technical write-ups and blog articles.')
  }),

  get_profile_information: z.object({
    section: z.enum(['bio', 'education', 'experience', 'availability', 'all']).describe('Section of profile to retrieve.')
  }),

  get_github_repository: z.object({
    owner: z.string().default('dszae').describe('GitHub username or organization. Defaults to dszae.'),
    repo: z.string().min(1).max(100).describe('Repository name, e.g. "sportivo", "git-visualizer", "portfolio".')
  }),

  get_repository_readme: z.object({
    owner: z.string().default('dszae').describe('GitHub username. Defaults to dszae.'),
    repo: z.string().min(1).max(100).describe('Repository name.')
  }),

  get_contact_links: z.object({}).describe('Retrieves official contact methods and social links.')
};

export const OPENAI_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'search_portfolio',
      description: 'Search across the entire portfolio knowledge base including biography, skills, projects, articles, and credentials.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search term or question to find relevant portfolio documents.' },
          category: {
            type: 'string',
            enum: ['profile', 'projects', 'skills', 'articles', 'experience', 'certificates'],
            description: 'Optional filter for a specific category.'
          }
        },
        required: ['query']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_projects',
      description: 'Search, filter, and compare Dipesh’s engineering, web, and creative media projects by technology or category.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keyword to search in project titles or descriptions.' },
          technology: { type: 'string', description: 'Technology filter, e.g. "React", "Python", "Next.js", "C++", "Tailwind CSS".' },
          category: { type: 'string', enum: ['dev', 'media', 'exp', 'all'], description: 'Category filter.' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_project_details',
      description: 'Get deep technical details, architecture, tech stack, and links for a specific project by slug.',
      parameters: {
        type: 'object',
        properties: {
          project_id: { type: 'string', description: 'Project slug, e.g. "sportivo", "git-visualizer", "ioe-admission-guide", "555-flasher".' }
        },
        required: ['project_id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_project_demo',
      description: 'Retrieve live interactive demo URLs, deployment links, or video showcase previews for a project.',
      parameters: {
        type: 'object',
        properties: {
          project_id: { type: 'string', description: 'Project slug, e.g. "sportivo", "git-visualizer", "ioe-admission-guide".' }
        },
        required: ['project_id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_articles',
      description: 'Search technical engineering write-ups, DAG architecture tutorials, and academic articles by Dipesh.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search query for technical articles.' }
        },
        required: ['query']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_profile_information',
      description: 'Retrieve verified biographical information, academic education at IOE Thapathali Campus, or career history.',
      parameters: {
        type: 'object',
        properties: {
          section: {
            type: 'string',
            enum: ['bio', 'education', 'experience', 'availability', 'all'],
            description: 'Specific section of profile to fetch.'
          }
        },
        required: ['section']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_github_repository',
      description: 'Query live GitHub public metadata (stars, primary language, description, forks, and repository URL).',
      parameters: {
        type: 'object',
        properties: {
          owner: { type: 'string', description: 'GitHub username, defaults to dszae.' },
          repo: { type: 'string', description: 'Repository name, e.g. "sportivo" or "git-visualizer".' }
        },
        required: ['repo']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_repository_readme',
      description: 'Fetch the public README.md documentation for a GitHub repository owned by Dipesh.',
      parameters: {
        type: 'object',
        properties: {
          owner: { type: 'string', description: 'GitHub username, defaults to dszae.' },
          repo: { type: 'string', description: 'Repository name.' }
        },
        required: ['repo']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_contact_links',
      description: 'Retrieve verified contact channels, email address, LinkedIn, GitHub, and social media profiles.',
      parameters: {
        type: 'object',
        properties: {}
      }
    }
  }
];

async function fetchProjectsFromDb() {
  try {
    const { data } = await supabaseAdmin.from('projects').select('*');
    if (data && data.length > 0) return data;
  } catch {}
  return DEFAULT_PROJECTS;
}

export const ToolExecutors = {
  search_portfolio: async (args) => {
    const validated = ToolSchemas.search_portfolio.parse(args);
    const results = await retrievePortfolioContext(validated.query, {
      category: validated.category,
      topK: 5
    });

    if (results.length === 0) {
      return {
        found: false,
        message: `No specific portfolio records found matching "${validated.query}".`,
        results: []
      };
    }

    return {
      found: true,
      count: results.length,
      results: results.map(r => ({
        title: r.title,
        category: r.category,
        url: r.url,
        summary: r.content.slice(0, 400)
      }))
    };
  },

  search_projects: async (args) => {
    const validated = ToolSchemas.search_projects.parse(args);
    const projects = await fetchProjectsFromDb();

    let filtered = projects;

    if (validated.category && validated.category !== 'all') {
      filtered = filtered.filter(p => (p.category || '').toLowerCase() === validated.category.toLowerCase());
    }

    if (validated.technology) {
      const techLower = validated.technology.toLowerCase();
      filtered = filtered.filter(p => {
        if (Array.isArray(p.tech)) {
          return p.tech.some(t => t.toLowerCase().includes(techLower));
        }
        return (p.tech || '').toLowerCase().includes(techLower);
      });
    }

    if (validated.query) {
      const qLower = validated.query.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(qLower) || 
        (p.description || '').toLowerCase().includes(qLower)
      );
    }

    return {
      total_matches: filtered.length,
      projects: filtered.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        type: p.type,
        category: p.category_label || p.category,
        tech: p.tech,
        description: p.description,
        live_url: p.live_url || null,
        github_url: p.github_url || null,
        portfolio_url: `https://www.dipeshsapkota7.com.np/projects/${p.slug}`
      }))
    };
  },

  get_project_details: async (args) => {
    const validated = ToolSchemas.get_project_details.parse(args);
    const projects = await fetchProjectsFromDb();
    const slug = validated.project_id.toLowerCase().trim();

    const proj = projects.find(p => 
      p.slug.toLowerCase() === slug || 
      p.title.toLowerCase().includes(slug) ||
      String(p.id) === slug
    );

    if (!proj) {
      return {
        found: false,
        error: `Project "${validated.project_id}" not found. Available projects: ${projects.map(p => p.slug).join(', ')}`
      };
    }

    return {
      found: true,
      project: {
        title: proj.title,
        slug: proj.slug,
        category: proj.category_label || proj.category,
        type: proj.type,
        technologies: proj.tech,
        description: proj.description,
        live_demo_url: proj.live_url || 'No public web demo configured',
        github_repository: proj.github_url || 'No public repository link',
        portfolio_page: `https://www.dipeshsapkota7.com.np/projects/${proj.slug}`,
        featured: Boolean(proj.featured)
      }
    };
  },

  get_project_demo: async (args) => {
    const validated = ToolSchemas.get_project_demo.parse(args);
    const projects = await fetchProjectsFromDb();
    const slug = validated.project_id.toLowerCase().trim();

    const proj = projects.find(p => 
      p.slug.toLowerCase() === slug || 
      p.title.toLowerCase().includes(slug)
    );

    if (!proj) {
      return { found: false, message: `Project "${validated.project_id}" not found.` };
    }

    return {
      found: true,
      title: proj.title,
      slug: proj.slug,
      live_url: proj.live_url || null,
      video_url: proj.video_url || null,
      github_url: proj.github_url || null,
      message: proj.live_url ? `Live demo is active at ${proj.live_url}` : 'No live demo hosted for this project.'
    };
  },

  search_articles: async (args) => {
    const validated = ToolSchemas.search_articles.parse(args);
    let articles = DEFAULT_ARTICLES;

    try {
      const { data } = await supabaseAdmin.from('articles').select('*');
      if (data && data.length > 0) articles = data;
    } catch {}

    const q = validated.query.toLowerCase();
    const matched = articles.filter(a => 
      a.title.toLowerCase().includes(q) || 
      (a.excerpt || '').toLowerCase().includes(q) ||
      (a.category || '').toLowerCase().includes(q)
    );

    return {
      count: matched.length,
      articles: matched.map(a => ({
        title: a.title,
        slug: a.slug,
        read_time: a.read_time,
        category: a.category,
        excerpt: a.excerpt,
        url: `https://www.dipeshsapkota7.com.np/blog/${a.slug}`
      }))
    };
  },

  get_profile_information: async (args) => {
    const validated = ToolSchemas.get_profile_information.parse(args);
    return {
      name: 'Dipesh Sapkota',
      tagline: 'Computer Engineering Student · AI/ML Enthusiast · Motion Designer',
      education: {
        institution: 'Institute of Engineering (IOE), Thapathali Campus, Tribhuvan University',
        degree: 'Bachelor in Computer Engineering (B.E.)',
        period: '2022 — Present (Graduation expected 2026)',
        location: 'Kathmandu, Nepal'
      },
      experience: {
        role: 'Freelance Video Editor & Motion Graphics Designer',
        years: '4+ years of professional freelance client work',
        clients_count: '50+ clients globally',
        specialties: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Short-form social media & sports edits']
      },
      availability: 'Open for computer engineering internships, technical collaborations, and select video editing engagements.',
      links: {
        portfolio: 'https://www.dipeshsapkota7.com.np',
        about: 'https://www.dipeshsapkota7.com.np/about',
        resume: 'https://www.dipeshsapkota7.com.np/resume'
      }
    };
  },

  get_github_repository: async (args) => {
    const validated = ToolSchemas.get_github_repository.parse(args);
    const owner = validated.owner || 'dszae';
    const repo = validated.repo.trim();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Dipesh-Portfolio-Agent'
        }
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 404) {
          return {
            found: false,
            message: `GitHub repository ${owner}/${repo} was not found or is private.`
          };
        }
        return {
          found: false,
          status: res.status,
          message: `GitHub API returned status ${res.status}.`
        };
      }

      const data = await res.json();
      return {
        found: true,
        name: data.name,
        full_name: data.full_name,
        description: data.description,
        html_url: data.html_url,
        primary_language: data.language,
        stars: data.stargazers_count,
        forks: data.forks_count,
        open_issues: data.open_issues_count,
        updated_at: data.updated_at
      };
    } catch (err) {
      return {
        found: false,
        error: `Could not connect to GitHub API: ${err.message}`
      };
    }
  },

  get_repository_readme: async (args) => {
    const validated = ToolSchemas.get_repository_readme.parse(args);
    const owner = validated.owner || 'dszae';
    const repo = validated.repo.trim();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

let res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Dipesh-Portfolio-Agent' }
      });

      if (!res.ok) {
        res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`, {
          signal: controller.signal,
          headers: { 'User-Agent': 'Dipesh-Portfolio-Agent' }
        });
      }
      clearTimeout(timeoutId);

      if (!res.ok) {
        return {
          found: false,
          message: `README.md not accessible for ${owner}/${repo}.`
        };
      }

      const text = await res.text();
      return {
        found: true,
        repository: `${owner}/${repo}`,
        content_preview: text.slice(0, 2500)
      };
    } catch (err) {
      return {
        found: false,
        error: `Failed to fetch README for ${owner}/${repo}: ${err.message}`
      };
    }
  },

  get_contact_links: async () => {
    return {
      email: 'dsz.ae18@gmail.com',
      gmail_web_link: 'https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com',
      phone: '+977 9764685307',
      contact_page: 'https://www.dipeshsapkota7.com.np/contact',
      orcid: 'https://orcid.org/0009-0001-7595-5114',
      wikidata: 'https://www.wikidata.org/wiki/Q141595522',
      dev_community: 'https://dev.to/dszae',
      hashnode: 'https://hashnode.com/@dszae',
      huggingface: 'https://huggingface.co/dszae',
      github: 'https://github.com/dszae',
      linkedin: 'https://linkedin.com/in/dszae',
      twitter: 'https://x.com/dszae',
      instagram: 'https://instagram.com/dsz.ae',
      whatsapp: 'https://wa.me/9779764685307',
      location: 'Kathmandu, Nepal'
    };
  }
};

export async function executeTool(name, args) {
  const executor = ToolExecutors[name];
  if (!executor) {
    return {
      error: `Unknown tool "${name}". Available tools: ${Object.keys(ToolExecutors).join(', ')}`
    };
  }

  try {
    const result = await executor(args || {});
    return result;
  } catch (err) {
    return {
      error: `Tool execution failed for ${name}: ${err.message}`
    };
  }
}

