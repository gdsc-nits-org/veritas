import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

const validateClubMember = async (
  member: Prisma.ClubMemberWhereUniqueInput
): Promise<boolean> => {
  if (typeof member !== "object") return false;
  if (Array.isArray(member)) return false;

  if (
    !(await prisma.clubMember.findFirst({
      where: member,
    }))
  ) {
    return false;
  }

  return true;
};

export { validateClubMember };
