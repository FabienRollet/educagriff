'use client';

import { useState } from 'react';
import { Price, NewPrice } from '../types';
import { PriceItem } from '../items/PriceItem';
import { PriceForm } from '../forms/PriceForm';
import { CollapsibleSection } from '../ui/CollapsibleSection';

interface PricesSectionProps {
  prices: Price[];
  isOpen: boolean;
  onToggle: () => void;
  onEdit: (price: Price) => void;
  onDelete: (id: number) => void;
  onSave: (price: Price | NewPrice) => void;
  editingPrice: Price | null;
  setEditingPrice: (price: Price | null) => void;
  resolvedTheme?: string;
}

const AnimalPricesSubSection = ({
  title,
  prices,
  isOpen,
  onToggle,
  editingPrice,
  onEdit,
  onSave,
  onDelete,
  setEditingPrice,
  resolvedTheme,
  colorClass
}: {
  title: string;
  prices: Price[];
  isOpen: boolean;
  onToggle: () => void;
  editingPrice: Price | null;
  onEdit: (price: Price) => void;
  onSave: (price: Price | NewPrice) => void;
  onDelete: (id: number) => void;
  setEditingPrice: (price: Price | null) => void;
  resolvedTheme?: string;
  colorClass: string;
}) => {
  return (
    <div className={`rounded-lg overflow-hidden ${
      resolvedTheme === "light" 
        ? "border border-gray-200 bg-white" 
        : "border border-gray-700 bg-gray-800"
    }`}>
      <div 
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${colorClass}`}></span>
          {title} ({prices.length})
        </h3>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className={`flex flex-col gap-4 p-4 transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        {prices.length === 0 ? (
          <p className="text-center italic">
            Aucune prestation pour {title.toLowerCase()} trouvée
          </p>
        ) : (
          prices.map((price) => (
            <div key={price.id}>
              {editingPrice?.id === price.id ? (
                <div className={`p-4 rounded-lg ${
                  resolvedTheme === "light" 
                    ? "border border-gray-200" 
                    : "border border-gray-700"
                }`}>
                  <PriceForm 
                    price={editingPrice} 
                    onSave={onSave}
                    onCancel={() => setEditingPrice(null)}
                    resolvedTheme={resolvedTheme}
                  />
                </div>
              ) : (
                <PriceItem 
                  price={price} 
                  onEdit={onEdit}
                  onDelete={onDelete}
                  resolvedTheme={resolvedTheme}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export const PricesSection = ({ 
    prices, 
    isOpen, 
    onToggle, 
    onEdit,
    onDelete,
    onSave,
    editingPrice,
    setEditingPrice,
    resolvedTheme 
  }: PricesSectionProps) => {
    const [dogPricesOpen, setDogPricesOpen] = useState(false);
    const [catPricesOpen, setCatPricesOpen] = useState(false);
  
    const dogPrices = prices.filter(p => p.animalType === 'DOG');
    const catPrices = prices.filter(p => p.animalType === 'CAT');
  
    return (
      <CollapsibleSection
        title="Liste des prestations"
        count={prices.length}
        isOpen={isOpen}
        onToggle={onToggle}
        resolvedTheme={resolvedTheme}
      >
        <div className="flex flex-col gap-4 p-6">
          {prices.length === 0 ? (
            <p className="text-center italic">Aucune prestation n&apos;a encore été créée</p>
          ) : (
            <>
              <AnimalPricesSubSection
                title="Prestations Chien"
                prices={dogPrices}
                isOpen={dogPricesOpen}
                onToggle={() => setDogPricesOpen(!dogPricesOpen)}
                editingPrice={editingPrice}
                onEdit={onEdit}
                onSave={onSave}
                onDelete={onDelete}
                setEditingPrice={setEditingPrice}
                resolvedTheme={resolvedTheme}
                colorClass={resolvedTheme === "light" ? "bg-blue-500" : "bg-blue-400"}
              />
              
              <AnimalPricesSubSection
                title="Prestations Chat"
                prices={catPrices}
                isOpen={catPricesOpen}
                onToggle={() => setCatPricesOpen(!catPricesOpen)}
                editingPrice={editingPrice}
                onEdit={onEdit}
                onSave={onSave}
                onDelete={onDelete}
                setEditingPrice={setEditingPrice}
                resolvedTheme={resolvedTheme}
                colorClass={resolvedTheme === "light" ? "bg-green-500" : "bg-green-400"}
              />
            </>
          )}
        </div>
      </CollapsibleSection>
    );
  };