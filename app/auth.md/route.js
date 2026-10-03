export async function GET() {
  const authMdContent = `# auth.md - Agent Registration Discovery

## Overview
This document specifies the authentication and registration protocols for automated agents interacting with this API service.

## Resource & Authorization Servers
- **Resource Server**: \`https://www.dipeshsapkota7.com.np\`
- **Protected Resource Metadata**: \`/.well-known/oauth-protected-resource\`
- **Authorization Server Metadata**: \`/.well-known/openid-configuration\`

## Agent Authentication & Credentials
- **Audience**: Automated agents and client integrations.
- **Supported Methods**: Bearer token authentication via HTTP headers.
- **Registration**: Publicly discoverable via \`/.well-known/api-catalog\`.
`;

  return new Response(authMdContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}