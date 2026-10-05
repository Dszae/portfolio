const specification = {
  openapi: '3.1.0',
  info: {
    title: 'Dipesh Sapkota Portfolio API',
    version: '1.0.0',
    description: 'A read-only Markdown API exposing public portfolio information about Dipesh Sapkota, his skills, and his projects.',
  },
  servers: [
    { url: 'https://www.dipeshsapkota7.com.np' },
  ],
  paths: {
    '/api/markdown': {
      get: {
        operationId: 'getPortfolioMarkdown',
        summary: 'Retrieve portfolio information as Markdown',
        responses: {
          '200': {
            description: 'Portfolio information in Markdown format.',
            content: {
              'text/markdown': {
                schema: { type: 'string' },
              },
            },
          },
        },
      },
    },
    '/api/health': {
      get: {
        operationId: 'getPortfolioApiHealth',
        summary: 'Check API availability',
        responses: {
          '200': {
            description: 'The API is available.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Health' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Health: {
        type: 'object',
        required: ['status', 'service'],
        properties: {
          status: { type: 'string', example: 'ok' },
          service: { type: 'string', example: 'portfolio-markdown-api' },
        },
      },
    },
  },
};

export async function GET() {
  return new Response(JSON.stringify(specification, null, 2), {
    headers: {
      'Content-Type': 'application/vnd.oai.openapi+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}