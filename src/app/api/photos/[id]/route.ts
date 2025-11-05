import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    // Récupérer la photo pour obtenir l'URL du fichier
    const result = await prisma.$queryRaw<Array<{ url: string }>>`
      SELECT url FROM "Photo" WHERE id = ${id}
    `;

    if (!result || result.length === 0) {
      return NextResponse.json({ error: 'Photo non trouvée' }, { status: 404 });
    }

    const photo = result[0];
    const filePath = join(process.cwd(), 'public', photo.url);

    try {
      await unlink(filePath);
    } catch (err) {
      console.warn('Fichier introuvable, suppression ignorée:', err);
    }

    await prisma.$executeRaw`
      DELETE FROM "Photo" WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erreur DELETE /api/photos/[id]:', err);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la photo' },
      { status: 500 }
    );
  }
}
