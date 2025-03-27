"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Modal, ModalContent, ModalBody } from "@heroui/react";

export default function APropos() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; orientation: string } | null>(null);
  if (!mounted) return null;
  const diplomes = [
    {
      src: "/diplome-biologie.png",
      alt: "Licence de biologie",
      orientation: "landscape",
    },
    {
      src: "/diplome-comportementaliste.png",
      alt: "Certificat comportementaliste",
      orientation: "portrait",
    },
    {
      src: "/diplome-acaced.png",
      alt: "ACACED chien et chat",
      orientation: "portrait",
    },
  ];

  return (
    <section
      className={`transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-white text-gray-900"
          : "bg-[#171717] text-gray-100"
      }
      ${
        resolvedTheme === "light"
          ? "bg-gradient-to-t from-orange-50 via-amber-50 to-slate-50 text-gray-900"
          : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
      }`}
    >
      <h1 className="text-center text-4xl font-bold mb-6 pt-8 text-orange-500">
        Qui-suis-je ?
      </h1>
      <div
        className={`h-1 w-24 mx-auto ${
          resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
        }`}
      ></div>
        <Image
          src="/LogoPerso.png"
          alt="Animaux - Educagriff"
          width={600}
          height={400}
          className="rounded-lg mx-auto shadow-lg my-8"
        />
      <p className="text-lg leading-relaxed w-4/5 md:w-3/4 lg:w-1/2 text-justify mx-auto mb-6">
        Je m’appelle <strong>Guillaume</strong> et je suis le créateur d’
        <strong>Educagriff</strong>. Passionné par les animaux, je suis{" "}
        <strong>éducateur comportementaliste canin et félin</strong> ainsi que{" "}
        <strong>petsitter</strong>.<br />
        <br />
        <strong>Mon Parcours :</strong>
        <br />
        Après un <strong>Bac scientifique</strong>, j’ai suivi une{" "}
        <strong>licence de biologie à l’université de Bordeaux</strong>,
        acquérant des connaissances en biologie, éthologie, physiologie et
        environnement.
        <br />
        En février 2024, j’ai obtenu mon{" "}
        <strong>Certificat de comportementaliste canin et félin</strong> après
        18 mois de formation.
        <br />
        Enfin, en juillet 2024, j’ai obtenu l’<strong>ACACED</strong> (chien et
        chat), me permettant d’exercer en tant qu’éducateur et petsitter.
        <br />
        <br />
        <strong>Mon Engagement :</strong>
        <br />
        J’ai enrichi mon expérience avec <strong>
          Solidarités 4 Pattes
        </strong>{" "}
        (Cestas, 33) et aux côtés d’un{" "}
        <strong>éducateur canin spécialisé</strong> dans les chiens réactifs.
        <br />
        Mon engagement inclut la <strong>lutte contre l’abandon</strong>,{" "}
        <strong>l’euthanasie de complaisance</strong> et la{" "}
        <strong>rééducation des chiens mordeurs</strong> pour leur donner une
        seconde chance.
        <br />
        <br />
        Mon objectif est de rendre aux animaux la place qu’ils méritent et
        d’aider leurs propriétaires à mieux les comprendre.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-6 text-orange-400 text-center">
        Mes Diplômes et Certifications
      </h2>
      <article className="flex justify-center flex-wrap gap-6 items-center w-screen">
        {diplomes.map((diplome, index) => (
          <Image
            key={index}
            src={diplome.src}
            alt={diplome.alt}
            width={300}
            height={300}
            className="rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedImage(diplome)}
            layout="intrinsic"
          />
        ))}
      </article>

<Modal
  isOpen={!!selectedImage}
  onClose={() => setSelectedImage(null)}
  backdrop="blur"
  className="w-auto h-auto p-10 m-10 m-auto [&>button]:p-2 [&>button]:border-5 [&>button]:border-white [&>button]:bg-black [&>button]:text-white [&>button]:text-3xl"
>
  <ModalContent className="relative max-w-screen-lg">
    <ModalBody className="flex justify-center items-center">
      {selectedImage && (
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={selectedImage.orientation === "landscape" ? 1600 : 800}
          height={selectedImage.orientation === "landscape" ? 900 : 1200}
          className="rounded-lg mx-auto shadow-2xl w-full h-auto max-h-[90vh] object-contain"
        />
      )}
    </ModalBody>
  </ModalContent>
</Modal>

      <article className="text-center py-12 ">
        <p className="text-lg mb-4 font-medium">
          Contactez-moi au :{" "}
          <a href="tel:0651271749" className="text-orange-500 font-semibold">
            06 51 27 17 49
          </a>
        </p>
        <p className="text-lg font-medium">Basé à Bordeaux et ses alentours</p>
      </article>
    </section>
  );
}
