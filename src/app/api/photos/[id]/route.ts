import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unlink } from 'fs/promises';
import { join } from 'path';

// DELETE /api/photos/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    // Récupérer la photo pour obtenir l'URL du fichier
    const result = await prisma.$queryRaw<Array<{ url: string }>>`
      SELECT url FROM "Photo" WHERE id = ${id}
    `;

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: 'Photo non trouvée' },
        { status: 404 }
      );
    }

    const photo = result[0];

    // Supprimer le fichier physique
    const filePath = join(process.cwd(), 'public', photo.url);
    try {
      await unlink(filePath);
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier:', error);
      // On continue même si la suppression du fichier échoue
    }

    // Supprimer l'entrée dans la base de données
    await prisma.$executeRaw`
      DELETE FROM "Photo" WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de la photo:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la photo' },
      { status: 500 }
    );
  }
} 