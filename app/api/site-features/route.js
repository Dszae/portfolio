import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/dataService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({
      announcement: settings.announcement || { is_active: false, message: '' },
      popup: settings.popup || { is_active: false, image_url: '' }
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      }
    });
  } catch (err) {
    return NextResponse.json({
      announcement: { is_active: false, message: '' },
      popup: { is_active: false, image_url: '' }
    }, { status: 500 });
  }
}

