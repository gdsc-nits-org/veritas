import { Event } from "@prisma/client";

interface EventBody extends Event {
  organizers: string[];
}

interface EventRSVPBody {
  personalEmailId: string;
}

export { EventBody, EventRSVPBody };
