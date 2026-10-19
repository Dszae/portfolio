import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';
import { getProjects } from '@/lib/dataService';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await getProjects();
  return NextResponse.json({ data });
}

export async function POST(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, slug, category, category_label, description, img, tech, live_url, github_url, video_url, featured, status } = body;

    if (!title || !slug || !img) {
      return NextResponse.json({ error: 'Title, slug, and image are required.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([{
        title,
        slug,
        category: category || 'dev',
        category_label: category_label || 'Development',
        description: description || '',
        img,
        tech: Array.isArray(tech) ? tech : (typeof tech === 'string' ? tech.split(',').map(s => s.trim()) : []),
        live_url: live_url || '',
        github_url: github_url || '',
        video_url: video_url || '',
        featured: Boolean(featured),
        status: status || 'published'
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath('/projects');
    revalidatePath('/');
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
    const { id, title, slug, category, category_label, description, img, tech, live_url, github_url, video_url, featured, status } = body;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({
        title,
        slug,
        category,
        category_label,
        description,
        img,
        tech: Array.isArray(tech) ? tech : (typeof tech === 'string' ? tech.split(',').map(s => s.trim()) : []),
        live_url,
        github_url,
        video_url,
        featured: Boolean(featured),
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    revalidatePath('/projects');
    revalidatePath('/');
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

    const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    revalidatePath('/projects');
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

