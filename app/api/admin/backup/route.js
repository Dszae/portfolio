import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { isAuthenticated } from '@/lib/adminAuth';
import {
  getProjects,
  getArticles,
  getSkills,
  getExperiences,
  getCertificates,
  getGalleryImages,
  getServices,
  getTestimonials,
  getSiteSettings,
  getContactMessages
} from '@/lib/dataService';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [
      projects,
      articles,
      skills,
      experiences,
      certificates,
      gallery,
      services,
      testimonials,
      settings,
      messages
    ] = await Promise.all([
      getProjects(),
      getArticles(),
      getSkills(),
      getExperiences(),
      getCertificates(),
      getGalleryImages(),
      getServices(),
      getTestimonials(),
      getSiteSettings(),
      getContactMessages()
    ]);

    const backupPayload = {
      version: '2.0.0',
      exported_at: new Date().toISOString(),
      author: 'Dipesh Sapkota',
      data: {
        projects,
        articles,
        skills,
        experiences,
        certificates,
        gallery,
        services,
        testimonials,
        settings,
        messages
      }
    };

    return new NextResponse(JSON.stringify(backupPayload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="portfolio-backup-${new Date().toISOString().split('T')[0]}.json"`
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Backup export failed' }, { status: 500 });
  }
}

export async function POST(request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    if (!body || !body.data) {
      return NextResponse.json({ error: 'Invalid backup format' }, { status: 400 });
    }

    const { certificates, gallery, projects, articles, skills, experiences, services, testimonials, settings } = body.data;

    let restoredCount = 0;

    if (certificates && certificates.length) {
      await supabaseAdmin.from('certificates').upsert(certificates, { onConflict: 'id' });
      restoredCount += certificates.length;
    }
    if (gallery && gallery.length) {
      await supabaseAdmin.from('gallery_images').upsert(gallery, { onConflict: 'id' });
      restoredCount += gallery.length;
    }
    if (projects && projects.length) {
      await supabaseAdmin.from('projects').upsert(projects, { onConflict: 'id' });
      restoredCount += projects.length;
    }
    if (articles && articles.length) {
      await supabaseAdmin.from('articles').upsert(articles, { onConflict: 'id' });
      restoredCount += articles.length;
    }
    if (skills && skills.length) {
      await supabaseAdmin.from('skills').upsert(skills, { onConflict: 'id' });
      restoredCount += skills.length;
    }
    if (experiences && experiences.length) {
      await supabaseAdmin.from('experiences').upsert(experiences, { onConflict: 'id' });
      restoredCount += experiences.length;
    }
    if (services && services.length) {
      await supabaseAdmin.from('services').upsert(services, { onConflict: 'id' });
      restoredCount += services.length;
    }
    if (testimonials && testimonials.length) {
      await supabaseAdmin.from('testimonials').upsert(testimonials, { onConflict: 'id' });
      restoredCount += testimonials.length;
    }
    if (settings) {
      for (const [key, val] of Object.entries(settings)) {
        await supabaseAdmin.from('site_settings').upsert({ id: key, value: val }, { onConflict: 'id' });
      }
    }

    return NextResponse.json({ success: true, restoredCount });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Restore failed' }, { status: 500 });
  }
}
