export async function GET() {
  const jwks = {
    keys: [
      {
        kty: "RSA",
        use: "sig",
        alg: "RS256",
        kid: "bot-key-1",
        n: "4s...example_modulus...",
        e: "AQAB"
      }
    ]
  };

  return new Response(JSON.stringify(jwks, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}