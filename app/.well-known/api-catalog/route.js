export async function GET() {
  const linkset = {
    linkset: [
      {
        anchor: "https://www.dipeshsapkota7.com.np",
        "service-desc": [
          {
            href: "https://www.dipeshsapkota7.com.np/openapi.json",
            type: "application/json"
          }
        ],
        "service-doc": [
          {
            href: "https://www.dipeshsapkota7.com.np/docs",
            type: "text/html"
          }
        ],
        status: [
          {
            href: "https://www.dipeshsapkota7.com.np/api/health",
            type: "application/json"
          }
        ]
      }
    ]
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json',
      'Access-Control-Allow-Origin': '*'
    },
  });
}