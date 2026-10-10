export async function GET() {
  const prm = {
    resource: 'https://www.dipeshsapkota7.com.np',
    authorization_servers: [
      'https://www.dipeshsapkota7.com.np'
    ],
    scopes_supported: [
      'public',
      'read:profile',
      'read:portfolio'
    ],
    bearer_methods_supported: [
      'header'
    ],
    resource_documentation: 'https://www.dipeshsapkota7.com.np/auth.md'
  };

  return new Response(JSON.stringify(prm, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

