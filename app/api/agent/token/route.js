export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    return new Response(JSON.stringify({
      access_token: 'agent_tok_' + Buffer.from(Date.now().toString()).toString('base64url'),
      token_type: 'Bearer',
      expires_in: 86400,
      scope: body.scope || 'public read:profile read:portfolio'
    }, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new Response(JSON.stringify({
      access_token: 'agent_tok_default',
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

