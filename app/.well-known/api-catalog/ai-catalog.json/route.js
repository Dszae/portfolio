export async function GET() {
  const catalog = {
    specVersion: "1.0.0",
    host: {
      domain: "dipeshsapkota7.com.np",
      url: "https://www.dipeshsapkota7.com.np"
    },
    entries: [
      {
        id: "urn:air:dipeshsapkota7.com.np:portfolio:openapi",
        displayName: "Dipesh Sapkota Portfolio OpenAPI Specification",
        type: "application/vnd.oai.openapi+json",
        url: "https://www.dipeshsapkota7.com.np/openapi.json",
        representativeQueries: [
          "What engineering projects has Dipesh Sapkota built?",
          "Show me Dipesh Sapkota's technical stack and software experience",
          "How can I contact Dipesh Sapkota for collaboration?"
        ]
      },
      {
        id: "urn:air:dipeshsapkota7.com.np:portfolio:catalog",
        displayName: "Portfolio API Catalog",
        type: "application/linkset+json",
        url: "https://www.dipeshsapkota7.com.np/.well-known/api-catalog",
        representativeQueries: [
          "Discover available API resources for Dipesh Sapkota's portfolio",
          "Find service documentation and health endpoints"
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