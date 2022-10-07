import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Constants from "@constants";

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

  if (!scholarId || !Constants.Validation.scholarId.test(scholarId)) {
    return next(Errors.Student.invalidScholarID);
  }

  const year = new Date().getFullYear();
  const registrationYear = parseInt(scholarId.substring(0, 2));

  if (registrationYear > year % 100) {
    return next(Errors.Student.invalidScholarID);
  }

  next();
};

const checkInstituteEmail: Interfaces.Middleware.Sync = (req, _res, next) => {
  const { instituteEmailId } = req.body as Interfaces.Student.RegisterBody;

  if (
    !instituteEmailId ||
    !Constants.Validation.instituteEmail.test(instituteEmailId)
  ) {
    return next(Errors.Student.invalidInstituteEmail);
  }

  next();
};

export { checkExists, checkNotExists, checkScholarId, checkInstituteEmail };
