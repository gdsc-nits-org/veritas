import * as Utils from "@utils";
import { prisma } from "@utils/prisma";
import * as Errors from "@errors";
import * as Interfaces from "@interfaces";

const deleteTechnology: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { technologyNameOrId: nameOrId } = req.params;
  if (!nameOrId) {
    return next(Errors.Technology.invalidName);
  }

  if (
    !(await prisma.technology.findFirst({
      where: {
        name: nameOrId,
        OR: {
          id: nameOrId,
        },
      },
    }))
  ) {
    return next(Errors.Technology.technologyNotFound);
  }

  const technology = await prisma.technology.delete({
    where: { name: nameOrId },
  });

  if (!technology) {
    return next(Errors.Technology.technologyNotDeleted);
  }
  return res.json(Utils.Response.Success(technology));
};

export { deleteTechnology };
