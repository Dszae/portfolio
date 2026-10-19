import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getCertificates } from '@/lib/dataService';
import { revalidateResource } from '@/lib/revalidationEngine';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await getCertificates();
  return NextResponse.json({ data, certificates: data });
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

    await revalidateResource('certificates', [], 'create');

    return NextResponse.json({ success: true, data, certificate: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to create certificate' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, org, img, category, credential_url } = body;

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('certificates')
      .update({
        title,
        org,
        img,
        category,
        credential_url: credential_url || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await revalidateResource('certificates', [], 'update');

    return NextResponse.json({ success: true, data, certificate: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to update certificate' }, { status: 500 });
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

    await revalidateResource('certificates', [], 'delete');

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete certificate' }, { status: 500 });
  }
}
