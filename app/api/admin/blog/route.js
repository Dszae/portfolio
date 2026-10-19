import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';
import { getArticles } from '@/lib/dataService';
import { revalidateResource } from '@/lib/revalidationEngine';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await getArticles();
  return NextResponse.json({ data });
}

export async function POST(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, cover_image, category, tags, read_time, status } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert([{
        title,
        slug,
        excerpt: excerpt || '',
        content: content || '',
        cover_image: cover_image || '/motion-design.webp',
        category: category || 'General',
        tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(s => s.trim()) : []),
        read_time: read_time || '5 min read',
        status: status || 'published',
        published_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await revalidateResource('blog', [`/blog/${slug}`], 'create');
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
    const { id, title, slug, excerpt, content, cover_image, category, tags, read_time, status } = body;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from('articles')
      .update({
        title,
        slug,
        excerpt,
        content,
        cover_image,
        category,
        tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(s => s.trim()) : []),
        read_time,
        status
      })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const affectedSlug = data?.slug || slug;
    await revalidateResource('blog', affectedSlug ? [`/blog/${affectedSlug}`] : [], 'update');
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

    const { error } = await supabaseAdmin.from('articles').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await revalidateResource('blog', [], 'delete');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

