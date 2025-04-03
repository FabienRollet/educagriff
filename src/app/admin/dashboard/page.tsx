'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

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

export default function AdminDashboard() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editingPrice, setEditingPrice] = useState<Price | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingPhoto, setIsCreatingPhoto] = useState(false);
  const [newPrice, setNewPrice] = useState<Omit<Price, 'id' | 'createdAt' | 'updatedAt'>>({
    productName: '',
    price: 0,
    currency: 'EUR',
    description: '',
    category: 'PETSITTING',
    animalType: 'DOG',
    order: 0
  });
  const [newPhoto, setNewPhoto] = useState<Omit<Photo, 'id' | 'createdAt'>>({
    url: '',
    alt: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPrices();
    fetchPhotos();
  }, []);

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

  const handleEdit = (price: Price) => {
    setEditingPrice(price);
  };

  const handleSave = async () => {
    if (!editingPrice) return;

    try {
      const response = await fetch(`/api/prices/${editingPrice.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPrice),
      });

      if (response.ok) {
        fetchPrices();
        setEditingPrice(null);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDelete = async (id: number) => {
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

  const handleCreate = async () => {
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

  const handleCreatePhoto = async () => {
    if (!selectedFile) {
      setError('Veuillez sélectionner une photo');
      return;
    }

    try {
      setError(null);
      const formData = new FormData();
      formData.append('file', selectedFile);
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
      setNewPhoto({
        url: '',
        alt: ''
      });
      setSelectedFile(null);
    } catch (error) {
      console.error('Erreur lors de la création de la photo:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la création de la photo');
    }
  };

  const handleLogout = () => {
    Cookies.remove('adminAuth');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
          <div className="space-x-4">
            <button
              onClick={() => setIsCreating(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Nouvelle prestation
            </button>
            <button
              onClick={() => setIsCreatingPhoto(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Nouvelle photo
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        {isCreatingPhoto && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Nouvelle photo</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={newPhoto.alt}
                onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Description de la photo"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleCreatePhoto}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Ajouter l&apos;image
                </button>
                <button
                  onClick={() => {
                    setIsCreatingPhoto(false);
                    setSelectedFile(null);
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {isCreating && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Nouvelle prestation</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newPrice.productName}
                onChange={(e) => setNewPrice({ ...newPrice, productName: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Nom de la prestation"
              />
              <input
                type="number"
                value={newPrice.price}
                onChange={(e) => setNewPrice({ ...newPrice, price: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded"
                placeholder="Prix"
              />
              <textarea
                value={newPrice.description}
                onChange={(e) => setNewPrice({ ...newPrice, description: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Description"
              />
              <select
                value={newPrice.category}
                onChange={(e) =>
                  setNewPrice({
                    ...newPrice,
                    category: e.target.value as Price['category'],
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="PETSITTING">Pet Sitting</option>
                <option value="DRESSAGE_EDUCATION">Dressage & Éducation</option>
                <option value="REEDUCATION_COMPORTEMENTALISME">
                  Rééducation & Comportementalisme
                </option>
              </select>
              <select
                value={newPrice.animalType}
                onChange={(e) =>
                  setNewPrice({
                    ...newPrice,
                    animalType: e.target.value as Price['animalType'],
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="DOG">Chien</option>
                <option value="CAT">Chat</option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={handleCreate}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Créer
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Liste des photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="border p-4 rounded-md">
                <div className="relative h-48 mb-4">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-gray-600 mb-2">{photo.alt}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(photo.createdAt).toLocaleDateString('fr-FR')}
                </p>
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Liste des prestations</h2>
          <div className="space-y-4">
            {prices.map((price) => (
              <div key={price.id} className="border p-4 rounded-md">
                {editingPrice?.id === price.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingPrice.productName}
                      onChange={(e) =>
                        setEditingPrice({ ...editingPrice, productName: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Nom de la prestation"
                    />
                    <input
                      type="number"
                      value={editingPrice.price}
                      onChange={(e) =>
                        setEditingPrice({ ...editingPrice, price: parseFloat(e.target.value) })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Prix"
                    />
                    <textarea
                      value={editingPrice.description}
                      onChange={(e) =>
                        setEditingPrice({ ...editingPrice, description: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Description"
                    />
                    <select
                      value={editingPrice.category}
                      onChange={(e) =>
                        setEditingPrice({
                          ...editingPrice,
                          category: e.target.value as Price['category'],
                        })
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="PETSITTING">Pet Sitting</option>
                      <option value="DRESSAGE_EDUCATION">Dressage & Éducation</option>
                      <option value="REEDUCATION_COMPORTEMENTALISME">
                        Rééducation & Comportementalisme
                      </option>
                    </select>
                    <select
                      value={editingPrice.animalType}
                      onChange={(e) =>
                        setEditingPrice({
                          ...editingPrice,
                          animalType: e.target.value as Price['animalType'],
                        })
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="DOG">Chien</option>
                      <option value="CAT">Chat</option>
                    </select>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={() => setEditingPrice(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{price.productName}</h3>
                      <p className="text-gray-600">{price.description}</p>
                      <p className="text-lg font-bold mt-2">{price.price}€</p>
                      <div className="mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {price.category === 'PETSITTING'
                            ? 'Pet Sitting'
                            : price.category === 'DRESSAGE_EDUCATION'
                            ? 'Dressage & Éducation'
                            : 'Rééducation & Comportementalisme'}
                        </span>
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm ml-2">
                          {price.animalType === 'DOG' ? 'Chien' : 'Chat'}
                        </span>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(price)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(price.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 