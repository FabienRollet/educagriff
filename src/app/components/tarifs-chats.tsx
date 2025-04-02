import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import Image from "next/image";
import infoIcon from "../../../public/icone-info.svg";
import infoIconWhite from "../../../public/icone-info-white.svg";

export default function TarifsChats() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tableClasses = `rounded-2xl overflow-hidden shadow-lg transition-colors duration-300 ${
    resolvedTheme === "light"
      ? "bg-white text-gray-800"
      : "bg-gray-800 text-gray-100"
  }`;

  const headerClasses = `text-2xl font-bold text-center p-4 ${
    resolvedTheme === "light" ? "bg-orange-100" : "bg-gray-700"
  }`;

  const cellClasses = "py-2 p-6 border-t border-gray-700";

  return (
    <section className="flex flex-wrap justify-center px-4 mb-8 gap-10">
      {[
        {
          title: "Petsitting",
          services: [
            [
              "Pré-visite (déduite sur la première prestation)",
              "9€",
              "La pré-visite corresponds à la première rencontre entre l’animal et son petsitter, elle permet notamment de pouvoir créer un premier lien afin que l’animal se sente bien par la suite si le maître prend un service de petsitting. Chez educagriff la pré-visite est payante mais sera déduite du prix de la première séance afin qu'elle devienne gratuite.",
            ],
            ["Visite à domicile 30min | 45min | 1h", "15€ | 20€ | 23€","Les séances de visite à domicile à durée déterminée pour chats sont des séances pendant laquelles le petsitter va s’occuper de votre animal afin de répondre à ses besoins primaires (nourriture boisson soins nettoyage litière etc) et de ses besoins secondaires (caresses, jeux, brossage, etc)"],
            ["Amener chez le vétérinaire", "Sur devis", "Service possible pour tous les chat. Il permet d’amener votre animal chez le vétérinaire pendant votre absence. Le prix sera à déterminer en fonction de la distance à parcourir et à la durée de l'intervention vétérinaire."],
            ["Forfait semaine", "Sur devis","Service de petsitting flexible, adapté à la fréquence souhaitée. Le tarif est défini en fonction du nombre de jours et de la durée des prestations. Avec Educagriff, la fidélité est toujours récompensée : plus vous faites appel à nos services, plus le tarif par séance est avantageux."],
            ["Forfait vacances (plus de 3 jours)", "Sur devis","Service de petsitting sur mesure, incluant deux visites quotidiennes à votre domicile pour une durée minimale de trois jours. Votre petsitter veille au bien-être de votre animal en assurant son alimentation, ses soins et son confort. Des nouvelles journalières vous sont envoyées afin que vous puissiez profiter de vos vacances en toute sérénité."],
            ["Animal supplémentaire", "+5€","Pour chaque animal supplémentaire au sein de votre foyer, un supplément de 5 € sera appliqué aux tarifs indiqués ci-dessus."],
          ],
        },
        {
          title: "Dressage & Éducation",
          services: [
            [
              "Bilan comportemental",
              "55€",
              "Le bilan comportemental vise à recueillir un maximum d’informations sur votre animal, son environnement, ainsi que votre relation avec lui (habitudes, règles, rituels, interdictions). Cette analyse approfondie permet d’identifier les éventuelles problématiques et de proposer un accompagnement adapté. À l’issue de ce bilan, un contrat pourra être établi pour la mise en place d’un suivi personnalisé. Les modalités et le nombre de séances seront définis après l’évaluation et vous seront communiqués oralement ou par e-mail, selon les besoins identifiés.",
            ],
            ["Séance unique renouvelable", "50€","Les séances uniques personnalisées chats ont pour objectif d’enseigner des commandes, des postures et des automatismes adaptés aux besoins du maître. Il faut savoir que le dressage félins exigent une grande patience. Ces sessions d’éducation sur mesure visent à renforcer la relation entre l’animal et son propriétaire en travaillant avec des exercices tels que assis,  l'apprentissage de la marche en harnais, etc. Ces séances ont également objectif de traiter les problématiques identifiées lors du bilan comportemental pour une cohabitation plus harmonieuse. Attention tous les chats ne sont pas aptes à pouvoir être dresser (à déterminer lors du bilan comportemental)."],
            ["Forfait 5 séances", "240€ (48€/séance)","Les forfaits 5 et 10 séances sont des formules permettant d'appliquer un tarif dégressif ( voir explications séances uniques)"],
            ["Forfait 10 séances", "460€ (46€/séance)","Les forfaits 5 et 10 séances sont des formules permettant d'appliquer un tarif dégressif ( voir explications séances uniques)"],
            ["Cours d’éveil chaton", "50€","Les consultations d’éveil pour chatons (0 à 4 mois) sont des sessions éducatives visant à favoriser leur développement comportemental. Elles incluent des exercices sensoriels (sonores, visuels et olfactifs) destinés à stimuler leurs interactions avec leur environnement, à renforcer leur tolérance aux stimulations extérieures et à améliorer la gestion de leurs émotions."],
            ["Sensibilisation comportementale en visio", "20€","La sensibilisation comportementale en visioconférence est un cours théorique au cours duquel l’éducateur répond aux questions du client. Il vise à restaurer une compréhension claire des signaux émis par l’animal et à enseigner son langage ainsi que ses besoins spécifiques."],
          ],
        },
        {
          title: "Rééducation & Comportementalisme",
          services: [
            ["Bilan comportemental + 1er diagnostic", "70€","Le bilan comportemental de la section comportementalisme a pour objectif de recueillir des informations détaillées sur votre animal, son environnement, ainsi que sur votre relation avec lui (habitudes, règles, rituels, interdictions). Cette évaluation approfondie permet d’identifier d’éventuelles problématiques, notamment liées à des troubles comportementaux ou à des pathologies sous-jacentes, et de proposer un accompagnement adapté. À l’issue de ce bilan, un contrat pourra être établi pour un suivi personnalisé. Les modalités et le nombre de séances seront définis après l’évaluation et communiqués oralement ou par e-mail afin de mettre en place une thérapie comportementale adaptés, en fonction des besoins identifiés. Le premier diagnostic concerne ainsi la suspicion de la présence d’un trouble comportemental et sera détaillé après la séance par mail."],
            ["Séance unique renouvelable", "65€","Les séances uniques pour chats ont pour objectif de mettre en place une thérapie comportementale adaptée pour répondre aux difficultés spécifiques de l'animal. Ces sessions de comportementalisme ou de rééducation sur mesure visent à renforcer la relation entre l'animal et son propriétaire en travaillant sur des exercices ludiques et de gestion comportementale, afin d'instaurer une communication optimale et harmonieuse."],
            ["Cours socialisation", "65€","Cours socialisation pour chat est une séance spéciale qui a pour objectif de favoriser la tolérance de l'animal à la présence de nouveaux arrivant dans son milieu (bébés, chats, chiens, adulte , etc)"],
          ],
        },
      ].map((category, index) => (
        <motion.table
          key={index}
          className={tableClasses}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <thead>
            <tr>
              <th colSpan={2} className={headerClasses}>
                {category.title}
              </th>
            </tr>
          </thead>
          <tbody>
            {category.services.map(([service, price, description], idx) => (
              <tr key={idx}>
                <td className={cellClasses}>
                  <div className="flex items-center gap-2">
                    
                    {description && (
                      <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                          <Image
                            src={resolvedTheme === "light" ? infoIcon : infoIconWhite}
                            alt="Info"
                            width={20}
                            height={20}
                            className={`cursor-pointer ${resolvedTheme === "light" ? "brightness-0" : "brightness-200"}`}
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                        <p className={`p-4 max-w-[75vw] sm:max-w-[1/3] lg:max-w-96 rounded-xl border-1 ${resolvedTheme === "light" ? "border-black text-black bg-white shadow-[8px_8px_0_0_rgba(23,23,23,1)]" : "border-white text-white bg-gray-800 shadow-[8px_8px_0_0_rgba(237,237,237,1)]"}`}>{description}</p>
                        </PopoverContent>
                      </Popover>
                    )}
                    {service}
                  </div>
                </td>
                <td className={cellClasses}>{price}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      ))}
      <p className="text-center mt-4 w-full">
        Frais kilométriques offerts pour les premiers clients
      </p>
    </section>
  );
}
