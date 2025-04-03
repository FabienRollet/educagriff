'use client';

import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import Image from "next/image";
import infoIcon from "../../../public/icone-info.svg";
import infoIconWhite from "../../../public/icone-info-white.svg";

interface Price {
  id: string;
  productName: string;
  price: number;
  description: string;
  category: string;
  animalType: string;
  currency: string;
}

export default function TarifsChien() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/prices?animalType=DOG');
        if (!response.ok) throw new Error('Erreur lors du chargement des tarifs');
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (!mounted || loading) return null;

  const tableClasses = `rounded-2xl overflow-hidden shadow-lg transition-colors duration-300 ${
    resolvedTheme === "light"
      ? "bg-white text-gray-800"
      : "bg-gray-800 text-gray-100"
  }`;

  const headerClasses = `text-2xl font-bold text-center p-4 ${
    resolvedTheme === "light" ? "bg-orange-100" : "bg-gray-700"
  }`;

  const cellClasses = "py-2 px-6 border-b border-gray-700";

  const categories = {
    PETSITTING: "Petsitting",
    DRESSAGE_EDUCATION: "Dressage & Éducation",
    REEDUCATION_COMPORTEMENTALISME: "Rééducation & Comportementalisme",
  };

  return (
    <section className="flex flex-wrap justify-center px-4 mb-8 gap-10">
      {Object.entries(categories).map(([categoryKey, categoryTitle], index) => {
        const categoryPrices = prices.filter(price => price.category === categoryKey);
        
        if (categoryPrices.length === 0) return null;

        return (
        <motion.table
            key={categoryKey}
          className={tableClasses}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <thead>
            <tr>
              <th colSpan={2} className={headerClasses}>
                  {categoryTitle}
              </th>
            </tr>
          </thead>
          <tbody>
              {categoryPrices.map((price) => (
                <tr key={price.id}>
                <td className={cellClasses}>
                  <div className="flex items-center gap-2">
                      {price.description && (
                      <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                          <Image
                            src={resolvedTheme === "light" ? infoIcon : infoIconWhite}
                            alt="Info"
                            width={20}
                            height={20}
                            className={`cursor-pointer ${resolvedTheme === "light" ? "brightness-0" : "brightness-200"}`}
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                            <p className={`p-4 max-w-[75vw] sm:max-w-[1/3] lg:max-w-96 rounded-xl border-1 ${resolvedTheme === "light" ? "border-black text-black bg-white shadow-[8px_8px_0_0_rgba(23,23,23,1)]" : "border-white text-white bg-gray-800 shadow-[8px_8px_0_0_rgba(237,237,237,1)]"}`}>
                              {price.description}
                            </p>
                        </PopoverContent>
                      </Popover>
                      )}
                      {price.productName}
                  </div>
                </td>
                  <td className={cellClasses}>
                    {price.price === 0 ? 'Sur devis' : `${price.price}€`}
                  </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
        );
      })}
      <p className="text-center mt-4 w-full">
        Frais kilométriques offerts pour les premiers clients
      </p>
    </section>
  );
}
