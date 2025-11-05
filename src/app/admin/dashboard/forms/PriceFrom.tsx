'use client';

import { useState } from 'react';
import { Price, NewPrice } from '../types';

interface PriceFormProps {
  price: Price | NewPrice;
  onSave: (price: Price | NewPrice) => void;
  onCancel: () => void;
  resolvedTheme?: string;
}

export const PriceForm = ({ price, onSave, onCancel, resolvedTheme }: PriceFormProps) => {
  const [formData, setFormData] = useState<typeof price>(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'price' ? parseFloat(value) : value 
    });
  };

  const inputClass = `p-3 rounded-lg border ${
    resolvedTheme === "light"
      ? "border-orange-200"
      : "border-gray-700 bg-gray-700 text-gray-100"
  }`;

  const primaryButtonClass = `px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
    resolvedTheme === "light"
      ? "bg-orange-500 text-white"
      : "bg-orange-400 text-gray-900"
  }`;

  const secondaryButtonClass = `px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
    resolvedTheme === "light"
      ? "bg-gray-500 text-white"
      : "bg-gray-600 text-gray-100"
  }`;

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        className={inputClass}
        placeholder="Nom de la prestation"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className={inputClass}
        placeholder="Prix"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className={inputClass}
        placeholder="Description"
        rows={3}
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="PETSITTING">Pet Sitting</option>
        <option value="DRESSAGE_EDUCATION">Dressage & Éducation</option>
        <option value="REEDUCATION_COMPORTEMENTALISME">
          Rééducation & Comportementalisme
        </option>
      </select>
      <select
        name="animalType"
        value={formData.animalType}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="DOG">Chien</option>
        <option value="CAT">Chat</option>
      </select>
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => onSave(formData)} className={primaryButtonClass}>
          {'id' in price ? 'Enregistrer' : 'Créer'}
        </button>
        <button onClick={onCancel} className={secondaryButtonClass}>
          Annuler
        </button>
      </div>
    </div>
  );
};