/*
  Warnings:

  - You are about to drop the column `domain` on the `ClubMember` table. All the data in the column will be lost.
  - Added the required column `domain` to the `Tenure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubMember" DROP COLUMN "domain";

-- AlterTable
ALTER TABLE "Tenure" ADD COLUMN     "domain" "Domain" NOT NULL;
