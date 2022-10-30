import { prisma } from "@utils/prisma";
import bcrypt from "bcrypt";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Utils from "@utils";

const checkAuth: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { adminScholarId, adminPassword } =
    req.body as Interfaces.Auth.SigninBody;

  // Check for Scholar ID
  if (!adminScholarId || !Utils.ScholarId.validateScholarId(adminScholarId)) {
    return next(Errors.Auth.invalidAdminScholarID);
  }

  // Check for Password Validity
  if (!adminPassword || !Utils.Password.passwordValidate(adminPassword)) {
    return next(Errors.Auth.invalidAdminPassword);
  }

  const member = await prisma.clubMember.findFirst({
    where: {
      scholarId: adminScholarId,
    },
  });

  // Check if Member is Present
  if (!member) {
    return next(Errors.Auth.unauthorizedAccess);
  }

  // Check for correctness of password
  if (!(await bcrypt.compare(adminPassword, member!.password))) {
    return next(Errors.Auth.incorrectPassword);
  }

  next();
};

/**
 * @description Middleware for checking if user
 * has clearance to access a route.
 *
 * @param level The Minimum Permission Level Required To Access Route
 * @param newGenAllowed Whether the transitioning chapter is allowed to access
 *
 * Usage is:
 *
 * ```ts
 *  router.use(minPermission());
 * ```
 *
 * or,
 *
 * ```ts
 *  router.use(minPermission("LEAD"));
 *  router.use(minPermission("LEAD", "PREV_AND_CURR"));
 * ```
 *
 */
function minPermission(
  level: Interfaces.Auth.Permission = "CORE_MEMBER",
  nextGen: "NOT_ALLOWED" | "PREV_AND_CURR" | "ONLY" = "NOT_ALLOWED"
) {
  const middlware: Interfaces.Middleware.Async = async (req, _res, next) => {
    //! Login check by middleware before

    const { adminScholarId } = req.body as Interfaces.Auth.SigninBody;

    const latestTenure = await prisma.tenure.findFirst({
      where: {
        scholarId: adminScholarId,
      },
      orderBy: {
        chapter: {
          year: "desc",
        },
      },
      include: {
        chapter: {
          select: {
            transition: true,
          },
        },
      },
    });

    const latestChapter = await prisma.chapter.findFirst({
      orderBy: {
        year: "desc",
      },
    });

    // TODO: Code below needs thorough testing
    if (nextGen === "NOT_ALLOWED") {
      // Check if latest chapter of accessor is in transition.
      // If yes, no access if transitioning chapter not allowed
      if (latestTenure!.chapter.transition) {
        return next(Errors.Auth.chapterStillInTransition);
      } else if (
        // If latest chapter is in transition, allow only the
        // current non-transitioning chapter to access if transitioning
        // chapter not allowed
        (latestChapter!.transition &&
          latestTenure!.startYear < latestChapter!.year - 1) ||
        (!latestChapter!.transition &&
          latestTenure!.startYear < latestChapter!.year)
      ) {
        return next(Errors.Auth.chapterOver);
      }
    } else if (nextGen === "ONLY") {
      if (!latestChapter!.transition) {
        return next(Errors.Auth.noChapterInTransition);
      } else if (latestTenure!.startYear !== latestChapter!.year) {
        return next(Errors.Auth.chapterOver);
      }
    } else {
      if (!latestChapter!.transition) {
        if (latestTenure!.startYear !== latestChapter!.year) {
          return next(Errors.Auth.chapterOver);
        }
      } else {
        if (latestTenure!.startYear < latestChapter!.year - 1) {
          return next(Errors.Auth.chapterOver);
        }
      }
    }

    // Set User Auth Level
    let userAuthLevel: Interfaces.Auth.Permission;
    if (latestTenure!.position === "LEAD") {
      userAuthLevel = "LEAD";
    } else if (
      latestTenure!.position === "CORE_MEMBER" &&
      latestTenure!.isModerator
    ) {
      userAuthLevel = "MODERATOR";
    } else if (
      latestTenure!.position === "CORE_MEMBER" &&
      latestTenure!.isHead
    ) {
      userAuthLevel = "HEAD";
    } else if (latestTenure!.position === "CORE_MEMBER") {
      userAuthLevel = "CORE_MEMBER";
    } else {
      userAuthLevel = "MEMBER";
    }

    // Check if authorized
    if (Utils.Auth.authLevel(userAuthLevel) <= Utils.Auth.authLevel(level)) {
      next();
    } else {
      next(Errors.Auth.unauthorizedAccess);
    }
  };

  return middlware;
}

export { checkAuth, minPermission };
