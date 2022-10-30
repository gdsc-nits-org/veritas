/*
  Warnings:

  - The primary key for the `ClubMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ClubMember" DROP CONSTRAINT "ClubMember_scholarId_fkey";

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingAttendance" DROP CONSTRAINT "MeetingAttendance_scholarId_fkey";

-- DropForeignKey
ALTER TABLE "Tenure" DROP CONSTRAINT "Tenure_scholarId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToStudent" DROP CONSTRAINT "_EventToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "_contribution" DROP CONSTRAINT "_contribution_A_fkey";

-- DropForeignKey
ALTER TABLE "_mentoring" DROP CONSTRAINT "_mentoring_A_fkey";

-- AlterTable
ALTER TABLE "ClubMember" DROP CONSTRAINT "ClubMember_pkey",
ALTER COLUMN "scholarId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClubMember_pkey" PRIMARY KEY ("scholarId");

-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "applicantId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MeetingAttendance" ALTER COLUMN "scholarId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "scholarId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("scholarId");

-- AlterTable
ALTER TABLE "Tenure" ALTER COLUMN "scholarId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_EventToStudent" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_contribution" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_mentoring" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ClubMember" ADD CONSTRAINT "ClubMember_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "Student"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenure" ADD CONSTRAINT "Tenure_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "ClubMember"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendance" ADD CONSTRAINT "MeetingAttendance_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "ClubMember"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Student"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contribution" ADD CONSTRAINT "_contribution_A_fkey" FOREIGN KEY ("A") REFERENCES "ClubMember"("scholarId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mentoring" ADD CONSTRAINT "_mentoring_A_fkey" FOREIGN KEY ("A") REFERENCES "ClubMember"("scholarId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToStudent" ADD CONSTRAINT "_EventToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("scholarId") ON DELETE CASCADE ON UPDATE CASCADE;
