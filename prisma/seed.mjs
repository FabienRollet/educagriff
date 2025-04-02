import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Suppression des données existantes
  await prisma.price.deleteMany();

  // Création des données de test
  const petsittingServices = [
    {
      productName: 'Garde à domicile',
      price: 25.0,
      description: 'Service de garde à domicile pour vos animaux de compagnie',
      category: 'PETSITTING',
      animalType: 'DOG',
    },
    {
      productName: 'Promenade',
      price: 15.0,
      description: 'Service de promenade pour chiens',
      category: 'PETSITTING',
      animalType: 'DOG',
    },
    {
      productName: 'Garde à domicile chat',
      price: 20.0,
      description: 'Service de garde à domicile pour votre chat',
      category: 'PETSITTING',
      animalType: 'CAT',
    },
  ];

  const dressageServices = [
    {
      productName: 'Cours individuel d\'éducation',
      price: 45.0,
      description: 'Séance individuelle d\'éducation canine',
      category: 'DRESSAGE_EDUCATION',
      animalType: 'DOG',
    },
    {
      productName: 'Programme d\'éducation complet',
      price: 300.0,
      description: 'Programme complet d\'éducation sur 8 séances',
      category: 'DRESSAGE_EDUCATION',
      animalType: 'DOG',
    },
    {
      productName: 'Cours d\'éducation féline',
      price: 40.0,
      description: 'Séance d\'éducation pour chat',
      category: 'DRESSAGE_EDUCATION',
      animalType: 'CAT',
    },
  ];

  const reeducationServices = [
    {
      productName: 'Consultation comportementale',
      price: 60.0,
      description: 'Analyse et conseils pour les problèmes de comportement',
      category: 'REEDUCATION_COMPORTEMENTALISME',
      animalType: 'DOG',
    },
    {
      productName: 'Suivi comportemental',
      price: 45.0,
      description: 'Séance de suivi pour la rééducation comportementale',
      category: 'REEDUCATION_COMPORTEMENTALISME',
      animalType: 'DOG',
    },
    {
      productName: 'Consultation comportementale féline',
      price: 55.0,
      description: 'Analyse et conseils pour les problèmes de comportement félin',
      category: 'REEDUCATION_COMPORTEMENTALISME',
      animalType: 'CAT',
    },
  ];

  const allServices = [...petsittingServices, ...dressageServices, ...reeducationServices];

  for (const service of allServices) {
    await prisma.price.create({
      data: {
        ...service,
        currency: 'EUR',
      },
    });
  }

  console.log('Base de données initialisée avec les données de test !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 