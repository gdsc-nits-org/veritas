/*
  Warnings:

  - A unique constraint covering the columns `[personalEmailId]` on the table `NITSStudent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personalEmailId` to the `NITSStudent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NITSStudent" ADD COLUMN     "personalEmailId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NITSStudent_personalEmailId_key" ON "NITSStudent"("personalEmailId");

-- AddForeignKey
ALTER TABLE "NITSStudent" ADD CONSTRAINT "NITSStudent_personalEmailId_fkey" FOREIGN KEY ("personalEmailId") REFERENCES "Person"("personalEmailId") ON DELETE RESTRICT ON UPDATE CASCADE;
