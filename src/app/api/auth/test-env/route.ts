import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET() {
  // Retourne les informations de debug (uniquement en développement)
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Route non disponible en production' }, { status: 403 });
  }
  
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const testPassword = '0000';
  
  // Test direct de la comparaison bcrypt
  let isValid = false;
  try {
    isValid = await bcrypt.compare(testPassword, hash || '');
  } catch (error) {
    console.error('Erreur lors de la comparaison bcrypt:', error);
  }
  
  // Génération d'un nouveau hash pour comparaison
  const newHash = await bcrypt.hash(testPassword, 10);
  
  return NextResponse.json({ 
    message: 'Informations de debug', 
    envVarExists: !!hash,
    hash, 
    rawComparison: testPassword === '0000',
    bcryptComparison: isValid,
    newHash
  }, { status: 200 });
} 