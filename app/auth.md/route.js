export async function GET() {
  const content = `# auth.md - Agent Registration Discovery

## Overview
This document specifies the authentication, authorization, and agent registration protocols for automated agents interacting with this API service.

\`\`\`json
{
"agent_auth": {
"skill": "portfolio-inquiry",
"register_uri": "https://www.dipeshsapkota7.com.np/.well-known/oauth-authorization-server",
"registration_methods_supported": ["automatic"]
}
}
\`\`\`
`;
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
  });
}