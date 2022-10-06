import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";

const checkPerson: Interfaces.Middleware.Async = async (req, res, next) => {
  try {
    const { personalEmailId } = req.params;

    if ((await prisma.person.count({ where: { personalEmailId } })) !== 0) {
      next();
    } else {
      res.json(Errors.Person.personNotFound);
    }
  } catch (err) {
    console.log(err);
    res.json(Errors.System.serverError);
  }
};

export { checkPerson };
