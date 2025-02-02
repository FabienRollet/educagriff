import React from "react";

export default function TarifsChien() {
  return (
    <section className="flex flex-wrap justify-center px-4 mb-8 gap-10 [&>table]:px-8">
      <table className="bg-gray-800 text-white border border-gray-700 ">
        <thead>
          <th
            colSpan={2}
            className="text-2xl bg-gray-900 font-bold text-center p-2"
          >
            Petsitting
          </th>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Pré-visite (déduite sur la première prestation)</td>
            <td className="py-2 px-6">9€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Visite à domicile 30min | 45min | 1h</td>
            <td className="py-2 px-6">15€ | 20€ | 23€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Balade hygiénique 30min</td>
            <td className="py-2 px-6">15€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Balade éducative 1h</td>
            <td className="py-2 px-6">23€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Forfait semaine</td>
            <td className="py-2 px-6">Sur devis</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Forfait vacances (plus de 3 jours)</td>
            <td className="py-2 px-6">20€/jour</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Animal supplémentaire</td>
            <td className="py-2 px-6">+5€</td>
          </tr>
        </tbody>
      </table>

      <table className="bg-gray-800 text-white border border-gray-700">
        <thead>
          <th
            colSpan={2}
            className="text-2xl bg-gray-900 font-bold text-center p-2"
          >
            Dressage & Éducation
          </th>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Bilan comportemental</td>
            <td className="py-2 px-6">55€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Séance unique renouvelable</td>
            <td className="py-2 px-6">50€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Forfait 5 séances</td>
            <td className="py-2 px-6">240€ (48€/séance)</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Forfait 10 séances</td>
            <td className="py-2 px-6">460€ (46€/séance)</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Cours d’éveil chiot</td>
            <td className="py-2 px-6">50€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Désensibilisation muselière</td>
            <td className="py-2 px-6">55€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Balade éducative en groupe (sous condition)</td>
            <td className="py-2 px-6">15€</td>
          </tr>
        </tbody>
      </table>
      <table className="bg-gray-800 text-white border border-gray-700">
        <thead>
          <th
            colSpan={2}
            className="text-2xl bg-gray-900 font-bold text-center p-2"
          >
            Rééducation & Comportementalisme
          </th>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Bilan comportemental + 1er diagnostic</td>
            <td className="py-2 px-6">70€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Séance unique renouvelable</td>
            <td className="py-2 px-6">65€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Cours socialisation (sous condition)</td>
            <td className="py-2 px-6">65€</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Cours collectif (sous condition)</td>
            <td className="py-2 px-6">Sur devis</td>
          </tr>
        </tbody>
      </table>
      <p>Frais kilométriques offerts pour les 1ers clients</p>
      {/* <table className="bg-gray-800 text-white border border-gray-700">
        <thead>
          <th
            colSpan={2}
            className="text-2xl bg-gray-900 font-bold text-center p-2"
          >
            Frais annexes
          </th>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Frais kilométriques (0 à X km)</td>
            <td className="py-2 px-6">Offert</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Frais kilométriques (X à X km)</td>
            <td className="py-2 px-6">0.X cts/km</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Frais kilométriques (X km et plus)</td>
            <td className="py-2 px-6">Sur devis</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-6">Service personnalisable (chien/chat)</td>
            <td className="py-2 px-6">Sur devis</td>
          </tr>
        </tbody>
      </table> */}
    </section>
  );
}
