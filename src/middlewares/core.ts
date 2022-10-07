import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import { ClubPosition, Domain, Role } from "@prisma/client";
import { prisma } from "@utils/prisma";

const roleCheck: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { scholarId, domain, role } = req.body as Interfaces.Core.PromoteBody;

  let { year, isHead, position, isModerator } =
    req.body as Interfaces.Core.PromoteBody;

  // Domain
  if (!domain || typeof domain !== "string" || !(domain in Domain)) {
    return next(Errors.Core.improperDomain);
  }

  // Role
  if (!role || typeof role !== "string" || !(role in Role)) {
    return next(Errors.Member.invalidRole);
  }

  // Year
  const currentYear = new Date().getFullYear();

  if (!year) {
    year = currentYear;
  } else if (year > currentYear) {
    year = currentYear;
  }

  // Check Head of Roles
  if (!isHead) {
    isHead = false;
  } else if (typeof isHead !== "boolean") {
    isHead = false;
  }

  // Check Moderator of Domain
  if (!isModerator) {
    isModerator = false;
  } else if (typeof isModerator !== "boolean") {
    isModerator = false;
  }

  // Position
  if (!position || typeof position !== "string") {
    position = "CORE_MEMBER";
  } else if (!(position in ClubPosition)) {
    return next(Errors.Core.improperPosition);
  }

  // Check duplicates
  // TODO: Needs testing
  // TODO: Check if core is already lead or lead is already core
  if (position === "LEAD") {
    if (
      (await prisma.tenure.count({
        where: {
          position: "LEAD",
          startYear: year,
        },
        take: 1,
      })) === 0
    ) {
      return next();
    } else {
      return next(Errors.Core.leadExists);
    }
  } else {
    if (
      (await prisma.tenure.count({
        where: {
          scholarId,
          startYear: year,
        },
        take: 1,
      })) === 0
    ) {
      return next();
    } else {
      return next(Errors.Core.alreadyPromoted);
    }
  }
};

export { roleCheck };
