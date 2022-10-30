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
  const { technologyNameOrId: nameOrId } = req.params;
  const { iconUrl, name } = req.body as Technology;

  // ---- checks -----
  if (!nameOrId) {
    return next(Errors.Technology.invalidId);
  }
  if (
    iconUrl &&
    (typeof iconUrl !== "string" || !Utils.Url.urlValidate(iconUrl))
  ) {
    return next(Errors.Technology.invalidIcon);
  }

  if (!name || typeof name !== "string") {
    return next(Errors.Technology.invalidName);
  }
  if (await prisma.technology.findFirst({ where: { name } })) {
    return next(Errors.Technology.technologyAlreadyExists);
  }

  // ---update---
  const oldTechnology = await prisma.technology.findFirst({
    where: {
      OR: [{ id: nameOrId }, { name: nameOrId }],
    },
  });
  if (!oldTechnology) {
    return next(Errors.Technology.technologyNotFound);
  }

  const technology = await prisma.technology.update({
    where: {
      id: oldTechnology.id,
    },
    data: {
      name,
      iconUrl,
    },
  });

  if (!technology) {
    return next(Errors.Technology.technologyNotUpdated);
  }
  return res.json(Utils.Response.Success(technology));
};

export { updateTechnology };
