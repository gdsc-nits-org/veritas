/*
  Warnings:

  - Changed the type of `domain` on the `Tenure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tenure" DROP COLUMN "domain",
ADD COLUMN     "domain" "MemberDomain" NOT NULL;
