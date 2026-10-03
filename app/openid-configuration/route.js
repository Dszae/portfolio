export async function GET() {
  const oidcConfig = {
    issuer: "https://www.dipeshsapkota7.com.np",
    authorization_endpoint: "https://www.dipeshsapkota7.com.np/auth",
    token_endpoint: "https://www.dipeshsapkota7.com.np/token",
    jwks_uri: "https://www.dipeshsapkota7.com.np/.well-known/jwks.json",
    response_types_supported: ["code", "token", "id_token"],
    grant_types_supported: ["authorization_code", "client_credentials"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"]
  };

  return new Response(JSON.stringify(oidcConfig, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}