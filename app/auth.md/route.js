const content = `# auth.md - Agent Registration Discovery & Authentication

This document describes the Auth.md agent authentication, registration, and discovery standards for the Dipesh Sapkota Portfolio service.

## Agent Audience

This service supports autonomous AI agents, automated assistants, LLM tools, and programmatic clients.
All public portfolio resources, project showcases, markdown exports, and API endpoints are public and read-only. Unauthenticated agents may freely access these resources. For agents requiring registered credentials, standard OAuth 2.0 metadata and Auth.md registration mechanisms are documented below.

## OAuth Metadata Discovery

Protected resource and authorization server metadata documents are published at standard discovery locations:

- **OAuth Protected Resource Metadata (RFC 9728):**
  https://www.dipeshsapkota7.com.np/.well-known/oauth-protected-resource
- **OAuth Authorization Server Metadata (RFC 8414):**
  https://www.dipeshsapkota7.com.np/.well-known/oauth-authorization-server
- **OpenID Configuration:**
  https://www.dipeshsapkota7.com.np/.well-known/openid-configuration

## Agent Registration Endpoints

Agents can register or provision credentials using the following endpoints:

- **Registration / Auth Endpoint:** https://www.dipeshsapkota7.com.np/api/agent/auth
- **Token Endpoint:** https://www.dipeshsapkota7.com.np/api/agent/token
- **Claim Endpoint:** https://www.dipeshsapkota7.com.np/api/agent/claim
- **Revocation Endpoint:** https://www.dipeshsapkota7.com.np/api/agent/revoke

## Supported Registration Flows

1. **Anonymous Agent Registration (\`anonymous\`)**
   - **Identity Type:** \`anonymous\`
   - **Credential Type:** \`bearer\`
   - **Claim URI:** https://www.dipeshsapkota7.com.np/api/agent/claim
   - Allows agents to obtain a scoped, rate-limited bearer token without asserting human identity.

2. **Verified Email Assertion (\`verified_email\`)**
   - **Identity Assertion Type:** \`verified_email\`
   - **Credential Type:** \`bearer\`
   - **Claim URI:** https://www.dipeshsapkota7.com.np/api/agent/claim
   - Allows agents to present verified email identity assertions for authenticated sessions.

3. **ID-JAG Identity Assertion (\`urn:ietf:params:oauth:token-type:id-jag\`)**
   - **Identity Type:** \`identity_assertion\`
   - **Assertion Type:** \`urn:ietf:params:oauth:token-type:id-jag\`
   - **Credential Type:** \`bearer\`
   - **Revocation URI:** https://www.dipeshsapkota7.com.np/api/agent/revoke
   - **Events Supported:** \`revocation\`, \`https://schemas.agent-auth.org/events/revocation\`
   - Enables cryptographic identity assertions and verifiable agent credentials.

## Supported Scopes

- \`public\`: Read access to public portfolio summaries, markdown routes, and projects.
- \`read:profile\`: Read access to author profile, bio, and resume data.
- \`read:portfolio\`: Read access to engineering projects, skills, and certifications.

## Credential Use

Bearer tokens must be transmitted in HTTP requests using the standard \`Authorization\` header:
\`\`\`http
Authorization: Bearer <token>
\`\`\`

Bearer methods supported: \`header\`.

## Public Resources

No credentials or tokens are required to read the following public endpoints:
- Portfolio summary (Markdown): https://www.dipeshsapkota7.com.np/api/markdown
- AI-readable summary: https://www.dipeshsapkota7.com.np/.well-known/llms.txt
- API catalog: https://www.dipeshsapkota7.com.np/.well-known/api-catalog
- OpenAPI document: https://www.dipeshsapkota7.com.np/openapi.json
`;

export async function GET() {
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
