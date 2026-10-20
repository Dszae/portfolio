import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/dataService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const rawAnnouncement = settings.announcement || { is_active: false, message: '', text: '' };
    const textVal = (rawAnnouncement.text || rawAnnouncement.message || '').trim();
    const announcement = {
      ...rawAnnouncement,
      text: textVal,
      message: textVal
    };

    return NextResponse.json({
      announcement,
      popup: settings.popup || { is_active: false, image_url: '' }
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      }
    });
  } catch {
    return NextResponse.json({
      announcement: { is_active: false, message: '', text: '' },
      popup: { is_active: false, image_url: '' }
    }, { status: 500 });
  }
}

