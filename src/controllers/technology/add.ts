import * as Utils from "@utils";
import { prisma } from "@utils/prisma";
import * as Errors from "@errors";
import { Technology } from "@prisma/client";
import * as Interfaces from "@interfaces";

const createTechnology: Interfaces.Controller.Async = async (
  req,
  res,
  next
) => {
  const { iconUrl, name } = req.body as Technology;

  if (!name || typeof name !== "string" || !Utils.String.stringValidate(name)) {
    return next(Errors.Technology.invalidName);
  }
  if (
    !iconUrl ||
    typeof iconUrl !== "string" ||
    !Utils.Url.urlValidate(iconUrl)
  ) {
    return next(Errors.Technology.invalidIcon);
  }
  if (await prisma.technology.findFirst({ where: { name } })) {
    return next(Errors.Technology.technologyAlreadyExists);
  }

  const technology = await prisma.technology.create({
    data: {
      name,
      iconUrl,
    },
  });
  if (!technology) {
    return next(Errors.Technology.technologyNotCreated);
  }

  return res.json(Utils.Response.Success(technology));
};

export { createTechnology };
