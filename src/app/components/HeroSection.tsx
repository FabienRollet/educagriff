import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function HeroSection() {
  const { resolvedTheme } = useTheme();
  return (
    <section className="relative h-[35rem] flex flex-col items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <Image
        src="/banner.png"
        alt="Bannière"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Filtre de fond pour améliorer le contraste */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          resolvedTheme === "light"
            ? "bg-gradient-to-b from-black/40 to-orange-500/20"
            : "bg-gradient-to-b from-black/60 to-gray-900/40"
        }`}
      ></div>

      {/* Contenu de la section */}
      <div className="relative z-10 text-white text-center px-6">
        <h1 className="text-4xl font-extrabold drop-shadow-lg max-w-2xl mx-auto">
          Parce qu’un animal bien éduqué, c’est un compagnon heureux !
        </h1>
        <Link
          href="/tarifs"
          className="mt-6 inline-block bg-orange-500 text-gray-100 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 hover:bg-orange-700 hover:scale-105"
        >
          Voir les prestations
        </Link>
      </div>
    </section>
  );
}
