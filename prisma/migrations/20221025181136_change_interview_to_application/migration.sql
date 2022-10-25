/*
  Warnings:

  - You are about to drop the `Interview` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `applicationId` to the `InterviewSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_interviewSessionId_fkey";

-- AlterTable
ALTER TABLE "InterviewSession" ADD COLUMN     "applicationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Interview";

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "applicationStatus" "InterviewApplicationStatus" NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "answers" TEXT[],
    "message" TEXT,
    "domain" "Domain" NOT NULL,
    "resume" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_applicantId_key" ON "Application"("applicantId");

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Student"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;
