import * as Interfaces from "@interfaces";
import * as Utils from "@utils";
import * as Errors from "@errors";

import { prisma } from "@utils/prisma";

const checkPasswordValidity: Interfaces.Middleware.Sync = (req, _res, next) => {
  const { password } = req.body as Interfaces.Member.RegisterBody;

  if (!Utils.Password.passwordValidate(password)) {
    return next(Errors.Member.invalidPassword);
  }

  next();
};

const checkExists: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { scholarId } = req.body as Interfaces.Member.RegisterBody;

  if (
    (await prisma.clubMember.count({
      where: { scholarId },
      take: 1,
    })) !== 0
  ) {
    next();
  } else {
    next(Errors.Member.memberNotFound);
  }
};

const checkNotExists: Interfaces.Middleware.Async = async (req, _res, next) => {
  const { scholarId } = req.body as Interfaces.Member.RegisterBody;

  if (
    (await prisma.clubMember.count({
      where: { scholarId },
      take: 1,
    })) !== 0
  ) {
    next(Errors.Member.memberAlreadyExists);
  } else {
    next();
  }
};

export { checkPasswordValidity, checkExists, checkNotExists };
