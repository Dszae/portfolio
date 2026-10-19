import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';
import { getServices } from '@/lib/dataService';
import { revalidateResource } from '@/lib/revalidationEngine';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await getServices();
  return NextResponse.json({ data });
}

export async function POST(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, description, price_range, features, icon, is_active } = body;

    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from('services')
      .insert([{
        title,
        description: description || '',
        price_range: price_range || '',
        features: Array.isArray(features) ? features : (typeof features === 'string' ? features.split(',').map(s => s.trim()) : []),
        icon: icon || 'Code',
        is_active: typeof is_active === 'boolean' ? is_active : true
      }])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await revalidateResource('services', ['/'], 'create');
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, title, description, price_range, features, icon, is_active } = body;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from('services')
      .update({
        title,
        description,
        price_range,
        features: Array.isArray(features) ? features : (typeof features === 'string' ? features.split(',').map(s => s.trim()) : []),
        icon,
        is_active
      })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await revalidateResource('services', ['/'], 'update');
    return NextResponse.json({ success: true, data });
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

    const { error } = await supabaseAdmin.from('services').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await revalidateResource('services', ['/'], 'delete');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

