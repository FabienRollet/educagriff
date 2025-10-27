/*
  Warnings:

  - You are about to drop the column `createdAt` on the `QuestionOption` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `QuestionOption` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionOption" DROP CONSTRAINT "QuestionOption_questionId_fkey";

-- AlterTable
ALTER TABLE "QuestionOption" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
