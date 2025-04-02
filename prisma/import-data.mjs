import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const catsData = [
  {
    category: 'PETSITTING',
    services: [
      {
        productName: 'Pré-visite (déduite sur la première prestation)',
        price: 9,
        description: 'Pré-visite pour évaluer les besoins de votre chat',
      },
      {
        productName: 'Visite à domicile 30min',
        price: 15,
        description: 'Visite à domicile de 30 minutes',
      },
      {
        productName: 'Visite à domicile 45min',
        price: 20,
        description: 'Visite à domicile de 45 minutes',
      },
      {
        productName: 'Visite à domicile 1h',
        price: 23,
        description: 'Visite à domicile d\'une heure',
      },
      {
        productName: 'Amener chez le vétérinaire',
        price: 0,
        description: 'Service de transport vers le vétérinaire (sur devis)',
      },
      {
        productName: 'Forfait semaine',
        price: 0,
        description: 'Forfait pour une semaine de prestations (sur devis)',
      },
      {
        productName: 'Forfait vacances',
        price: 0,
        description: 'Forfait pour plus de 3 jours (sur devis)',
      },
      {
        productName: 'Animal supplémentaire',
        price: 5,
        description: 'Tarif pour un animal supplémentaire',
      },
    ],
  },
  {
    category: 'DRESSAGE_EDUCATION',
    services: [
      {
        productName: 'Bilan comportemental',
        price: 55,
        description: 'Évaluation complète du comportement de votre chat',
      },
      {
        productName: 'Séance unique renouvelable',
        price: 50,
        description: 'Séance d\'éducation individuelle',
      },
      {
        productName: 'Forfait 5 séances',
        price: 240,
        description: 'Pack de 5 séances d\'éducation (48€/séance)',
      },
      {
        productName: 'Forfait 10 séances',
        price: 460,
        description: 'Pack de 10 séances d\'éducation (46€/séance)',
      },
      {
        productName: 'Cours d\'éveil chaton',
        price: 50,
        description: 'Séance spéciale pour l\'éveil des chatons',
      },
      {
        productName: 'Sensibilisation comportementale en visio',
        price: 20,
        description: 'Consultation à distance pour des conseils comportementaux',
      },
    ],
  },
  {
    category: 'REEDUCATION_COMPORTEMENTALISME',
    services: [
      {
        productName: 'Bilan comportemental + 1er diagnostic',
        price: 70,
        description: 'Évaluation approfondie avec diagnostic initial',
      },
      {
        productName: 'Séance unique renouvelable',
        price: 65,
        description: 'Séance de rééducation comportementale',
      },
      {
        productName: 'Cours socialisation',
        price: 65,
        description: 'Séance de socialisation pour chats',
      },
    ],
  },
];

const dogsData = [
  {
    category: 'PETSITTING',
    services: [
      {
        productName: 'Pré-visite (déduite sur la première prestation)',
        price: 9,
        description: 'Pré-visite pour évaluer les besoins de votre chien',
      },
      {
        productName: 'Visite à domicile 30min',
        price: 15,
        description: 'Visite à domicile de 30 minutes',
      },
      {
        productName: 'Visite à domicile 45min',
        price: 20,
        description: 'Visite à domicile de 45 minutes',
      },
      {
        productName: 'Visite à domicile 1h',
        price: 23,
        description: 'Visite à domicile d\'une heure',
      },
      {
        productName: 'Amener chez le vétérinaire',
        price: 0,
        description: 'Service de transport vers le vétérinaire (sur devis)',
      },
      {
        productName: 'Balade hygiénique 30min',
        price: 15,
        description: 'Balade courte pour les besoins physiologiques',
      },
      {
        productName: 'Balade éducative 1h',
        price: 23,
        description: 'Balade d\'une heure avec aspect éducatif',
      },
      {
        productName: 'Forfait semaine',
        price: 0,
        description: 'Forfait pour une semaine de prestations (sur devis)',
      },
      {
        productName: 'Forfait vacances',
        price: 0,
        description: 'Forfait pour plus de 3 jours (sur devis)',
      },
      {
        productName: 'Animal supplémentaire',
        price: 5,
        description: 'Tarif pour un animal supplémentaire',
      },
    ],
  },
  {
    category: 'DRESSAGE_EDUCATION',
    services: [
      {
        productName: 'Bilan comportemental',
        price: 55,
        description: 'Évaluation complète du comportement de votre chien',
      },
      {
        productName: 'Séance unique renouvelable',
        price: 50,
        description: 'Séance d\'éducation individuelle',
      },
      {
        productName: 'Forfait 5 séances',
        price: 240,
        description: 'Pack de 5 séances d\'éducation (48€/séance)',
      },
      {
        productName: 'Forfait 10 séances',
        price: 460,
        description: 'Pack de 10 séances d\'éducation (46€/séance)',
      },
      {
        productName: 'Cours d\'éveil chiot',
        price: 50,
        description: 'Séance spéciale pour l\'éveil des chiots',
      },
      {
        productName: 'Désensibilisation muselière',
        price: 55,
        description: 'Séance de désensibilisation à la muselière',
      },
      {
        productName: 'Balade éducative en groupe',
        price: 15,
        description: 'Balade éducative en groupe (sous condition)',
      },
    ],
  },
  {
    category: 'REEDUCATION_COMPORTEMENTALISME',
    services: [
      {
        productName: 'Bilan comportemental + 1er diagnostic',
        price: 70,
        description: 'Évaluation approfondie avec diagnostic initial',
      },
      {
        productName: 'Séance unique renouvelable',
        price: 65,
        description: 'Séance de rééducation comportementale',
      },
      {
        productName: 'Cours socialisation',
        price: 65,
        description: 'Séance de socialisation pour chiens (sous condition)',
      },
      {
        productName: 'Cours collectif',
        price: 0,
        description: 'Cours collectif de rééducation (sur devis)',
      },
    ],
  },
];

async function main() {
  // Suppression des données existantes
  await prisma.price.deleteMany();

  // Import des données pour les chats
  for (const category of catsData) {
    for (const service of category.services) {
      await prisma.price.create({
        data: {
          ...service,
          category: category.category,
          animalType: 'CAT',
          currency: 'EUR',
        },
      });
    }
  }

  // Import des données pour les chiens
  for (const category of dogsData) {
    for (const service of category.services) {
      await prisma.price.create({
        data: {
          ...service,
          category: category.category,
          animalType: 'DOG',
          currency: 'EUR',
        },
      });
    }
  }

  console.log('Données importées avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 