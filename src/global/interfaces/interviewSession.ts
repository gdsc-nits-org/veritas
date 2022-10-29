import { Mode } from "@prisma/client";

interface createInterviewSessionBody {
  mode: Mode;
  url: string | undefined | null;
  interviewDate: Date;
  venue: string;
  questions: string[];
}

export { createInterviewSessionBody };
