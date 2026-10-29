import { NextResponse } from 'next/server';

const INDEXNOW_KEY = '40095c3ecb1ec49491b82e6910d8a99b';
const HOST = 'www.dipeshsapkota7.com.np';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const CORE_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/resume`,
  `https://${HOST}/skills`,
  `https://${HOST}/projects`,
  `https://${HOST}/blog`,
  `https://${HOST}/certificates`,
  `https://${HOST}/gallery`,
  `https://${HOST}/contact`,
  `https://${HOST}/projects/sportivo`,
  `https://${HOST}/projects/git-visualizer`,
  `https://${HOST}/projects/ioe-admission-guide`,
];

export async function POST(request) {
  try {
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: CORE_URLS,
    };

    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
    ];

    const results = await Promise.allSettled(
      endpoints.map((endpoint) =>
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        }).then(async (res) => ({
          endpoint,
          status: res.status,
          statusText: res.statusText,
        }))
      )
    );

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      submittedUrls: CORE_URLS.length,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST(null);
}

