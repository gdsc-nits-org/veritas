/*
  Warnings:

  - You are about to drop the `_EventToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToStudent" DROP CONSTRAINT "_EventToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToStudent" DROP CONSTRAINT "_EventToStudent_B_fkey";

-- DropTable
DROP TABLE "_EventToStudent";

-- CreateTable
CREATE TABLE "_EventToPerson" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToPerson_AB_unique" ON "_EventToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToPerson_B_index" ON "_EventToPerson"("B");

-- AddForeignKey
ALTER TABLE "_EventToPerson" ADD CONSTRAINT "_EventToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPerson" ADD CONSTRAINT "_EventToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("personalEmailId") ON DELETE CASCADE ON UPDATE CASCADE;
