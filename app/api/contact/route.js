import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { takeAttempt } from '@/lib/loginRateLimit';
import { clientAddress } from '@/lib/adminRequest';
import { sendAdminMail } from '@/lib/adminMailer';

const MAX_CONTACT_REQUESTS = 5;
const CONTACT_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request) {
  try {
    const clientIp = clientAddress(request);
    const gate = takeAttempt('contact_form', clientIp, MAX_CONTACT_REQUESTS, CONTACT_WINDOW_MS);
    if (!gate.allowed) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait before submitting again.' },
        {
          status: 429,
          headers: { 'Retry-After': String(gate.retryAfterSeconds) },
        }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, botcheck } = body;

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

    try {
      if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
        await sendAdminMail({
          subject: `[Portfolio Contact] ${trimmedSubject} - ${trimmedName}`,
          text: `New contact form submission on dipeshsapkota7.com.np:\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nMessage:\n${trimmedMessage}\n\nTime: ${new Date().toISOString()}`
        });
      } else if (process.env.WEB3FORMS_ACCESS_KEY) {
        const formData = new FormData();
        formData.set('access_key', process.env.WEB3FORMS_ACCESS_KEY);
        formData.set('name', trimmedName);
        formData.set('email', trimmedEmail);
        formData.set('subject', trimmedSubject);
        formData.set('message', trimmedMessage);
        formData.set('from_name', 'Dipesh Sapkota Portfolio Contact');

        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
      }
    } catch (emailErr) {
      console.error('Contact email delivery error:', emailErr);
    }

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

