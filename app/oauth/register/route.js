const registrationResponse = {
  registration_status: 'not_required',
  access: 'public-read-only',
  message: 'No account, secret, token, or email verification is required for public portfolio access.',
  resources: [
    'https://www.dipeshsapkota7.com.np/api/markdown',
    'https://www.dipeshsapkota7.com.np/.well-known/llms.txt',
    'https://www.dipeshsapkota7.com.np/.well-known/api-catalog',
  ],
};

export async function GET() {
  return Response.json(registrationResponse, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function POST() {
  return Response.json(registrationResponse, {
    headers: {
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}