-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PETSITTING', 'DRESSAGE_EDUCATION', 'REEDUCATION_COMPORTEMENTALISME');

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);
