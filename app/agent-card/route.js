export async function GET() {
  const agentCard = {
    name: "Dipesh Sapkota Portfolio Agent",
    version: "1.0.0",
    description: "AI Agent discovery card for Dipesh Sapkota's portfolio, providing engineering project details, code implementations, and automated technical documentation.",
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
        description: "Retrieves technical specifications, academic background, and engineering projects including IoT systems and web applications."
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