import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : undefined;
    const matchClient = cookieHeader.match(/(?:^|; )admin_token_client=([^;]+)/);
    const tokenClient = matchClient ? decodeURIComponent(matchClient[1]) : undefined;
    if (!token) {
      return NextResponse.json({ authenticated: false, reason: 'missing_cookie', cookieHeader, hasClient: !!tokenClient }, { status: 200 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ authenticated: false, reason: 'missing_secret' }, { status: 200 });
    }

    const encoder = new TextEncoder();
    await jwtVerify(token, encoder.encode(secret));
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'invalid_token';
    return NextResponse.json({ authenticated: false, reason: message }, { status: 200 });
  }
}


