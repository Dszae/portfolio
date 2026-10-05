export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://www.dipeshsapkota7.com.np/api/markdown",
        "service-desc": [
          {
            href: "https://www.dipeshsapkota7.com.np/openapi.json",
            type: "application/vnd.oai.openapi+json",
            title: "Dipesh Sapkota Portfolio API OpenAPI specification"
          }
        ],
        "service-doc": [
          {
            href: "https://www.dipeshsapkota7.com.np/api-docs",
            type: "text/html",
            title: "Dipesh Sapkota Portfolio API documentation"
          }
        ],
        status: [
          {
            href: "https://www.dipeshsapkota7.com.np/api/health",
            type: "application/json",
            title: "Dipesh Sapkota Portfolio API health"
          }
        ]
      }
    ]
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Link': '<https://www.dipeshsapkota7.com.np/.well-known/api-catalog>; rel="api-catalog"'
    },
  });
}