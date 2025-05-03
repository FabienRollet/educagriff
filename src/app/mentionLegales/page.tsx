"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function MentionLegales() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main
      className={`py-16 transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
          : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
      } `}
    >
      <h2
        className={`text-center text-3xl font-bold mb-8 ${
          resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Mentions Légales
      </h2>
      <div
        className={`h-1 w-24 mx-auto mb-8 ${
          resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
        }`}
      ></div>

      <div className={`max-w-3xl mx-6 md:mx-auto p-8 rounded-2xl shadow-lg ${
        resolvedTheme === "light" 
          ? "border border-gray-300 bg-white shadow-lg text-gray-800" 
          : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
      }`}>
        <ul className="space-y-6 list-none">
          <li>
            <h3 className={`text-xl font-semibold mb-3 ${
              resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
            }`}>Éditeur du site</h3>
            <ul className="space-y-2">
              <li>Entreprise individuelle : EducaGriff</li>
              <li>Statut : Auto-entrepreneur</li>
              <li>SIRET : 939 104 220 000 16</li>
              <li>Responsable de la publication : Guillaume Ferrer</li>
              <li>Adresse : Cadaujac, France</li>
              <li>E-mail : educagriff@gmail.com</li>
            </ul>
          </li>

          <li>
            <h3 className={`text-xl font-semibold mb-3 ${
              resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
            }`}>Développement du site</h3>
            <p>Développeur : Fabien Rollet - <a href="https://www.fabienrollet.fr" className="text-orange-500 hover:underline">www.fabienrollet.fr</a></p>
          </li>

          <li>
            <h3 className={`text-xl font-semibold mb-3 ${
              resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
            }`}>Hébergement</h3>
            <p>Le site educagriff.com est hébergé par :</p>
            <ul className="space-y-2 mt-2">
              <li>Vercel Inc.</li>
              <li>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
              <li>Site web : <a href="https://vercel.com" className="text-orange-500 hover:underline">https://vercel.com</a></li>
            </ul>
          </li>

          <li>
            <h3 className={`text-xl font-semibold mb-3 ${
              resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
            }`}>Propriété intellectuelle</h3>
            <p>L&apos;ensemble du contenu présent sur le site educagriff.com (textes, images, graphismes, logo, vidéos, etc.) est la propriété exclusive de Guillaume Ferrer, sauf mention contraire.</p>
            <p className="mt-2">Toute reproduction, distribution, modification ou publication, même partielle, est strictement interdite sans l&apos;autorisation préalable de l&apos;éditeur.</p>
          </li>

          <li>
            <h3 className={`text-xl font-semibold mb-3 ${
              resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
            }`}>Responsabilité</h3>
            <p>L&apos;éditeur s&apos;efforce de fournir sur le site educagriff.com des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait des tiers partenaires.</p>
          </li>

          <li>
            <h3 className={`text-xl font-semibold mb-3 ${
              resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
            }`}>Données personnelles</h3>
            <ul className="space-y-2">
              <li>Des données personnelles peuvent être collectées via les formulaires présents sur le site (contact, inscription, etc.).</li>
              <li>Ces données sont destinées uniquement à la gestion de la relation avec les utilisateurs du site.</li>
              <li>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de portabilité de vos données.</li>
              <li>Vous pouvez exercer ces droits en envoyant un mail à : <a href="mailto:educagriff@gmail.com" className="text-orange-500 hover:underline">educagriff@gmail.com</a></li>
            </ul>
          </li>

          <li>
            <h3 className={`text-xl font-semibold mb-3 ${
              resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
            }`}>Cookies</h3>
            <ul className="space-y-2">
              <li>Le site educagriff.com n&apos;utilise aucun cookie à des fins de suivi ou de collecte de données personnelles pour les visiteurs.</li>
              <li>Seuls des cookies techniques peuvent être utilisés pour la gestion de l&apos;espace d&apos;administration, et ne concernent que l&apos;administrateur du site.</li>
            </ul>
          </li>

          <li>
            <h3 className={`text-xl font-semibold mb-3 ${
              resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
            }`}>Droit applicable</h3>
            <p>Le site est soumis au droit français. En cas de litige, les tribunaux compétents seront ceux du ressort de la Cour d&apos;appel de Bordeaux.</p>
          </li>
        </ul>
      </div>
    </main>
  );
}