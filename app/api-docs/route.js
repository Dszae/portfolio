const documentation = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Dipesh Sapkota Portfolio API</title>
    <meta name="description" content="Documentation for the read-only Dipesh Sapkota Portfolio API.">
  </head>
  <body>
    <main>
      <h1>Dipesh Sapkota Portfolio API</h1>
      <p>This read-only API provides public portfolio information in Markdown.</p>
      <h2>GET /api/markdown</h2>
      <p>Returns Dipesh Sapkota's public background, skills, and projects as <code>text/markdown</code>.</p>
      <h2>GET /api/health</h2>
      <p>Returns the current availability of this API as JSON.</p>
      <p><a href="/openapi.json">OpenAPI specification</a></p>
    </main>
  </body>
</html>`;

export async function GET() {
  return new Response(documentation, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}