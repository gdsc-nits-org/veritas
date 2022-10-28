import {
  Domain,
  InterviewApplicationStatus,
  InterviewPurpose,
} from "@prisma/client";

interface createApplicatonBody {
  purpose: InterviewPurpose;
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
