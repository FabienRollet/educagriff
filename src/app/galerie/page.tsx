'use client';

import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';
import Image from 'next/image';

type Photo = {
  id: number;
  url: string;
  alt: string;
  createdAt: string;
};

export default function Galerie() {
  const { resolvedTheme } = useTheme();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [mounted, setMounted] = useState(false); 

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      const data = await response.json();
      if (Array.isArray(data)) {
        setPhotos(data);
      } else {
        setError('Erreur lors du chargement des photos');
        setPhotos([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des photos:', error);
      setError('Erreur lors du chargement des photos');
      setPhotos([]);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (!mounted) return null;

  if (error) {
    return (
      <section className={`py-16 transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
          : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-center text-3xl font-bold mb-8 ${
            resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
          }`}>
            Galerie
          </h2>
          <div className={`h-1 w-24 mx-auto mb-8 ${
            resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
          }`}></div>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 transition-colors duration-300 ${
      resolvedTheme === "light"
        ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
        : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-center text-3xl font-bold mb-8 ${
          resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
        }`}>
          Galerie
        </h2>
        <div className={`h-1 w-24 mx-auto mb-8 ${
          resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
        }`}></div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 ${
          resolvedTheme === "light" ? "bg-white" : "bg-gray-800"
        } p-8 rounded-2xl shadow-lg ${
          resolvedTheme === "light" 
            ? "border border-gray-300 shadow-lg" 
            : "border border-orange-400 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        }`}>
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour afficher la photo en grand */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <div className="relative h-[80vh]">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-white text-center mt-4 text-lg">{selectedPhoto.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
} 