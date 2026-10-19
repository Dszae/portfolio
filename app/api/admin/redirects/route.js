import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { data, error } = await supabaseAdmin
      .from('redirects')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      return NextResponse.json({
        data: [
          { id: 1, source_path: '/sports', destination_url: '/projects/sportivo', permanent: true },
          { id: 2, source_path: '/git', destination_url: '/projects/git-visualizer', permanent: true }
        ]
      });
    }
    return NextResponse.json({ data: data || [] });
  } catch {
    return NextResponse.json({
      data: [
        { id: 1, source_path: '/sports', destination_url: '/projects/sportivo', permanent: true },
        { id: 2, source_path: '/git', destination_url: '/projects/git-visualizer', permanent: true }
      ]
    });
  }
}

export async function POST(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { source_path, destination_url, permanent } = body;

    if (!source_path || !destination_url) {
      return NextResponse.json({ error: 'Source path and destination URL are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('redirects')
      .insert([{
        source_path: source_path.startsWith('/') ? source_path : `/${source_path}`,
        destination_url,
        permanent: typeof permanent === 'boolean' ? permanent : true
      }])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
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

    const { error } = await supabaseAdmin.from('redirects').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
