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
    identity_types_supported: ["identity_assertion", "anonymous"],
    identity_assertion: {
      assertion_types_supported: ["urn:ietf:params:oauth:token-type:id-jag"]
    }
  };

  return new Response(JSON.stringify(asMeta, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}