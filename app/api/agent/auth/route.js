export async function GET() {
  return new Response(JSON.stringify({
    service: 'Dipesh Sapkota Portfolio Agent Auth',
    documentation: 'https://www.dipeshsapkota7.com.np/auth.md',
    status: 'active',
    access: 'public_read_only',
    message: 'Public endpoints do not require registration or tokens.'
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    return new Response(JSON.stringify({
      access_token: 'agent_public_' + Buffer.from(Date.now().toString()).toString('base64url'),
      token_type: 'Bearer',
      expires_in: 86400,
      scope: body.scope || 'public read:profile read:portfolio',
      message: 'Agent session provisioned for public read-only access.'
    }, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new Response(JSON.stringify({
      access_token: 'agent_public_default',
      token_type: 'Bearer',
      expires_in: 86400,
      scope: 'public'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
