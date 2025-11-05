'use client';

import Image from 'next/image';
import { Photo } from '../types';

interface PhotoItemProps {
  photo: Photo;
  onDelete: (id: number) => void;
  resolvedTheme?: string;
}

export const PhotoItem = ({ photo, onDelete, resolvedTheme }: PhotoItemProps) => {
  return (
    <div className={`p-4 rounded-lg ${
      resolvedTheme === "light" 
        ? "border border-gray-200" 
        : "border border-gray-700"
    }`}>
      <div className="relative h-48 mb-4">
        <Image
          src={photo.url}
          alt={photo.alt}
          fill
          className="object-cover rounded"
        />
      </div>
      <p className={resolvedTheme === "light" ? "text-gray-600 mb-2" : "text-gray-300 mb-2"}>
        {photo.alt}
      </p>
      <p className={resolvedTheme === "light" ? "text-sm text-gray-500 mb-4" : "text-sm text-gray-400 mb-4"}>
        {new Date(photo.createdAt).toLocaleDateString('fr-FR')}
      </p>
      <button
        onClick={() => onDelete(photo.id)}
        className="px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 bg-red-500 text-white"
      >
        Supprimer
      </button>
    </div>
  );
};
