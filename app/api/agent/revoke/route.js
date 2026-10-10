export async function POST() {
  return new Response(JSON.stringify({
    status: 'revoked',
    message: 'Token or assertion revoked.'
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

