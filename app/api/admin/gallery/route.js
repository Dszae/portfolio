import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getGalleryImages } from '@/lib/dataService';
import { revalidateResource } from '@/lib/revalidationEngine';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await getGalleryImages();
  return NextResponse.json({ data, images: data });
}

export async function POST(req) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, alt, img, category } = body;

    if (!title || !img) {
      return NextResponse.json({ error: 'Title and image are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('gallery_images')
      .insert([{
        title,
        alt: alt || title,
        img,
        category: category || 'Campus',
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await revalidateResource('gallery', [], 'create');

    return NextResponse.json({ success: true, data, image: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to add gallery image' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, alt, img, category } = body;

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('gallery_images')
      .update({
        title,
        alt: alt || title,
        img,
        category,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await revalidateResource('gallery', [], 'update');

    return NextResponse.json({ success: true, data, image: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to update gallery image' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await revalidateResource('gallery', [], 'delete');

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete gallery image' }, { status: 500 });
  }
}
