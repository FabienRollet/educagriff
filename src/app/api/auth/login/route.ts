import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// Utilisation d'un hash pré-calculé au lieu du mot de passe en clair
// Ce hash correspond au mot de passe "0000" (à des fins de démonstration)
// En production, générez ce hash avec bcrypt.hash() et stockez-le dans .env
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$kfR9T4wFELzaeQKA/tFLReaC9JzqRA5Pv8oTQzpE/gtUvcXDB3eOG';

// Pour les tests, le mot de passe en dur (temporaire, à supprimer en production)
const FALLBACK_PASSWORD = '0000';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Mot de passe requis' },
        { status: 400 }
      );
    }

    // Vérification du mot de passe haché avec bcrypt
    let isValidPassword = false;
    
    try {
      console.log('Hash utilisé:', ADMIN_PASSWORD_HASH);
      isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
      console.log('Résultat bcrypt compare:', isValidPassword);
    } catch (error) {
      console.error('Erreur bcrypt:', error);
      // Si bcrypt échoue, on utilisera la solution de secours
    }
    
    // Solution de secours temporaire (à supprimer en production)
    const fallbackValid = process.env.NODE_ENV === 'development' && password === FALLBACK_PASSWORD;
    
    if (isValidPassword || fallbackValid) {
      console.log('Authentification réussie');
      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    } else {
      // Délai artificiel pour limiter les attaques par force brute
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Authentification échouée');
      return NextResponse.json(
        { success: false, message: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 