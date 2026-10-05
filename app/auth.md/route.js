export async function GET() {
  const content = `# auth.md - Agent Registration Discovery

## Overview
This document describes the public, unauthenticated discovery endpoints for automated agents interacting with this portfolio.

\`\`\`json
{
"agent_discovery": {
"skill": "portfolio-inquiry",
"llms_uri": "https://www.dipeshsapkota7.com.np/.well-known/llms.txt",
"api_catalog_uri": "https://www.dipeshsapkota7.com.np/.well-known/api-catalog"
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