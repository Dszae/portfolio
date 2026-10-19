import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getCertificates } from '@/lib/dataService';

export async function GET() {
  const data = await getCertificates();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, org, img, category, credential_url } = body;

    if (!title || !org || !img) {
      return NextResponse.json({ error: 'Title, organization, and image are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('certificates')
      .insert([{
        title,
        org,
        img,
        category: category || 'General',
        credential_url: credential_url || null,
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // On-Demand Revalidation: Instant live update with 100% static SEO preserved
    revalidatePath('/certificates');
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, certificate: data });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
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
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath('/certificates');
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}

