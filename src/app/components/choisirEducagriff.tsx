import {
  FaPaw,
  FaClipboardCheck,
  FaUsers,
  FaClock,
  FaHeart,
  FaQuestionCircle,
  FaHandsHelping,
} from "react-icons/fa";
import { useTheme } from "next-themes";

export default function QuiSuisJe() {
  const { resolvedTheme } = useTheme();
  const features = [
    {
      icon: FaClipboardCheck,
      title: "Méthode de travail",
      description: "Observation, Analyse, Action, Conclusion ou Modification.",
    },
    {
      icon: FaPaw,
      title: "Diversité des services",
      description:
        "Petsitting, Dressage, Éducation, Rééducation et Comportementalisme.",
    },
    {
      icon: FaUsers,
      title: "Adaptabilité",
      description: "Services sur mesure et modifiables.",
    },
    {
      icon: FaClock,
      title: "Disponibilité",
      description:
        "Nombreux créneaux et prise en charge rapide de vos besoins.",
    },
    {
      icon: FaHeart,
      title: "Motivation",
      description:
        "Notre passion et notre volonté de vous soutenir demeurent intactes et inépuisables.",
    },
    {
      icon: FaQuestionCircle,
      title: "Quiz",
      description: "Un outil pratique pour vous aider dans vos recherches.",
    },
    {
      icon: FaHandsHelping,
      title: "Engagement",
      description:
        "Partenaire et contact associatif pour le sauvetage d’animaux en danger.",
    },
  ];

  return (
      <section
        className={`py-16 transition-colors duration-300 ${
          resolvedTheme === "light"
            ? "bg-gradient-to-b from-orange-100 to-white text-gray-800"
            : "bg-gradient-to-b from-gray-900 to-black text-gray-100"
        }`}
      >
        <h1
          className={`text-center text-3xl font-bold mb-4 ${
            resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
          }`}
        >
          Pourquoi choisir Educagriff ?
        </h1>
        <div
          className={`h-1 w-24 mx-auto mb-8 ${
            resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
          }`}
        ></div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:nth-6:col-start-3">
          {features.map((feature, index) => (
            <article
              key={index}
              className={`p-6 rounded-2xl flex flex-wrap items-start gap-4 hover:shadow-xl transition ${
                resolvedTheme === "light"
                  ? "bg-white shadow-lg text-gray-800"
                  : "border border-gray-600 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
              }`}
            >
              <feature.icon
                className={`text-3xl ${
                  resolvedTheme === "light" ? "text-orange-500" : "text-orange-400"
                }`}
              />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p
                className={`${
                  resolvedTheme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }
