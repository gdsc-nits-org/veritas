import * as Prisma from "@prisma/client";

const validateDomain = (domain: string): boolean => {
  if (!domain) {
    return false;
  }
  if (typeof domain !== "string") {
    return false;
  }

  if (!Object.values(Prisma.Domain).some((d) => d === domain)) {
    return false;
  }

  return true;
};

export { validateDomain };
