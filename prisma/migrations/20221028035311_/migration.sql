/*
  Warnings:

  - You are about to drop the column `iconURL` on the `Technology` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "iconURL",
ADD COLUMN     "iconUrl" TEXT NOT NULL DEFAULT '';
