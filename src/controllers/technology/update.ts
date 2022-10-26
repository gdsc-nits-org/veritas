import * as Utils from "@utils";
import { prisma } from "@utils/prisma";
import * as Errors from "@errors";
import { Technology } from "@prisma/client";
import * as Interfaces from "@interfaces";

const updateTechnology: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { iconURL, name } = req.body as Technology;

  if (await prisma.technology.findFirst({ where: { name } })) {
    return next(Errors.Technology.technologyNotFound);
  }

  if (!name || typeof name !== "string") {
    return next(Errors.Technology.invalidName);
  }
  if (
    iconURL &&
    (typeof iconURL !== "string" || !Utils.Url.urlValidate(iconURL))
  ) {
    return next(Errors.Technology.invalidIcon);
  }

  const technology = await prisma.technology.update({
    where: {
      name,
    },
    data: {
      iconURL,
    },
  });

  if (!technology) {
    return next(Errors.Technology.technologyNotUpdated);
  }
  return res.json(Utils.Response.Success(technology));
};

export { updateTechnology };
