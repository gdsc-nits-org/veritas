import { Session } from "@prisma/client";

interface CreateSessionBody extends Session {
  speakers: string[];
}

interface AttendSessionBody {
  personalEmailId: string;
}

export { CreateSessionBody, AttendSessionBody };
