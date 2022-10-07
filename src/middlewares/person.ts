import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";
import * as Constants from "@constants";

const checkExists: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { personalEmailId } = req.body as Interfaces.Person.RegisterBody;

  if (
    (await prisma.person.count({
      where: { personalEmailId },
      take: 1,
    })) !== 0
  ) {
    next();
  } else {
    next(Errors.Person.personNotFound);
  }
};

const checkNotExists: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { personalEmailId } = req.body as Interfaces.Person.RegisterBody;

  if (
    (await prisma.person.count({
      where: { personalEmailId },
      take: 1,
    })) !== 0
  ) {
    next(Errors.Person.personAlreadyExists);
  } else {
    next();
  }
};

const checkPersonalEmail: Interfaces.Middleware.Sync = (req, _res, next) => {
  const { personalEmailId } = req.body as Interfaces.Person.RegisterBody;

  if (!personalEmailId || !Constants.Validation.email.test(personalEmailId)) {
    return next(Errors.Person.invalidEmailID);
  }

  next();
};

export { checkExists, checkNotExists, checkPersonalEmail };
