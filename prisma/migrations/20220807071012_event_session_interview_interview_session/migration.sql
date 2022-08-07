-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BACHELORS', 'MASTERS', 'DOCTORATE');

-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('CHEMISTRY', 'CIVIL_ENGINEERING', 'COMPUTER_SCIENCE_AND_ENGINEERING', 'ELECTRICAL_ENGINEERING', 'ELECTRONICS_AND_COMMUNICATION_ENGINEERING', 'ELECTRONICS_AND_INSTRUMENTATION_ENGINEERING', 'HISTORY', 'HUMANITIES_AND_SOCIAL_SCIENCES', 'MANAGEMENT_STUDIES', 'MATHEMATICS', 'MECHANICAL_ENGINEERING', 'PHYISCS');

-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('ANDROID', 'CLOUD_AND_DEVOPS', 'FLUTTER', 'UI_UX', 'WEB', 'OTHERS');

-- CreateEnum
CREATE TYPE "ClubPosition" AS ENUM ('MEMBER', 'CORE_MEMBER', 'LEAD');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EDITORIAL', 'MANAGEMENT', 'OUTREACH', 'MARKETING');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'DROPPED');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('OFFLINE', 'ONLINE');

-- CreateEnum
CREATE TYPE "EventLevel" AS ENUM ('GDSC', 'NITS');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('BOOTCAMP', 'FIRESIDE_CHAT', 'STUDY_JAM', 'HANDS_ON_WORKSHOP', 'SPEAKER_SESSION', 'INFO_SESSION', 'HACKATHON', 'DEMO_DAY', 'EXPLORE_WORKSHOP');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'DROPPED');

-- CreateEnum
CREATE TYPE "InterviewPurpose" AS ENUM ('MEMBER_RECRUITMENT', 'CORE_MEMBER_RECRUITMENT', 'EVENT', 'PROJECT', 'OTHERS');

-- CreateTable
CREATE TABLE "Person" (
    "personalEmailId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "phoneNumber" INTEGER[],
    "dateOfBirth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("personalEmailId")
);

-- CreateTable
CREATE TABLE "NITSStudent" (
    "scholarId" INTEGER NOT NULL,
    "instituteEmailId" TEXT NOT NULL,
    "branch" "Branch" NOT NULL,
    "degree" "Degree" NOT NULL,

    CONSTRAINT "NITSStudent_pkey" PRIMARY KEY ("scholarId")
);

-- CreateTable
CREATE TABLE "ClubMember" (
    "scholarId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "domain" "Domain" NOT NULL,
    "image" TEXT NOT NULL,
    "linkedInUrl" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "facebookUrl" TEXT,
    "discordId" TEXT,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "ClubMember_pkey" PRIMARY KEY ("scholarId")
);

-- CreateTable
CREATE TABLE "Tenure" (
    "id" TEXT NOT NULL,
    "scholarId" INTEGER NOT NULL,
    "startYear" INTEGER NOT NULL,
    "isModerator" BOOLEAN NOT NULL,
    "isHead" BOOLEAN NOT NULL,
    "role" "Role" NOT NULL,
    "position" "ClubPosition" NOT NULL,

    CONSTRAINT "Tenure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "tags" TEXT[],
    "logoImageUrl" TEXT NOT NULL,
    "bannerImageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "links" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "links" TEXT[],
    "mode" "Mode" NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingAttendance" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "scholarId" INTEGER NOT NULL,
    "reason" TEXT,

    CONSTRAINT "MeetingAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "EventLevel" NOT NULL,
    "type" "EventType" NOT NULL,
    "domain" "Domain"[],
    "mode" "Mode" NOT NULL,
    "venue" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "topics" TEXT[],
    "status" "SessionStatus" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" TEXT NOT NULL,
    "purpose" "InterviewPurpose" NOT NULL,
    "mode" "Mode" NOT NULL,
    "url" TEXT,
    "venue" TEXT NOT NULL,
    "interviewDate" TIMESTAMP(3) NOT NULL,
    "questions" TEXT[],

    CONSTRAINT "InterviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "interviewSessionId" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_speaks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_attends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_contribution" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_mentoring" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToNITSStudent" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_personalEmailId_key" ON "Person"("personalEmailId");

-- CreateIndex
CREATE UNIQUE INDEX "NITSStudent_scholarId_key" ON "NITSStudent"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "NITSStudent_instituteEmailId_key" ON "NITSStudent"("instituteEmailId");

-- CreateIndex
CREATE UNIQUE INDEX "ClubMember_scholarId_key" ON "ClubMember"("scholarId");

-- CreateIndex
CREATE UNIQUE INDEX "Tenure_scholarId_startYear_position_key" ON "Tenure"("scholarId", "startYear", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_interviewSessionId_applicantId_key" ON "Interview"("interviewSessionId", "applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "_speaks_AB_unique" ON "_speaks"("A", "B");

-- CreateIndex
CREATE INDEX "_speaks_B_index" ON "_speaks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_attends_AB_unique" ON "_attends"("A", "B");

-- CreateIndex
CREATE INDEX "_attends_B_index" ON "_attends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_contribution_AB_unique" ON "_contribution"("A", "B");

-- CreateIndex
CREATE INDEX "_contribution_B_index" ON "_contribution"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_mentoring_AB_unique" ON "_mentoring"("A", "B");

-- CreateIndex
CREATE INDEX "_mentoring_B_index" ON "_mentoring"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToNITSStudent_AB_unique" ON "_EventToNITSStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToNITSStudent_B_index" ON "_EventToNITSStudent"("B");

-- AddForeignKey
ALTER TABLE "ClubMember" ADD CONSTRAINT "ClubMember_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "NITSStudent"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenure" ADD CONSTRAINT "Tenure_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "ClubMember"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendance" ADD CONSTRAINT "MeetingAttendance_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendance" ADD CONSTRAINT "MeetingAttendance_scholarId_fkey" FOREIGN KEY ("scholarId") REFERENCES "ClubMember"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewSessionId_fkey" FOREIGN KEY ("interviewSessionId") REFERENCES "InterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "NITSStudent"("scholarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_speaks" ADD CONSTRAINT "_speaks_A_fkey" FOREIGN KEY ("A") REFERENCES "Person"("personalEmailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_speaks" ADD CONSTRAINT "_speaks_B_fkey" FOREIGN KEY ("B") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_attends" ADD CONSTRAINT "_attends_A_fkey" FOREIGN KEY ("A") REFERENCES "Person"("personalEmailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_attends" ADD CONSTRAINT "_attends_B_fkey" FOREIGN KEY ("B") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contribution" ADD CONSTRAINT "_contribution_A_fkey" FOREIGN KEY ("A") REFERENCES "ClubMember"("scholarId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contribution" ADD CONSTRAINT "_contribution_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mentoring" ADD CONSTRAINT "_mentoring_A_fkey" FOREIGN KEY ("A") REFERENCES "ClubMember"("scholarId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mentoring" ADD CONSTRAINT "_mentoring_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToNITSStudent" ADD CONSTRAINT "_EventToNITSStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToNITSStudent" ADD CONSTRAINT "_EventToNITSStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "NITSStudent"("scholarId") ON DELETE CASCADE ON UPDATE CASCADE;
