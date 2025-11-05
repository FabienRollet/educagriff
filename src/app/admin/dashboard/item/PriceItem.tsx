'use client';

import { Price } from '../types';

interface PriceItemProps {
  price: Price;
  onEdit: (price: Price) => void;
  onDelete: (id: number) => void;
  resolvedTheme?: string;
}

export const PriceItem = ({ price, onEdit, onDelete, resolvedTheme }: PriceItemProps) => {
  const getCategoryLabel = (category: Price['category']) => {
    const labels = {
      PETSITTING: 'Pet Sitting',
      DRESSAGE_EDUCATION: 'Dressage & Éducation',
      REEDUCATION_COMPORTEMENTALISME: 'Rééducation & Comportementalisme'
    };
    return labels[category];
  };

  return (
    <div className={`p-4 rounded-lg ${
      resolvedTheme === "light" 
        ? "border border-gray-200" 
        : "border border-gray-700"
    }`}>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{price.productName}</h3>
          <p className={resolvedTheme === "light" ? "text-gray-600" : "text-gray-300"}>
            {price.description}
          </p>
          <p className="text-lg font-bold mt-2">{price.price}€</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`inline-block px-2 py-1 rounded text-sm ${
              resolvedTheme === "light" ? "bg-blue-100 text-blue-800" : "bg-blue-900 text-blue-200"
            }`}>
              {getCategoryLabel(price.category)}
            </span>
            <span className={`inline-block px-2 py-1 rounded text-sm ${
              resolvedTheme === "light" ? "bg-green-100 text-green-800" : "bg-green-900 text-green-200"
            }`}>
              {price.animalType === 'DOG' ? 'Chien' : 'Chat'}
            </span>
          </div>
        </div>
        <div className="flex md:flex-col justify-end gap-2 min-w-[140px] mt-2 md:mt-0">
          <button
            onClick={() => onEdit(price)}
            className={`w-full px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
              resolvedTheme === "light"
                ? "bg-orange-500 text-white"
                : "bg-orange-400 text-gray-900"
            }`}
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(price.id)}
            className="w-full px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 bg-red-500 text-white"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};