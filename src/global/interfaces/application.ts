import { Domain } from "@prisma/client";

interface createApplicatonBody {
  applicantId: string;
  answers: string;
  message: string | undefined | null;
  domain: Domain;
  resume: string;
}

export { createApplicatonBody };
