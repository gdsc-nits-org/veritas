import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Utils from "@utils";

const checkExists: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { scholarId } = req.body as Interfaces.Student.RegisterBody;

  if (
    (await prisma.student.count({
      where: { scholarId },
      take: 1,
    })) !== 0
  ) {
    next();
  } else {
    next(Errors.Student.studentNotFound);
  }
};

const checkNotExists: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { scholarId } = req.body as Interfaces.Student.RegisterBody;

  if (
    (await prisma.student.count({
      where: { scholarId },
      take: 1,
    })) !== 0
  ) {
    next(Errors.Student.studentAlreadyExists);
  } else {
    next();
  }
};

const checkScholarId: Interfaces.Middleware.Sync = (req, _res, next) => {
  const { scholarId } = req.body as Interfaces.Student.RegisterBody;

  if (Utils.ScholarId.validateScholarId(scholarId)) {
    next();
  } else {
    next(Errors.Student.invalidScholarID);
  }
};

const checkInstituteEmail: Interfaces.Middleware.Sync = (req, _res, next) => {
  const { instituteEmailId } = req.body as Interfaces.Student.RegisterBody;

  if (!Utils.Email.validateInstituteEmailId(instituteEmailId)) {
    return next(Errors.Student.invalidInstituteEmail);
  }

  next();
};

export { checkExists, checkNotExists, checkScholarId, checkInstituteEmail };
