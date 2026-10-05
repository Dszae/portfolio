export async function GET() {
  const catalog = {
    specVersion: "1.0.0",
    host: {
      domain: "www.dipeshsapkota7.com.np",
      name: "Dipesh Sapkota Portfolio"
    },
    entries: [
      {
        id: "urn:air:www.dipeshsapkota7.com.np:portfolio:markdown",
        displayName: "Dipesh Sapkota Portfolio Markdown API",
        type: "text/markdown",
        url: "https://www.dipeshsapkota7.com.np/api/markdown",
        representativeQueries: [
          "What are Dipesh Sapkota's engineering projects?",
          "Show me Dipesh Sapkota's technical skills and background."
        ]
      },
      {
        id: "urn:air:www.dipeshsapkota7.com.np:llms",
        displayName: "AI-readable portfolio summary",
        type: "text/markdown",
        url: "https://www.dipeshsapkota7.com.np/.well-known/llms.txt",
        representativeQueries: [
          "Summarize Dipesh Sapkota's background and projects"
        ]
      }
    ]
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });
}