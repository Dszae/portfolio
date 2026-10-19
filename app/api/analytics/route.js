import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';
import { getVisitorAnalytics } from '@/lib/dataService';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '30d';

  try {
    const data = await getVisitorAnalytics(period);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Analytics fetch error:', err);
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { path = '/', referrer = '', screenWidth = 0 } = body;

if (!path || path.startsWith('/admin') || path.startsWith('/api') || path.includes('.')) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const userAgent = request.headers.get('user-agent') || '';

let deviceType = 'Desktop';
    if (/mobile/i.test(userAgent) || screenWidth < 768) {
      deviceType = 'Mobile';
    } else if (/tablet|ipad/i.test(userAgent) || (screenWidth >= 768 && screenWidth <= 1024)) {
      deviceType = 'Tablet';
    }

let browser = 'Other';
    if (/chrome|crios/i.test(userAgent) && !/edg/i.test(userAgent)) browser = 'Chrome';
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
    else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
    else if (/edg/i.test(userAgent)) browser = 'Edge';

let source = 'Direct';
    if (referrer) {
      try {
        const refUrl = new URL(referrer);
        const host = refUrl.hostname.toLowerCase();
        if (host.includes('google')) source = 'Google Search';
        else if (host.includes('github')) source = 'GitHub';
        else if (host.includes('linkedin')) source = 'LinkedIn';
        else if (host.includes('twitter') || host.includes('x.com')) source = 'Twitter / X';
        else if (host.includes('instagram')) source = 'Instagram';
        else if (host.includes('facebook')) source = 'Facebook';
        else source = host.replace('www.', '');
      } catch {
        source = 'External';
      }
    }

try {
      await supabaseAdmin.from('visitor_events').insert({
        path,
        referrer: source,
        device_type: deviceType,
        browser,
        created_at: new Date().toISOString()
      });
    } catch {
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}

