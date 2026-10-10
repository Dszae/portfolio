export async function GET() {
  const serverCard = {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: "2025-11-25",
    serverInfo: {
      name: "dipesh-sapkota-portfolio",
      title: "Dipesh Sapkota Portfolio MCP Server",
      version: "1.0.0",
      description: "Model Context Protocol (MCP) server for Dipesh Sapkota's engineering portfolio, projects, skills, and certifications."
    },
    description: "Model Context Protocol (MCP) server for Dipesh Sapkota's engineering portfolio, projects, skills, and certifications.",
    documentationUrl: "https://www.dipeshsapkota7.com.np/api-docs",
    endpoint: "/mcp",
    transport: {
      type: "streamable-http",
      endpoint: "/mcp"
    },
    capabilities: {
      tools: {
        listChanged: true
      },
      resources: {
        listChanged: true
      },
      prompts: {
        listChanged: true
      },
      logging: {}
    },
    tools: [
      {
        name: "get_portfolio_summary",
        description: "Retrieve comprehensive developer portfolio summary in Markdown format",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      {
        name: "get_projects",
        description: "List engineering projects, tech stack, and case studies by Dipesh Sapkota",
        inputSchema: {
          type: "object",
          properties: {
            tag: {
              type: "string",
              description: "Filter by technology or tag"
            }
          }
        }
      },
      {
        name: "get_contact_info",
        description: "Get contact methods, socials, and email for Dipesh Sapkota",
        inputSchema: {
          type: "object",
          properties: {}
        }
      }
    ],
    resources: [
      {
        uri: "portfolio://summary",
        name: "Portfolio Summary",
        mimeType: "text/markdown",
        description: "Full Markdown portfolio summary of Dipesh Sapkota"
      },
      {
        uri: "portfolio://skills",
        name: "Skills & Tech Stack",
        mimeType: "application/json",
        description: "Structured list of programming languages, frameworks, and creative software mastery"
      }
    ],
    prompts: [
      {
        name: "portfolio_overview",
        description: "Generate a personalized overview of Dipesh Sapkota's work and qualifications",
        arguments: []
      }
    ]
  };

  return new Response(JSON.stringify(serverCard, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff"
    },
  });
}

