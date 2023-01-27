-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
