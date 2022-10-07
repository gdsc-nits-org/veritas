import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Constants from "@constants";
import * as Errors from "@errors";
import * as Utils from "@utils";

const searchPerson: Interfaces.Controller.Async = async (req, res, next) => {
  const { email } = req.query;

  // Email Check
  if (!(typeof email === "string")) {
    return next(Errors.Person.invalidEmailID);
  }

  if (!email || !Constants.Validation.email.test(email)) {
    return next(Errors.Person.invalidEmailID);
  }

  if (
    (await prisma.person.count({
      where: {
        personalEmailId: email,
      },
      take: 1,
    })) === 0
  ) {
    res.json(Utils.Response.Success(false));
  } else {
    res.json(Utils.Response.Success(true));
  }
};

export { searchPerson };
