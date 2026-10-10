export async function GET() {
  const oidc = {
    issuer: 'https://www.dipeshsapkota7.com.np',
    authorization_endpoint: 'https://www.dipeshsapkota7.com.np/api/agent/auth',
    token_endpoint: 'https://www.dipeshsapkota7.com.np/api/agent/token',
    registration_endpoint: 'https://www.dipeshsapkota7.com.np/api/agent/register',
    revocation_endpoint: 'https://www.dipeshsapkota7.com.np/api/agent/revoke',
    response_types_supported: ['token', 'id_token'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256'],
    scopes_supported: ['openid', 'profile', 'public', 'read:profile', 'read:portfolio'],
    service_documentation: 'https://www.dipeshsapkota7.com.np/auth.md',
  };

  return new Response(JSON.stringify(oidc, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

