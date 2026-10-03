export async function GET() {
  const apiCatalog = {
    linkset: [
      {
        anchor: "https://www.dipeshsapkota7.com.np/api/markdown",
        "service-desc": [
          {
            href: "https://www.dipeshsapkota7.com.np/api/markdown",
            type: "text/markdown"
          }
        ],
        "service-doc": [
          {
            href: "https://www.dipeshsapkota7.com.np",
            type: "text/html"
          }
        ]
      }
    ]
  };

  return new Response(JSON.stringify(apiCatalog, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json',
    },
  });
}