import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Matcher : toutes les routes /admin/* sauf /admin/login
export const config = {
  matcher: ['/admin/((?!login).*)'],
};

export async function middleware(request: NextRequest) {
  // Récupérer le token depuis les cookies
  const token = request.cookies.get('admin_token')?.value;

  // Debug - afficher tous les cookies
  console.log('Middleware - Token found:', !!token);
  console.log('Middleware - All cookies:', request.cookies.getAll().map(c => `${c.name}=${c.value.substring(0, 30)}...`));

  if (!token) {
    console.log('Middleware - No token, redirecting to login');
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Vérifier la validité du token
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not configured');
    }

    const encoder = new TextEncoder();
    await jwtVerify(token, encoder.encode(secret));
    
    console.log('Middleware - Token valid, allowing access');
    
    // IMPORTANT : Préserver les cookies dans la réponse
    const response = NextResponse.next();
    
    // Copier tous les cookies de la requête dans la réponse
    request.cookies.getAll().forEach(cookie => {
      response.cookies.set(cookie.name, cookie.value, {
        httpOnly: cookie.name === 'admin_token',
        sameSite: 'lax',
        path: '/',
        maxAge: 48 * 60 * 60, // 48h
        secure: process.env.NODE_ENV === 'production'
      });
    });
    
    return response;
  } catch (error) {
    console.log('Middleware - Token invalid:', error);
    
    // Supprimer le token invalide
    const loginUrl = new URL('/admin/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('admin_token');
    response.cookies.delete('admin_token_client');
    
    return response;
  }
}