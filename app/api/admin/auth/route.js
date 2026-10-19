import { NextResponse } from 'next/server';
import { loginAdmin, logoutAdmin, isAuthenticated } from '@/lib/adminAuth';

export async function POST(req) {
  try {
    const { password } = await req.json();
    const success = await loginAdmin(password);
    if (!success) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function DELETE() {
  await logoutAdmin();
  return NextResponse.json({ success: true });
}

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}

