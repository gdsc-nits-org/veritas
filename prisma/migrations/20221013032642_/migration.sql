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
