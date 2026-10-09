const content = `# Public resource access

This portfolio does not provide an OAuth authorization server or protected API. Its pages and listed API resources are public and read-only; no account, token, or registration is required.

## Public resources
- Portfolio summary: https://www.dipeshsapkota7.com.np/api/markdown
- AI-readable summary: https://www.dipeshsapkota7.com.np/.well-known/llms.txt
- API catalog: https://www.dipeshsapkota7.com.np/.well-known/api-catalog
- OpenAPI document: https://www.dipeshsapkota7.com.np/openapi.json

Do not send credentials or confidential information to these public endpoints.
`;

export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
