/*
  Warnings:

  - The values [PHYISCS] on the enum `Branch` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Branch_new" AS ENUM ('CHEMISTRY', 'CIVIL_ENGINEERING', 'COMPUTER_SCIENCE_AND_ENGINEERING', 'ELECTRICAL_ENGINEERING', 'ELECTRONICS_AND_COMMUNICATION_ENGINEERING', 'ELECTRONICS_AND_INSTRUMENTATION_ENGINEERING', 'HISTORY', 'HUMANITIES_AND_SOCIAL_SCIENCES', 'MANAGEMENT_STUDIES', 'MATHEMATICS', 'MECHANICAL_ENGINEERING', 'PHYSICS');
ALTER TABLE "Student" ALTER COLUMN "branch" TYPE "Branch_new" USING ("branch"::text::"Branch_new");
ALTER TYPE "Branch" RENAME TO "Branch_old";
ALTER TYPE "Branch_new" RENAME TO "Branch";
DROP TYPE "Branch_old";
COMMIT;

-- CreateTable
CREATE TABLE "_ClubMemberToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClubMemberToEvent_AB_unique" ON "_ClubMemberToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubMemberToEvent_B_index" ON "_ClubMemberToEvent"("B");

-- AddForeignKey
ALTER TABLE "_ClubMemberToEvent" ADD CONSTRAINT "_ClubMemberToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "ClubMember"("scholarId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubMemberToEvent" ADD CONSTRAINT "_ClubMemberToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
