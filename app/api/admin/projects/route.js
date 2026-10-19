import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';
import { getProjects } from '@/lib/dataService';
import { revalidateResource } from '@/lib/revalidationEngine';

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
    const { title, slug, category, category_label, description, img, image, tech, live_url, liveUrl, github_url, githubUrl, video_url, featured, status } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const finalSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    const finalImg = img || image || '/sportivo-preview.jpg';
    const finalTech = Array.isArray(tech) ? tech : (typeof tech === 'string' ? tech.split(',').map(s => s.trim()).filter(Boolean) : []);

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([{
        title,
        slug: finalSlug,
        category: category || 'dev',
        category_label: category_label || (category === 'dev' ? 'Development' : category === 'media' ? 'Creative Media' : 'Experiments'),
        description: description || '',
        img: finalImg,
        tech: finalTech,
        live_url: live_url || liveUrl || '',
        github_url: github_url || githubUrl || '',
        video_url: video_url || '',
        featured: Boolean(featured),
        status: status || 'published'
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await revalidateResource('projects', [`/projects/${finalSlug}`], 'create');
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
    const { id, title, slug, category, category_label, description, img, image, tech, live_url, liveUrl, github_url, githubUrl, video_url, featured, status } = body;

    if (!id && !slug) return NextResponse.json({ error: 'ID or slug is required' }, { status: 400 });

    const finalTech = Array.isArray(tech) ? tech : (typeof tech === 'string' ? tech.split(',').map(s => s.trim()).filter(Boolean) : []);

    const updatePayload = {
      updated_at: new Date().toISOString()
    };
    if (title !== undefined) updatePayload.title = title;
    if (slug !== undefined) updatePayload.slug = slug;
    if (category !== undefined) updatePayload.category = category;
    if (category_label !== undefined) updatePayload.category_label = category_label;
    if (description !== undefined) updatePayload.description = description;
    if (img || image) updatePayload.img = img || image;
    if (tech !== undefined) updatePayload.tech = finalTech;
    if (live_url !== undefined || liveUrl !== undefined) updatePayload.live_url = live_url || liveUrl || '';
    if (github_url !== undefined || githubUrl !== undefined) updatePayload.github_url = github_url || githubUrl || '';
    if (video_url !== undefined) updatePayload.video_url = video_url;
    if (featured !== undefined) updatePayload.featured = Boolean(featured);
    if (status !== undefined) updatePayload.status = status;

    let query = supabaseAdmin.from('projects').update(updatePayload);
    if (id) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', slug);
    }

    const { data, error } = await query.select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const affectedSlug = data?.slug || slug;
    await revalidateResource('projects', affectedSlug ? [`/projects/${affectedSlug}`] : [], 'update');
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
    const slug = searchParams.get('slug');
    if (!id && !slug) return NextResponse.json({ error: 'ID or slug is required' }, { status: 400 });

    let query = supabaseAdmin.from('projects').delete();
    if (id) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', slug);
    }

    const { error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await revalidateResource('projects', slug ? [`/projects/${slug}`] : [], 'delete');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
