export async function GET() {
  const prm = {
    resource: "https://www.dipeshsapkota7.com.np",
    authorization_servers: ["https://www.dipeshsapkota7.com.np"],
    scopes_supported: ["read:portfolio", "agent:interact"],
    bearer_methods_supported: ["header"]
  };

  return new Response(JSON.stringify(prm, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });
}