export async function GET() {
  const metadata = {
    issuer: 'https://www.dipeshsapkota7.com.np',
    authorization_endpoint: 'https://www.dipeshsapkota7.com.np/api/agent/auth',
    token_endpoint: 'https://www.dipeshsapkota7.com.np/api/agent/token',
    registration_endpoint: 'https://www.dipeshsapkota7.com.np/api/agent/register',
    revocation_endpoint: 'https://www.dipeshsapkota7.com.np/api/agent/revoke',
    response_types_supported: [
      'token'
    ],
    grant_types_supported: [
      'client_credentials',
      'urn:ietf:params:oauth:grant-type:token-exchange'
    ],
    token_endpoint_auth_methods_supported: [
      'none',
      'client_secret_post'
    ],
    scopes_supported: [
      'public',
      'read:profile',
      'read:portfolio'
    ],
    service_documentation: 'https://www.dipeshsapkota7.com.np/auth.md',
    agent_auth: {
      skill: 'https://www.dipeshsapkota7.com.np/auth.md',
      register_uri: 'https://www.dipeshsapkota7.com.np/api/agent/auth',
      identity_types_supported: [
        'identity_assertion',
        'anonymous'
      ],
      identity_assertion: {
        assertion_types_supported: [
          'urn:ietf:params:oauth:token-type:id-jag',
          'verified_email'
        ],
        credential_types_supported: [
          'bearer'
        ],
        claim_uri: 'https://www.dipeshsapkota7.com.np/api/agent/claim'
      },
      anonymous: {
        credential_types_supported: [
          'bearer'
        ],
        claim_uri: 'https://www.dipeshsapkota7.com.np/api/agent/claim'
      },
      revocation_uri: 'https://www.dipeshsapkota7.com.np/api/agent/revoke',
      events_supported: [
        'revocation',
        'https://schemas.agent-auth.org/events/revocation'
      ]
    }
  };

  return new Response(JSON.stringify(metadata, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
