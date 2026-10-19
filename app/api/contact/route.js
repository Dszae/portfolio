import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, botcheck } = body;

    // Spam honeypot
    if (botcheck) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' });
    }

    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim();
    const trimmedSubject = (subject || 'Portfolio Inquiry').trim();
    const trimmedMessage = (message || '').trim();

    if (!trimmedName || trimmedName.length > 100) {
      return NextResponse.json({ error: 'Please provide a valid name (up to 100 characters).' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 150) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!trimmedMessage || trimmedMessage.length > 5000) {
      return NextResponse.json({ error: 'Please provide a message (up to 5,000 characters).' }, { status: 400 });
    }

    // 1. Save to Supabase contact_messages table
    const { data: dbData, error: dbError } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        is_read: false,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('Failed to store contact message in database:', dbError.message);
    }

    // 2. Also forward to Web3Forms for immediate email delivery to Dipesh
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'e6fd2e32-2b5c-4a3f-81d9-aa02f4dfcc76';
    try {
      const formData = new FormData();
      formData.set('access_key', accessKey);
      formData.set('name', trimmedName);
      formData.set('email', trimmedEmail);
      formData.set('subject', trimmedSubject);
      formData.set('message', trimmedMessage);
      formData.set('from_name', 'Dipesh Sapkota Portfolio Contact');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
    } catch (emailErr) {
      console.error('Web3Forms email delivery error:', emailErr);
    }

    // Revalidate admin messages view
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: dbData
    });
  } catch (err) {
    console.error('Contact submit error:', err);
    return NextResponse.json({ error: err.message || 'Server error occurred' }, { status: 500 });
  }
}

