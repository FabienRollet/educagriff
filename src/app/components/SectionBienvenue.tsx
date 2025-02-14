import { useTheme } from "next-themes";

export default function SectionBienvenue() {
  const { resolvedTheme } = useTheme();

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-orange-50 to-orange-100 text-gray-900"
          : "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100"
      }`}
    >
      <h1
        className={`text-center text-3xl font-bold mb-4 ${
          resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Bienvenue chez Educagriff
      </h1>
      <p
        className={`w-[80%] mx-auto p-6 rounded-2xl border text-center backdrop-blur-md transition-shadow
          ${
            resolvedTheme === "light"
              ? "border-gray-300 shadow-lg bg-white text-gray-900"
              : "border-gray-600 shadow-[0_0_25px_rgba(255,255,255,0.2)] bg-gray-700/70 text-gray-100"
          }`}
      >
        <strong>Educagriff</strong> est une entreprise de prestations de
        services en lien avec les animaux de compagnie, dans le but de vous
        conseiller, vous accompagner, de s’occuper, d’
        <strong>éduquer et rééduquer</strong> vos animaux selon vos besoins.
        <br />
        <br />
        <strong>L’empathie, la bienveillance et l’écoute</strong> en accord avec
        les besoins physiologiques, comportementaux et psychologiques de
        l’animal et du maître sont les principales valeurs que nous défendons.
      </p>
    </section>
  );
}
