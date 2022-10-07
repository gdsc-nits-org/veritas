import { MemberDomain, Role } from "@prisma/client";

interface RegisterBody {
  scholarId: string;
  password: string;
  domain: MemberDomain;
  role: Role;
  image: string;
  linkedInUrl: string;
  githubUrl: string;
  facebookUrl?: string;
  discordId?: string;
  year?: number;
}

export { RegisterBody };
