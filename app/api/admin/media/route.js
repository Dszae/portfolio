import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { data, error } = await supabaseAdmin.storage
      .from('portfolio-media')
      .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (error) {
      return NextResponse.json({ files: [] });
    }

    const files = (data || []).map(file => {
      const { data: urlData } = supabaseAdmin.storage
        .from('portfolio-media')
        .getPublicUrl(file.name);

      return {
        name: file.name,
        id: file.id,
        size: file.metadata?.size || 0,
        mimetype: file.metadata?.mimetype || 'image/*',
        created_at: file.created_at,
        url: urlData?.publicUrl || ''
      };
    });

    return NextResponse.json({ files });
  } catch (err) {
    return NextResponse.json({ files: [], error: err.message });
  }
}

export async function DELETE(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    if (!fileName) return NextResponse.json({ error: 'File name is required' }, { status: 400 });

    const { error } = await supabaseAdmin.storage
      .from('portfolio-media')
      .remove([fileName]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

