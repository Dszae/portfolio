import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/dataService';

export const revalidate = 30;

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({
      announcement: settings.announcement || { is_active: false, message: '' },
      popup: settings.popup || { is_active: false, image_url: '' }
    });
  } catch (err) {
    return NextResponse.json({
      announcement: { is_active: false, message: '' },
      popup: { is_active: false, image_url: '' }
    }, { status: 500 });
  }
}
