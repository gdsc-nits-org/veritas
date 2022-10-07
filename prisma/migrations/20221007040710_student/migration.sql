/*
  Warnings:

  - You are about to drop the `NITSStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToNITSStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubMember" DROP CONSTRAINT "ClubMember_scholarId_fkey";

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "NITSStudent" DROP CONSTRAINT "NITSStudent_personalEmailId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToNITSStudent" DROP CONSTRAINT "_EventToNITSStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToNITSStudent" DROP CONSTRAINT "_EventToNITSStudent_B_fkey";

-- DropTable
DROP TABLE "NITSStudent";

-- DropTable
DROP TABLE "_EventToNITSStudent";

-- CreateTable
CREATE TABLE "Student" (
    "scholarId" INTEGER NOT NULL,
    "personalEmailId" TEXT NOT NULL,
    "instituteEmailId" TEXT NOT NULL,
    "branch" "Branch" NOT NULL,
    "degree" "Degree" NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("scholarId")
);

-- CreateTable
CREATE TABLE "_EventToStudent" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_scholarId_key" ON "Student"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_personalEmailId_key" ON "Student"("personalEmailId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_instituteEmailId_key" ON "Student"("instituteEmailId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToStudent_AB_unique" ON "_EventToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToStudent_B_index" ON "_EventToStudent"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_personalEmailId_fkey" FOREIGN KEY ("personalEmailId") REFERENCES "Person"("personalEmailId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMember" ADD CONSTRAINT "ClubMember_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Student"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Student"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToStudent" ADD CONSTRAINT "_EventToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToStudent" ADD CONSTRAINT "_EventToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("scholarId") ON DELETE CASCADE ON UPDATE CASCADE;
