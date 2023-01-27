/*
  Warnings:

  - Added the required column `applicationDate` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationStatus` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InterviewApplicationStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED', 'ERROR');

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "answers" TEXT[],
ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "applicationStatus" "InterviewApplicationStatus" NOT NULL,
ADD COLUMN     "domain" "Domain" NOT NULL,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "resume" TEXT NOT NULL;
