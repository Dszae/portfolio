export async function GET() {
  return Response.json(
    {
      status: 'ok',
      service: 'portfolio-markdown-api',
      version: '1.0.0',
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}