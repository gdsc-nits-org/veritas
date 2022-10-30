/*
  Warnings:

  - You are about to drop the column `domain` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `Application` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ApplicationPurpose" AS ENUM ('MEMBER_RECRUITMENT', 'CORE_MEMBER_RECRUITMENT', 'EVENT', 'PROJECT', 'OTHERS');

-- CreateEnum
CREATE TYPE "ApplicationOpeningStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "domain",
DROP COLUMN "purpose",
ADD COLUMN     "applicationOpeningId" TEXT NOT NULL DEFAULT '123';

-- DropEnum
DROP TYPE "InterviewPurpose";

-- CreateTable
CREATE TABLE "ApplicationOpening" (
    "id" TEXT NOT NULL,
    "purpose" "ApplicationPurpose" NOT NULL,
    "domain" "Domain" NOT NULL,
    "status" "ApplicationOpeningStatus" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT[],

    CONSTRAINT "ApplicationOpening_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicationOpeningId_fkey" FOREIGN KEY ("applicationOpeningId") REFERENCES "ApplicationOpening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
