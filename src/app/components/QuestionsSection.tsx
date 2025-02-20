import { useTheme } from "next-themes";
import { FaPaw, FaDog, FaBrain, FaArrowRight } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useState, useEffect } from "react";

export default function QuestionsSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalContent, setModalContent] = useState({ title: "", details: "" });
  if (!mounted) return null;

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
      details: "Le petsitting consiste à s'occuper des animaux de compagnie, généralement des chiens ou des chats, en l'absence de leurs propriétaires. Cela peut inclure des tâches comme les nourrir, les promener, leur offrir de l'attention et veiller à leur bien-être. Le petsitter peut intervenir à domicile ou en extérieur, selon les besoins et préférences des propriétaires. C'est une alternative à la pension pour animaux, offrant un cadre plus personnalisé et rassurant pour les animaux."
    },
    {
      icon: <FaDog className="text-3xl text-blue-500" />, 
      title: "Qu’est-ce que le dressage et l’éducation ?", 
      description: [
        "Acquisition des comportements et ordres précis",
        "Intégration et adaptation de l’animal à son environnement",
        "Utilisation de méthodes ludiques et répétitives",
      ],
      details:"Le dressage canin et l'éducation canine sont deux approches complémentaires, mais distinctes, visant à améliorer la relation entre l'humain et le chien.Le dressage canin se concentre sur l'apprentissage de commandes spécifiques, comme \"assis\", \"couché\", \"reste\", ou encore des comportements plus complexes. Il s'agit souvent d'un travail basé sur la répétition et le renforcement positif (récompenses) ou négatif (punitions) pour conditionner le chien à adopter certains comportements. L'éducation canine, quant à elle, a une approche plus globale et vise à enseigner au chien à vivre en harmonie avec son environnement et ses humains. Elle inclut la gestion de comportements comme l'agressivité, l'anxiété, les aboiements excessifs ou encore les problèmes de propreté. L'éducation se base généralement sur des principes de bien-être et de communication respectueuse, en favorisant le renforcement positif pour encourager les bons comportements tout en réduisant les mauvais. En résumé, le dressage est plus axé sur l'acquisition de comportements spécifiques, tandis que l'éducation se concentre sur l'intégration harmonieuse du chien dans son environnement social et familial."
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
      details: "Le comportementalisme, en particulier pour les chiens et les chats, est une discipline qui étudie et modifie les comportements des animaux à travers des techniques basées sur la compréhension de leurs besoins, leur instinct et leur environnement. Les comportementalistes canins et félins analysent les problèmes de comportement (comme l'agression, l'anxiété, ou la destruction) et utilisent des méthodes de renforcement positif, de conditionnement et de gestion des situations pour aider les animaux à adopter des comportements plus adaptés. L'objectif est d'améliorer la relation entre l'animal et son propriétaire en favorisant une communication claire et respectueuse. Le comportementaliste a des connaissances sur les différentes maladies comportementales et peut donc faire un diagnostic sur l’état général de l’animal  il est capable dans les situations les plus difficiles de créer des thérapies comportementales associant les bienfaits de la rééducation et une approche médicamenteuse (Attention le comportementaliste n’est pas un vétérinaire, il ne peut donc pas prescrire de médicaments il faudra demander à son vétérinaire)"
    }
  ];

  function handleOpenModal(question: { title: string; details: string }) {
    setModalContent(question);
    onOpen();
  }

  return (
    <section className={`py-16 transition-colors duration-300 ${
      resolvedTheme === "light" ? "bg-gradient-to-b from-white to-orange-50 text-gray-900" : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
    }`}>
      <h2 className={`text-center text-3xl font-bold mb-6 ${
        resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
      }`}>Vos Questions</h2>
      <div className={`h-1 w-24 mx-auto mb-8 ${
        resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
      }`}></div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {questions.map((question, index) => (
          <article key={index} className={`p-6 rounded-2xl flex flex-col items-center gap-4 text-center transition-transform duration-300 hover:scale-105 ${
            resolvedTheme === "light" ? "border border-gray-600 bg-white shadow-lg text-gray-800" : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
          }`}>
            {question.icon}
            <h3 className="text-lg font-semibold">{question.title}</h3>
            <ul className="text-sm space-y-1 grow">
              {question.description.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
            <Button onPress={() => handleOpenModal(question)} className="mt-4 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105" style={{ backgroundColor: resolvedTheme === "light" ? "#ff7b00" : "#ff9f1c", color: "white" }}>
              En savoir plus
            </Button>
          </article>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside" classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }} className="w-3/4 [&>button]:hidden">
        <ModalContent className={`p-6 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto ${
          resolvedTheme === "light" ? "border border-gray-600 bg-white shadow-lg text-justify text-gray-800" : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
        }`}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modalContent.title}</ModalHeader>
              <ModalBody className="max-h-[60vh] overflow-y-auto">
                <p>{modalContent.details}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className={`px-6 py-3 mx-auto rounded-full text-lg font-semibold transition-all duration-300 hover:bg-orange-600 hover:scale-105 ${
            resolvedTheme === "light"
              ? "bg-orange-500 text-white"
              : "bg-orange-400 text-gray-100"
          }`}>
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="text-center mt-12">
        <a
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-orange-600 hover:scale-105 ${
            resolvedTheme === "light"
              ? "bg-orange-500 text-white"
              : "bg-orange-400 text-gray-100"
          }`}
          href="/quiz"
        >
          Besoin de conseil ?{" "}
          <FaArrowRight className="inline-block ml-2 text-xl" />
        </a>
      </div>
    </section>
  );
}
