"use client";
import HeroSection from "./components/HeroSection";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme } = useTheme();

  return (
    <main>
      <HeroSection />
      <article>
        <h2 className="text-2xl font-bold text-blue-600/100 text-center my-10">
          Bienvenue chez Educagriff
        </h2>
        <p
          className={`m-20 w-[80%] text-center items-center justify-center mx-auto p-6 rounded-2xl border backdrop-blur-md
          ${
            resolvedTheme === "light"
              ? "border-gray-300 shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-light text-white"
              : "border-gray-600 shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-dark text-black"
          }`}
        >
          <strong>Educagriff</strong> est une entreprise de prestations de
          services en lien avec les animaux de compagnie dans le but de vous
          conseiller, vous accompagner, de s’occuper, d’
          <strong>éduquer et rééduquer</strong> vos animaux selon vos besoins.
          <br />
          <br />
          <strong>L’empathie, la bienveillance et l’écoute</strong> en accord
          avec les besoins physiologiques, comportementaux et psychologiques de
          l’animal et du maître sont les principales valeurs que nous défendons.
        </p>
      </article>
    </main>
  );
}
