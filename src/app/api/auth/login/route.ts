import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';

export const runtime = 'nodejs';

const TOKEN_MAX_AGE_SECONDS = 48 * 60 * 60; // 48h

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ success: false, message: 'Mot de passe requis' }, { status: 400 });
    }

    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin non configuré' }, { status: 500 });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Mot de passe incorrect' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ success: false, message: 'JWT_SECRET manquant' }, { status: 500 });
    }

    const encoder = new TextEncoder();
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(String(admin.id))
      .setIssuedAt()
      .setExpirationTime(`${TOKEN_MAX_AGE_SECONDS}s`)
      .sign(encoder.encode(secret));

    const isProd = process.env.NODE_ENV === 'production';
    const cookieHttpOnly = [
      `admin_token=${encodeURIComponent(token)}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      `Max-Age=${TOKEN_MAX_AGE_SECONDS}`,
    ];
    if (isProd) cookieHttpOnly.push('Secure');

    // Cookie non-HttpOnly pour debug (temporaire)
    const cookieClientReadable = [
      `admin_token_client=${encodeURIComponent(token)}`,
      'Path=/',
      'SameSite=Lax',
      `Max-Age=${TOKEN_MAX_AGE_SECONDS}`,
    ];
    if (isProd) cookieClientReadable.push('Secure');

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'no-store');
    headers.set('Pragma', 'no-cache');
    headers.append('Set-Cookie', cookieHttpOnly.join('; '));
    headers.append('Set-Cookie', cookieClientReadable.join('; '));

    // Debug logs
    console.log('Setting cookies:', {
      httpOnly: cookieHttpOnly.join('; '),
      client: cookieClientReadable.join('; ')
    });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur';
    if (process.env.NODE_ENV !== 'production') {
      console.error('POST /api/auth/login error:', error);
      return NextResponse.json({ success: false, message, stack: (error as Error)?.stack }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}
