/*
  Warnings:

  - You are about to drop the column `purpose` on the `InterviewSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "purpose" "InterviewPurpose" NOT NULL DEFAULT 'OTHERS';

-- AlterTable
ALTER TABLE "InterviewSession" DROP COLUMN "purpose";
