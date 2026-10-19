import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';
import { getExperiences } from '@/lib/dataService';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await getExperiences();
  return NextResponse.json({ data });
}

export async function POST(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { type, title, organization, location, start_date, end_date, is_current, description } = body;
    const logo = body.logo || body.img || body.image || '';

    if (!title || !organization) {
      return NextResponse.json({ error: 'Title and organization are required' }, { status: 400 });
    }

    const insertPayload = {
      type: type || 'experience',
      title,
      organization,
      location: location || '',
      start_date: start_date || '',
      end_date: end_date || '',
      is_current: Boolean(is_current),
      description: description || ''
    };
    if (logo) insertPayload.logo = logo;

    let { data, error } = await supabaseAdmin
      .from('experiences')
      .insert([insertPayload])
      .select()
      .single();

    // If logo column does not exist yet in Postgres, retry without logo to prevent blocking
    if (error && error.message?.includes('column "logo"')) {
      delete insertPayload.logo;
      const fallback = await supabaseAdmin
        .from('experiences')
        .insert([insertPayload])
        .select()
        .single();
      data = fallback.data;
      error = fallback.error;
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (data?.id && logo) {
      try {
        const { data: existing } = await supabaseAdmin.from('site_settings').select('value').eq('id', 'experience_logos').single();
        const map = (existing?.value && typeof existing.value === 'object') ? existing.value : {};
        map[data.id] = logo;
        await supabaseAdmin.from('site_settings').upsert({ id: 'experience_logos', value: map, updated_at: new Date().toISOString() });
      } catch (saveErr) {
        console.error('Logo map save error:', saveErr);
      }
    }

    revalidatePath('/resume');
    revalidatePath('/about');
    return NextResponse.json({ success: true, data: { ...data, logo } });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, type, title, organization, location, start_date, end_date, is_current, description } = body;
    const logo = body.logo || body.img || body.image || '';

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const updatePayload = {
      type,
      title,
      organization,
      location,
      start_date,
      end_date,
      is_current: Boolean(is_current),
      description
    };
    if (typeof body.logo !== 'undefined' || typeof body.img !== 'undefined') {
      updatePayload.logo = logo;
    }

    let { data, error } = await supabaseAdmin
      .from('experiences')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    // If logo column does not exist in Postgres, retry without logo
    if (error && error.message?.includes('column "logo"')) {
      delete updatePayload.logo;
      const fallback = await supabaseAdmin
        .from('experiences')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();
      data = fallback.data;
      error = fallback.error;
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (typeof body.logo !== 'undefined' || typeof body.img !== 'undefined') {
      try {
        const { data: existing } = await supabaseAdmin.from('site_settings').select('value').eq('id', 'experience_logos').single();
        const map = (existing?.value && typeof existing.value === 'object') ? existing.value : {};
        if (logo) {
          map[id] = logo;
        } else {
          delete map[id];
        }
        await supabaseAdmin.from('site_settings').upsert({ id: 'experience_logos', value: map, updated_at: new Date().toISOString() });
      } catch (saveErr) {
        console.error('Logo map update error:', saveErr);
      }
    }

    revalidatePath('/resume');
    revalidatePath('/about');
    return NextResponse.json({ success: true, data: { ...data, logo } });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { error } = await supabaseAdmin.from('experiences').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    try {
      const { data: existing } = await supabaseAdmin.from('site_settings').select('value').eq('id', 'experience_logos').single();
      if (existing?.value && typeof existing.value === 'object' && existing.value[id]) {
        const map = { ...existing.value };
        delete map[id];
        await supabaseAdmin.from('site_settings').upsert({ id: 'experience_logos', value: map, updated_at: new Date().toISOString() });
      }
    } catch {}

    revalidatePath('/resume');
    revalidatePath('/about');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

