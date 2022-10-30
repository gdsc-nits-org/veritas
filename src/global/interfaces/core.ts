import { ClubPosition, MemberDomain, Role } from "@prisma/client";

interface PromoteBody {
  scholarId: string;
  year?: number;
  domain: MemberDomain;
  isModerator?: boolean;
  isHead?: boolean;
  position?: ClubPosition;
  role: Role;
}

export { PromoteBody };
