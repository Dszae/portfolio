import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe clean filename with timestamp
    const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const filename = `${Date.now()}-${cleanName}`;

    const { data, error } = await supabaseAdmin.storage
      .from('portfolio-media')
      .upload(filename, buffer, {
        contentType: file.type || 'image/webp',
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from('portfolio-media')
      .getPublicUrl(filename);

    return NextResponse.json({
      url: publicUrlData.publicUrl,
      filename,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

