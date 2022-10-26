import * as Utils from "@utils";
import { prisma } from "@utils/prisma";
import * as Errors from "@errors";
import { Technology } from "@prisma/client";
import * as Interfaces from "@interfaces";

const deleteTechnology: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { name } = req.body as Technology;

  if (await prisma.technology.findFirst({ where: { name } })) {
    return next(Errors.Technology.technologyNotFound);
  }

  if (!name || typeof name !== "string") {
    return next(Errors.Technology.invalidName);
  }

  const technology = await prisma.technology.delete({
    where: { name },
  });

  if (!technology) {
    return next(Errors.Technology.technologyNotDeleted);
  }
  return res.json(Utils.Response.Success(technology));
};

export { deleteTechnology };
