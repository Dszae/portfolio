import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';
import { getSiteSettings, invalidateSiteSettingsCache } from '@/lib/dataService';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const settings = await getSiteSettings();
  return NextResponse.json({ data: settings });
}

export async function PUT(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined || value === null) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .upsert({
        id: key,
        value,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Settings save error in DB:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    invalidateSiteSettingsCache();
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/resume');
    revalidatePath('/projects');
    revalidatePath('/skills');
    revalidatePath('/blog');
    revalidatePath('/certificates');
    revalidatePath('/gallery');
    revalidatePath('/api/site-features');
    
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Settings route error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
