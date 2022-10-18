/*
  Warnings:

  - A unique constraint covering the columns `[name,eventId,year]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_name_eventId_year_key" ON "Session"("name", "eventId", "year");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_year_fkey" FOREIGN KEY ("year") REFERENCES "Chapter"("year") ON DELETE RESTRICT ON UPDATE CASCADE;
