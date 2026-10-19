import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getGalleryImages } from '@/lib/dataService';

export async function GET() {
  const data = await getGalleryImages();
  return NextResponse.json(data);
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

    // On-Demand Revalidation: Instant live update with 100% static SEO preserved
    revalidatePath('/gallery');
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, image: data });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add gallery image' }, { status: 500 });
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
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath('/gallery');
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
  }
}

