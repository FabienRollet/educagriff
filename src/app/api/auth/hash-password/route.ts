import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ success: false, message: 'Mot de passe invalide' }, { status: 400 });
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const existing = await prisma.admin.findFirst();
    if (existing) {
      await prisma.admin.update({ where: { id: existing.id }, data: { passwordHash } });
    } else {
      await prisma.admin.create({ data: { passwordHash } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur';
    if (process.env.NODE_ENV !== 'production') {
      console.error('POST /api/auth/hash-password error:', error);
      return NextResponse.json({ success: false, message, stack: (error as Error)?.stack }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}
