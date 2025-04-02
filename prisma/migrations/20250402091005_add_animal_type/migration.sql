/*
  Warnings:

  - Added the required column `animalType` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DOG', 'CAT');

-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "animalType" "AnimalType" NOT NULL;
