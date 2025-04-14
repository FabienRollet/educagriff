import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// Cette route est un utilitaire de développement pour générer des hash de mot de passe
// Ne devrait jamais être disponible en production

export async function POST(request: Request) {
  // Vérifier qu'on est en environnement de développement
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Cette route n\'est disponible qu\'en environnement de développement' },
      { status: 403 }
    );
  }

  try {
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json(
        { error: 'Mot de passe requis' },
        { status: 400 }
      );
    }

    // Générer un hash avec un facteur de coût de 10
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    
    return NextResponse.json({ hash }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la génération du hash:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 