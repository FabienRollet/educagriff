export type Price = {
  id: number;
  productName: string;
  price: number;
  currency: string;
  description: string;
  category:
    | "PETSITTING"
    | "DRESSAGE_EDUCATION"
    | "REEDUCATION_COMPORTEMENTALISME";
  animalType: "DOG" | "CAT";
  order: number;
};

export type NewPrice = {
  productName: string;
  price: number;
  currency: string;
  description: string;
  category:
    | "PETSITTING"
    | "DRESSAGE_EDUCATION"
    | "REEDUCATION_COMPORTEMENTALISME";
  animalType: "DOG" | "CAT";
};

export type Photo = {
  id: number;
  url: string;
  alt: string;
  createdAt: string; // or Date depending on your use
};

export type NewPhoto = {
  url: string;
  alt: string;
};
