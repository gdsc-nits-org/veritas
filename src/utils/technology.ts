import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

const validateTechnology = async (
  technology: Prisma.TechnologyWhereUniqueInput
): Promise<boolean> => {
  if (typeof technology !== "object") return false;
  if (typeof technology.name !== "string") return false;

  if (
    await prisma.technology.findFirst({
      where: technology,
    })
  ) {
    return true;
  }

  return false;
};

export { validateTechnology };
