import { ApplicationPurpose, Domain } from "@prisma/client";

interface createApplicationOpeningBody {
  domain: Domain;
  purpose: ApplicationPurpose;
  title: string;
  description: string[];
}

export { createApplicationOpeningBody };
