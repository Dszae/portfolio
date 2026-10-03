export async function GET() {
  const authMdContent = `# auth.md - Agent Registration Discovery

## Overview
This document specifies the authentication, authorization, and agent registration protocols for automated agents interacting with this API service.

## Agent Authentication & Registration
\`\`\`json
{
"agent_auth": {
"skill": "portfolio-inquiry",
"register_uri": "https://www.dipeshsapkota7.com.np/.well-known/oauth-authorization-server",
"registration_methods_supported": ["automatic", "manual"]
}
}
\`\`\`

## Resource & Authorization Servers
- **Resource Server**: \`https://www.dipeshsapkota7.com.np\`
- **Protected Resource Metadata**: \`https://www.dipeshsapkota7.com.np/.well-known/oauth-protected-resource\`
- **Authorization Server**: \`https://www.dipeshsapkota7.com.np\`
`;

  return new Response(authMdContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}