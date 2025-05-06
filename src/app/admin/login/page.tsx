'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useTheme } from "next-themes";

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      setIsSubmitting(true);
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && isSubmitting) {
      setIsSubmitting(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isSubmitting]);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Stocker l'authentification dans un cookie
        Cookies.set('adminAuth', 'true', { expires: 1 }); // Expire dans 1 jour
        router.push('/admin/dashboard');
        router.refresh(); // Forcer le rafraîchissement de la page
      } else {
        setError(data.message || 'Erreur d\'authentification');
        setCountdown(3);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Erreur de connexion au serveur');
      setCountdown(3);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section
      className={`min-h-screen py-16 transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
          : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
      } `}
    >
      <h2
        className={`text-center text-3xl font-bold mb-8 ${
          resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Administration
      </h2>
      <div
        className={`h-1 w-24 mx-auto mb-8 ${
          resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
        }`}
      ></div>

      <div className={`max-w-md mx-auto p-8 rounded-2xl shadow-lg ${
              resolvedTheme === "light" ? "border border-gray-300 bg-white shadow-lg text-gray-800" : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
            }`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="password" className="font-medium">
            Mot de passe (0000)
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`p-3 w-full rounded-lg border ${
                resolvedTheme === "light"
                  ? "border-orange-200"
                  : "border-gray-700 bg-gray-700 text-gray-100"
              }`}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {countdown > 0 && (
            <p className="text-amber-500 text-sm">
              Veuillez patienter {countdown} seconde{countdown > 1 ? 's' : ''} avant de réessayer
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed bg-gray-400 dark:bg-gray-600"
                : resolvedTheme === "light"
                  ? "bg-orange-500 text-white"
                  : "bg-orange-400 text-gray-100"
            }`}
          >
            {isSubmitting ? `Patienter (${countdown}s)` : 'Se connecter'}
          </button>
        </form>
      </div>
    </section>
  );
} 