/*
  Warnings:

  - You are about to drop the column `icon` on the `Technology` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "icon",
ADD COLUMN     "iconURL" TEXT NOT NULL DEFAULT '';
