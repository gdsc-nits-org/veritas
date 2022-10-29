import { Mode } from "@prisma/client";

interface createInterviewSessionBody {
  mode: Mode;
  url: string | undefined | null;
  interviewDate: Date;
  venue: string;
  questions: string[];
}

interface updateInterviewSessionBody {
  mode: Mode | undefined;
  url: string | undefined;
  interviewDate: Date | undefined;
  venue: string | undefined;
  questions: string[] | undefined;
}

export { createInterviewSessionBody, updateInterviewSessionBody };
