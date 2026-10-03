export async function GET() {
  const resourceMetadata = {
    resource: "https://www.dipeshsapkota7.com.np",
    authorization_servers: [
      "https://www.dipeshsapkota7.com.np"
    ],
    scopes_supported: ["read", "write"],
    bearer_methods_supported: ["header"]
  };

  return new Response(JSON.stringify(resourceMetadata, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}