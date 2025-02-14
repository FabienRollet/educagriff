import { useTheme } from "next-themes";
import { FaPaw, FaDog, FaBrain, FaArrowRight } from "react-icons/fa";

export default function QuestionsSection() {
  const { resolvedTheme } = useTheme();

  // Données des questions
  const questions = [
    {
      icon: <FaPaw className="text-3xl text-orange-500" />,
      title: "Qu’est-ce que le petsitting ?",
      description: [
        "Répondre aux besoins primaires de l’animal",
        "Solutions pratiques pendant vos absences",
        "À domicile ou en extérieur",
        "Offre une présence et un cadre rassurant à vos animaux",
        "Pour chien et chat",
      ],
    },
    {
      icon: <FaDog className="text-3xl text-blue-500" />,
      title: "Qu’est-ce que le dressage et l’éducation ?",
      description: [
        "Acquisition des comportements et ordres précis",
        "Intégration et adaptation de l’animal à son environnement",
        "Utilisation de méthodes ludiques et répétitives",
      ],
    },
    {
      icon: <FaBrain className="text-3xl text-purple-500" />,
      title: "Qu’est-ce que le comportementalisme et la rééducation ?",
      description: [
        "Connaissances sur les maladies comportementales",
        "Analyse des comportements dérangeants et diagnostic précis",
        "Création de thérapies comportementales alliant éducation et approche médicamenteuse",
        "Rétablissement de la communication humain-animal",
      ],
    },
  ];

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
          : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
      }`}
    >
      <h2
        className={`text-center text-3xl font-bold mb-6 ${
          resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Vos Questions
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {questions.map((question, index) => (
          <article
            key={index}
            className={`p-6 rounded-2xl flex flex-col items-center gap-4 text-center transition-transform duration-300 hover:scale-105 ${
              resolvedTheme === "light"
                ? "bg-white shadow-lg text-gray-800"
                : "border border-gray-600 backdrop-blur-md bg-gray-800/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
            }`}
          >
            {question.icon}
            <h3 className="text-lg font-semibold">{question.title}</h3>
            <ul className="text-sm space-y-1">
              {question.description.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105"
              style={{
                backgroundColor:
                  resolvedTheme === "light" ? "#ff7b00" : "#ff9f1c",
                color: "white",
              }}
            >
              En savoir plus
            </button>
          </article>
        ))}
      </div>
      <div className="text-center mt-12">
        <button
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-orange-600 hover:scale-105 ${
            resolvedTheme === "light"
              ? "bg-orange-500 text-white"
              : "bg-orange-400 text-gray-100"
          }`}
        >
          Besoin de conseil ?{" "}
          <FaArrowRight className="inline-block ml-2 text-xl" />
        </button>
      </div>
    </section>
  );
}
