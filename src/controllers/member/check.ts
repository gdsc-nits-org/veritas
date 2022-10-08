import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Utils from "@utils";
import * as Errors from "@errors";

const checkMember: Interfaces.Controller.Async = async (req, res, next) => {
  const { scholarId } = req.query;

  // Scholar ID Check
  if (!(typeof scholarId === "string")) {
    return next(Errors.Student.invalidScholarID);
  }

  if (!Utils.ScholarId.validateScholarId(scholarId)) {
    return next(Errors.Student.invalidScholarID);
  }

  // Find
  if (
    (await prisma.clubMember.count({
      where: { scholarId },
      take: 1,
    })) === 0
  ) {
    res.json(Utils.Response.Success(false));
  } else {
    res.json(Utils.Response.Success(true));
  }
};

export { checkMember };
