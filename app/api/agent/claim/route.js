export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    return new Response(JSON.stringify({
      status: 'claimed',
      claim_id: 'claim_' + Buffer.from(Date.now().toString()).toString('base64url'),
      token: 'agent_claim_tok_' + Buffer.from(Date.now().toString()).toString('base64url'),
      message: 'Claim processed successfully.'
    }, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new Response(JSON.stringify({
      status: 'claimed',
      token: 'agent_claim_default'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
