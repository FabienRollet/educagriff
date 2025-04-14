import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Suppression des données existantes
  await prisma.price.deleteMany();

  const catsData = [
    // Petsitting
  {
    productName: "Pré-visite (déduite sur la première prestation)",
    price: 9,
    currency: "EUR",
    description: "La pré-visite corresponds à la première rencontre entre l'animal et son petsitter, elle permet notamment de pouvoir créer un premier lien afin que l'animal se sente bien par la suite si le maître prend un service de petsitting. Chez educagriff la pré-visite est payante mais sera déduite du prix de la première séance afin qu'elle devienne gratuite.",
    category: "PETSITTING",
    animalType: "CAT",
    order: 1
  },
  {
    productName: "Visite à domicile 30min | 45min | 1h",
    price: 15,
    currency: "EUR",
    description: "Les séances de visite à domicile à durée déterminée pour chats sont des séances pendant laquelles le petsitter va s'occuper de votre animal afin de répondre à ses besoins primaires (nourriture boisson soins nettoyage litière etc) et de ses besoins secondaires (caresses, jeux, brossage, etc)",
    category: "PETSITTING",
    animalType: "CAT",
    order: 2
  },
  {
    productName: "Forfait semaine",
    price: 0,
    currency: "EUR",
    description: "Service de petsitting flexible, adapté à la fréquence souhaitée. Le tarif est défini en fonction du nombre de jours et de la durée des prestations. Avec Educagriff, la fidélité est toujours récompensée : plus vous faites appel à nos services, plus le tarif par séance est avantageux.",
    category: "PETSITTING",
    animalType: "CAT",
    order: 3
  },
  {
    productName: "Forfait vacances (plus de 3 jours)",
    price: 0,
    currency: "EUR",
    description: "Service de petsitting sur mesure, incluant deux visites quotidiennes à votre domicile pour une durée minimale de trois jours. Votre petsitter veille au bien-être de votre animal en assurant son alimentation, ses soins et son confort. Des nouvelles journalières vous sont envoyées afin que vous puissiez profiter de vos vacances en toute sérénité.",
    category: "PETSITTING",
    animalType: "CAT",
    order: 4
  },
  {
    productName: "Animal supplémentaire",
    price: 5,
    currency: "EUR",
    description: "Pour chaque animal supplémentaire au sein de votre foyer, un supplément de 5 € sera appliqué aux tarifs indiqués ci-dessus.",
    category: "PETSITTING",
    animalType: "CAT",
    order: 5
  },
  {
    productName: "Amener chez le vétérinaire",
    price: 0,
    currency: "EUR",
    description: "Service possible pour tous les chat. Il permet d'amener votre animal chez le vétérinaire pendant votre absence. Le prix sera à déterminer en fonction de la distance à parcourir et à la durée de l'intervention vétérinaire.",
    category: "PETSITTING",
    animalType: "CAT",
    order: 6
  },
  // Dressage & Éducation
  {
    productName: "Bilan comportemental",
    price: 55,
    currency: "EUR",
    description: "Le bilan comportemental vise à recueillir un maximum d'informations sur votre animal, son environnement, ainsi que votre relation avec lui (habitudes, règles, rituels, interdictions). Cette analyse approfondie permet d'identifier les éventuelles problématiques et de proposer un accompagnement adapté. À l'issue de ce bilan, un contrat pourra être établi pour la mise en place d'un suivi personnalisé. Les modalités et le nombre de séances seront définis après l'évaluation et vous seront communiqués oralement ou par e-mail, selon les besoins identifiés.",
    category: "DRESSAGE_EDUCATION",
    animalType: "CAT",
    order: 1
  },
  {
    productName: "Séance unique renouvelable",
    price: 50,
    currency: "EUR",
    description: "Les séances uniques personnalisées chats ont pour objectif d'enseigner des commandes, des postures et des automatismes adaptés aux besoins du maître. Il faut savoir que le dressage félins exigent une grande patience. Ces sessions d'éducation sur mesure visent à renforcer la relation entre l'animal et son propriétaire en travaillant avec des exercices tels que assis,  l'apprentissage de la marche en harnais, etc. Ces séances ont également objectif de traiter les problématiques identifiées lors du bilan comportemental pour une cohabitation plus harmonieuse. Attention tous les chats ne sont pas aptes à pouvoir être dresser (à déterminer lors du bilan comportemental).",
    category: "DRESSAGE_EDUCATION",
    animalType: "CAT",
    order: 2
  },
  {
    productName: "Forfait 5 séances",
    price: 240,
    currency: "EUR",
    description: "Les forfaits 5 et 10 séances sont des formules permettant d'appliquer un tarif dégressif ( voir explications séances uniques)",
    category: "DRESSAGE_EDUCATION",
    animalType: "CAT",
    order: 3
  },
  {
    productName: "Forfait 10 séances",
    price: 460,
    currency: "EUR",
    description: "Les forfaits 5 et 10 séances sont des formules permettant d'appliquer un tarif dégressif ( voir explications séances uniques)",
    category: "DRESSAGE_EDUCATION",
    animalType: "CAT",
    order: 4
  },
  {
    productName: "Cours d'éveil chaton",
    price: 50,
    currency: "EUR",
    description: "Les consultations d'éveil pour chatons (0 à 4 mois) sont des sessions éducatives visant à favoriser leur développement comportemental. Elles incluent des exercices sensoriels (sonores, visuels et olfactifs) destinés à stimuler leurs interactions avec leur environnement, à renforcer leur tolérance aux stimulations extérieures et à améliorer la gestion de leurs émotions.",
    category: "DRESSAGE_EDUCATION",
    animalType: "CAT",
    order: 5
  },
  {
    productName: "Sensibilisation comportementale en visio",
    price: 20,
    currency: "EUR",
    description: "La sensibilisation comportementale en visioconférence est un cours théorique au cours duquel l'éducateur répond aux questions du client. Il vise à restaurer une compréhension claire des signaux émis par l'animal et à enseigner son langage ainsi que ses besoins spécifiques.",
    category: "DRESSAGE_EDUCATION",
    animalType: "CAT",
    order: 6
  },
  // Rééducation & Comportementalisme
  {
    productName: "Bilan comportemental + 1er diagnostic",
    price: 70,
    currency: "EUR",
    description: "Le bilan comportemental de la section comportementalisme a pour objectif de recueillir des informations détaillées sur votre animal, son environnement, ainsi que sur votre relation avec lui (habitudes, règles, rituels, interdictions). Cette évaluation approfondie permet d'identifier d'éventuelles problématiques, notamment liées à des troubles comportementaux ou à des pathologies sous-jacentes, et de proposer un accompagnement adapté. À l'issue de ce bilan, un contrat pourra être établi pour un suivi personnalisé. Les modalités et le nombre de séances seront définis après l'évaluation et communiqués oralement ou par e-mail afin de mettre en place une thérapie comportementale adaptés, en fonction des besoins identifiés. Le premier diagnostic concerne ainsi la suspicion de la présence d'un trouble comportemental et sera détaillé après la séance par mail.",
    category: "REEDUCATION_COMPORTEMENTALISME",
    animalType: "CAT",
    order: 1
  },
  {
    productName: "Séance unique renouvelable",
    price: 65,
    currency: "EUR",
    description: "Les séances uniques pour chats ont pour objectif de mettre en place une thérapie comportementale adaptée pour répondre aux difficultés spécifiques de l'animal. Ces sessions de comportementalisme ou de rééducation sur mesure visent à renforcer la relation entre l'animal et son propriétaire en travaillant sur des exercices ludiques et de gestion comportementale, afin d'instaurer une communication optimale et harmonieuse.",
    category: "REEDUCATION_COMPORTEMENTALISME",
    animalType: "CAT",
    order: 2
  },
  {
    productName: "Cours socialisation",
    price: 65,
    currency: "EUR",
    description: "Cours socialisation pour chat est une séance spéciale qui a pour objectif de favoriser la tolérance de l'animal à la présence de nouveaux arrivant dans son milieu (bébés, chats, chiens, adulte , etc)",
    category: "REEDUCATION_COMPORTEMENTALISME",
    animalType: "CAT",
    order: 3
  }
];

  const dogsData = [
     // Petsitting
  {
    productName: "Pré-visite (déduite sur la première prestation)",
    price: 9,
    currency: "EUR",
    description: "La pré-visite corresponds à la première rencontre entre l'animal et son petsitter, elle permet notamment de pouvoir créer un premier lien afin que l'animal se sente bien par la suite si le maître prend un service de petsitting. Chez educagriff la pré-visite est payante mais sera déduite du prix de la première séance afin qu'elle devienne gratuite.",
    category: "PETSITTING",
    animalType: "DOG",
    order: 1
  },
  {
    productName: "Visite à domicile 30min | 45min | 1h",
    price: 15,
    currency: "EUR",
    description: "Les séances de visite à domicile à durée déterminée pour chiens sont des séances pendant laquelle le petsitter va s'occuper de votre animal afin de répondre à ses besoins primaires (nourritures, boisson soins et déjection) et secondaires ( jeux caresses attention) de plus ce service est adaptatif en fonction de vos besoins.",
    category: "PETSITTING",
    animalType: "DOG",
    order: 2
  },
  {
    productName: "Balade hygiénique 30min",
    price: 15,
    currency: "EUR",
    description: "Les balades hygiéniques pour chiens constituent un service essentiel visant à assurer la sortie de votre animal en votre absence, lui permettant ainsi de faire ses besoins et de bénéficier d'un moment de détente à l'extérieur.",
    category: "PETSITTING",
    animalType: "DOG",
    order: 3
  },
  {
    productName: "Balade éducative 1h",
    price: 23,
    currency: "EUR",
    description: "Les balades éducatives pour chiens combinent une sortie hygiénique de 30 minutes et un accompagnement éducatif personnalisé. Ce service permet de consolider les acquis et de renforcer les comportements en cours d'apprentissage, favorisant ainsi une progression continue et un équilibre optimal pour votre chien.",
    category: "PETSITTING",
    animalType: "DOG",
    order: 4
  },
  {
    productName: "Forfait semaine",
    price: 0,
    currency: "EUR",
    description: "Service de petsitting flexible, adapté à la fréquence souhaitée. Le tarif est défini en fonction du nombre de jours et de la durée des prestations. Avec Educagriff, la fidélité est toujours récompensée : plus vous faites appel à nos services, plus le tarif par séance est avantageux.",
    category: "PETSITTING",
    animalType: "DOG",
    order: 5
  },
  {
    productName: "Forfait vacances (plus de 3 jours)",
    price: 0,
    currency: "EUR",
    description: "Service de petsitting sur mesure, incluant deux visites quotidiennes à votre domicile pour une durée minimale de trois jours. Votre petsitter veille au bien-être de votre animal en assurant son alimentation, ses soins et son confort. Des nouvelles journalières vous sont envoyées afin que vous puissiez profiter de vos vacances en toute sérénité.",
    category: "PETSITTING",
    animalType: "DOG",
    order: 6
  },
  {
    productName: "Animal supplémentaire",
    price: 5,
    currency: "EUR",
    description: "Pour chaque animal supplémentaire au sein de votre foyer, un supplément de 5 € sera appliqué aux tarifs indiqués ci-dessus.",
    category: "PETSITTING",
    animalType: "DOG",
    order: 7
  },
  {
    productName: "Amener chez le vétérinaire",
    price: 0,
    currency: "EUR",
    description: "Service exclusif pour les petits chiens (moins de 10 kilos). Il permet d'amener votre animal chez le vétérinaire pendant votre absence. Le prix sera à déterminer en fonction de la distance à parcourir et à la durée de l'intervention vétérinaire.",
    category: "PETSITTING",
    animalType: "DOG",
    order: 8
  },
  // Dressage & Éducation
  {
    productName: "Bilan comportemental",
    price: 55,
    currency: "EUR",
    description: "Le bilan comportemental vise à recueillir un maximum d'informations sur votre animal, son environnement, ainsi que votre relation avec lui (habitudes, règles, rituels, interdictions). Cette analyse approfondie permet d'identifier les éventuelles problématiques et de proposer un accompagnement adapté. À l'issue de ce bilan, un contrat pourra être établi pour la mise en place d'un suivi personnalisé. Les modalités et le nombre de séances seront définis après l'évaluation et vous seront communiqués oralement ou par e-mail, selon les besoins identifiés.",
    category: "DRESSAGE_EDUCATION",
    animalType: "DOG",
    order: 1
  },
  {
    productName: "Séance unique renouvelable",
    price: 50,
    currency: "EUR",
    description: "Les séances uniques personnalisées pour chiens ont pour objectif d'enseigner des commandes, des postures et des automatismes adaptés aux besoins du maître. Ces sessions d'éducation sur mesure visent à renforcer la relation entre l'animal et son propriétaire en travaillant des exercices de dressages tels que assis, couché, attends, au pied ou encore la marche en laisse. Elles permettent également de traiter les problématiques identifiées lors du bilan comportemental pour une cohabitation plus harmonieuse.",
    category: "DRESSAGE_EDUCATION",
    animalType: "DOG",
    order: 2
  },
  {
    productName: "Forfait 5 séances",
    price: 240,
    currency: "EUR",
    description: "Les forfaits 5 et 10 séances sont des formules permettant d'appliquer un tarif dégressif ( voir explications séances uniques)",
    category: "DRESSAGE_EDUCATION",
    animalType: "DOG",
    order: 3
  },
  {
    productName: "Forfait 10 séances",
    price: 460,
    currency: "EUR",
    description: "Les forfaits 5 et 10 séances sont des formules permettant d'appliquer un tarif dégressif ( voir explications séances uniques)",
    category: "DRESSAGE_EDUCATION",
    animalType: "DOG",
    order: 4
  },
  {
    productName: "Cours d'éveil chiot",
    price: 50,
    currency: "EUR",
    description: "Les consultations d'éveil pour chiots (0 à 4 mois) sont des sessions éducatives visant à favoriser leur développement comportemental. Elles incluent des exercices sensoriels (sonores, visuels et olfactifs) destinés à stimuler leurs interactions avec leur environnement, à renforcer leur tolérance aux stimulations extérieures et à améliorer la gestion de leurs émotions.",
    category: "DRESSAGE_EDUCATION",
    animalType: "DOG",
    order: 5
  },
  {
    productName: "Désensibilisation muselière",
    price: 55,
    currency: "EUR",
    description: "La désensibilisation à la muselière est une séance de dressage spécialisée visant à apprendre au chien à accepter et à porter la muselière de manière confortable et détendue en toute circonstance.",
    category: "DRESSAGE_EDUCATION",
    animalType: "DOG",
    order: 6
  },
  {
    productName: "Balade éducative en groupe (sous condition)",
    price: 15,
    currency: "EUR",
    description: "Les balades éducatives en groupe ont pour objectif de renforcer la socialisation des chiens et d'améliorer leur relation avec leurs maîtres. Ces sorties enrichissantes favorisent le développement de compétences essentielles, telles que la gestion des émotions, la marche en laisse et en longe, ainsi que le rappel. Elles permettent également d'instaurer des interactions harmonieuses entre les chiens et de diversifier leurs expériences pour un meilleur équilibre au quotidien.",
    category: "DRESSAGE_EDUCATION",
    animalType: "DOG",
    order: 7
  },
  // Rééducation & Comportementalisme
  {
    productName: "Bilan comportemental + 1er diagnostic",
    price: 70,
    currency: "EUR",
    description: "Le bilan comportemental de la section comportementalisme a pour objectif de recueillir des informations détaillées sur votre animal, son environnement, ainsi que sur votre relation avec lui (habitudes, règles, rituels, interdictions). Cette évaluation approfondie permet d'identifier d'éventuelles problématiques, notamment liées à des troubles comportementaux ou à des pathologies sous-jacentes, et de proposer un accompagnement adapté. À l'issue de ce bilan, un contrat pourra être établi pour un suivi personnalisé. Les modalités et le nombre de séances seront définis après l'évaluation et communiqués oralement ou par e-mail afin de mettre en place une thérapie comportementale adaptés, en fonction des besoins identifiés. Le premier diagnostic concerne ainsi la suspicion de la présence d'un trouble comportemental et sera détaillé après la séance par mail.",
    category: "REEDUCATION_COMPORTEMENTALISME",
    animalType: "DOG",
    order: 1
  },
  {
    productName: "Séance unique renouvelable",
    price: 65,
    currency: "EUR",
    description: "Les séances uniques pour chiens ont pour objectif de mettre en place une thérapie comportementale adaptée pour répondre aux difficultés spécifiques de l'animal. Ces sessions de comportementalisme ou de rééducation sur mesure visent à renforcer la relation entre l'animal et son propriétaire en travaillant sur des exercices ludiques et de gestion comportementale, afin d'instaurer une communication optimale et harmonieuse.",
    category: "REEDUCATION_COMPORTEMENTALISME",
    animalType: "DOG",
    order: 2
  },
  {
    productName: "Cours collectif (sous condition)",
    price: 0,
    currency: "EUR",
    description: "Les cours collectifs pour chiens sont des séances spéciales visant à apprendre ou rééduquer les chiens à la présence d'autres congénères. L'objectif est de leur permettre de rétablir une communication canine adéquate et harmonieuse.",
    category: "REEDUCATION_COMPORTEMENTALISME",
    animalType: "DOG",
    order: 3
  },
  {
    productName: "Cours socialisation (sous condition)",
    price: 65,
    currency: "EUR",
    description: "Cours socialisation pour chien est une séance spéciale qui a pour objectif de favoriser la tolérance de l'animal à la présence de nouveaux arrivant dans son milieu (bébés, chats, chiens, adulte , etc). Cette séance est soumise à quelque conditions  préalable afin de pouvoir s'effectuer dans les meilleures conditions (voir avec le comportementaliste lors du bilan).",
    category: "REEDUCATION_COMPORTEMENTALISME",
    animalType: "DOG",
    order: 4
  }
];

  const allServices = [...catsData, ...dogsData];

  // Création des entrées dans la base de données avec gestion d'erreurs
  console.log(`Insertion de ${allServices.length} services...`);
  let insertedCount = 0;

  for (const service of allServices) {
    try {
    await prisma.price.create({
        data: service
    });
      insertedCount++;
    } catch (error) {
      console.error(`Erreur lors de l'insertion de "${service.productName}" :`, error.message);
    }
  }

  console.log(`${insertedCount} services insérés avec succès sur ${allServices.length} tentatives.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 