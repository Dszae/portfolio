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
    const originalBuffer = Buffer.from(bytes);

    const rawName = (file.name || 'file').toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const contentType = file.type || 'application/octet-stream';
    const filename = `${Date.now()}-${rawName}`;

    try {
      const { data: bucketData } = await supabaseAdmin.storage.getBucket('portfolio-media');
      if (!bucketData) {
        await supabaseAdmin.storage.createBucket('portfolio-media', { public: true });
      }
    } catch {
    }

    const { data, error } = await supabaseAdmin.storage
      .from('portfolio-media')
      .upload(filename, originalBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from('portfolio-media')
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      filename,
      isOptimized: false,
      originalSize: originalBuffer.length,
      optimizedSize: originalBuffer.length,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}

