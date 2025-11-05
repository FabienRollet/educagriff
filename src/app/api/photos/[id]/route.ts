import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unlink } from 'fs/promises';
import { join } from 'path';

/**
 * DELETE /api/photos/[id]
 * Supprime une photo : fichier + entrée DB
 */
export async function DELETE(
  request: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = context.params;
    const photoId = Number(id);

    if (isNaN(photoId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    // 1️⃣ Récupérer l’URL du fichier
    const result = await prisma.$queryRaw<Array<{ url: string }>>`
      SELECT url FROM "Photo" WHERE id = ${photoId}
    `;

    if (!result || result.length === 0) {
      return NextResponse.json({ error: 'Photo non trouvée' }, { status: 404 });
    }

    const photo = result[0];

    // 2️⃣ Supprimer le fichier physique
    const filePath = join(process.cwd(), 'public', photo.url);
    try {
      await unlink(filePath);
      console.log(`🗑️ Fichier supprimé : ${filePath}`);
    } catch (err) {
      console.warn('⚠️ Fichier introuvable ou déjà supprimé :', err);
      // on continue même si le fichier n’existe plus
    }

    // 3️⃣ Supprimer l’entrée de la base de données
    await prisma.$executeRaw`
      DELETE FROM "Photo" WHERE id = ${photoId}
    `;

    console.log(`✅ Photo ${photoId} supprimée avec succès.`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Erreur DELETE /api/photos/[id]:', err);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la photo' },
      { status: 500 }
    );
  }
}
