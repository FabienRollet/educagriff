import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[35rem]  flex flex-col items-center justify-center bg-gray-200 overflow-hidden">
      {/* Image en arrière-plan */}
      <Image
        src="/banner.png"
        alt="Bannière"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-white text-center">
        <h1 className="text-3xl font-bold">
          Parce qu’un animal bien éduqué, c’est un compagnon heureux
        </h1>
        <Link
          href="/contact"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Voir les prestations
        </Link>
      </div>
    </section>
  );
}
