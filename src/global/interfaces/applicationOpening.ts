import {
  ApplicationOpeningStatus,
  ApplicationPurpose,
  Domain,
} from "@prisma/client";

interface createApplicationOpeningBody {
  domain: Domain;
  purpose: ApplicationPurpose;
  title: string;
  description: string[];
}

interface updateApplicationOpeningBody {
  domain: Domain | undefined;
  purpose: ApplicationPurpose | undefined;
  title: string | undefined;
  description: string[] | undefined;
  status: ApplicationOpeningStatus | undefined;
}

export { createApplicationOpeningBody, updateApplicationOpeningBody };
