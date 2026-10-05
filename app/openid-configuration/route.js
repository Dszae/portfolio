export async function GET() {
  const asMeta = {
    issuer: "https://www.dipeshsapkota7.com.np",
    authorization_endpoint: "https://www.dipeshsapkota7.com.np/oauth/authorize",
    token_endpoint: "https://www.dipeshsapkota7.com.np/oauth/token",
    registration_endpoint: "https://www.dipeshsapkota7.com.np/oauth/register",
    scopes_supported: ["read:portfolio", "agent:interact"],
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "client_credentials"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "none"],
    identity_types_supported: ["anonymous"],
    anonymous: {
      credential_types_supported: ["none"],
      claim_uri: "https://www.dipeshsapkota7.com.np/auth.md"
    },
    registration_methods_supported: ["automatic"],
    registration_documentation: "https://www.dipeshsapkota7.com.np/auth.md"
  };

  return new Response(JSON.stringify(asMeta, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}