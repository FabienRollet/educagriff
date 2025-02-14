import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function TarifsChats() {
  const { resolvedTheme } = useTheme();

  const tableClasses = `rounded-2xl overflow-hidden shadow-lg transition-colors duration-300 ${
    resolvedTheme === "light"
      ? "bg-white text-gray-800"
      : "bg-gray-800 text-gray-100"
  }`;

  const headerClasses = `text-2xl font-bold text-center p-4 ${
    resolvedTheme === "light" ? "bg-orange-100" : "bg-gray-700"
  }`;

  const cellClasses = "py-2 p-6 border-t border-gray-700";

  return (
    <section className="flex flex-wrap justify-center px-4 mb-8 gap-10">
      {[
        {
          title: "Petsitting",
          services: [
            ["Pré-visite (déduite sur la première prestation)", "9€"],
            ["Visite à domicile 30min | 45min | 1h", "15€ | 20€ | 23€"],
            ["Amener chez le vétérinaire", "Sur devis"],
            ["Forfait semaine", "Sur devis"],
            ["Forfait vacances (plus de 3 jours)", "20€/jour"],
            ["Animal supplémentaire", "+5€"],
          ],
        },
        {
          title: "Dressage & Éducation",
          services: [
            ["Bilan comportemental", "55€"],
            ["Séance unique renouvelable", "50€"],
            ["Forfait 5 séances", "240€ (48€/séance)"],
            ["Forfait 10 séances", "460€ (46€/séance)"],
            ["Cours d’éveil chaton", "50€"],
            ["Sensibilisation comportementale en visio", "20€"],
          ],
        },
        {
          title: "Rééducation & Comportementalisme",
          services: [
            ["Bilan comportemental + 1er diagnostic", "65€"],
            ["Séance unique renouvelable", "55€"],
            ["Cours socialisation", "55€"],
          ],
        },
      ].map((category, index) => (
        <motion.table
          key={index}
          className={tableClasses}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <thead>
            <tr>
              <th colSpan={2} className={headerClasses}>
                {category.title}
              </th>
            </tr>
          </thead>
          <tbody>
            {category.services.map(([service, price], idx) => (
              <tr key={idx}>
                <td className={cellClasses}>{service}</td>
                <td className={cellClasses}>{price}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      ))}
      <p className="text-center mt-4 w-full" >
        Frais kilométriques offerts pour les premiers clients
      </p>
    </section>
  );
}
