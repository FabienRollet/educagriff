'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useTheme } from "next-themes";

// Types
type Price = {
  id: number;
  productName: string;
  price: number;
  currency: string;
  description: string;
  category: 'PETSITTING' | 'DRESSAGE_EDUCATION' | 'REEDUCATION_COMPORTEMENTALISME';
  animalType: 'DOG' | 'CAT';
  order: number;
};

type Photo = {
  id: number;
  url: string;
  alt: string;
  createdAt: string;
};

type NewPrice = Omit<Price, 'id' | 'createdAt' | 'updatedAt'>;
type NewPhoto = Omit<Photo, 'id' | 'createdAt'>;

// Composants pour les formulaires
const PriceForm = ({ 
  price, 
  onSave, 
  onCancel, 
  resolvedTheme 
}: { 
  price: Price | NewPrice, 
  onSave: (price: Price | NewPrice) => void,
  onCancel: () => void,
  resolvedTheme: string | undefined
}) => {
  const [formData, setFormData] = useState<typeof price>(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        className={`p-3 rounded-lg border ${
          resolvedTheme === "light"
            ? "border-orange-200"
            : "border-gray-700 bg-gray-700 text-gray-100"
        }`}
        placeholder="Nom de la prestation"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className={`p-3 rounded-lg border ${
          resolvedTheme === "light"
            ? "border-orange-200"
            : "border-gray-700 bg-gray-700 text-gray-100"
        }`}
        placeholder="Prix"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className={`p-3 rounded-lg border ${
          resolvedTheme === "light"
            ? "border-orange-200"
            : "border-gray-700 bg-gray-700 text-gray-100"
        }`}
        placeholder="Description"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className={`p-3 rounded-lg border ${
          resolvedTheme === "light"
            ? "border-orange-200"
            : "border-gray-700 bg-gray-700 text-gray-100"
        }`}
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
        className={`p-3 rounded-lg border ${
          resolvedTheme === "light"
            ? "border-orange-200"
            : "border-gray-700 bg-gray-700 text-gray-100"
        }`}
      >
        <option value="DOG">Chien</option>
        <option value="CAT">Chat</option>
      </select>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onSave(formData)}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
            resolvedTheme === "light"
              ? "bg-orange-500 text-white"
              : "bg-orange-400 text-gray-900"
          }`}
        >
          {'id' in price ? 'Enregistrer' : 'Créer'}
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
  );
};

const PhotoForm = ({ 
  onSave, 
  onCancel, 
  error, 
  resolvedTheme 
}: { 
  onSave: (photo: NewPhoto, file: File) => void, 
  onCancel: () => void,
  error: string | null,
  resolvedTheme: string | undefined
}) => {
  const [newPhoto, setNewPhoto] = useState<NewPhoto>({ url: '', alt: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
          className={`p-3 rounded-lg border ${
            resolvedTheme === "light"
              ? "border-orange-200"
              : "border-gray-700 bg-gray-700 text-gray-100"
          }`}
        />
        <input
          type="text"
          value={newPhoto.alt}
          onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
          className={`p-3 rounded-lg border ${
            resolvedTheme === "light"
              ? "border-orange-200"
              : "border-gray-700 bg-gray-700 text-gray-100"
          }`}
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

// Composants pour les listes
const PriceItem = ({
  price,
  onEdit,
  onDelete,
  resolvedTheme
}: {
  price: Price,
  onEdit: (price: Price) => void,
  onDelete: (id: number) => void,
  resolvedTheme: string | undefined
}) => {
  return (
    <div className={`p-4 rounded-lg ${
      resolvedTheme === "light" 
        ? "border border-gray-200" 
        : "border border-gray-700"
    }`}>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{price.productName}</h3>
          <p className={resolvedTheme === "light" ? "text-gray-600" : "text-gray-300"}>{price.description}</p>
          <p className="text-lg font-bold mt-2">{price.price}€</p>
          <div className="mt-2">
            <span className={`inline-block px-2 py-1 rounded text-sm ${
              resolvedTheme === "light" ? "bg-blue-100 text-blue-800" : "bg-blue-900 text-blue-200"
            }`}>
              {price.category === 'PETSITTING'
                ? 'Pet Sitting'
                : price.category === 'DRESSAGE_EDUCATION'
                ? 'Dressage & Éducation'
                : 'Rééducation & Comportementalisme'}
            </span>
            <span className={`inline-block px-2 py-1 rounded text-sm ml-2 ${
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

const PhotoItem = ({
  photo,
  onDelete,
  resolvedTheme
}: {
  photo: Photo,
  onDelete: (id: number) => void,
  resolvedTheme: string | undefined
}) => {
  return (
    <div key={photo.id} className={`p-4 rounded-lg ${
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
      <p className={resolvedTheme === "light" ? "text-gray-600 mb-2" : "text-gray-300 mb-2"}>{photo.alt}</p>
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

// Composant principal
export default function AdminDashboard() {
  // État
  const [prices, setPrices] = useState<Price[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editingPrice, setEditingPrice] = useState<Price | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingPhoto, setIsCreatingPhoto] = useState(false);
  const [newPrice, setNewPrice] = useState<NewPrice>({
    productName: '',
    price: 0,
    currency: 'EUR',
    description: '',
    category: 'PETSITTING',
    animalType: 'DOG',
    order: 0
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [pricesOpen, setPricesOpen] = useState(false);
  const [dogPricesOpen, setDogPricesOpen] = useState(false);
  const [catPricesOpen, setCatPricesOpen] = useState(false);

  // Fonctions de fetch
  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/prices');
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des prix:', error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      const data = await response.json();
      if (Array.isArray(data)) {
        setPhotos(data);
      } else {
        console.error('Les données reçues ne sont pas un tableau:', data);
        setPhotos([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des photos:', error);
      setPhotos([]);
    }
  };

  // Effets
  useEffect(() => {
    setMounted(true);
    fetchPrices();
    fetchPhotos();
  }, []);

  if (!mounted) return null;

  // Filtres pour les prestations par type d'animal
  const dogPrices = prices.filter(price => price.animalType === 'DOG');
  const catPrices = prices.filter(price => price.animalType === 'CAT');

  // Gestionnaires pour les prix
  const handleSavePrice = async (price: Price) => {
    try {
      const response = await fetch(`/api/prices/${price.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(price),
      });

      if (response.ok) {
        fetchPrices();
        setEditingPrice(null);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDeletePrice = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette prestation ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/prices/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPrices();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleCreatePrice = async (newPrice: NewPrice) => {
    try {
      const lastPrice = prices
        .filter(p => p.category === newPrice.category && p.animalType === newPrice.animalType)
        .sort((a, b) => b.order - a.order)[0];
      
      const order = lastPrice ? lastPrice.order + 1 : 1;

      const response = await fetch('/api/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newPrice, order }),
      });

      if (response.ok) {
        fetchPrices();
        setIsCreating(false);
        setNewPrice({
          productName: '',
          price: 0,
          currency: 'EUR',
          description: '',
          category: 'PETSITTING',
          animalType: 'DOG',
          order: 0
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  // Gestionnaires pour les photos
  const handleDeletePhoto = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPhotos();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la suppression de la photo');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la photo:', error);
      alert('Erreur lors de la suppression de la photo');
    }
  };

  const handleCreatePhoto = async (newPhoto: NewPhoto, file: File) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', newPhoto.alt);

      const response = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Erreur lors de la création de la photo');
      }

      fetchPhotos();
      setIsCreatingPhoto(false);
    } catch (error) {
      console.error('Erreur lors de la création de la photo:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la création de la photo');
    }
  };

  const handleLogout = () => {
    Cookies.remove('adminAuth');
    router.push('/admin/login');
  };

  // Rendu
  return (
    <section
      className={`py-8 min-h-screen transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
          : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2
            className={`text-center text-3xl font-bold mb-4 md:mb-0 ${
              resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
            }`}
          >
            Bienvenue Guillaume
          </h2>
          <div className={`h-1 w-24 mx-auto my-4 md:hidden ${
            resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
          }`}></div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setIsCreating(true)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
                resolvedTheme === "light"
                  ? "bg-orange-500 text-white"
                  : "bg-orange-400 text-gray-900"
              }`}
            >
              Nouvelle prestation
            </button>
            <button
              onClick={() => setIsCreatingPhoto(true)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
                resolvedTheme === "light"
                  ? "bg-orange-500 text-white"
                  : "bg-orange-400 text-gray-900"
              }`}
            >
              Nouvelle photo
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 bg-red-500 text-white"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        {/* Formulaire de création de photo */}
        {isCreatingPhoto && (
          <PhotoForm 
            onSave={handleCreatePhoto} 
            onCancel={() => setIsCreatingPhoto(false)} 
            error={error}
            resolvedTheme={resolvedTheme}
          />
        )}

        {/* Formulaire de création de prestation */}
        {isCreating && (
          <div className={`p-6 mb-8 rounded-2xl shadow-lg ${
            resolvedTheme === "light" 
              ? "border border-gray-300 bg-white shadow-lg text-gray-800" 
              : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
          }`}>
            <h2 className="text-xl font-semibold mb-4">Nouvelle prestation</h2>
            <PriceForm 
              price={newPrice} 
              onSave={handleCreatePrice} 
              onCancel={() => setIsCreating(false)}
              resolvedTheme={resolvedTheme}
            />
          </div>
        )}

        {/* Liste des photos */}
        <div className={`mb-8 rounded-2xl shadow-lg overflow-hidden ${
          resolvedTheme === "light" 
            ? "border border-gray-300 bg-white shadow-lg text-gray-800" 
            : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
        }`}>
          <div 
            className="flex justify-between items-center p-6 cursor-pointer"
            onClick={() => setPhotosOpen(!photosOpen)}
          >
            <h2 className="text-xl font-semibold">Liste des photos ({photos.length})</h2>
            <div className={`transform transition-transform duration-300 ${photosOpen ? 'rotate-180' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 transition-all duration-300 ease-in-out ${
              photosOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            {photos.map((photo) => (
              <PhotoItem 
                key={photo.id}
                photo={photo} 
                onDelete={handleDeletePhoto}
                resolvedTheme={resolvedTheme}
              />
            ))}
            {photos.length === 0 && (
              <p className="col-span-3 text-center italic">Aucune photo trouvée</p>
            )}
          </div>
        </div>

        {/* Liste des prestations */}
        <div className={`rounded-2xl shadow-lg overflow-hidden ${
          resolvedTheme === "light" 
            ? "border border-gray-300 bg-white shadow-lg text-gray-800" 
            : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
        }`}>
          <div 
            className="flex justify-between items-center p-6 cursor-pointer"
            onClick={() => setPricesOpen(!pricesOpen)}
          >
            <h2 className="text-xl font-semibold">Liste des prestations ({prices.length})</h2>
            <div className={`transform transition-transform duration-300 ${pricesOpen ? 'rotate-180' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className={`flex flex-col gap-4 p-6 transition-all duration-300 ease-in-out ${
            pricesOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            {/* Sous-menu Chien */}
            <div className={`rounded-lg overflow-hidden ${
              resolvedTheme === "light" 
                ? "border border-gray-200 bg-white" 
                : "border border-gray-700 bg-gray-800"
            }`}>
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => setDogPricesOpen(!dogPricesOpen)}
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    resolvedTheme === "light" ? "bg-blue-500" : "bg-blue-400"
                  }`}></span>
                  Prestations Chien ({dogPrices.length})
                </h3>
                <div className={`transform transition-transform duration-300 ${dogPricesOpen ? 'rotate-180' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                    </div>
                  </div>
              
              <div className={`flex flex-col gap-4 p-4 transition-all duration-300 ease-in-out ${
                dogPricesOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                {dogPrices.map((price) => (
                  <div key={price.id}>
                    {editingPrice?.id === price.id ? (
                      <div className={`p-4 rounded-lg ${
                        resolvedTheme === "light" 
                          ? "border border-gray-200" 
                          : "border border-gray-700"
                      }`}>
                        <PriceForm 
                          price={editingPrice} 
                          onSave={handleSavePrice as (price: Price | NewPrice) => void}
                          onCancel={() => setEditingPrice(null)}
                          resolvedTheme={resolvedTheme}
                        />
                      </div>
                    ) : (
                      <PriceItem 
                        price={price} 
                        onEdit={setEditingPrice}
                        onDelete={handleDeletePrice}
                        resolvedTheme={resolvedTheme}
                      />
                    )}
                  </div>
                ))}
                {dogPrices.length === 0 && (
                  <p className="text-center italic">Aucune prestation pour chien trouvée</p>
                )}
                      </div>
                    </div>

            {/* Sous-menu Chat */}
            <div className={`rounded-lg overflow-hidden ${
              resolvedTheme === "light" 
                ? "border border-gray-200 bg-white" 
                : "border border-gray-700 bg-gray-800"
            }`}>
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => setCatPricesOpen(!catPricesOpen)}
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    resolvedTheme === "light" ? "bg-green-500" : "bg-green-400"
                  }`}></span>
                  Prestations Chat ({catPrices.length})
                </h3>
                <div className={`transform transition-transform duration-300 ${catPricesOpen ? 'rotate-180' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className={`flex flex-col gap-4 p-4 transition-all duration-300 ease-in-out ${
                catPricesOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                {catPrices.map((price) => (
                  <div key={price.id}>
                    {editingPrice?.id === price.id ? (
                      <div className={`p-4 rounded-lg ${
                        resolvedTheme === "light" 
                          ? "border border-gray-200" 
                          : "border border-gray-700"
                      }`}>
                        <PriceForm 
                          price={editingPrice} 
                          onSave={handleSavePrice as (price: Price | NewPrice) => void}
                          onCancel={() => setEditingPrice(null)}
                          resolvedTheme={resolvedTheme}
                        />
                    </div>
                    ) : (
                      <PriceItem 
                        price={price} 
                        onEdit={setEditingPrice}
                        onDelete={handleDeletePrice}
                        resolvedTheme={resolvedTheme}
                      />
                    )}
                  </div>
                ))}
                {catPrices.length === 0 && (
                  <p className="text-center italic">Aucune prestation pour chat trouvée</p>
                )}
              </div>
            </div>

            {prices.length === 0 && (
              <p className="text-center italic">Aucune prestation n&apos;a encore été créée</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 