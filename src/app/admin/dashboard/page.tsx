'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type Price = {
  id: number;
  productName: string;
  price: number;
  currency: string;
  description: string;
  category: 'PETSITTING' | 'DRESSAGE_EDUCATION' | 'REEDUCATION_COMPORTEMENTALISME';
  animalType: 'DOG' | 'CAT';
};

export default function AdminDashboard() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [editingPrice, setEditingPrice] = useState<Price | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPrice, setNewPrice] = useState<Omit<Price, 'id' | 'createdAt' | 'updatedAt'>>({
    productName: '',
    price: 0,
    currency: 'EUR',
    description: '',
    category: 'PETSITTING',
    animalType: 'DOG',
  });
  const router = useRouter();

  useEffect(() => {
    fetchPrices();
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
      const response = await fetch('/api/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPrice),
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
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
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
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Se déconnecter
            </button>
          </div>
        </div>

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