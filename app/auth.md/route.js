export async function GET() {
  const content = `# auth.md - Agent Registration Discovery

## Overview
This document describes registration and authentication for automated agents interacting with this portfolio.

\`\`\`json
{
  "agent_auth": {
    "skill": "portfolio-inquiry",
    "register_uri": "https://www.dipeshsapkota7.com.np/oauth/register",
    "registration_methods_supported": ["automatic"],
    "credential_types_supported": ["none"],
    "access": "public-read-only"
  }
}
\`\`\`

## Registration
Registration is automatic for public, read-only portfolio access. Agents do not need an account, secret, token, or email verification. The registration URI documents this flow and returns the public API resources.

## Discovery resources
- AI-readable summary: https://www.dipeshsapkota7.com.np/.well-known/llms.txt
- API catalog: https://www.dipeshsapkota7.com.np/.well-known/api-catalog
- OAuth Protected Resource Metadata: https://www.dipeshsapkota7.com.np/.well-known/oauth-protected-resource
`;
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
  });
}