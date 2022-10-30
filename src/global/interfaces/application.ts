import { InterviewApplicationStatus } from "@prisma/client";

interface createApplicatonBody {
  applicantId: string;
  applicationOpeningId: string;
  answers: string[];
  message: string | undefined | null;
  resume: string;
}

interface updateApplicationBody {
  applicationStatus: InterviewApplicationStatus | undefined;
}

export { createApplicatonBody, updateApplicationBody };
