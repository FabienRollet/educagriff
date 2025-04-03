import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// GET /api/photos
export async function GET() {
  try {
    const photos = await prisma.$queryRaw<Array<{ id: number; url: string; alt: string; createdAt: Date }>>`
      SELECT * FROM "Photo" ORDER BY "createdAt" DESC
    `;
    return NextResponse.json(photos || []);
  } catch (error) {
    console.error('Erreur lors de la récupération des photos:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST /api/photos
export async function POST(request: Request) {
  try {
    console.log('Début de la requête POST /api/photos');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const alt = formData.get('alt') as string;

    console.log('Fichier reçu:', file?.name);
    console.log('Description reçue:', alt);

    if (!file) {
      console.error('Aucun fichier fourni');
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier et créer le dossier uploads si nécessaire
    const uploadsDir = join(process.cwd(), 'public/uploads');
    console.log('Dossier uploads:', uploadsDir);
    
    if (!existsSync(uploadsDir)) {
      console.log('Création du dossier uploads...');
      await mkdir(uploadsDir, { recursive: true });
      console.log('Dossier uploads créé');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Taille du buffer:', buffer.length);

    // Créer un nom de fichier unique
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}-${file.name}`;
    const path = join(uploadsDir, filename);

    console.log('Sauvegarde du fichier:', path);
    await writeFile(path, buffer);
    console.log('Fichier sauvegardé avec succès');

    console.log('Création de l\'entrée dans la base de données...');
    const result = await prisma.$queryRaw<Array<{ id: number; url: string; alt: string; createdAt: Date }>>`
      INSERT INTO "Photo" ("url", "alt", "createdAt", "updatedAt")
      VALUES (${`/uploads/${filename}`}, ${alt}, NOW(), NOW())
      RETURNING *
    `;

    console.log('Photo créée avec succès:', result[0]);
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Erreur détaillée lors de la création de la photo:', error);
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la photo', 
        details: error instanceof Error ? error.message : 'Erreur inconnue',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 