import React from 'react'

export default function TarifsChats() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center">Petsitting</h2>
    <table className="min-w-full bg-gray-800 text-white border border-gray-700">
    <thead>
      <tr className="bg-gray-900">
        <th className="py-3 px-6 text-left">Service</th>
        <th className="py-3 px-6 text-left">Tarif</th>
      </tr>
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
        <td className="py-2 px-6">Amener chez le vétérinaire</td>
        <td className="py-2 px-6">Sur devis</td>
      </tr>
      <tr className="border-b border-gray-700">
        <td className="py-2 px-6">Forfait semaine</td>
        <td className="py-2 px-6">Sur devis</td>
      </tr>
      <tr className="border-b border-gray-700">
        <td className="py-2 px-6">Forfait vacances (minimum 5 jours)</td>
        <td className="py-2 px-6">20€/jour</td>
      </tr>
      <tr className="border-b border-gray-700">
        <td className="py-2 px-6">Animal supplémentaire</td>
        <td className="py-2 px-6">+5€</td>
      </tr>
    </tbody>
  </table>
    </section>
  )
}
