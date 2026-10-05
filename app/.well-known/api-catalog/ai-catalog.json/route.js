export async function GET() {
  const catalog = {
    specVersion: "1.0.0",
    host: {
      domain: "dipeshsapkota7.com.np",
      url: "https://www.dipeshsapkota7.com.np"
    },
    entries: [
      {
        id: "urn:air:dipeshsapkota7.com.np:portfolio:markdown",
        displayName: "Dipesh Sapkota Portfolio Markdown API",
        type: "text/markdown",
        url: "https://www.dipeshsapkota7.com.np/api/markdown",
        representativeQueries: [
          "What engineering projects has Dipesh Sapkota built?",
          "Show me Dipesh Sapkota's technical stack and software experience",
          "How can I contact Dipesh Sapkota for collaboration?"
        ]
      },
      {
        id: "urn:air:dipeshsapkota7.com.np:portfolio:llms",
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