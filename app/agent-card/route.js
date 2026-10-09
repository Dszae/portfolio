export async function GET() {
  const agentCard = {
    name: "Dipesh Sapkota Portfolio Agent",
    version: "1.0.0",
    description: "Discovery card for public professional background and project summaries about Dipesh Sapkota.",
    supportedInterfaces: [
      {
        url: "https://www.dipeshsapkota7.com.np/api/markdown",
        protocol: "HTTP/REST",
        contentType: "text/markdown"
      }
    ],
    capabilities: [
      "content-negotiation",
      "markdown-retrieval",
      "api-discovery"
    ],
    skills: [
      {
        id: "portfolio-inquiry",
        name: "Portfolio and Project Inquiry",
        description: "Returns the public portfolio summary, skills, and selected project information."
      }
    ]
  };

  return new Response(JSON.stringify(agentCard, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
