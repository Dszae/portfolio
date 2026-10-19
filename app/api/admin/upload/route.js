import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import sharp from 'sharp';

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

    // Generate safe clean filename base
    const rawName = (file.name || 'file').toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const isSvg = file.type === 'image/svg+xml' || rawName.endsWith('.svg');
    const isImage = (file.type?.startsWith('image/') || /\.(jpe?g|png|webp|avif|heic|bmp|tiff)$/i.test(rawName)) && !isSvg;

    let finalBuffer = originalBuffer;
    let contentType = file.type || 'application/octet-stream';
    let filename = `${Date.now()}-${rawName}`;
    let isOptimized = false;

    // Convert raster images into ultra-lightweight WebP without noticeable quality loss
    if (isImage) {
      try {
        finalBuffer = await sharp(originalBuffer)
          .rotate() // Auto-orient images according to EXIF metadata
          .resize({
            width: 1920,
            height: 1920,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: 82, effort: 4 })
          .toBuffer();

        contentType = 'image/webp';
        const nameWithoutExt = rawName.replace(/\.[^.]+$/, '');
        filename = `${Date.now()}-${nameWithoutExt}.webp`;
        isOptimized = true;
      } catch (sharpErr) {
        console.warn('Sharp optimization fallback to raw buffer:', sharpErr);
        finalBuffer = originalBuffer;
        contentType = file.type || 'image/webp';
        filename = `${Date.now()}-${rawName}`;
      }
    }

    // Ensure bucket exists
    try {
      const { data: bucketData } = await supabaseAdmin.storage.getBucket('portfolio-media');
      if (!bucketData) {
        await supabaseAdmin.storage.createBucket('portfolio-media', { public: true });
      }
    } catch {
      // Bucket might already exist
    }

    const { data, error } = await supabaseAdmin.storage
      .from('portfolio-media')
      .upload(filename, finalBuffer, {
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
      isOptimized,
      originalSize: originalBuffer.length,
      optimizedSize: finalBuffer.length,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}

