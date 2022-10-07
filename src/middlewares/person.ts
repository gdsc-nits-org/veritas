import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";

const checkExists: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { personalEmailId } = req.body;

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
  const { personalEmailId } = req.body;

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

export { checkExists, checkNotExists };
