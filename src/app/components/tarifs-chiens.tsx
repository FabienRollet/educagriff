import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import Image from "next/image";
import infoIcon from "../../../public/icone-info.svg";
import infoIconWhite from "../../../public/icone-info-white.svg";


export default function TarifsChien() {
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

  const cellClasses = "py-2 px-6 border-b border-gray-700";

  return (
    <section className="flex flex-wrap justify-center px-4 mb-8 gap-10">
      {[
        {
          title: "Petsitting",
          services: [
            ["Pré-visite (déduite sur la première prestation)", "9€",
              "La pré-visite corresponds à la première rencontre entre l’animal et son petsitter, elle permet notamment de pouvoir créer un premier lien afin que l’animal se sente bien par la suite si le maître prend un service de petsitting. Chez educagriff la pré-visite est payante mais sera déduite du prix de la première séance afin qu'elle devienne gratuite.",],
            ["Visite à domicile 30min | 45min | 1h", "15€ | 20€ | 23€","Les séances de visite à domicile à durée déterminée pour chiens sont des séances pendant laquelle le petsitter va s’occuper de votre animal afin de répondre à ses besoins primaires (nourritures, boisson soins et déjection) et secondaires ( jeux caresses attention) de plus ce service est adaptatif en fonction de vos besoins."],
            ["Amener chez le vétérinaire", "Sur devis","ervice exclusif pour les petits chiens (moins de 10 kilos). Il permet d’amener votre animal chez le vétérinaire pendant votre absence. Le prix sera à déterminer en fonction de la distance à parcourir et à la durée de l'intervention vétérinaire."],
            ["Balade hygiénique 30min", "15€","Les balades hygiéniques pour chiens constituent un service essentiel visant à assurer la sortie de votre animal en votre absence, lui permettant ainsi de faire ses besoins et de bénéficier d’un moment de détente à l’extérieur."],
            ["Balade éducative 1h", "23€","Les balades éducatives pour chiens combinent une sortie hygiénique de 30 minutes et un accompagnement éducatif personnalisé. Ce service permet de consolider les acquis et de renforcer les comportements en cours d’apprentissage, favorisant ainsi une progression continue et un équilibre optimal pour votre chien."],
            ["Forfait semaine", "Sur devis","Service de petsitting flexible, adapté à la fréquence souhaitée. Le tarif est défini en fonction du nombre de jours et de la durée des prestations. Avec Educagriff, la fidélité est toujours récompensée : plus vous faites appel à nos services, plus le tarif par séance est avantageux."],
            ["Forfait vacances (plus de 3 jours)", "Sur devis","Service de petsitting sur mesure, incluant deux visites quotidiennes à votre domicile pour une durée minimale de trois jours. Votre petsitter veille au bien-être de votre animal en assurant son alimentation, ses soins et son confort. Des nouvelles journalières vous sont envoyées afin que vous puissiez profiter de vos vacances en toute sérénité."],
            ["Animal supplémentaire", "+5€","Pour chaque animal supplémentaire au sein de votre foyer, un supplément de 5 € sera appliqué aux tarifs indiqués ci-dessus."],
          ],
        },
        {
          title: "Dressage & Éducation",
          services: [
            ["Bilan comportemental", "55€","Le bilan comportemental vise à recueillir un maximum d’informations sur votre animal, son environnement, ainsi que votre relation avec lui (habitudes, règles, rituels, interdictions). Cette analyse approfondie permet d’identifier les éventuelles problématiques et de proposer un accompagnement adapté. À l’issue de ce bilan, un contrat pourra être établi pour la mise en place d’un suivi personnalisé. Les modalités et le nombre de séances seront définis après l’évaluation et vous seront communiqués oralement ou par e-mail, selon les besoins identifiés."],
            ["Séance unique renouvelable", "50€","Les séances uniques personnalisées pour chiens ont pour objectif d’enseigner des commandes, des postures et des automatismes adaptés aux besoins du maître. Ces sessions d’éducation sur mesure visent à renforcer la relation entre l’animal et son propriétaire en travaillant des exercices de dressages tels que assis, couché, attends, au pied ou encore la marche en laisse. Elles permettent également de traiter les problématiques identifiées lors du bilan comportemental pour une cohabitation plus harmonieuse."],
            ["Forfait 5 séances", "240€ (48€/séance)"],
            ["Forfait 10 séances", "460€ (46€/séance)"],
            ["Cours d’éveil chiot", "50€"],
            ["Désensibilisation muselière", "55€"],
            ["Balade éducative en groupe (sous condition)", "15€"],
          ],
        },
        {
          title: "Rééducation & Comportementalisme",
          services: [
            ["Bilan comportemental + 1er diagnostic", "70€"],
            ["Séance unique renouvelable", "65€"],
            ["Cours socialisation (sous condition)", "65€"],
            ["Cours collectif (sous condition)", "Sur devis"],
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
