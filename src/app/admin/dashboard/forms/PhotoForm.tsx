'use client';

import { useState } from 'react';
import { NewPhoto } from '../types';

interface PhotoFormProps {
  onSave: (photo: NewPhoto, file: File) => void;
  onCancel: () => void;
  error: string | null;
  resolvedTheme?: string;
}

export const PhotoForm = ({ onSave, onCancel, error, resolvedTheme }: PhotoFormProps) => {
  const [newPhoto, setNewPhoto] = useState<NewPhoto>({ url: '', alt: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inputClass = `p-3 rounded-lg border ${
    resolvedTheme === "light"
      ? "border-orange-200"
      : "border-gray-700 bg-gray-700 text-gray-100"
  }`;

  return (
    <div className={`p-6 mb-8 rounded-2xl shadow-lg ${
      resolvedTheme === "light" 
        ? "border border-gray-300 bg-white shadow-lg text-gray-800" 
        : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
    }`}>
      <h2 className="text-xl font-semibold mb-4">Nouvelle photo</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:text-red-200 dark:border-red-700">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className={inputClass}
        />
        <input
          type="text"
          value={newPhoto.alt}
          onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
          className={inputClass}
          placeholder="Description de la photo"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => selectedFile && onSave(newPhoto, selectedFile)}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
              !selectedFile ? "opacity-50 cursor-not-allowed " : ""
            }${
              resolvedTheme === "light"
                ? "bg-orange-500 text-white"
                : "bg-orange-400 text-gray-900"
            }`}
          >
            Ajouter l&apos;image
          </button>
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
              resolvedTheme === "light"
                ? "bg-gray-500 text-white"
                : "bg-gray-600 text-gray-100"
            }`}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};