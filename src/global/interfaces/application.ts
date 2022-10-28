import { Domain, InterviewApplicationStatus } from "@prisma/client";

interface createApplicatonBody {
  applicantId: string;
  answers: string[];
  message: string | undefined | null;
  domain: Domain;
  resume: string;
}

interface updateApplicationBody {
  applicationStatus: InterviewApplicationStatus;
}

export { createApplicatonBody, updateApplicationBody };
