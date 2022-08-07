import { prisma } from "@utils/prisma";

import * as Interfaces from "@interfaces";
import * as Errors from "@errors";

const checkPerson: Interfaces.PersonInterface.CheckMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const { personalEmailId } = req.params;

    if ((await prisma.person.count({ where: { personalEmailId } })) !== 0) {
      next();
    } else {
      res.json(Errors.PersonError.personNotFound);
    }
  } catch (err) {
    console.log(err);
    res.json(Errors.SystemError.serverError);
  }
};

export { checkPerson };
