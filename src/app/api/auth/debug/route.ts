import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const prismaKeys = Object.keys(prisma as unknown as Record<string, unknown>);
  const hasAdminDelegate = typeof (prisma as unknown as Record<string, unknown>).admin !== 'undefined';
  const adminType = typeof (prisma as unknown as Record<string, unknown>).admin;
  
  return NextResponse.json({
    hash: hash,
    hashLength: hash?.length,
    hashExists: !!hash,
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('ADMIN') || key.includes('PASSWORD')),
    rawEnvValue: process.env.ADMIN_PASSWORD_HASH,
    firstChars: hash?.substring(0, 10),
    lastChars: hash?.substring(-10),
    charCodes: hash?.split('').map(c => c.charCodeAt(0)).slice(0, 20),
    prismaKeys: prismaKeys.slice(0, 30),
    hasAdminDelegate,
    adminType
  });
}
